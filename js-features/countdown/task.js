'use strict';

const timerElement = document.getElementById('timer');

// if (timerElement) {
//   let seconds = parseInt(timerElement.textContent, 10);

//   if (Number.isNaN(seconds) || seconds < 0) {
//     seconds = 0;
//   }

//   timerElement.textContent = String(seconds);

//   if (seconds === 0) {
//     alert('Вы победили в конкурсе!');
//   } else {
//     const timerId = setInterval(() => {
//       seconds = seconds - 1;
//       timerElement.textContent = String(seconds);

//       if (seconds === 0) {
//         clearInterval(timerId);
//         alert('Вы победили в конкурсе!');
//       }
//     }, 1000);
//   }
// }

// Задача #1 уровень сложности
// function startTimerWithHours(element, startSeconds) {
//   if (!element) return;

//   let seconds = startSeconds;
//   if (seconds < 0) seconds = 0;

//   const timerId = setInterval(() => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;

//     const hh = String(hours).padStart(2, '0');
//     const mm = String(minutes).padStart(2, '0');
//     const ss = String(secs).padStart(2, '0');

//     element.textContent = hh + ':' + mm + ':' + ss;

//     if (seconds === 0) {
//       clearInterval(timerId);
//       alert('Вы победили в конкурсе!');
//     } else {
//       seconds = seconds - 1;
//     }
//   }, 1000);
// }

// const timer = document.getElementById('timer');
// startTimerWithHours(timer, 59);


// Задача #2 уровень сложности
function redirectToPrize() {
  window.location.href = 'https://ya.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fimage-is-dark-mysterious-street-scene-only-light-comes-from-few-neon-signs-streetlights_1209158-41305.jpg%3Fsemt%3Dais_hybrid%26w%3D740%26q%3D80&lr=51&pos=0&rpt=simage&text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8%20%D1%81%20%D0%BA%D0%B8%D0%B1%D0%B5%D1%80%D0%BF%D0%B0%D0%BD%D0%BA%D0%B0';
}

const timer = document.getElementById('timer');
let s = 10;
const id = setInterval(() => {
  timer.textContent = String(s);
  if (s === 0) {
    clearInterval(id);
    redirectToPrize();
  } else {
    s = s - 1;
  }
}, 1000);
