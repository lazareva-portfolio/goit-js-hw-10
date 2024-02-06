
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const buttonStart = document.querySelector('[data-start=""]');
const inputDate = document.querySelector('#datetime-picker');
let userSelectedDate;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if(Date.now() < userSelectedDate.getTime()) {
        buttonStart.disabled = false;
      } else {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
        buttonStart.disabled = true;
      }
    },
  };
  
  flatpickr('#datetime-picker', options);

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

  let countdownInterval;


buttonStart.addEventListener('click', () => {
    buttonStart.disabled = true;
    inputDate.disabled = true;
  const calculatedMs = userSelectedDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(calculatedMs);

  updateTimer(days, hours, minutes, seconds);

  countdownInterval = setInterval(() => {
    const remainingMs = userSelectedDate - Date.now();
    if (remainingMs > 0) {
      const { days, hours, minutes, seconds } = convertMs(remainingMs);
      updateTimer(days, hours, minutes, seconds);
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
});

function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = formatTimeUnit(days);
  document.querySelector('[data-hours]').textContent = formatTimeUnit(hours);
  document.querySelector('[data-minutes]').textContent = formatTimeUnit(minutes);
  document.querySelector('[data-seconds]').textContent = formatTimeUnit(seconds);
}

function formatTimeUnit(unit) {
  return unit < 10 ? `0${unit}` : `${unit}`;
}
