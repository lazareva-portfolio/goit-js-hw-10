import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formPromisesGenerator = document.querySelector('.form');

formPromisesGenerator.addEventListener('submit', async (event) => {
  event.preventDefault();

  const delay = parseInt(document.querySelector('[name="delay"]').value, 10);
  const state = document.querySelector('[name="state"]:checked').value;

  const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(new Error(`Rejected promise in ${delay}ms`));
      }
    }, delay);
  });


  try {
    const result = await notificationPromise;
    iziToast.success({
      title: 'Fulfilled',
      message: result,
      position: 'topRight',
    });
  } catch (error) {
    iziToast.error({
      title: 'Rejected',
      message: error.message,
      position: 'topRight',
    });
  }
});