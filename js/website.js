//website.js
//Michael Gaspari
//Noise and Buttons

import {ClickAndHold} from '../js/button-press-class.js';
import {tempoChooser, tempoPerciseControl, rhythmChooser, timbreChooser, timbrePerciseControl, voiceChooser, selectHarmonicLanguage, rhythmPerciseControl} from '../js/functions.js';

/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

//JS Audio Context Declaration 
let audioContext;
let buffer;
let gain;
let synthDevice;

//Buttons in HTML
const onOffButton = document.getElementById('js-on-off-button'); //On/Off Button in HTML
const mainVolumeSlider = document.getElementById('js-main-volume'); //Volume Slider in HTML
const kickVolumeSlider = document.getElementById('js-kick-volume'); //Kick Volume Slider in HTML
const muteButton = document.getElementById('js-mute-button'); //Mute Button in HTML
const redButton = document.getElementById('red-button'); //Red Button in HTML
const yellowButton = document.getElementById('yellow-button'); //Yellow Button in HTML
const greenButton = document.getElementById('green-button'); //Green Button in HTML
const blueButton = document.getElementById('blue-button'); //Blue Button in HTML

//Data Line Variables
let holding = false; //Check for a holding state of button
let tempoLine; //Data Line for tempo press and hold
let rhythmLine; //Data Line for rhythm press and hold
let timbreLine; //Data Line for timbre press and hold
let voiceLine; //Data Line for harmony press and hold

//On/Off and Mute State Variables
let onOffState = 0; //Initializes state of RNBO synthDevice to be off (used for "onOffSignal" param)
let muteState = 1; //Initializes state of mute to be off (used for volume)

//Param Data for interfacing with RNBO params and inports
let onOffSignal, kickVolume, tempo, straightRhythmListLow, swingRhythmListLow, straightRhythmListMid, swingRhythmListMid,straightRhythmListHigh, swingRhythmListHigh, attackValue, decayValue, feedback, wetDryMix, vibratoRate, vibratoDepth, cutoffValue, qValue, harmonyLow, harmonyMid, harmonyHigh, lowVoice, midVoice, highVoice;

//Synth Data to be inputted into RNBO params and inports
let synthValues = {
  tempo: 50,
  rhythmLow: [[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  rhythmMid: [[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  rhythmHigh: [[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  attackValue: 2,
  decayValue: 100,
  feedback: 0,
  wetDryMix: 0,
  vibratoRate: 0,
  vibratoDepth: 0,
  cutoffValue: 1000,
  qValue: 0.2,
  harmonyListLow: [41, 43, 44, 46, 48, 49, 51, 53, 55, 56, 58, 60],
  harmonyListMid: [61, 63, 65, 67, 68, 70, 72, 73, 75, 77, 79, 80],
  harmonyListHigh: [82, 84, 85, 87, 89, 91, 92, 94, 96, 97, 99, 101],
  lowVoice: 1,
  midVoice: 1,
  highVoice: 1
}

/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

function setup() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  buffer = 'kick';
  gain = audioContext.createGain();

  loadRNBO(); //Sets up RNBO patch connection ->

  //Audio will be active once body of HTML is clicked.
  document.body.onclick = () => {
      audioContext.resume();
  }
  
  onOffButton.addEventListener('click', function() {
    onOffSynth();
  });
  muteButton.addEventListener('click', function() {
    muteSynth();
  });
  mainVolumeSlider.addEventListener('input', function() {
    adjustVolume(gain);
  });
  kickVolumeSlider.addEventListener('input', function() {
    adjustKickVolume(kickVolume);
  });
  document.addEventListener('keydown', function(event) {
    if (event.key === 32 || event.keyCode === 32) {
      onOffSynth();
    }
  });
}

async function loadRNBO() {
  const { createDevice } = RNBO;
  await audioContext.resume();

  const rawPatcher = await fetch('export/patch.export.json');
  const synthPatcher = await rawPatcher.json();

  synthDevice = await createDevice({ context: audioContext, patcher: synthPatcher });

  const fileResponse = await fetch('export/media/MMG_Kick-11.wav');
  const arrayBuf = await fileResponse.arrayBuffer();

  const audioBuf = await audioContext.decodeAudioData(arrayBuf);

  await synthDevice.setDataBuffer(buffer, audioBuf);
  //Connecting device to audio.
  synthDevice.node.connect(gain);
  gain.connect(audioContext.destination);

  gain.gain.value = 0;

  setParameters(synthDevice);
  onOffSignal.value = 0;
  lowVoice.value = 1;
  midVoice.value = 1;
  highVoice.value = 1;

  //Declares variables to inports in the RNBO patch
  setInports();

  synthDevice.scheduleEvent(straightRhythmListLow);
  synthDevice.scheduleEvent(swingRhythmListLow);
  synthDevice.scheduleEvent(straightRhythmListMid);
  synthDevice.scheduleEvent(swingRhythmListMid);
  synthDevice.scheduleEvent(straightRhythmListHigh);
  synthDevice.scheduleEvent(swingRhythmListHigh);
  synthDevice.scheduleEvent(harmonyLow);
  synthDevice.scheduleEvent(harmonyMid);
  synthDevice.scheduleEvent(harmonyHigh);
}

//Turns on sequencer built into RNBO patch
function onOffSynth() {
  if (onOffState === 0) {
      onOffState = 1;
      onOffSignal.value = onOffState;
      onOffButton.textContent = 'On'
  } else if (onOffState === 1) {
      onOffState = 0;
      onOffSignal.value = onOffState;
      onOffButton.textContent = 'Off'
  }
}

function muteSynth() {
  if (muteState === 1) {
    muteState = 0;
    mainVolumeSlider.removeEventListener('input', function() {
      adjustVolume(gain);
    });
    gain.gain.value = 0;
    muteButton.textContent = 'Unmute'
  } else if (muteState === 0) {
    muteState = 1;
    mainVolumeSlider.addEventListener('input', function() {
      adjustVolume(gain);
    });
    muteButton.textContent = 'Mute'
  }
}

function adjustVolume(g) {
  g.gain.value = mainVolumeSlider.value;
}

function adjustKickVolume(g) {
  g.value = kickVolumeSlider.value;
}

//Declares variables to paramenters in the RNBO patch
function setParameters(synthDevice) {     
  onOffSignal = synthDevice.parametersById.get('onOffSignal');
  kickVolume = synthDevice.parametersById.get('kickVolume');
  tempo = synthDevice.parametersById.get('tempo');
  attackValue = synthDevice.parametersById.get('attackValue');
  decayValue = synthDevice.parametersById.get('decayValue');
  feedback = synthDevice.parametersById.get('feedback');
  wetDryMix = synthDevice.parametersById.get('wetDryMix');
  vibratoRate = synthDevice.parametersById.get('vibratoRate');
  vibratoDepth = synthDevice.parametersById.get('vibratoDepth');
  cutoffValue = synthDevice.parametersById.get('cutoffValue');
  qValue = synthDevice.parametersById.get('qValue');
  lowVoice = synthDevice.parametersById.get('lowVoice');
  midVoice = synthDevice.parametersById.get('midVoice');
  highVoice = synthDevice.parametersById.get('highVoice');
}

//Declares variables to inports/inlets in the RNBO patch
const { TimeNow, MessageEvent } = RNBO; //Adds RNBO classes to project
function setInports() {
  straightRhythmListLow = new MessageEvent(TimeNow, 'in1', synthValues.rhythmLow[0]);
  swingRhythmListLow = new MessageEvent(TimeNow, 'in2', synthValues.rhythmLow[1]);
  straightRhythmListMid = new MessageEvent(TimeNow, 'in3', synthValues.rhythmMid[0]);
  swingRhythmListMid = new MessageEvent(TimeNow, 'in4', synthValues.rhythmMid[1]);
  straightRhythmListHigh = new MessageEvent(TimeNow, 'in5', synthValues.rhythmHigh[0]);
  swingRhythmListHigh = new MessageEvent(TimeNow, 'in6', synthValues.rhythmHigh[1]);
  harmonyLow = new MessageEvent(TimeNow, 'in7', synthValues.harmonyListLow);
  harmonyMid = new MessageEvent(TimeNow, 'in8', synthValues.harmonyListMid);
  harmonyHigh = new MessageEvent(TimeNow, 'in9', synthValues.harmonyListHigh);
}

//Call setup() to initialize RNBO patch
setup();

/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

redButton.addEventListener('mouseup', function() {
  quickClickRed();
  clearInterval(tempoLine);
});
ClickAndHold.apply(redButton, function() {
  tempoLine = setInterval(clickAndHoldRed, 100);
}, '1', '1');

yellowButton.addEventListener('mouseup', function() {
  quickClickYellow();
  clearInterval(rhythmLine);
});
ClickAndHold.apply(yellowButton,  function() {
  rhythmLine = setInterval(clickAndHoldYellow, 200);
}, '1', '1');

greenButton.addEventListener('mouseup', function() {
  quickClickGreen();
  clearInterval(timbreLine);
});
ClickAndHold.apply(greenButton,  function() {
  clickAndHoldGreen();
  timbreLine = setInterval(clickAndHoldGreen, 50);
}, '1', '1');

blueButton.addEventListener('mouseup', quickClickBlue);
ClickAndHold.apply(blueButton,  function() {
  clickAndHoldBlue();
}, '1', '1');

/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

//Red Quick Click
function quickClickRed() {
  if (holding) {
    holding = false;
  } else {
    synthValues.tempo = tempoChooser();
    tempo.value = synthValues.tempo;
    document.getElementById('red-press-info').innerHTML = `${synthValues.tempo} bpm`;
  }
  return synthValues.tempo;
}

//Red Click and Hold
function clickAndHoldRed() {
  holding = true;
  synthValues.tempo = tempoPerciseControl();
  tempo.value = synthValues.tempo;
  document.getElementById('red-press-info').innerHTML = `${synthValues.tempo} bpm`;
}

//Yellow Quick Click
function quickClickYellow() {
  if (holding) {
    holding = false;
  } else {
    let rhtyhmValues = rhythmChooser();
    synthValues.rhythmLow = rhtyhmValues.lowList;
    synthValues.rhythmMid = rhtyhmValues.midList;
    synthValues.rhythmHigh = rhtyhmValues.highList;
    straightRhythmListLow = new MessageEvent(TimeNow, 'in1', synthValues.rhythmLow[0]);
    synthDevice.scheduleEvent(straightRhythmListLow);
    swingRhythmListLow = new MessageEvent(TimeNow, 'in2', synthValues.rhythmLow[1]);
    synthDevice.scheduleEvent(swingRhythmListLow);
    straightRhythmListMid = new MessageEvent(TimeNow, 'in3', synthValues.rhythmMid[0]);
    synthDevice.scheduleEvent(straightRhythmListMid);
    swingRhythmListMid = new MessageEvent(TimeNow, 'in4', synthValues.rhythmMid[1]);
    synthDevice.scheduleEvent(swingRhythmListMid);
    straightRhythmListHigh = new MessageEvent(TimeNow, 'in5', synthValues.rhythmHigh[0]);
    synthDevice.scheduleEvent(straightRhythmListHigh);
    swingRhythmListHigh = new MessageEvent(TimeNow, 'in6', synthValues.rhythmHigh[1]);
    synthDevice.scheduleEvent(swingRhythmListHigh);
  }
}

//Yellow Click and Hold
let turn = false;
function clickAndHoldYellow() {
  holding = true;
  synthValues.attackValue = rhythmPerciseControl()[0];
  synthValues.decayValue = rhythmPerciseControl()[1];
  turn = rhythmPerciseControl()[2];
  attackValue.value = synthValues.attackValue;
  decayValue.value = synthValues.decayValue;
}

//Green Quick Click
function quickClickGreen() {
  if (holding) {
    holding = false;
  } else {
    let delayValues = timbreChooser();
    feedback.value = delayValues.feedbackAmount;
    wetDryMix.value = delayValues.wetDryMix;
    vibratoRate.value = delayValues.vibratoRate;
    vibratoDepth.value = delayValues.vibratoDepth;
  }
}

//Green Click and Hold
function clickAndHoldGreen() {
  holding = true;
  synthValues.cutoffValue = timbrePerciseControl()[0];
  synthValues.qValue = timbrePerciseControl()[1];
  cutoffValue.value = synthValues.cutoffValue;
  qValue.value = synthValues.qValue;
}

//Blue Quick Click
function quickClickBlue() {
  if (holding) {
    holding = false;
  } else {
    let harmonyValues = selectHarmonicLanguage();
    synthValues.harmonyListLow = harmonyValues[0];
    synthValues.harmonyListMid = harmonyValues[1];
    synthValues.harmonyListHigh = harmonyValues[2];
    harmonyLow = new MessageEvent(TimeNow, 'in7', synthValues.harmonyListLow);
    synthDevice.scheduleEvent(harmonyLow);
    harmonyMid = new MessageEvent(TimeNow, 'in8', synthValues.harmonyListMid);
    synthDevice.scheduleEvent(harmonyMid);
    harmonyHigh = new MessageEvent(TimeNow, 'in9', synthValues.harmonyListHigh);
    synthDevice.scheduleEvent(harmonyHigh);
  }
}

//Blue Click and Hold
function clickAndHoldBlue() {
  holding = true;
  let voices = voiceChooser();
  lowVoice.value = voices.lowVoice;
  midVoice.value = voices.middleVoice;
  highVoice.value = voices.highVoice;
}

/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */