//website.js
//Michael Gaspari
//Noise and Buttons

import { isBetween, getOppositeInRange, tempoChooser, tempoPerciseControl, rhythmChooserBtn, rhythmChooserCont, rhythmPerciseControl, attackPerciseControl, decayPerciseControl, timbreChooser, feedbackPerciseControl, wetDryMixPerciseControl, vibratoRatePerciseControl, vibratoDepthPerciseControl, timbrePerciseControl, cuttoffPerciseControl, qPerciseControl, voiceChooser, selectHarmonicLanguage, selectScaleType } from '../js/functions.js';
import { startStopwatch } from './stopwatch.js';
import { infoPanelUI } from './infoPanel.js';
import { joysticks, controllerPanelNintendo } from './controllersPanel.js';

/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

//JS Audio Context Declaration 
let audio;
let buffer;
let gain;
let synthDevice;

//Buttons and Elements in HTML
const recordingDialog = document.getElementById('recording-dialog') //Dialog that will show current recording in HTML
const onOffDescription = document.getElementById('js-start-stop-description') //On/Off Description Text in HTML
const onOffButton = document.getElementById('js-on-off-button'); //On/Off Button in HTML
const interfaceSelection = document.getElementById('interfaces'); //"Select Interface" Drop Down in HTML
const mainVolumeSlider = document.getElementById('js-main-volume'); //Volume Slider in HTML
const kickVolumeSlider = document.getElementById('js-kick-volume'); //Kick Volume Slider in HTML
const muteButton = document.getElementById('js-mute-button'); //Mute Button in HTML
const recButton = document.getElementById('recording-button'); //Recording Button in HTML
const recording = document.getElementById('audio'); //Recording Playback in HTML
const redButton = document.getElementById('red-button'); //Red Button in HTML
const yellowButton = document.getElementById('yellow-button'); //Yellow Button in HTML
const greenButton = document.getElementById('green-button'); //Green Button in HTML
const blueButton = document.getElementById('blue-button'); //Blue Button in HTML
const scaleType = document.getElementById('scales'); //Blue button Select Style dropdown

//Data Line Variables
let redHolding, yellowHolding, greenHolding, blueHolding = false; //Check for a holding state of each button
let tempoLine; //Data Line for tempo press and hold
let rhythmLine; //Data Line for rhythm press and hold
let attackLine; //Data Line for attack on controller
let decayLine; //Data Line for decay on controller
let timbreLine; //Data Line for timbre press and hold
let cutoffLine; //Data Line for cutoff on controller
let qLine; //Data Line for q on controller
let voiceLine; //Data Line for harmony press and hold

//On/Off and Mute State Variables
let onOffState = 0; //Initializes state of RNBO synthDevice to be off (used for "onOffSignal" param)
let interfaceSelectionState = interfaceSelection.value;
let muteState = 1; //Initializes state of mute to be off (used for volume)

//Param Data for interfacing with RNBO params and inports
let onOffSignal, kickVolume, tempo, straightRhythmListLow, swingRhythmListLow, straightRhythmListMid, swingRhythmListMid, straightRhythmListHigh, swingRhythmListHigh, attackValue, decayValue, feedback, wetDryMix, vibratoRate, vibratoDepth, cutoffValue, qValue, harmonyLow, harmonyMid, harmonyHigh, lowVoice, midVoice, highVoice, noteIndexMax, lowStepSeqLength, midStepSeqLength, highStepSeqLength;

//Synth Data to be inputted into RNBO params and inports
let synthValues = {
  tempo: 50,
  selectedVoice: 0,
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
  highVoice: 1,
  lowStepSeqLength: 4,
  midStepSeqLength: 4,
  highStepSeqLength: 4,
}

/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

let controllerIndex = null;
let gamepad;
let request;
let gamepadButtons = [
  /* B */ [0, 0, 'b', /* On Func */ function() {controllerVibratoDepth(); controllerPanelNintendo[0].funcOn();}, /* Off Func */ function() {controllerPanelNintendo[0].funcOff();}],
  /* A */ [0, 0, 'a', /* On Func */ function() {controllerVibratoRate(); controllerPanelNintendo[1].funcOn();}, /* Off Func */ function() {controllerPanelNintendo[1].funcOff();}],
  /* Y */ [0, 0, 'y', /* On Func */ function() {controllerWetDryMix(); controllerPanelNintendo[2].funcOn();}, /* Off Func */ function() {controllerPanelNintendo[2].funcOff();}],
  /* X */ [0, 0, 'x', /* On Func */ function() {controllerFeedback(); controllerPanelNintendo[3].funcOn();}, /* Off Func */ function() {controllerPanelNintendo[3].funcOff();}],
  /* Left Bumper */ [0, 0, 'left-bumper', /* On Func */ function() {attackLine = setInterval(controllerAttack, 50); controllerPanelNintendo[4].funcOn();}, /* Off Func */ function() {clearInterval(attackLine); controllerPanelNintendo[4].funcOff();}],
  /* Right Bumper */ [0, 0, 'right-bumper', /* On Func */ function() {cutoffLine = setInterval(controllerCutoff, 50); controllerPanelNintendo[5].funcOn();}, /* Off Func */ function() {clearInterval(cutoffLine); controllerPanelNintendo[5].funcOff();}],
  /* Left Trigger */ [0, 0, 'left-trigger', /* On Func */ function() {decayLine = setInterval(controllerDecay, 50); controllerPanelNintendo[6].funcOn();}, /* Off Func */ function() {clearInterval(decayLine); controllerPanelNintendo[6].funcOff();}],
  /* Right Trigger */ [0, 0, 'right-trigger', /* On Func */ function() {qLine = setInterval(controllerQ, 100); controllerPanelNintendo[7].funcOn();}, /* Off Func */ function() {clearInterval(qLine); controllerPanelNintendo[7].funcOff();}],
  /* Minus */ [0, 0, 'minus', /* On Func */ function() {clickAndHoldBlue('down'); controllerPanelNintendo[8].funcOn();}, /* Off Func */ function() {controllerPanelNintendo[8].funcOff();}],
  /* Plus */ [0, 0, 'plus', /* On Func */ function() {clickAndHoldBlue(); controllerPanelNintendo[9].funcOn();}, /* Off Func */ function() {controllerPanelNintendo[9].funcOff();}],
  /* Left Joy Stick Button */ [0, 0, 'left-joy-stick-button', /* On Func */ function() { quickClickRed(); controllerPanelNintendo[10].funcOn();}, /* Off Func */ function() {controllerPanelNintendo[10].funcOff();}],
  /* Right Joy Stick Button */ [0, 0, 'right-joy-stick-button', /* On Func */ function() {quickClickBlue(); controllerPanelNintendo[11].funcOn();}, /* Off Func */ function() {controllerPanelNintendo[11].funcOff();}],
  /* Up D Pad */ [0, 0, 'up-d-pad', /* On Func */ function() {controllerPanelNintendo[12].funcOn(); let rhythmValues = rhythmChooserCont(true, false, synthValues.selectedVoice);setSynthRhythms(rhythmValues[0], rhythmValues[1], rhythmValues[2], rhythmValues[3]);}, /* Off Func */ function() {controllerPanelNintendo[12].funcOff();}],
  /* Down D Pad */ [0, 0, 'down-d-pad', /* On Func */ function() {controllerPanelNintendo[13].funcOn(); let rhythmValues = rhythmChooserCont(false, true, synthValues.selectedVoice); setSynthRhythms(rhythmValues[0], rhythmValues[1], rhythmValues[2], rhythmValues[3]);}, /* Off Func */ function() {controllerPanelNintendo[13].funcOff();}],
  /* Left D Pad */ [0, 0, 'left-d-pad', /* On Func */ function() {
    controllerPanelNintendo[14].funcOn();
    if (synthValues.selectedVoice === 0) {
      synthValues.selectedVoice = 2;
    } else {
      synthValues.selectedVoice -= 1;
    }
    voiceSet(synthValues.selectedVoice);
  }, /* Off Func */ function() {controllerPanelNintendo[14].funcOff();}],
  /* Right D Pad */ [0, 0, 'right-d-pad', /* On Func */ function() {
    controllerPanelNintendo[15].funcOn();
    if (synthValues.selectedVoice === 2) {
      synthValues.selectedVoice = 0;
    } else {
      synthValues.selectedVoice += 1;
    }
    voiceSet(synthValues.selectedVoice);
  }, /* Off Func */ function() {controllerPanelNintendo[15].funcOff();}],
  /* Home */ [0, 0, 'Home', /* On Func */ function() {console.log('Home')}, /* Off Func */ function() {onOffSynth();}]
];
let loopCounter = 0;

window.addEventListener('gamepadconnected', (event) =>{
  handleConnectDisconnect(event, true);
});

window.addEventListener('gamepaddisconnected', (event) =>{
  handleConnectDisconnect(event, false);
});

function handleConnectDisconnect(event, connected) {
  const controllerAreaNotConnected = document.getElementById('controller-not-connected-area');
  const controllerAreaConnected = document.getElementById('controller-connected-area');

  gamepad = event.gamepad;

  if (connected) {
    controllerIndex = gamepad.index;
    controllerAreaNotConnected.style.display = 'none';
    controllerAreaConnected.style.display = 'block';
  } else {
    controllerIndex = null;
    controllerAreaNotConnected.style.display = 'block';
    controllerAreaConnected.style.display = 'none';
  }
}

function controllerInputs() {
  gamepad = navigator.getGamepads()[controllerIndex];
  const buttons = gamepad.buttons;
  const sticks = gamepad.axes;
  for (let i = 0; i < gamepadButtons.length; i++) {
    gamepadButtons[i][1] = buttons[i].value;
    if (gamepadButtons[i][0] - gamepadButtons[i][1] < 0) {
      gamepadButtons[i][3]();
    }
    if (gamepadButtons[i][0] - gamepadButtons[i][1] > 0) {
      gamepadButtons[i][4]();
    }
  }
  const stickDeadZone = 0.2
  const leftRightValueLeft = sticks[0];
  const upDownValueLeft = sticks[1];
  const leftRightValueRight = sticks[2];
  const upDownValueRight = sticks[3];
  joysticks.joystickRed.updatePosition(leftRightValueLeft, upDownValueLeft);
  joysticks.joystickBlue.updatePosition(leftRightValueRight, upDownValueRight);
  if (upDownValueLeft >= stickDeadZone) {
    let downDiff = Math.abs(getOppositeInRange(upDownValueLeft.toFixed(1), 0, 1)) * 10 + 8;
    loopCounter++;
    if (isNaN(loopCounter % Math.round(downDiff))) {
      downDiff = 4;
    }
    if (loopCounter % Math.round(downDiff) === 0) {
      clickAndHoldRed('down');
    }
  } else if (upDownValueLeft <= -stickDeadZone) {
    let upDiff = Math.abs(getOppositeInRange(upDownValueLeft.toFixed(1), -1, 0)) * 10 + 8;
    loopCounter++;
    if (isNaN(loopCounter % Math.round(upDiff))) {
      upDiff = 4;
    }
    if (loopCounter % Math.round(upDiff) === 0) {
      clickAndHoldRed('up');
    }
  }
  if (isBetween(upDownValueRight.toFixed(2), -1, -0.87) && isBetween(leftRightValueRight.toFixed(2), 0, 0.49)) {
    quickClickBlue(0);
  } else if (isBetween(upDownValueRight.toFixed(2), -0.86, -0.5) && isBetween(leftRightValueRight.toFixed(2), 0.5, 0.86)) {
    quickClickBlue(7);
  } else if (isBetween(upDownValueRight.toFixed(2), -0.49, 0) && isBetween(leftRightValueRight.toFixed(2), 0.87, 1)) {
    quickClickBlue(2);
  } else if (isBetween(upDownValueRight.toFixed(2), 0, 0.49) && isBetween(leftRightValueRight.toFixed(2), 0.87, 1)) {
    quickClickBlue(9);
  } else if (isBetween(upDownValueRight.toFixed(2), 0.5, 0.86) && isBetween(leftRightValueRight.toFixed(2), 0.5, 0.86)) {
    quickClickBlue(4);
  } else if (isBetween(upDownValueRight.toFixed(2), 0.87, 1) && isBetween(leftRightValueRight.toFixed(2), 0, 0.49)) {
    quickClickBlue(11);
  } else if (isBetween(upDownValueRight.toFixed(2), 0.87, 1) && isBetween(leftRightValueRight.toFixed(2), -0.49, 0)) {
    quickClickBlue(6);
  } else if (isBetween(upDownValueRight.toFixed(2), 0.5, 0.86) && isBetween(leftRightValueRight.toFixed(2), -0.86, -0.5)) {
    quickClickBlue(1);
  } else if (isBetween(upDownValueRight.toFixed(2), 0, 0.49) && isBetween(leftRightValueRight.toFixed(2), -1, -0.87)) {
    quickClickBlue(8);
  } else if (isBetween(upDownValueRight.toFixed(2), -0.49, 0) && isBetween(leftRightValueRight.toFixed(2), -1, -0.87)) {
    quickClickBlue(3);
  } else if (isBetween(upDownValueRight.toFixed(2), -0.86, -0.5) && isBetween(leftRightValueRight.toFixed(2), -0.86, -0.5)) {
    quickClickBlue(10);
  } else if (isBetween(upDownValueRight.toFixed(2), -1, -0.87) && isBetween(leftRightValueRight.toFixed(2), -0.49, 0)) {
    quickClickBlue(5);
  }
  for (let i = 0; i < gamepadButtons.length; i++) {
    gamepadButtons[i][0] = gamepadButtons[i][1];
  }
}

function gameLoop() {
  if (controllerIndex !== null) {
    controllerInputs();
  }
  request = requestAnimationFrame(gameLoop);
}

/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

function setup() {
  const audioContext = {
    aCtx: new (window.AudioContext)(),
    record: function record(e) {
      const btn = recButton;
    	let chunks = [];
    	// init a new MediaRecorder with our StreamNode's stream
    	const recorder = new MediaRecorder(audioContext.streamNode.stream);
    	// save every chunks
    	recorder.ondataavailable = e => chunks.push(e.data);
    	// once we're done recording
    	recorder.onstop = e => {
        recording.replaceChildren();
    		// export our recording
    		const blob = new Blob(chunks, {'type': 'audio/mpeg;'});
        chunks = [];
    		const url = URL.createObjectURL(blob);
    		// here in an <audio> element
    		const a = new Audio(url);
        a.controls = true;
    		recording.appendChild(a);
    		// reset default click handler
    		btn.onclick = audioContext.record;
        btn.textContent = 'Record';
        recordingDialog.showModal();
    	}
    	btn.onclick = function () {
    		recorder.stop();
    	};
    	// start recording
    	recorder.start();
      btn.textContent = 'Stop';
    }
  };
  audio = audioContext.aCtx;
  buffer = 'kick';
  gain = audio.createGain();
  audioContext.streamNode = audio.createMediaStreamDestination();
  gain.connect(audioContext.streamNode);
  document.getElementById('recording-button').onclick = audioContext.record;
  

  loadRNBO(); //Sets up RNBO patch connection ->

  //Audio will be active once body of HTML is clicked.
  document.body.onclick = () => {
      audio.resume();
  }
  onOffButton.addEventListener('click', function() {
    onOffSynth();
  });
  interfaceSelection.addEventListener('change', function() {
    interfaceSelectionSynth();
    if (interfaceSelectionState === 'keyboard') {
      if (request) {
        cancelAnimationFrame(request);
      }
      onOffDescription.innerHTML = 'Press spacebar or click on/off button to start/stop.';
      document.getElementById('wood-texture').style.backgroundImage = 'none';
      document.getElementById('buttons-view').style.display = 'block';
      document.getElementById('game-controller-view').style.display = 'none';
      voiceSet(null);
    }
    if (interfaceSelectionState === 'button-box') {
      if (request) {
        cancelAnimationFrame(request);
      }
      onOffDescription.innerHTML = 'Press spacebar or click on/off button to start/stop.';
      document.getElementById('wood-texture').style.backgroundImage = 'url(images/wood_texture.jpeg)';
      document.getElementById('buttons-view').style.display = 'block';
      document.getElementById('game-controller-view').style.display = 'none';
      voiceSet(null);
    }
    if (interfaceSelectionState === 'controller') {
      request = requestAnimationFrame(gameLoop);
      onOffDescription.innerHTML = 'Press "home" on controller or click on/off button to start/stop.';
      document.getElementById('wood-texture').style.backgroundImage = 'none';
      document.getElementById('buttons-view').style.display = 'none';
      document.getElementById('game-controller-view').style.display = 'block';
      voiceSet(synthValues.selectedVoice);
    }
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
  scaleType.addEventListener('change', function() {
    quickClickBlue();
  });
  document.addEventListener('keydown', function(event) {
    if (event.key === 32 || event.keyCode === 32) {
      onOffSynth();
    }
  });
}

async function loadRNBO() {
  const { createDevice } = RNBO;
  await audio.resume();

  const rawPatcher = await fetch('export/patch.export.json');
  const synthPatcher = await rawPatcher.json();

  synthDevice = await createDevice({ context: audio, patcher: synthPatcher });

  const fileResponse = await fetch('export/media/MMG_Kick-11.wav');
  const arrayBuf = await fileResponse.arrayBuffer();

  const audioBuf = await audio.decodeAudioData(arrayBuf);

  await synthDevice.setDataBuffer(buffer, audioBuf);
  //Connecting device to audio.
  synthDevice.node.connect(gain);
  gain.connect(audio.destination);

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
      startStopwatch();
      onOffButton.textContent = 'On';
  } else if (onOffState === 1) {
      onOffState = 0;
      onOffSignal.value = onOffState;
      startStopwatch();
      onOffButton.textContent = 'Off';
  }
}

function interfaceSelectionSynth() {
  interfaceSelectionState = interfaceSelection.value;
  console.log(interfaceSelectionState);
}

function muteSynth() {
  if (muteState === 1) {
    muteState = 0;
    mainVolumeSlider.removeEventListener('input', function() {
      adjustVolume(gain);
    });
    gain.gain.value = 0;
    muteButton.textContent = 'Unmute';
  } else if (muteState === 0) {
    muteState = 1;
    mainVolumeSlider.addEventListener('input', function() {
      adjustVolume(gain);
    });
    muteButton.textContent = 'Mute';
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
  noteIndexMax = synthDevice.parametersById.get('noteIndexMax');
  noteIndexMax.value = 12;
  lowStepSeqLength = synthDevice.parametersById.get('lowStepSeqLength');
  midStepSeqLength = synthDevice.parametersById.get('midStepSeqLength');
  highStepSeqLength = synthDevice.parametersById.get('highStepSeqLength');
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
const timeouts = {
  redTimeout: null, 
  yellowTimeout: null,
  greenTimeout: null,
  blueTimeout: null,
};
const keyAndMouseList = [
  [redButton, 'red', timeouts.redTimeout, tempoLine, clickAndHoldRed, 100, 49],
  [yellowButton, 'yellow', timeouts.yellowTimeout, rhythmLine, clickAndHoldYellow, 200, 50],
  [greenButton, 'green', timeouts.greenTimeout, timbreLine, clickAndHoldGreen, 50, 51],
  [blueButton, 'blue', timeouts.blueTimeout, voiceLine, clickAndHoldBlue, 500, 52]
]; //button HTML, color, timeout, line, func, interval, key

function addKeyAndMouse(list) {
  list.forEach((i) => {
    i[0].addEventListener('mousedown', function() {
      changeImage(i[1]);
      i[2] = setTimeout(() => {
        i[3] = setInterval(i[4], i[5]);
      }, 500);
    })
    i[0].addEventListener('mouseup', function(event) {
      clearTimeout(i[2]);
      clearInterval(i[3]);
      if (i[1] === 'red') {
        quickClickRed(event);
      } else if (i[1] === 'yellow') {
        quickClickYellow();
      } else if (i[1] === 'green') {
        quickClickGreen();
      } else if (i[1] === 'blue') {
        quickClickBlue();
      }
      changeImage(i[1]);
    })
  });

  //Button Key Commands
  document.addEventListener('keydown', function(event) {
    if (!event.repeat) {
      if (event.key === 49 || event.keyCode === 49) {
        changeImage('red');
        timeouts.redTimeout = setTimeout(() => {
          tempoLine = setInterval(clickAndHoldRed, 100);
        }, 500);
      } else if (event.key === 50 || event.keyCode === 50) {
        changeImage('yellow');
        timeouts.yellowTimeout = setTimeout(() => {
          rhythmLine = setInterval(clickAndHoldYellow, 200);
        }, 500);
      } else if (event.key === 51 || event.keyCode === 51) {
        changeImage('green');
        timeouts.greenTimeout = setTimeout(() => {
          timbreLine = setInterval(clickAndHoldGreen, 50);
        }, 500);
      } else if (event.key === 52 || event.keyCode === 52) {
        changeImage('blue');
        timeouts.blueTimeout = setInterval(() => {
          clickAndHoldBlue();
        }, 500);
      }
    }
  });
  document.addEventListener('keyup', function(event) {
    if (event.key === 49 || event.keyCode === 49) {
      clearTimeout(timeouts.redTimeout);
      quickClickRed(event);
      clearInterval(tempoLine);
      changeImage('red');
    } else if (event.key === 50 || event.keyCode === 50) {
      clearTimeout(timeouts.yellowTimeout);
      quickClickYellow();
      clearInterval(rhythmLine);
      changeImage('yellow');
    } else if (event.key === 51 || event.keyCode === 51) {
      clearTimeout(timeouts.greenTimeout);
      quickClickGreen();
      clearInterval(timbreLine);
      changeImage('green');
    } else if (event.key === 52 || event.keyCode === 52) {
      clearTimeout(timeouts.blueTimeout);
      quickClickBlue();
      changeImage('blue');
    }
  });

  function changeImage(color) {
    const buttonImage = document.getElementById(`${color}-button-image`);
    if (buttonImage.src.endsWith('off.png')) {
      buttonImage.src = `images/nab_button_${color}_on.png`;
    } else {
      buttonImage.src = `images/nab_button_${color}_off.png`;
    }
  }
}

addKeyAndMouse(keyAndMouseList);


/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

//Red Quick Click
let lastT;
let tDiff = 0;
function quickClickRed(event) {
  if (redHolding) {
    redHolding = false;
  } else {
    if (event) {
      if (lastT) {
        tDiff = event.timeStamp - lastT;
      }
      lastT = event.timeStamp;
    }
    synthValues.tempo = tempoChooser(tDiff);
    infoPanelUI.tempo.func(synthValues.tempo);
    if (synthValues.tempo === 50) {
      infoPanelUI.tempoDirection.func('up');
    } else if (synthValues.tempo === 140) {
      infoPanelUI.tempoDirection.func('down');
    }
    tempo.value = synthValues.tempo;
  }
  return synthValues.tempo;
}

//Red Click and Hold
function clickAndHoldRed(direction) {
  redHolding = true;
  if (direction) {
    synthValues.tempo = tempoPerciseControl(direction);
    infoPanelUI.tempoDirection.func(direction);
  } else {
    synthValues.tempo = tempoPerciseControl();
    if (synthValues.tempo === 50) {
      infoPanelUI.tempoDirection.func('up');
    } else if (synthValues.tempo === 140) {
      infoPanelUI.tempoDirection.func('down');
    }
  }
  infoPanelUI.tempo.func(synthValues.tempo);
  tempo.value = synthValues.tempo;
}

//Yellow Quick Click
function quickClickYellow() {
  if (yellowHolding) {
    yellowHolding = false;
  } else {
    let rhythmValues = rhythmChooserBtn();
    setSynthRhythms(rhythmValues[0], rhythmValues[1], rhythmValues[2], rhythmValues[3]);
  }
}
function setSynthRhythms(rhythmValues, low, mid, high) {
  infoPanelUI.lowRhythm.func(low);
  synthValues.rhythmLow = rhythmValues.lowList;
  synthValues.lowStepSeqLength = rhythmValues.lowStepSeqLength;
  infoPanelUI.midRhythm.func(mid);
  synthValues.rhythmMid = rhythmValues.midList;
  synthValues.midStepSeqLength = rhythmValues.midStepSeqLength;
  infoPanelUI.highRhythm.func(high);
  synthValues.rhythmHigh = rhythmValues.highList;
  synthValues.highStepSeqLength = rhythmValues.highStepSeqLength;

  straightRhythmListLow = new MessageEvent(TimeNow, 'in1', synthValues.rhythmLow[0]);
  synthDevice.scheduleEvent(straightRhythmListLow);
  swingRhythmListLow = new MessageEvent(TimeNow, 'in2', synthValues.rhythmLow[1]);
  synthDevice.scheduleEvent(swingRhythmListLow);
  lowStepSeqLength.value = synthValues.lowStepSeqLength;

  straightRhythmListMid = new MessageEvent(TimeNow, 'in3', synthValues.rhythmMid[0]);
  synthDevice.scheduleEvent(straightRhythmListMid);
  swingRhythmListMid = new MessageEvent(TimeNow, 'in4', synthValues.rhythmMid[1]);
  synthDevice.scheduleEvent(swingRhythmListMid);
  midStepSeqLength.value = synthValues.midStepSeqLength;

  straightRhythmListHigh = new MessageEvent(TimeNow, 'in5', synthValues.rhythmHigh[0]);
  synthDevice.scheduleEvent(straightRhythmListHigh);
  swingRhythmListHigh = new MessageEvent(TimeNow, 'in6', synthValues.rhythmHigh[1]);
  synthDevice.scheduleEvent(swingRhythmListHigh);
  highStepSeqLength.value = synthValues.highStepSeqLength;
}
function voiceSet(voice) {
  if (voice === 0) {
    infoPanelUI.lowRhythm.visual.style.backgroundColor = 'yellow';
    infoPanelUI.midRhythm.visual.style.backgroundColor = 'rgba(1, 1, 1, 0)';
    infoPanelUI.highRhythm.visual.style.backgroundColor = 'rgba(1, 1, 1, 0)';
  } else if (voice === 1) {
    infoPanelUI.lowRhythm.visual.style.backgroundColor = 'rgba(1, 1, 1, 0)';
    infoPanelUI.midRhythm.visual.style.backgroundColor = 'yellow';
    infoPanelUI.highRhythm.visual.style.backgroundColor = 'rgba(1, 1, 1, 0)';
  } else if (voice === 2) {
    infoPanelUI.lowRhythm.visual.style.backgroundColor = 'rgba(1, 1, 1, 0)';
    infoPanelUI.midRhythm.visual.style.backgroundColor = 'rgba(1, 1, 1, 0)';
    infoPanelUI.highRhythm.visual.style.backgroundColor = 'yellow';
  } else {
    infoPanelUI.lowRhythm.visual.style.backgroundColor = 'rgba(1, 1, 1, 0)';
    infoPanelUI.midRhythm.visual.style.backgroundColor = 'rgba(1, 1, 1, 0)';
    infoPanelUI.highRhythm.visual.style.backgroundColor = 'rgba(1, 1, 1, 0)';
  }
}

//Yellow Click and Hold
let turn = false;
function clickAndHoldYellow() {
  yellowHolding = true;
  synthValues.attackValue = rhythmPerciseControl()[0];
  synthValues.decayValue = rhythmPerciseControl()[1];
  turn = rhythmPerciseControl()[2];
  infoPanelUI.attack.func(synthValues.attackValue);
  infoPanelUI.decay.func(synthValues.decayValue);
  infoPanelUI.attackSpeed.func(synthValues.attackValue);
  infoPanelUI.decaySpeed.func(synthValues.decayValue);
  attackValue.value = synthValues.attackValue;
  decayValue.value = synthValues.decayValue;
}
function controllerAttack() {
  synthValues.attackValue = attackPerciseControl();
  infoPanelUI.attack.func(synthValues.attackValue);
  infoPanelUI.attackSpeed.func(synthValues.attackValue);
  attackValue.value = synthValues.attackValue;
}
function controllerDecay() {
  synthValues.decayValue = decayPerciseControl();
  infoPanelUI.decay.func(synthValues.decayValue);
  infoPanelUI.decaySpeed.func(synthValues.decayValue);
  decayValue.value = synthValues.decayValue;
}

//Green Quick Click
function quickClickGreen() {
  if (greenHolding) {
    greenHolding = false;
  } else {
    let delayValues = timbreChooser();
    synthValues.feedback = delayValues.feedbackAmount.toFixed(1);
    synthValues.wetDryMix = delayValues.wetDryMix;
    synthValues.vibratoRate = delayValues.vibratoRate;
    synthValues.vibratoDepth = delayValues.vibratoDepth;
    infoPanelUI.delay.funcF(delayValues.feedbackAmount);
    infoPanelUI.delay.funcWDM(delayValues.wetDryMix);
    infoPanelUI.vibrato.funcR(synthValues.vibratoRate);
    infoPanelUI.vibrato.funcD(synthValues.vibratoDepth);
    feedback.value = synthValues.feedback;
    wetDryMix.value = synthValues.wetDryMix;
    vibratoRate.value = synthValues.vibratoRate;
    vibratoDepth.value = synthValues.vibratoDepth;
  }
}
function controllerFeedback() {
  synthValues.feedback = feedbackPerciseControl().toFixed(1);
  infoPanelUI.delay.funcF(synthValues.feedback);
  feedback.value = synthValues.feedback;
}
function controllerWetDryMix() {
  synthValues.wetDryMix = wetDryMixPerciseControl();
  infoPanelUI.delay.funcWDM(synthValues.wetDryMix);
  wetDryMix.value = synthValues.wetDryMix;
}
function controllerVibratoRate() {
  synthValues.vibratoRate = vibratoRatePerciseControl();
  infoPanelUI.vibrato.funcR(synthValues.vibratoRate);
  vibratoRate.value = synthValues.vibratoRate;
}
function controllerVibratoDepth() {
  synthValues.vibratoDepth = vibratoDepthPerciseControl();
  infoPanelUI.vibrato.funcD(synthValues.vibratoDepth);
  vibratoDepth.value = synthValues.vibratoDepth;
}

//Green Click and Hold
function clickAndHoldGreen() {
  greenHolding = true;
  synthValues.cutoffValue = timbrePerciseControl()[0];
  synthValues.qValue = timbrePerciseControl()[1];
  infoPanelUI.cutoff.func(synthValues.cutoffValue);
  infoPanelUI.q.func(synthValues.qValue);
  cutoffValue.value = synthValues.cutoffValue;
  qValue.value = synthValues.qValue;
}
function controllerCutoff() {
  synthValues.cutoffValue = cuttoffPerciseControl(40);
  infoPanelUI.cutoff.func(synthValues.cutoffValue);
  cutoffValue.value = synthValues.cutoffValue;
}
function controllerQ() {
  synthValues.qValue = qPerciseControl(1);
  infoPanelUI.q.func(synthValues.qValue);
  qValue.value = synthValues.qValue;
}

//Blue Quick Click
function quickClickBlue(scale) {
  if (blueHolding) {
    blueHolding = false;
  } else {
    let harmonyValues
    if (scale != null) {
      harmonyValues = selectHarmonicLanguage(scale);
    } else {
      harmonyValues = selectHarmonicLanguage();
    }
    infoPanelUI.harmony.func(harmonyValues[2]);
    synthValues.harmonyListLow = harmonyValues[0][0];
    synthValues.harmonyListMid = harmonyValues[0][1];
    synthValues.harmonyListHigh = harmonyValues[0][2];
    noteIndexMax.value = harmonyValues[1];
    harmonyLow = new MessageEvent(TimeNow, 'in7', synthValues.harmonyListLow);
    synthDevice.scheduleEvent(harmonyLow);
    harmonyMid = new MessageEvent(TimeNow, 'in8', synthValues.harmonyListMid);
    synthDevice.scheduleEvent(harmonyMid);
    harmonyHigh = new MessageEvent(TimeNow, 'in9', synthValues.harmonyListHigh);
    synthDevice.scheduleEvent(harmonyHigh);
  }
}

//Blue Click and Hold
infoPanelUI.lowVoice.func(0);
infoPanelUI.midVoice.func(0);
infoPanelUI.highVoice.func(0);
function clickAndHoldBlue(down) {
  blueHolding = true;
  let voices;
  if (down === 'down') {
    voices = voiceChooser(down); //Tells voiceChooser() to decrease instead of increase.
  } else {
    voices = voiceChooser();
  }
  infoPanelUI.lowVoice.func(voices[1]);
  infoPanelUI.midVoice.func(voices[1]);
  infoPanelUI.highVoice.func(voices[1]);
  lowVoice.value = voices[0].lowVoice;
  midVoice.value = voices[0].middleVoice;
  highVoice.value = voices[0].highVoice;
}

/* ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */