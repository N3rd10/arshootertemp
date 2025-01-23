        const video = document.createElement('video');
        const modelParams = {
            flipHorizontal: true,
            maxNumBoxes: 1,
            iouThreshold: 0.5,
            scoreThreshold: 0.6,
        };

        handTrack.load(modelParams).then(model => {
            model.detect(video).then(predictions => {
                if (predictions.length > 0) {
                    const hand = predictions[0];
                    const isFist = checkIfFist(hand); // Check if the hand is making a fist

                    const line = document.getElementById('line');
                    if (isFist) {
                        // Position the line based on the hand's position
                        const handX = hand.bbox[0] + (hand.bbox[2] - hand.bbox[0]) / 2; // Center X
                        const handY = hand.bbox[1] + (hand.bbox[3] - hand.bbox[1]) / 2; // Center Y
                        const lineLength = 1; // Length of the line

                        // Set the line's position to point away from the hand
                        line.setAttribute('position', `${handX} ${handY} 0`);
                        line.setAttribute('geometry', `primitive: line; vertexA: 0 0 0; vertexB: 0 0 ${lineLength}`);
                    } else {
                        // Hide the line if not making a fist
                        line.setAttribute('position', '0 0 -10'); // Move it out of view
                    }
                }
                requestAnimationFrame(() => model.detect(video));
            });
        });

        navigator.mediaDevices.getUser Media({ video: {} })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            });

        function checkIfFist(hand) {
            // Simple heuristic to check if the hand is making a fist
            // You can improve this logic based on your needs
            const fingers = hand.landmarks; // Assuming landmarks are available
            const thumb = fingers[4]; // Thumb landmark
            const indexFinger = fingers[8]; // Index finger landmark
            const middleFinger = fingers[12]; // Middle finger landmark
            const ringFinger = fingers[16]; // Ring finger landmark
            const pinkyFinger = fingers[20]; // Pinky finger landmark

            // Check if the fingers are close to the palm (indicating a fist)
            return (indexFinger[1] > thumb[1] && middleFinger[1] > thumb[1] &&
                    ringFinger[1] > thumb[1] && pinkyFinger[1] > thumb[1]);
        }
