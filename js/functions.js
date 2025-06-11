//function.js
//Michael Gaspari
//Noise and Buttons

//Functions

import { allScales } from '../js/midiMessages.js'; //Lists with data for MIDI.
import { rhythmGrid } from '../js/rhythmMessages.js'; //List with data for rhythm grids.

//Random Number Generator that doesn't repeat the previous number returned.
const history = [];
function getRandomNumber(min, max) {
  if (max < min) {
    throw new Error('Max should be greater than min');
  }
  let randomNumber = Math.round(Math.random() * (max - min) + min);
  if (history[0] === randomNumber) {
    return getRandomNumber(min, max);
  } else {
    if (history.length != 0) {
      history[0] = randomNumber;
    } else {
      history.push(randomNumber);
    }
    return randomNumber;
  }
}

//Random Number Generator (between 0 and 1 float)
function getRandomDecimal() {
  let randomDecimal = Math.random();
  return randomDecimal;
}

//Opposite Number Function
function getOppositeInRange(num, min, max) {
  if (num < min || num > max) {
    throw new Error('Input number is outside the specified range.');
  }
  const midpoint = (min + max) / 2;
  const opposite = midpoint - (num - midpoint);
  return opposite;
}

function isBetween(num, min, max) {
  return num >= min && num <= max;
}

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

//Tempo Chooser–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*|
let tempo = 50;
let currentTempo = 50;
let tempoList = [50, 65, 85, 115, 140];
let tempoPeak = false;
let averageTempo = [];

function tempoChooser(tDiff) {
  function getRandomTempo() {
    let rnd = getRandomNumber(0, 4);
    let tempo = tempoList[rnd];
    if (tempo === 50) {
      tempoPeak = false;
    } else if (tempo === 140) {
      tempoPeak = true;
    }
    return tempo;
  }
  if (averageTempo.length < 3) {
    tempo = getRandomTempo();
    averageTempo.push(tDiff);
  } else {
    if (tDiff > 1200 || tDiff < 429) {
      while (averageTempo.length > 0) {
        averageTempo.shift();
      }
      tempo = getRandomTempo();
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
  if (direction && direction === 'up') {
    if (tempo >= 140) {
      tempo = 140;
    }
    tempo++;
  } else if ( direction && direction === 'down') {
    if (tempo <= 50) {
      tempo = 50;
    }
    tempo--;
  } else if (!direction) {
    const tempoBounce = dataBounce(tempoPeak, currentTempo, 1, 50, 140);
    currentTempo = tempoBounce[0];
    tempoPeak = tempoBounce[1];
    tempo = currentTempo;
  }
  return tempo;
}

//Rhythm Chooser–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*|
let rhythm = [5, 5, 5];
let rhythmList = {
  lowList: rhythmGrid.quarterNoteGrid,
  lowStepSeqLength: 4,
  midList: rhythmGrid.quarterNoteGrid,
  midStepSeqLength: 4,
  highList: rhythmGrid.quarterNoteGrid,
  highStepSeqLength: 4
}

function rhythmChooserBtn() {
  rhythm[0] = getRandomNumber(0, 10);
  rhythm[1] = getRandomNumber(0, 9) + 1;
  rhythm[2] = getRandomNumber(0, 9) + 1;
  rhythmSet(rhythm[0], rhythm[1], rhythm[2]);
  return [rhythmList, rhythm[0], rhythm[1], rhythm[2]];
}

function rhythmChooserCont(up, down, voice) {
  function rhythmUpDown(up, down, value) {
    if (up) {
      if (value >= 10) {
        return value;
      } else {
        value += 1;
      }
    }
    if (down) {
      if (value <= 0) {
        return value;
      } else {
        value -= 1;
      }
    }
    return value;
  }
  rhythm[voice] = rhythmUpDown(up, down, rhythm[voice]);
  rhythmSet(rhythm[0], rhythm[1], rhythm[2]);
  return [rhythmList, rhythm[0], rhythm[1], rhythm[2]];
}

function rhythmSet(low, mid, high) {
  rhythmList.lowList = rhythmGrid[low][1];
  rhythmList.lowStepSeqLength = rhythmGrid[low][2];
  rhythmList.midList = rhythmGrid[mid][1];
  rhythmList.midStepSeqLength = rhythmGrid[mid][2];
  rhythmList.highList = rhythmGrid[high][1];
  rhythmList.highStepSeqLength = rhythmGrid[high][2];
}

//Articulation Control–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*|
let attackValue = 1;
let decayValue = 2;
let attackPeak = false;
let decayPeak = false;
let turn = true;

function rhythmPerciseControl() {
  if (!turn) {
    attackValue = attackPerciseControl();
  } else if (turn) {
    decayValue = decayPerciseControl();
  }
  return [attackValue, decayValue, turn];
}

function attackPerciseControl() {
  const attackBounce = dataBounce(attackPeak, attackValue, 2, 2, 100);
  attackValue = attackBounce[0];
  attackPeak = attackBounce[1];
  if (attackValue <= 2) {
    turn = true;
  }
  return attackValue;
}

function decayPerciseControl() {
  const decayBounce = dataBounce(decayPeak, decayValue, 2, 2, 100);
  decayValue = decayBounce[0];
  decayPeak = decayBounce[1];
  if (decayValue >= 100) {
    turn = false;
  }
  return decayValue;
}

//Timbre Chooser–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*|
let delayValues = {
  feedbackAmount: 0,
  wetDryMix: 0,
  vibratoRate: 0,
  vibratoDepth: 0
}
let delayPeaks = {
  feedbackPeak: false,
  wetDryPeak: false,
  vibratoRatePeak: false,
  vibratoDepthPeak: false
}

function timbreChooser() {
  delayValues.feedbackAmount = getRandomNumber(0, 7) / 10;
  delayValues.wetDryMix = getRandomNumber(0, 7) * 10;
  delayValues.vibratoRate = getRandomNumber(0, 14);
  delayValues.vibratoDepth = getRandomDecimal().toFixed(1) * 75;
  return delayValues;
}
function feedbackPerciseControl() {
  const feedbackBounce = dataBounce(delayPeaks.feedbackPeak, delayValues.feedbackAmount, 1, 0, 7);
  delayValues.feedbackAmount = feedbackBounce[0];
  delayPeaks.feedbackPeak = feedbackBounce[1];
  return delayValues.feedbackAmount / 10;
}
function wetDryMixPerciseControl() {
  const wetDryMixBounce = dataBounce(delayPeaks.wetDryPeak, delayValues.wetDryMix, 10, 0, 70);
  delayValues.wetDryMix = wetDryMixBounce[0];
  delayPeaks.wetDryPeak = wetDryMixBounce[1];
  console.log(delayValues.wetDryMix);
  return delayValues.wetDryMix;
}
function vibratoRatePerciseControl() {
  const vibratoRateBounce = dataBounce(delayPeaks.vibratoRatePeak, delayValues.vibratoRate, 1, 0, 14);
  delayValues.vibratoRate = vibratoRateBounce[0];
  delayPeaks.vibratoRatePeak = vibratoRateBounce[1];
  console.log(delayValues.vibratoRate);
  return delayValues.vibratoRate;
}
function vibratoDepthPerciseControl() {
  const vibratoDepthBounce = dataBounce(delayPeaks.vibratoDepthPeak, delayValues.vibratoDepth, 5, 0, 75);
  delayValues.vibratoDepth = vibratoDepthBounce[0];
  delayPeaks.vibratoDepthPeak = vibratoDepthBounce[1];
  console.log(delayValues.vibratoDepth);
  return delayValues.vibratoDepth;
}

let cutoffValue = 1000;
let qValue = 2;
let cutoffPeak = false;
let qPeak = false;

function timbrePerciseControl() {
  cuttoffPerciseControl(20);
  qPerciseControl(1);
  return [cutoffValue, qValue / 20 - 0.1];
}

function cuttoffPerciseControl(incAmount) {
  const cutoffBounce = dataBounce(cutoffPeak, cutoffValue, incAmount, 1000, 5000);
  cutoffValue = cutoffBounce[0];
  cutoffPeak = cutoffBounce[1];
  return cutoffValue;
}

function qPerciseControl(incAmount) {
  const qBounce = dataBounce(qPeak, qValue, incAmount, 2, 22);
  qValue = qBounce[0];
  qPeak = qBounce[1];
  return qValue / 20 - 0.1;
}

//Select Harmonic Language–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*|
function selectScaleType() {
  let scaleType = document.getElementById('scales').selectedIndex;
  return scaleType;
}
let scaleType = selectScaleType();
let randomScale = allScales[0][0][0];
let noteIndexMax = allScales[0][1];

function selectHarmonicLanguage(scale) {
  scaleType = selectScaleType();
  let rnd;
  if (scale != null) {
    rnd = scale;
    randomScale = allScales[scaleType][0][scale];
  } else {
    rnd = getRandomNumber(1, 12) - 1;
    randomScale = allScales[scaleType][0][rnd];
  }
  noteIndexMax = allScales[scaleType][1];
  return [randomScale.scale, noteIndexMax, randomScale.scaleValue];
}

//Voice Chooser–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*|
let inc = 0;
const voiceList = [[1, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1], [0, 1, 1]];
let voices = {
  lowVoice: 1,
  middleVoice: 1,
  highVoice: 1
}

function voiceChooser(down) {
  if (down === 'down') {
    inc--;
    if (inc < 0) {
      inc = 6;
    }
  } else {
    inc++;
    if (inc > 6) {
      inc = 0;
    }
  }
  voices.lowVoice = voiceList[inc][0];
  voices.middleVoice = voiceList[inc][1];
  voices.highVoice = voiceList[inc][2];
  return [voices, inc];
}

//Export functions to main website.js file
export {isBetween, getOppositeInRange, tempoChooser, tempoPerciseControl, rhythmChooserBtn, rhythmChooserCont, rhythmPerciseControl, attackPerciseControl, decayPerciseControl, timbreChooser, feedbackPerciseControl, wetDryMixPerciseControl, vibratoRatePerciseControl, vibratoDepthPerciseControl, timbrePerciseControl, cuttoffPerciseControl, qPerciseControl, voiceChooser, selectHarmonicLanguage, selectScaleType};