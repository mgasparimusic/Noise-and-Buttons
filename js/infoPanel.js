//infoPanel.js
//Michael Gaspari
//Noise and Buttons

export const infoPanelUI = {
  tempo: { //Tempo Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('red-press-info'),
    func: function(t) {
      infoPanelUI.tempo.visual.innerHTML = `${t} bpm`;
    }
  },
  tempoDirection: { //Tempo Direction Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('red-press-hold-info'),
    func: function(direction) {
      if (!direction || direction != 'up' && direction != 'down') {
        throw new Error('Direction was not specified or is invalid.  Must be either up or down.');
      }
      if (direction === 'up') {
        infoPanelUI.tempoDirection.visual.innerHTML = `<img src="images/nab_tempo_direction_up.png" id="tempo-direction">`;
      }
      if (direction === 'down') {
        infoPanelUI.tempoDirection.visual.innerHTML = `<img src="images/nab_tempo_direction_down.png" id="tempo-direction">`;
      }
    }
  },
  //Rhythm Images List –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
  rhythmImages: ['nab_rhythm_whole_note.png', 'nab_rhythm_dot_half_note.png', 'nab_rhythm_half_note.png', 'nab_rhythm_half_note_triplet.png', 'nab_rhythm_dot_quarter_note.png', 'nab_rhythm_quarter_note.png', 'nab_rhythm_quarter_note_triplet.png', 'nab_rhythm_dot_eight_note.png', 'nab_rhythm_eight_note.png', 'nab_rhythm_eight_note_triplet.png', 'nab_rhythm_sixteenth_note.png'],
  lowRhythm: { //Low Rhyth Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('js-rhythm-value-low'),
    func: function(l) {
      infoPanelUI.lowRhythm.visual.innerHTML = `<img class="rhythm-value" src="images/${infoPanelUI.rhythmImages[l]}"></img>`;
    }
  },
  midRhythm: { //Mid Rhyth Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('js-rhythm-value-mid'),
    func: function(m) {
      infoPanelUI.midRhythm.visual.innerHTML = `<img class="rhythm-value" src="images/${infoPanelUI.rhythmImages[m]}"></img>`;
    }
  },
  highRhythm: { //High Rhyth Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('js-rhythm-value-high'),
    func: function(h) {
      infoPanelUI.highRhythm.visual.innerHTML = `<img class="rhythm-value" src="images/${infoPanelUI.rhythmImages[h]}"></img>`;
    }
  },
  attack: { //Attack Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('js-attack-time'),
    func: function(a) {
      infoPanelUI.attack.visual.value = a;
    }
  },
  decay: { //Decay Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('js-decay-time'),
    func: function(d) {
      infoPanelUI.decay.visual.value = d;
    }
  },
  attackSpeed: { //Attack Speed Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('js-attack-speed'),
    func: function(as) {
      if (as >= 50) {
        infoPanelUI.attackSpeed.visual.textContent = 'Slow';
      } else {
        infoPanelUI.attackSpeed.visual.textContent = 'Fast';
      }
    }
  },
  decaySpeed: { //Decay Speed Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('js-decay-speed'),
    func: function(ds) {
      if (ds >= 50) {
        infoPanelUI.decaySpeed.visual.textContent = 'Slow';
      } else {
        infoPanelUI.decaySpeed.visual.textContent = 'Fast';
      }
    }
  },
  delay: { //Delay Visual –––––––––––––––––––––––––––––––––––––––––––––––––––-–––––––––*|
    visual: document.getElementById('js-delay'),
    funcF: function(f) {
      infoPanelUI.delay.visual.value = f;
    },
    funcWDM: function(wdm) {
      infoPanelUI.delay.visual.style.setProperty(`--box-shadow`, `-400px 0 0 390px rgba(0, 255, 0, ${wdm / 70})`);
    }
  },
  vibrato: {
    visual: document.getElementById('js-vibrato'),
    funcR: function(r) {
      infoPanelUI.vibrato.visual.value = r;
    },
    funcD: function(d) {
      infoPanelUI.vibrato.visual.style.setProperty(`--box-shadow`, `-400px 0 0 390px rgba(0, 255, 0, ${d / 75})`);
    }
  },
  cutoff: {
    visual: document.getElementById("js-cutoff-value"),
    func: function(cv) {
      infoPanelUI.cutoff.visual.value = cv; 
    }
  },
  q: {
    visual: document.getElementById("js-q-value"),
    func: function(qv) {
      infoPanelUI.q.visual.value = qv;
    }
  },
  harmony: {
    visual: document.getElementById('js-random-scale'),
    func: function(h) {
      infoPanelUI.harmony.visual.innerHTML = `${h}`;
    }
  },
  voiceList: [
    ['rgb(0, 134, 251)', 'rgb(0, 134, 251)', 'black', 'black', 'rgb(0, 134, 251)', 'rgb(0, 134, 251)', 'black'],
    ['rgb(0, 134, 251)', 'black', 'rgb(0, 134, 251)', 'black', 'rgb(0, 134, 251)', 'black', 'rgb(0, 134, 251)'],
    ['rgb(0, 134, 251)', 'black', 'black', 'rgb(0, 134, 251)', 'black', 'rgb(0, 134, 251)', 'rgb(0, 134, 251)']
  ],
  lowVoice: {
    visual: document.getElementById('low-voice'),
    func: function(lv) {
      infoPanelUI.lowVoice.visual.style.setProperty('--low-bg-color', infoPanelUI.voiceList[0][lv]);
    }
  },
  midVoice: {
    visual: document.getElementById('mid-voice'),
    func: function(mv) {
      infoPanelUI.midVoice.visual.style.setProperty('--mid-bg-color', infoPanelUI.voiceList[1][mv]);
    }
  },
  highVoice: {
    visual: document.getElementById('high-voice'),
    func: function(hv) {
      infoPanelUI.highVoice.visual.style.setProperty('--high-bg-color', infoPanelUI.voiceList[2][hv]);
    }
  },
};