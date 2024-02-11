function playCorrectSound() {
  setSoundObject('/sounds/correct.mp3');
}

function playWrongSound() {
  setSoundObject('/sounds/wrong.mp3');
}

function playWinSound() {
  setSoundObject('/sounds/win.mp3');
}

function playStartSound() {
  setSoundObject('/sounds/countdown.mp3');
}
function setSoundObject(soundPath) {
  const sound = new Audio(soundPath);
  sound.play();
}
export { playCorrectSound, playWrongSound, playWinSound, playStartSound };
