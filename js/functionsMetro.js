//function.js
//Michael Gaspari
//Noise and Buttons

//Tempo Direction–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*|
let tempo = 60;
let currentTempo = 60;
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
  }
  currentTempo = tempo;
  return tempo;
}

//Export functions to main website.js file
export {tempoDirection, tempoPerciseControl};