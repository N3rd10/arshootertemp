// body.js

AFRAME.registerComponent('follow-user', {
  init: function () {
    const el = this.el;
    const camera = document.querySelector('a-entity[camera]');

    // Update the position of the character to follow the camera
    this.tick = function () {
      const cameraPosition = camera.getAttribute('position');
      el.setAttribute('position', {
        x: cameraPosition.x,
        y: cameraPosition.y - 1, // Adjust height as needed
        z: cameraPosition.z
      });
    };
  },
  tick: function () {
    this.tick();
  }
});

// Attach the component to your character entity in the HTML
