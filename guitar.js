const selectElement = document.querySelector('#durationRange');
var waitDuration = selectElement.value * 1000;
var alive = false;
var runTimeout = null;
var beep = new Audio('beep.wav');

// Listener to update the text for the duration range slider
selectElement.addEventListener('input', (event) => {
  const result = document.querySelector('#durationText');
  result.textContent = event.target.value;
});

// Listener to change the note loop timing when user changes the duration range slider
selectElement.addEventListener('change', (event) => {
  waitDuration = event.target.value * 1000;
});

function randomNote(includeAccidentals) {
  const wholeNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const flat = '\u266D';
  const sharp = '\u266F';
  var returnNote = wholeNotes[Math.floor(Math.random() * wholeNotes.length)];
  if(includeAccidentals) {
    if(Math.random() >= 0.5) { // 50% chance that we will return a note with sharp or flat (as opposed to one without)
      var accidental = (Math.random() >= 0.5) ? flat : sharp // 50%/50% chance for sharp or flat
      returnNote += accidental
    }
  }
  return returnNote;
}

// Handle CSS and UI changes for Start / Stop button
function changeButton() {
  const result = document.querySelector('#startstop');
  const state = result.textContent;
  if(state == 'Start') {
    result.textContent = 'Stop';
    result.setAttribute('class', 'stopbutton');
  }
  else {
    result.textContent = 'Start';
    result.setAttribute('class', 'startbutton');
  }
}

function changeState() {
  if(!alive) {
    alive = true;
    run();
  }
  else {
    alive = false;
    clearTimeout(runTimeout);
  }
  changeButton();
}

function run() {
  if(alive) {

    const beepCheck = document.querySelector('#beepCheckbox');
    if(beepCheck.checked) {
      beep.play();
    }

    const noteBox = document.querySelector('#note');
    const accidentalsCheck = document.querySelector('#accidentalsCheckbox');
    noteBox.textContent = randomNote(accidentalsCheck.checked);

    runTimeout = setTimeout(run, waitDuration);
  }
}
