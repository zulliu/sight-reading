// Define audio objects at the top level to ensure they are created only once.
const sounds = {
  correct: new Audio('/sounds/correct.mp3'),
  wrong: new Audio('/sounds/wrong.mp3'),
  win: new Audio('/sounds/win.mp3'),
  start: new Audio('/sounds/countdown.mp3'),
};

// Play functions just need to reference these objects and play them.
function playCorrectSound() {
  sounds.correct.play();
}

function playWrongSound() {
  sounds.wrong.play();
}

function playWinSound() {
  sounds.win.play();
}

function playStartSound() {
  sounds.start.play();
}

export { playCorrectSound, playWrongSound, playWinSound, playStartSound };
