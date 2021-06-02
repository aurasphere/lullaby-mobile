export const Colors = {
  primary: '#4a148c',
  primaryDark: '#12005e',
  primaryLight: '#7c43bd'
};

export const Notes = {
  notes: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
  notesEnglish: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  alteredNotes: ['Do♯', 'Re♯', 'Fa♯', 'Sol♯', 'La♯'],
  alteredNotesEnglish: ['C♯', 'D♯', 'F♯', 'G♯', 'A♯'],
  unifiedNotes: [
    'Do',
    'Do♯',
    'Re',
    'Re♯',
    'Mi',
    'Fa',
    'Fa♯',
    'Sol',
    'Sol♯',
    'La',
    'La♯',
    'Si'
  ],
  unifiedNotesEngllish: [
    'C',
    'C♯',
    'D',
    'D♯',
    'E',
    'F',
    'F♯',
    'G',
    'G♯',
    'A',
    'A♯',
    'B'
  ],
  rests: ['𝄾', '𝄽', '𝄼', '𝄻'],
  durations: ['♪', '♩', '𝅗𝅥', '𝅝'],
  minOctave: 0,
  maxOctave: 8
};

export const Frequencies = new Map();
Frequencies.set(
  'C',
  [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01]
);
Frequencies.set(
  'C♯',
  [17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92]
);
Frequencies.set(
  'D',
  [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64]
);
Frequencies.set(
  'D♯',
  [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03]
);
Frequencies.set(
  'E',
  [20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02]
);
Frequencies.set(
  'F',
  [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83]
);
Frequencies.set(
  'F♯',
  [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96]
);
Frequencies.set(
  'G',
  [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96]
);
Frequencies.set(
  'G♯',
  [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44]
);
Frequencies.set('A', [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0]);
Frequencies.set(
  'A♯',
  [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31]
);
Frequencies.set(
  'B',
  [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07]
);
