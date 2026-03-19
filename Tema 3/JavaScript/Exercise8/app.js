let screen = document.querySelector('.screen');

function press(value) {
  screen.value += value;
}

function calculate() {
  if (screen.value === '') {
    screen.value = 'Please enter a value';
  } else {
    let answer = eval(screen.value);
    screen.value = answer;
  }
}

function clearScreen() {
  screen.value = '';
}
