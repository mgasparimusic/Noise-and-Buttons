//function.js
//Michael Gaspari
//Noise and Buttons

//Data Bounce Function
function dataBounce(peak, value, inc, min, max) {
  if (!peak && value < max) {
    value += inc;
    if (value >= max) {
      peak = true;
    }
  } else if (peak && value > min) {
    value -= inc;
    if (value <= min) {
      peak = false;
    }
  }
  return [value, peak];
}

//Tempo Direction–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*|
let tempo = 60;
let currentTempo = 60;
let tempoPeak = false;
let averageTempo = [];

function tempoDirection(tDiff) {
  if (averageTempo.length < 3) {
    averageTempo.push(tDiff);
  } else {
    if (tDiff > 1200 || tDiff < 429) {
      while (averageTempo.length > 0) {
        averageTempo.shift();
      }
      averageTempo.push(tDiff);
    } else {
      averageTempo.shift();
      averageTempo.push(tDiff);
      const average = Math.round(averageTempo.reduce((a, b) => a + b, 0) / averageTempo.length);
      tempo = Math.round(60000/average);
    }
  }
  currentTempo = tempo;
  return tempo;

}

//Tempo Percise Control–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*|
function tempoPerciseControl(direction) {
  if (direction === 'up') {
    if (tempo >= 300) {
      tempo = 300;
    }
    tempo++;
  } else if (direction === 'down') {
    if (tempo <= 20) {
      tempo = 20;
    }
    tempo--;
  } else if (!direction) {
    const tempoBounce = dataBounce(tempoPeak, currentTempo, 1, 20, 300);
    currentTempo = tempoBounce[0];
    tempoPeak = tempoBounce[1];
    tempo = currentTempo;
  }
  return tempo;
}

//Export functions to main website.js file
export {tempoDirection, tempoPerciseControl};