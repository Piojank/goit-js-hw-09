import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const qs = s => document.querySelector(s);

const btnStart = qs('button[data-start]');
const btnStop = qs('button[data-stop]');
const btnClear = qs('button[data-clear]')
const days = qs('span[data-days]');
const hours = qs('span[data-hours]');
const minutes = qs('span[data-minutes]');
const seconds = qs('span[data-seconds]');

btnStart.disabled = true;
btnStop.disabled = true;
btnClear.disabled = true;
let selectedDate = null;
let currentDate = null;
let remainingTime = null;
let currentValue = '';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let date = new Date();

        if (selectedDates[0].getTime() <= date.getTime()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        } else {
        Notiflix.Notify.success('Correct date choosen, press start to begin countdown');
        btnStart.disabled = false;
        btnStop.disabled = true;
        selectedDate = selectedDates[0];
        currentDate = date;
        }
    },
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
    return (currentValue = value.toString().padStart(2, 0));
};

function startCounter() {
    let time = selectedDate.getTime() - currentDate.getTime();
    remainingTime = setInterval(() => {
        time -= 1000;
        if (time <= 200) {
        clearInterval(remainingTime);
        Notiflix.Report.failure('Out of time!', '"You are dead!"');
        } else {
        let remaining = convertMs(time);
        days.innerHTML = addLeadingZero(remaining.days);
        hours.innerHTML = addLeadingZero(remaining.hours);
        minutes.innerHTML = addLeadingZero(remaining.minutes);
        seconds.innerHTML = addLeadingZero(remaining.seconds);
        btnStart.disabled = true;
        btnStop.disabled = false;
        btnClear.disabled = true;
        }
    }, 1000);
}

const stopCounter = () => {
    clearInterval(remainingTime);
    btnStart.disabled = false;
    btnStop.disabled = true;
    btnClear.disabled = false;
};

const clearCounter = () => {
    btnStart.disabled = true;
    btnStop.disabled = true;
    btnClear.disabled = true;
    selectedDate = null;
    currentDate = null;
    remainingTime = null;
    currentValue = '';
    days.innerHTML = "00";
    hours.innerHTML = "00";
    minutes.innerHTML = "00";
    seconds.innerHTML = "00";
    currentDate = new Date();
    flatpickr("#datetime-picker", {...options, defaultDate: currentDate});
}

flatpickr("#datetime-picker", options);

btnStart.addEventListener("click", startCounter);
btnStop.addEventListener("click", stopCounter);
btnClear.addEventListener("click", clearCounter);