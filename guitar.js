const selectElement = document.querySelector('#durationRange');
var waitDuration = selectElement.value * 1000;
var alive = false;
var runTimeout = null;

// Listener to update the text for the duration range slider
selectElement.addEventListener('input', (event) => {
  const result = document.querySelector('#durationtext');
  result.textContent = event.target.value;
});

// Listener to change the note loop timing when user changes the duration range slider
selectElement.addEventListener('change', (event) => {
  waitDuration = event.target.value * 1000;
});

function randomNote() {
  const wholeNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  return wholeNotes[Math.floor(Math.random() * wholeNotes.length)];
}

function updateNoteText() {
  const result = document.querySelector('#note');
  result.textContent = randomNote();
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
    updateNoteText();
    runTimeout = setTimeout(run, waitDuration);
  }
}
