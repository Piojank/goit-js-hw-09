
const qs = s => document.querySelector(s);
const startBtn = qs('button[data-start]');
const stopBtn = qs('button[data-stop]');
const body = qs('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

const startColor = () => {
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);  
    console.log(`Random body background color interval with id ${timerId} has started!`);
    startBtn.disabled = true;
    stopBtn.disabled = false;
};

const stopColor = () => {
    clearInterval(timerId);
    console.log(`Random body background color interval with id ${timerId} has stopped!`);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener("click", startColor);
stopBtn.addEventListener("click", stopColor);