const query = selector => document.querySelector(selector);

const btnStart = query('button[data-start]');
const btnStop = query('button[data-stop]');
const body = query('body');

let colorTimer = null;

const switchColor = () => {
  colorTimer = setInterval(() => {
    const randomColor = getRandomHexColor();

    body.style.backgroundColor = randomColor;
    btnStart.disabled = true;
    btnStop.disabled = false;
  }, 1000);
};

const stopSwitch = () => {
  clearInterval(colorTimer);
  btnStart.disabled = false;
  btnStop.disabled = true;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', switchColor);
btnStop.addEventListener('click', stopSwitch);
