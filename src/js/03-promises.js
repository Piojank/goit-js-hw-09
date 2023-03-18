import Notiflix from 'notiflix';

const qs = s => document.querySelector(s);
const form = qs(".form")

const handleSubmit = event => {
  event.preventDefault();
  const { 
    elements: { delay, step, amount } 
} = event.currentTarget;

  let delayValue = delay.valueAsNumber;
  let stepValue = step.valueAsNumber;
  let amountValue = amount.valueAsNumber;

  const createPromise = (position, delayValue) => {
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

  for (let i = 1; i <= amountValue; i += 1) {
    let position = i;

    createPromise(position, delayValue)
      .then(value => {console.log(value);
      })
      .catch(error => {console.log(error);
      });
      
    delayValue = delayValue + stepValue;
    position++;
  }
};

form.addEventListener("submit", handleSubmit);
