//function.js
//Michael Gaspari
//Noise and Buttons

//Functions

import {allScales} from '../js/midiMessages.js'; //Lists with data for MIDI.
import {rhythmGrid} from '../js/rhythmMessages.js'; //List with data for rhythm grids.

//Random Number Generator
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

//Tempo Chooser
let tempo = 50;
let tempoList = [50, 65, 85, 115, 140];
let tempoPeak = false;
const redPressHoldInfo = document.getElementById('red-press-hold-info');

function tempoChooser() {
  let rnd = getRandomNumber(0, 4);
  tempo = tempoList[rnd];
  if (tempo === 50) {
    tempoPeak = false;
    redPressHoldInfo.innerHTML = `<img src="images/nab_tempo_direction_up.png" id="tempo-direction">`;
  } else if (tempo === 140) {
    tempoPeak = true;
    redPressHoldInfo.innerHTML = `<img src="images/nab_tempo_direction_down.png" id="tempo-direction">`;
  }
  return tempo;
}

let currentTempo = tempoChooser();
//Tempo Percise Control
function tempoPerciseControl() {
  if (!tempoPeak && currentTempo < 140) {
    tempo++;
    if (tempo === 140) {
      tempoPeak = true;
      redPressHoldInfo.innerHTML = `<img src="images/nab_tempo_direction_down.png" id="tempo-direction">`;
    }
  } else if (tempoPeak && currentTempo > 50) {
    tempo--;
    if (tempo === 50) {
      tempoPeak = false;
      redPressHoldInfo.innerHTML = `<img src="images/nab_tempo_direction_up.png" id="tempo-direction">`;
    }
  }
  currentTempo = tempo;
  return tempo;
}

//Rhythm Chooser
let randomRhythm = {
  randomRhythmLow: 3,
  randomRhythmMid: 3,
  randomRhythmHigh: 3
}
let rhythmList = {
  lowList: rhythmGrid.quarterNoteGrid,
  midList: rhythmGrid.quarterNoteGrid,
  highList: rhythmGrid.quarterNoteGrid
}
let lowValue = document.getElementById('js-rhythm-value-low');
let midValue = document.getElementById('js-rhythm-value-mid');
let highValue = document.getElementById('js-rhythm-value-high');

function rhythmChooser() {
  randomRhythm.randomRhythmLow = getRandomNumber(0, 7);
  let low = randomRhythm.randomRhythmLow;
  
  if (low === 0) {
    lowValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_whole_note.png"></img>`;
    rhythmList.lowList = rhythmGrid.wholeNoteGrid;
  } else if (low === 1) {
    lowValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_half_note.png">`;
    rhythmList.lowList = rhythmGrid.halfNoteGrid;
  } else if (low === 2) {
    lowValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_half_note_triplet.png">`;
    rhythmList.lowList = rhythmGrid.halfNoteTripletGrid;
  } else if (low === 3) {
    lowValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_quarter_note.png">`;
    rhythmList.lowList = rhythmGrid.quarterNoteGrid;
  } else if (low === 4) {
    lowValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_quarter_note_triplet.png">`;
    rhythmList.lowList = rhythmGrid.quarterNoteTripletGrid;
  } else if (low === 5) {
    lowValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_eight_note.png">`;
    rhythmList.lowList = rhythmGrid.eightNoteGrid;
  } else if (low === 6) {
    lowValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_eight_note_triplet.png">`;
    rhythmList.lowList = rhythmGrid.eightNoteTripletGrid;
  } else if (low === 7) {
    lowValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_sixteenth_note.png">`;
    rhythmList.lowList = rhythmGrid.sixteenthNoteGrid;
  }
  randomRhythm.randomRhythmMid = getRandomNumber(0, 6) + 1;
  let mid = randomRhythm.randomRhythmMid;

  if (mid === 1) {
    midValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_half_note.png">`;
    rhythmList.midList = rhythmGrid.halfNoteGrid;
  } else if (mid === 2) {
    midValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_half_note_triplet.png">`;
    rhythmList.midList = rhythmGrid.halfNoteTripletGrid;
  } else if (mid === 3) {
    midValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_quarter_note.png">`;
    rhythmList.midList = rhythmGrid.quarterNoteGrid;
  } else if (mid === 4) {
    midValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_quarter_note_triplet.png">`;
    rhythmList.midList = rhythmGrid.quarterNoteTripletGrid;
  } else if (mid === 5) {
    midValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_eight_note.png">`;
    rhythmList.midList = rhythmGrid.eightNoteGrid;
  } else if (mid === 6) {
    midValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_eight_note_triplet.png">`;
    rhythmList.midList = rhythmGrid.eightNoteTripletGrid;
  } else if (mid === 7) {
    midValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_sixteenth_note.png">`;
    rhythmList.midList = rhythmGrid.sixteenthNoteGrid;
  }
  randomRhythm.randomRhythmHigh = getRandomNumber(0, 6) + 1;
  let high = randomRhythm.randomRhythmHigh;

  if (high === 1) {
    highValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_half_note.png">`;
    rhythmList.highList = rhythmGrid.halfNoteGrid;
  } else if (high === 2) {
    highValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_half_note_triplet.png">`;
    rhythmList.highList = rhythmGrid.halfNoteTripletGrid;
  } else if (high === 3) {
    highValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_quarter_note.png">`;
    rhythmList.highList = rhythmGrid.quarterNoteGrid;
  } else if (high === 4) {
    highValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_quarter_note_triplet.png">`;
    rhythmList.highList = rhythmGrid.quarterNoteTripletGrid;
  } else if (high === 5) {
    highValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_eight_note.png">`;
    rhythmList.highList = rhythmGrid.eightNoteGrid;
  } else if (high === 6) {
    highValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_eight_note_triplet.png">`;
    rhythmList.highList = rhythmGrid.eightNoteTripletGrid;
  } else if (high === 7) {
    highValue.innerHTML = `<img class="rhythm-value" src="images/nab_rhythm_sixteenth_note.png">`;
    rhythmList.highList = rhythmGrid.sixteenthNoteGrid;
  }
  return rhythmList;
}

let attackValue = 1;
let decayValue = 2;
let attackPeak = false;
let decayPeak = false;
const attackVisual = document.getElementById('js-attack-time');
const decayVisual = document.getElementById('js-decay-time');
const attackSpeed = document.getElementById('js-attack-speed');
const decaySpeed = document.getElementById('js-decay-speed');
let turn = false;

function rhythmPerciseControl() {
  if (!turn && !attackPeak && attackValue < 100) {
    attackValue += 2;
    attackVisual.value = attackValue;
    if (attackValue >= 100) {
      attackPeak = true;
    }
  } else if (!turn && attackPeak && attackValue > 2) {
    attackValue -= 2;
    attackVisual.value = attackValue;
    if (attackValue <= 2) {
      attackPeak = false;
      turn = true;
    }
  } else if (turn && !decayPeak && decayValue < 200) {
    decayValue += 2;
    decayVisual.value = decayValue;
    if (decayValue >= 200) {
      decayPeak = true;
    }
  } else if (turn && decayPeak && decayValue > 100) {
    decayValue -= 2;
    decayVisual.value = decayValue;
    if (decayValue <= 100) {
      decayPeak = false;
      turn = false;
    }
  }
  if (attackValue >= 50) {
    attackSpeed.textContent = 'Slow';
  } else {
    attackSpeed.textContent = 'Fast';
  }
  if (decayValue >= 150) {
    decaySpeed.textContent = 'Slow';
  } else {
    decaySpeed.textContent = 'Fast';
  }
  return [attackValue, decayValue, turn];
}

//Timbre Chooser
let randomDelayValues = {
  feedbackAmount: 0,
  wetDryMix: 10,
  vibratoRate: 0,
  vibratoDepth: 0,
}
let delayVisual = document.getElementById('js-delay');

function timbreChooser() {
  randomDelayValues.feedbackAmount = getRandomNumber(0, 7) / 10;
  randomDelayValues.wetDryMix = getRandomNumber(0, 7) * 10;
  randomDelayValues.vibratoRate = getRandomNumber(0, 14);
  randomDelayValues.vibratoDepth = getRandomDecimal() * 75;

  delayVisual.value = randomDelayValues.feedbackAmount;
  delayVisual.style.setProperty(`--box-shadow`, `-400px 0 0 390px rgba(0, 255, 0, ${randomDelayValues.wetDryMix / 70})`);

  return randomDelayValues;
}

let cutoffValue = 1000;
let qValue = 2;
let cutoffPeak = false;
let qPeak = false;
const cutoffVisual = document.getElementById("js-cutoff-value");
const qVisual = document.getElementById("js-q-value");

function timbrePerciseControl() {
  if (!cutoffPeak && cutoffValue < 5000) {
    cutoffValue += 20;
    cutoffVisual.value = cutoffValue;
    if (cutoffValue === 5000) {
      cutoffPeak = true;
    }
  } else if (cutoffPeak && cutoffValue > 1000) {
    cutoffValue -= 20;
    cutoffVisual.value = cutoffValue;
    if (cutoffValue === 1000) {
      cutoffPeak = false;
    }
  }
  if (!qPeak && qValue < 22) {
    qValue++;
    qVisual.value = qValue / 10;
    if (qValue === 22) {
      qPeak = true;
    }
  } else if (qPeak && qValue > 2) {
    qValue--;
    qVisual.value = qValue / 10;
    if (qValue === 2) {
      qPeak = false;
    }
  }
  return [cutoffValue, qValue / 10];
}

//Select Harmonic Language
function selectScaleType() {
  let scaleType = document.getElementById('scales').selectedIndex;
  return scaleType;
}
let scaleType = selectScaleType();
let randomScale = allScales[0][0][0];
let noteIndexMax = allScales[0][1];

function selectHarmonicLanguage() {
  scaleType = selectScaleType();
  let rnd = getRandomNumber(1, 12);
  randomScale = allScales[scaleType][0][rnd];
  noteIndexMax = allScales[scaleType][1];
  document.getElementById('js-random-scale').innerHTML = `${randomScale.scaleValue}`;
  return [randomScale.scale, noteIndexMax];
}

//Voice Chooser
let voices = {
  lowVoice: 1,
  middleVoice: 1,
  highVoice: 1
}
let voiceVisual = {
  lowVoiceVisual: document.getElementById('low-voice'),
  midVoiceVisual: document.getElementById('mid-voice'),
  highVoiceVisual: document.getElementById('high-voice')
}
voiceVisual.lowVoiceVisual.style.setProperty('--low-bg-color', 'rgb(0, 134, 251)');
voiceVisual.midVoiceVisual.style.setProperty('--mid-bg-color', 'rgb(0, 134, 251)');
voiceVisual.highVoiceVisual.style.setProperty('--high-bg-color', 'rgb(0, 134, 251)');
let inc = 1;
function voiceChooser() {
  if (inc === 0) {
    voices.lowVoice = 1;
    voices.middleVoice = 1;
    voices.highVoice = 1;
    voiceVisual.lowVoiceVisual.style.setProperty('--low-bg-color', 'rgb(0, 134, 251)');
    voiceVisual.midVoiceVisual.style.setProperty('--mid-bg-color', 'rgb(0, 134, 251)');
    voiceVisual.highVoiceVisual.style.setProperty('--high-bg-color', 'rgb(0, 134, 251)');
  } else if (inc === 1) {
    voices.lowVoice = 1;
    voices.middleVoice = 0;
    voices.highVoice = 0;
    voiceVisual.lowVoiceVisual.style.setProperty('--low-bg-color', 'rgb(0, 134, 251)');
    voiceVisual.midVoiceVisual.style.setProperty('--mid-bg-color', 'black');
    voiceVisual.highVoiceVisual.style.setProperty('--high-bg-color', 'black');
  } else if (inc === 2) {
    voices.lowVoice = 0;
    voices.middleVoice = 1;
    voices.highVoice = 0;
    voiceVisual.lowVoiceVisual.style.setProperty('--low-bg-color', 'black');
    voiceVisual.midVoiceVisual.style.setProperty('--mid-bg-color', 'rgb(0, 134, 251)');
    voiceVisual.highVoiceVisual.style.setProperty('--high-bg-color', 'black');
  } else if (inc === 3) {
    voices.lowVoice = 0;
    voices.middleVoice = 0;
    voices.highVoice = 1;
    voiceVisual.lowVoiceVisual.style.setProperty('--low-bg-color', 'black');
    voiceVisual.midVoiceVisual.style.setProperty('--mid-bg-color', 'black');
    voiceVisual.highVoiceVisual.style.setProperty('--high-bg-color', 'rgb(0, 134, 251)');
  } else if (inc === 4) {
    voices.lowVoice = 1;
    voices.middleVoice = 1;
    voices.highVoice = 0;
    voiceVisual.lowVoiceVisual.style.setProperty('--low-bg-color', 'rgb(0, 134, 251)');
    voiceVisual.midVoiceVisual.style.setProperty('--mid-bg-color', 'rgb(0, 134, 251)');
    voiceVisual.highVoiceVisual.style.setProperty('--high-bg-color', 'black');
  } else if (inc === 5) {
    voices.lowVoice = 1;
    voices.middleVoice = 0;
    voices.highVoice = 1;
    voiceVisual.lowVoiceVisual.style.setProperty('--low-bg-color', 'rgb(0, 134, 251)');
    voiceVisual.midVoiceVisual.style.setProperty('--mid-bg-color', 'black');
    voiceVisual.highVoiceVisual.style.setProperty('--high-bg-color', 'rgb(0, 134, 251)');
  } else if (inc === 6) {
    voices.lowVoice = 0;
    voices.middleVoice = 1;
    voices.highVoice = 1;
    voiceVisual.lowVoiceVisual.style.setProperty('--low-bg-color', 'black');
    voiceVisual.midVoiceVisual.style.setProperty('--mid-bg-color', 'rgb(0, 134, 251)');
    voiceVisual.highVoiceVisual.style.setProperty('--high-bg-color', 'rgb(0, 134, 251)');
  }
  inc++;
  if (inc > 6) {
    inc = 0;
  }
  return voices;
}

//Export functions to main website file
export {tempoChooser, tempoPerciseControl, rhythmChooser, rhythmPerciseControl, timbreChooser, timbrePerciseControl, voiceChooser, selectHarmonicLanguage, selectScaleType};