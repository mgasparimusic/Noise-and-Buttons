//button-press-class.js
//Michael Gaspari
//Noise and Buttons

export class ClickAndHold {
  /** 
   * 
   * @param {EventTarget} target The HTML element to apply the event to 
   * @param {Function} callback The function to run once the target is clicked and held
  */
  constructor(target, callback, onEvent, offEvent) {
    this.target = target;
    this.callback = callback;
    this.onEvent = onEvent;
    this.offEvent = offEvent;
    this.isHeld = false;
    this.activeHoldTimeoutId = null;

    ['mousedown', 'touchstart', onEvent].forEach(type => {
      this.target.addEventListener(type, this._onHoldStart.bind(this));
    });

    ['mouseup', 'mouseleave', 'mouseout', 'touchend', 'touchcancel', offEvent].forEach(type => {
      this.target.addEventListener(type, this._onHoldEnd.bind(this));
    });
  }

  _onHoldStart() {
    this.isHeld = true;

    this.activeHoldTimeoutId = setTimeout(() => {
      if (this.isHeld) {
        this.callback();
      }
    }, 500);
  }

  _onHoldEnd() {
    this.isHeld = false;
    clearTimeout(this.activeHoldTimeoutId);
  }

  /** 
  * @param {EventTarget} target The HTML element to apply the event to 
  * @param {Function} callback The function to run once the target is clicked and held
  */
  static apply(target, callback, onEvent, offEvent) {
    new ClickAndHold(target, callback, onEvent, offEvent);
  }
}

