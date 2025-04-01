//midiMessages.js
//Michael Gaspari
//Noise and Buttons

//Diatonic_______________________________________________
const cMajorAMinor = {
  scale: [[41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60], [62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81], [83, 84, 86, 88, 89, 91, 93, 95, 96, 98, 100, 101]],
  scaleValue: 'C Major/A Minor'
};
const dbMajorBbMinor = {
  scale: [[41, 42, 44, 46, 48, 49, 51, 53, 54, 56, 58, 60], [61, 63, 65, 66, 68, 70, 72, 73, 75, 77, 78, 80], [82, 84, 85, 87, 89, 90, 92, 94, 96, 97, 99, 101]],
  scaleValue: 'Db Major/Bb Minor'
};
const dMajorBMinor = {
  scale: [[40, 42, 43, 45, 47, 49, 50, 52, 54, 55, 57, 59], [61, 62, 64, 66, 67, 69, 71, 73, 74, 76, 78, 79], [81, 83, 85, 86, 88, 90, 91, 93, 95, 97, 98, 100]],
  scaleValue: 'D Major/B Minor'
};
const ebMajorCMinor = {
  scale: [[41, 43, 44, 46, 48, 50, 51, 53, 55, 56, 58, 60], [62, 63, 65, 67, 68, 70, 72, 74, 75, 77, 79, 80], [82, 84, 86, 87, 89, 91, 92, 94, 96, 98, 99, 101]],
  scaleValue: 'Eb Major/C Minor'
};
const eMajorCsMinor = {
  scale: [[40, 42, 44, 45, 47, 49, 51, 52, 54, 56, 57, 59], [61, 63, 64, 66, 68, 69, 71, 73, 75, 76, 78, 80], [81, 83, 85, 87, 88, 90, 92, 93, 95, 97, 99, 100]],
  scaleValue: 'E Major/C# Minor'
};
const fMajorDMinor = {
  scale: [[41, 43, 45, 46, 48, 50, 52, 53, 55, 57, 58, 60], [62, 64, 65, 67, 69, 70, 72, 74, 76, 77, 79, 81], [82, 84, 86, 88, 89, 91, 93, 94, 96, 98, 100, 101]],
  scaleValue: 'F Major/D Minor'
};
const gbMajorEbMinor = {
  scale: [[41, 42, 44, 46, 47, 49, 51, 53, 54, 56, 58, 59], [61, 63, 65, 66, 68, 70, 71, 73, 75, 77, 78, 80], [82, 83, 85, 87, 89, 90, 92, 94, 95, 97, 99, 101]],
  scaleValue: 'Gb Major/Eb Minor'
};
const gMajorEMinor = {
  scale: [[40, 42, 43, 45, 47, 48, 50, 52, 54, 55, 57, 59], [60, 62, 64, 66, 67, 69, 71, 72, 74, 76, 78, 79], [81, 83, 84, 86, 88, 90, 91, 93, 95, 96, 98, 100]],
  scaleValue: 'G Major/E Minor'
};
const abMajorFMinor = {
  scale: [[41, 43, 44, 46, 48, 49, 51, 53, 55, 56, 58, 60], [61, 63, 65, 67, 68, 70, 72, 73, 75, 77, 79, 80], [82, 84, 85, 87, 89, 91, 92, 94, 96, 97, 99, 101]],
  scaleValue: 'Ab Major/F Minor'
};
const aMajorFsMinor = {
  scale: [[40, 42, 44, 45, 47, 49, 50, 52, 54, 56, 57, 59], [61, 62, 64, 66, 68, 69, 71, 73, 74, 76, 78, 80], [81, 83, 85, 86, 88, 90, 92, 93, 95, 97, 98, 100]],
  scaleValue: 'A Major/F# Minor'
};
const bbMajorGMinor = {
  scale: [[41, 43, 45, 46, 48, 50, 51, 53, 55, 57, 58, 60], [62, 63, 65, 67, 69, 70, 72, 74, 75, 77, 79, 81], [82, 84, 86, 87, 89, 91, 93, 94, 96, 98, 99, 101]],
  scaleValue: 'Bb Major/G Minor'
};
const bMajorGsMinor = {
  scale: [[40, 42, 44, 46, 47, 49, 51, 52, 54, 56, 58, 59], [61, 63, 64, 66, 68, 70, 71, 73, 75, 76, 78, 80], [82, 83, 85, 87, 88, 90, 92, 94, 95, 97, 99, 100]],
  scaleValue: 'B Major/G# Minor'
};

//Pentatonic_______________________________________________
const cPentatonic = {
  scale: [[48, 50, 52, 55, 57, 60], [62, 64, 67, 69, 72, 74], [76, 79, 81, 84, 86, 88]],
  scaleValue: 'C Pentatonic'
};
const dbPentatonic = {
  scale: [[49, 51, 53, 56, 58, 61], [63, 65, 68, 70, 73, 75], [77, 80, 82, 85, 87, 89]],
  scaleValue: 'Db Pentatonic'
};
const dPentatonic = {
  scale: [[50, 52, 54, 57, 59, 62], [64, 66, 69, 71, 74, 76], [78, 81, 83, 86, 88, 90]],
  scaleValue: 'D Pentatonic'
};
const ebPentatonic = {
  scale: [[48, 51, 53, 55, 58, 60], [63, 65, 67, 70, 72, 75], [77, 79, 82, 84, 87, 89]],
  scaleValue: 'Eb Pentatonic'
};
const ePentatonic = {
  scale: [[49, 52, 54, 56, 59, 61], [64, 66, 68, 71, 73, 76], [78, 80, 83, 85, 88, 90]],
  scaleValue: 'E Pentatonic'
};
const fPentatonic = {
  scale: [[50, 53, 55, 57, 60, 62], [65, 67, 69, 72, 74, 77], [79, 81, 84, 86, 89, 91]],
  scaleValue: 'F Pentatonic'
};
const gbPentatonic = {
  scale: [[46, 49, 51, 54, 56, 58], [61, 63, 66, 68, 70, 73], [75, 78, 80, 82, 85, 87]],
  scaleValue: 'Gb Pentatonic'
};
const gPentatonic = {
  scale: [[47, 50, 52, 55, 57, 59], [62, 64, 67, 69, 71, 74], [76, 79, 81, 83, 86, 88]],
  scaleValue: 'G Pentatonic'
};
const abPentatonic = {
  scale: [[48, 51, 53, 56, 58, 60], [63, 65, 68, 70, 72, 75], [77, 80, 82, 84, 87, 89]],
  scaleValue: 'Ab Pentatonic'
};
const aPentatonic = {
  scale: [[47, 49, 52, 54, 57, 59], [61, 64, 66, 69, 71, 73], [76, 78, 81, 83, 85, 88]],
  scaleValue: 'A Pentatonic'
};
const bbPentatonic = {
  scale: [[48, 50, 53, 55, 58, 60], [62, 65, 67, 70, 72, 74], [77, 79, 82, 84, 86, 89]],
  scaleValue: 'Bb Pentatonic'
};
const bPentatonic = {
  scale: [[49, 51, 54, 56, 59, 61], [63, 66, 68, 71, 73, 75], [78, 80, 83, 85, 87, 90]],
  scaleValue: 'B Pentatonic'
};

//Lydian-Mixolydian_______________________________________________
const cLM = {
  scale: [[42, 43, 45, 46, 48, 50, 52, 54, 55, 57, 58, 60], [62, 64, 66, 67, 69, 70, 72, 74, 76, 78, 79, 81], [82, 84, 86, 88, 90, 91, 93, 94, 96, 98, 100, 102]],
  scaleValue: 'C Lydian/Mixolydian'
};
const dbLM = {
  scale: [[41, 43, 44, 46, 47, 49, 51, 53, 55, 56, 58, 59], [61, 63, 65, 67, 68, 70, 71, 73, 75, 77, 79, 80], [82, 83, 85, 87, 89, 91, 92, 94, 95, 97, 99, 101]],
  scaleValue: 'Db Lydian/Mixolydian'
};
const dLM = {
  scale: [[40, 42, 44, 45, 47, 48, 50, 52, 54, 56, 57, 59], [60, 62, 64, 66, 68, 69, 71, 72, 74, 76, 78, 80], [81, 83, 84, 86, 88, 90, 92, 93, 95, 96, 98, 100]],
  scaleValue: 'D Lydian/Mixolydian'
};
const ebLM = {
  scale: [[41, 43, 45, 46, 48, 49, 51, 53, 55, 57, 58, 60], [61, 63, 65, 67, 69, 70, 72, 73, 75, 77, 79, 81], [82, 84, 85, 87, 89, 91, 93, 94, 96, 97, 99, 101]],
  scaleValue: 'Eb Lydian/Mixolydian'
};
const eLM = {
  scale: [[40, 42, 44, 46, 47, 49, 50, 52, 54, 56, 58, 59], [61, 62, 64, 66, 68, 70, 71, 73, 74, 76, 78, 80], [82, 83, 85, 86, 88, 90, 92, 94, 95, 97, 98, 100]],
  scaleValue: 'E Lydian/Mixolydian'
};
const fLM = {
  scale: [[41, 43, 45, 47, 48, 50, 51, 53, 55, 57, 59, 60], [62, 63, 65, 67, 69, 71, 72, 74, 75, 77, 79, 81], [83, 84, 86, 87, 89, 91, 93, 95, 96, 98, 99, 101]],
  scaleValue: 'F Lydian/Mixolydian'
};
const gbLM = {
  scale: [[40, 42, 44, 46, 48, 49, 51, 52, 54, 56, 58, 60], [61, 63, 64, 66, 68, 70, 72, 73, 75, 76, 78, 80], [82, 84, 85, 87, 88, 90, 92, 94, 96, 97, 99, 100]],
  scaleValue: 'Gb Lydian/Mixolydian'
};
const gLM = {
  scale: [[40, 41, 43, 45, 47, 49, 50, 52, 53, 55, 57, 59], [61, 62, 64, 65, 67, 69, 71, 73, 74, 76, 77, 79], [81, 83, 85, 86, 88, 89, 91, 93, 95, 97, 98, 100]],
  scaleValue: 'G Lydian/Mixolydian'
};
const abLM = {
  scale: [[41, 42, 44, 46, 48, 50, 51, 53, 54, 56, 58, 60], [62, 63, 65, 66, 68, 70, 72, 74, 75, 77, 78, 80], [82, 84, 86, 87, 89, 90, 92, 94, 96, 98, 99, 101]],
  scaleValue: 'Ab Lydian/Mixolydian'
};
const aLM = {
  scale: [[40, 42, 43, 45, 47, 49, 51, 52, 54, 55, 57, 59], [61, 63, 64, 66, 67, 69, 71, 73, 75, 76, 78, 79], [81, 83, 85, 87, 88, 90, 91, 93, 95, 97, 99, 100]],
  scaleValue: 'A Lydian/Mixolydian'
};
const bbLM = {
  scale: [[41, 43, 44, 46, 48, 50, 52, 53, 55, 56, 58, 60], [62, 64, 65, 67, 68, 70, 72, 74, 76, 77, 79, 80], [82, 84, 86, 88, 89, 91, 92, 94, 96, 98, 100, 101]],
  scaleValue: 'Bb Lydian/Mixolydian'
};
const bLM = {
  scale: [[41, 42, 44, 45, 47, 49, 51, 53, 54, 56, 57, 59], [61, 63, 65, 66, 68, 69, 71, 73, 75, 77, 78, 80], [81, 83, 85, 87, 89, 90, 92, 93, 95, 97, 99, 101]],
  scaleValue: 'B Lydian/Mixolydian'
};

//Blues_______________________________________________
const cBlues = {
  scale: [[36, 43, 46, 48, 55, 58], [60, 63, 65, 66, 67, 70], [72, 75, 77, 78, 79, 82]],
  scaleValue: 'C Blues'
};
const dbBlues = {
  scale: [[37, 44, 47, 49, 56, 59], [61, 64, 66, 67, 68, 71], [73, 76, 78, 79, 80, 83]],
  scaleValue: 'Db Blues'
};
const dBlues = {
  scale: [[38, 45, 48, 50, 57, 60], [62, 65, 67, 68, 69, 72], [74, 77, 79, 80, 81, 84]],
  scaleValue: 'D Blues'
};
const ebBlues = {
  scale: [[39, 46, 49, 51, 58, 61], [63, 66, 68, 69, 70, 73], [75, 78, 80, 81, 82, 85]],
  scaleValue: 'Eb Blues'
};
const eBlues = {
  scale: [[40, 47, 50, 52, 59, 62], [64, 67, 69, 70, 71, 74], [76, 79, 81, 82, 83, 86]],
  scaleValue: 'E Blues'
};
const fBlues = {
  scale: [[41, 48, 51, 53, 60, 63], [65, 68, 70, 71, 72, 75], [77, 80, 82, 83, 84, 87]],
  scaleValue: 'F Blues'
};
const gbBlues = {
  scale: [[42, 49, 52, 54, 61, 64], [66, 69, 71, 72, 73, 76], [78, 81, 83, 84, 85, 88]],
  scaleValue: 'Gb Blues'
};
const gBlues = {
  scale: [[43, 50, 53, 55, 62, 65], [67, 70, 72, 73, 74, 77], [79, 82, 84, 85, 86, 89]],
  scaleValue: 'G Blues'
};
const abBlues = {
  scale: [[44, 51, 54, 56, 63, 66], [68, 71, 73, 74, 75, 78], [80, 83, 85, 86, 87, 90]],
  scaleValue: 'Ab Blues'
};
const aBlues = {
  scale: [[33, 40, 43, 45, 52, 55], [57, 60, 62, 63, 64, 67], [69, 72, 74, 75, 76, 79]],
  scaleValue: 'A Blues'
};
const bbBlues = {
  scale: [[34, 41, 44, 46, 53, 56], [58, 61, 63, 64, 65, 68], [70, 73, 75, 76, 77, 80]],
  scaleValue: 'Bb Blues'
};
const bBlues = {
  scale: [[35, 42, 45, 47, 54, 57], [59, 62, 64, 65, 66, 69], [71, 74, 76, 77, 78, 81]],
  scaleValue: 'B Blues'
};

//All scales exported
export const allScales = [
  [[cMajorAMinor, dbMajorBbMinor, dMajorBMinor, ebMajorCMinor, eMajorCsMinor, fMajorDMinor, gbMajorEbMinor, gMajorEMinor, abMajorFMinor, aMajorFsMinor, bbMajorGMinor, bMajorGsMinor], 12],

  [[cPentatonic, dbPentatonic, dPentatonic, ebPentatonic, ePentatonic, fPentatonic, gbPentatonic, gPentatonic, abPentatonic, aPentatonic, bbPentatonic, bPentatonic], 6], 

  [[cLM, dbLM, dLM, ebLM, eLM, fLM, gbLM, gLM, abLM, aLM, bbLM, bLM], 12],

  [[cBlues, dbBlues, dBlues, ebBlues, eBlues, fBlues, gbBlues, gBlues, abBlues, aBlues, bbBlues, bBlues], 6]
];