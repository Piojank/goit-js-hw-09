import Notiflix from 'notiflix';

const query = selector => document.querySelector(selector);

const delay = query('input[name="delay"]');
const step = query('input[name="step"]');
const amount = query('input[name="amount"]');
const btnSubmit = query('button[type="submit"]');

const runFunction = e => {
  e.preventDefault();

  let delayValue = delay.valueAsNumber;
  let stepValue = step.valueAsNumber;
  let amountValue = amount.valueAsNumber;

  function createPromise(position, delayValue) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`));
        } else {
          reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`));
        }
      }, delayValue);
    });
  }

  for (let i = 1; i <= amountValue; i++) {
    let position = i;

    createPromise(position, delayValue)
      .then(value => {
        console.log(`✅ Fulfilled promise ${position - 1} in ${delayValue}ms`);
      })
      .catch(err => {
        console.log(`❌ Rejected promise ${position - 1} in ${delayValue}ms`);
      });
    delayValue = delayValue + stepValue;
    position++;
  }
};

btnSubmit.addEventListener('click', runFunction);
