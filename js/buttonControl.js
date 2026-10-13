//buttonControl.js
//Michael Gaspari
//Noise and Buttons

//Button Control

class Button {
  constructor(redButton, yellowButton, greenButton, blueButton, redLine, yellowLine, greenLine, blueLine, clickAndHoldRed, clickAndHoldYellow, clickAndHoldGreen, clickAndHoldBlue, redInt, yelInt, greInt, bluInt, redKey, yelKey, greKey, bluKey, redClickFunc, yelClickFunc, greClickFunc, bluClickFunc) {
    this.timeouts = {
      redTimeout: null, 
      yellowTimeout: null,
      greenTimeout: null,
      blueTimeout: null
    };
    this.keyAndMouseList = [
      [redButton, 'red', this.timeouts.redTimeout, redLine, clickAndHoldRed, redInt, redKey],
      [yellowButton, 'yellow', this.timeouts.yellowTimeout, yellowLine, clickAndHoldYellow, yelInt, yelKey],
      [greenButton, 'green', this.timeouts.greenTimeout, greenLine, clickAndHoldGreen, greInt, greKey],
      [blueButton, 'blue', this.timeouts.blueTimeout, blueLine, clickAndHoldBlue, bluInt, bluKey]
    ];
    this.redClick = redClickFunc;
    this.yelClick = yelClickFunc;
    this.greClick = greClickFunc;
    this.bluClick = bluClickFunc;
  }

  //Switch image between on and off button images for UI
  changeImageOn(color) {
    const buttonImage = document.getElementById(`${color}-button-image`);
    buttonImage.src = `images/nab_button_${color}_on.png`;
  }
  changeImageOff(color) {
    const buttonImage = document.getElementById(`${color}-button-image`);
    buttonImage.src = `images/nab_button_${color}_off.png`;
  }

  addKeyAndMouse() {
    //Sets up the mouse and touch screen controls for the 4 buttons
    this.keyAndMouseList.forEach((i) => {
      i[0].addEventListener('pointerdown', (event) => {
        event.target.disabled = true;
        this.changeImageOn(i[1]);
        i[2] = setTimeout(() => {
          i[3] = setInterval(i[4], i[5]);
        }, 500);
      })
      i[0].addEventListener('pointerup', (event) => {
        event.target.disabled = false;
        clearTimeout(i[2]);
        clearInterval(i[3]);
        if (i[1] === 'red') {
          this.redClick(event);
        } else if (i[1] === 'yellow') {
          this.yelClick();
        } else if (i[1] === 'green') {
          this.greClick();
        } else if (i[1] === 'blue') {
          this.bluClick();
        }
        this.changeImageOff(i[1]);
      })
    });

    //Sets up the keyboard shortcut controls for the 4 buttons
    document.addEventListener('keydown', (event) => {
      if (!event.repeat) {
        if (event.key === 49 || event.keyCode === 49) {
          this.changeImageOn('red');
          this.timeouts.redTimeout = setTimeout(() => {
            this.keyAndMouseList[0][3] = setInterval(this.keyAndMouseList[0][4], this.keyAndMouseList[0][5]);
          }, 500);
        } else if (event.key === 50 || event.keyCode === 50) {
          this.changeImageOn('yellow');
          this.timeouts.yellowTimeout = setTimeout(() => {
            this.keyAndMouseList[1][3] = setInterval(this.keyAndMouseList[1][4], this.keyAndMouseList[1][5]);
          }, 500);
        } else if (event.key === 51 || event.keyCode === 51) {
          this.changeImageOn('green');
          this.timeouts.greenTimeout = setTimeout(() => {
            this.keyAndMouseList[2][3] = setInterval(this.keyAndMouseList[2][4], this.keyAndMouseList[2][5]);
          }, 500);
        } else if (event.key === 52 || event.keyCode === 52) {
          this.changeImageOn('blue');
          this.timeouts.blueTimeout = setInterval(() => {
            this.keyAndMouseList[3][4]();
          }, 500);
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 49 || event.keyCode === 49) {
        clearTimeout(this.timeouts.redTimeout);
        this.redClick(event);
        clearInterval(this.keyAndMouseList[0][3]);
        this.changeImageOff('red');
      } else if (event.key === 50 || event.keyCode === 50) {
        clearTimeout(this.timeouts.yellowTimeout);
        this.yelClick();
        clearInterval(this.keyAndMouseList[1][3]);
        this.changeImageOff('yellow');
      } else if (event.key === 51 || event.keyCode === 51) {
        clearTimeout(this.timeouts.greenTimeout);
        this.greClick();
        clearInterval(this.keyAndMouseList[2][3]);
        this.changeImageOff('green');
      } else if (event.key === 52 || event.keyCode === 52) {
        clearTimeout(this.timeouts.blueTimeout);
        this.bluClick();
        this.changeImageOff('blue');
      }
    });
  }

  clearAllIntervals() {
    this.keyAndMouseList.forEach((i) => {
      clearTimeout(i[2]);
      clearInterval(i[3]);
      this.changeImageOff(i[1]);
    });
  }
}

export { Button };