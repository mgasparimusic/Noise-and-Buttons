//stopwatch.js
//Michael Gaspari
//Noise and Buttons

let stopwatchInterval;
let isRunning = false;
let hours = 0, minutes = 0, seconds = 0;

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    stopwatchInterval = setInterval(updateStopwatch, 1000);
    document.getElementById('js-on-off-button').textContent = 'On';
  } else {
    clearInterval(stopwatchInterval);
    isRunning = false;
    document.getElementById('js-on-off-button').textContent = 'Off';
  }
  return isRunning;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  isRunning = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  document.getElementById('js-stopwatch').textContent = '00:00:00';
  document.getElementById('js-on-off-button').textContent = 'Off';
}

function updateStopwatch() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }
  const formattedTime = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  document.getElementById('js-stopwatch').textContent = formattedTime;
}

function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

document.getElementById('js-on-off-button').addEventListener('click', startStopwatch);
document.getElementById('js-reset-button').addEventListener('click', resetStopwatch);

export {startStopwatch};