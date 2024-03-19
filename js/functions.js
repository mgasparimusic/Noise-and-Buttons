//function.js
//Michael Gaspari
//Noise and Buttons

//Functions

import {diatonic} from '../js/midiMessages.js'; //Lists with data for MIDI.
import {rhythmGrid} from '../js/rhythmMessages.js'; //List with data for rhythm grids.

//Random Number Generator
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//Random Number Generator (between 0 and 1 float)
function getRandomDecimal() {
  let randomDecimal = Math.random();
  return randomDecimal;
}

//Converts messages to lists
function convertToRNBO(message) {
  const numbers = message.split(/\s+/).map(s => parseFloat(s));
  return numbers;
}

//Tempo Chooser
let tempo = 50;
let tempoPeak = false;
const redPressHoldInfo = document.getElementById('red-press-hold-info');

function tempoChooser() {
  let rnd = getRandomNumber(0, 4);
  if (rnd === 0) {
    tempo = 50;
    tempoPeak = false;
    redPressHoldInfo.innerHTML = `<img src="images/nab_tempo_direction_up.png" id="tempo-direction">`;
  } else if (rnd === 1) {
    tempo = 65;
  } else if (rnd === 2) {
    tempo = 85;
  } else if (rnd === 3) {
    tempo = 115;
  } else if (rnd === 4) {
    tempo = 140;
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
  return [attackValue, decayValue, turn];
}

//Timbre Chooser
let randomDelayValues = {
  feedbackAmount: 0,
  wetDryMix: 10,
  flangeRate: 7,
  flangeDepth: 0.137,
  flangeDelay: 0,
}
let flangeDelayValue = 0;
let delayVisual = document.getElementById('js-delay');

function timbreChooser() {
  randomDelayValues.feedbackAmount = getRandomNumber(0, 7) / 10;
  randomDelayValues.wetDryMix = getRandomNumber(0, 7) * 10;
  randomDelayValues.flangeRate = getRandomNumber(0, 14);
  randomDelayValues.flangeDepth = getRandomDecimal();
  flangeDelayValue = getRandomNumber(0, 3);

  delayVisual.value = randomDelayValues.feedbackAmount;
  delayVisual.style.setProperty(`--box-shadow`, `-400px 0 0 390px rgba(0, 255, 0, ${randomDelayValues.wetDryMix / 70})`);

  if (flangeDelayValue === 0) {
    randomDelayValues.flangeDelay = 0;
  } else if (flangeDelayValue === 1) {
    randomDelayValues.flangeDelay = 2.5;
  } else if (flangeDelayValue === 2) {
    randomDelayValues.flangeDelay = 5;
  } else if (flangeDelayValue === 3) {
    randomDelayValues.flangeDelay = 7.5;
  }
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

//Voice Chooser
let voices = {
  lowVoice: true,
  middleVoice: true,
  highVoice: true
}

function voiceChooser() {
  let rnd = getRandomNumber(0, 6);
  if (rnd === 0) {
    voices.lowVoice = true;
    voices.middleVoice = true;
    voices.highVoice = true;
  } else if (rnd === 1) {
    voices.lowVoice = true;
    voices.middleVoice = false;
    voices.highVoice = false;
  } else if (rnd === 2) {
    voices.lowVoice = false;
    voices.middleVoice = true;
    voices.highVoice = false;
  } else if (rnd === 3) {
    voices.lowVoice = false;
    voices.middleVoice = false;
    voices.highVoice = true;
  } else if (rnd === 4) {
    voices.lowVoice = true;
    voices.middleVoice = true;
    voices.highVoice = false;
  } else if (rnd === 5) {
    voices.lowVoice = true;
    voices.middleVoice = false;
    voices.highVoice = true;
  } else if (rnd === 6) {
    voices.lowVoice = false;
    voices.middleVoice = true;
    voices.highVoice = true;
  }
  return voices;
}

//Select Harmonic Language
let randomScale = diatonic.cMajorAMinor;
function selectHarmonicLanguage() {
  let rnd = getRandomNumber(1, 12);
  if (rnd === 1) {
    randomScale = diatonic.cMajorAMinor;
  } else if (rnd === 2) {
    randomScale = diatonic.dbMajorBbMinor;
  } else if (rnd === 3) {
    randomScale = diatonic.dMajorBMinor;
  } else if (rnd === 4) {
    randomScale = diatonic.ebMajorCMinor;
  } else if (rnd === 5) {
    randomScale = diatonic.eMajorCsMinor;
  } else if (rnd === 6) {
    randomScale = diatonic.fMajorDMinor;
  } else if (rnd === 7) {
    randomScale = diatonic.gbMajorEbMinor;
  } else if (rnd === 8) {
    randomScale = diatonic.gMajorEMinor;
  } else if (rnd === 9) {
    randomScale = diatonic.abMajorFMinor;
  } else if (rnd === 10) {
    randomScale = diatonic.aMajorFsMinor;
  } else if (rnd === 11) {
    randomScale = diatonic.bbMajorGMinor;
  } else if (rnd === 12) {
    randomScale = diatonic.bMajorGsMinor;
  }
  document.getElementById('js-random-scale').innerHTML = `${randomScale.scaleValue}`;
  return randomScale.scale;
}

//Export functions to main website file
export {tempoChooser, tempoPerciseControl, rhythmChooser, rhythmPerciseControl, timbreChooser, timbrePerciseControl, voiceChooser, selectHarmonicLanguage};