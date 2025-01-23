
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
                    // Check if hands are in a certain position
                    const hand = predictions[0];
                    if (hand.bbox[0] < 200 && hand.bbox[1] < 200) {
                        console.log("Hand detected in the top left corner!");
                        // Add your logic here for when the hand is in the desired position
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
