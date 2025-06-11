//controllersPanel.js
//Michael Gaspari
//Noise and Buttons

export const joysticks = {
  joystickRed: createJoystick(document.getElementById('joystick-wrapper-red'), 'joystick-red'),
  joystickBlue: createJoystick(document.getElementById('joystick-wrapper-blue'), 'joystick-blue')
}

function createJoystick(parent, name) {
  const maxDiff = 30;
  const stick = document.createElement('div');
  stick.setAttribute('id', name);
  let currentPos = { x: 0, y: 0 };

  parent.appendChild(stick);
  return {
    getPosition: () => currentPos,
    updatePosition: function(newX, newY) {
      currentPos.x = newX * maxDiff;
      currentPos.y = newY * maxDiff;
      stick.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0px)`
      return currentPos;
    },
  };
}

export const controllerPanelNintendo = [
  /* B */ {element: document.getElementById('controller-button-0'), funcOn: function() {this.element.style.backgroundColor = 'lightgreen'}, funcOff: function() {this.element.style.backgroundColor = 'green'}},
  /* A */ {element: document.getElementById('controller-button-1'), funcOn: function() {this.element.style.backgroundColor = 'lightgreen'}, funcOff: function() {this.element.style.backgroundColor = 'green'}},
  /* Y */ {element: document.getElementById('controller-button-2'), funcOn: function() {this.element.style.backgroundColor = 'lightgreen'}, funcOff: function() {this.element.style.backgroundColor = 'green'}},
  /* X */ {element: document.getElementById('controller-button-3'), funcOn: function() {this.element.style.backgroundColor = 'lightgreen'}, funcOff: function() {this.element.style.backgroundColor = 'green'}},
  /* Left Bumper */ {element: document.getElementById('controller-button-4'), funcOn: function() {this.element.style.backgroundColor = 'darkgoldenrod'}, funcOff: function() {this.element.style.backgroundColor = 'yellow'}},
  /* Right Bumper */ {element: document.getElementById('controller-button-5'), funcOn: function() {this.element.style.backgroundColor = 'lightgreen'}, funcOff: function() {this.element.style.backgroundColor = 'green'}},
  /* Left Trigger */ {element: document.getElementById('controller-button-6'), funcOn: function() {this.element.style.backgroundColor = 'darkgoldenrod'}, funcOff: function() {this.element.style.backgroundColor = 'yellow'}},
  /* Right Trigger */ {element: document.getElementById('controller-button-7'), funcOn: function() {this.element.style.backgroundColor = 'lightgreen'}, funcOff: function() {this.element.style.backgroundColor = 'green'}},
  /* Minus */ {element: document.getElementById('controller-button-8'), funcOn: function() {this.element.style.backgroundColor = 'lightblue'}, funcOff: function() {this.element.style.backgroundColor = 'blue'}},
  /* Plus */ {element: document.getElementById('controller-button-9'), funcOn: function() {this.element.style.backgroundColor = 'lightblue'}, funcOff: function() {this.element.style.backgroundColor = 'blue'}},
  /* Left Joy Stick Button */ {element: document.getElementById('joystick-red'), funcOn: function() {this.element.style.backgroundColor = 'lightsalmon'}, funcOff: function() {this.element.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'}},
  /* Right Joy Stick Button */ {element: document.getElementById('joystick-blue'), funcOn: function() {this.element.style.backgroundColor = 'lightblue'}, funcOff: function() {this.element.style.backgroundColor = 'rgba(0, 0, 255, 0.5)'}},
  /* Up D Pad */ {element: document.getElementById('controller-button-12'), funcOn: function() {this.element.style.backgroundColor = 'darkgoldenrod'}, funcOff: function() {this.element.style.backgroundColor = 'yellow'}},
  /* Down D Pad */ {element: document.getElementById('controller-button-13'), funcOn: function() {this.element.style.backgroundColor = 'darkgoldenrod'}, funcOff: function() {this.element.style.backgroundColor = 'yellow'}},
  /* Left D Pad */ {element: document.getElementById('controller-button-14'), funcOn: function() {this.element.style.backgroundColor = 'darkgoldenrod'}, funcOff: function() {this.element.style.backgroundColor = 'yellow'}},
  /* Right D Pad */ {element: document.getElementById('controller-button-15'), funcOn: function() {this.element.style.backgroundColor = 'darkgoldenrod'}, funcOff: function() {this.element.style.backgroundColor = 'yellow'}},
];