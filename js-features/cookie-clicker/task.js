'use strict';

const counter = document.getElementById('clicker__counter');
const cookie = document.getElementById('cookie');

let speed = document.getElementById('clicker__speed');
if (!speed) {
  const speedLine = document.createElement('div');
  speedLine.className = 'clicker__status';
  speedLine.innerHTML = 'Скорость клика: <span id="clicker__speed">0</span>';
  document.querySelector('.clicker').append(speedLine);
  speed = document.getElementById('clicker__speed');
}

let isBig = false;
let lastClickTime = new Date();

cookie.onclick = function () {
  counter.textContent = String(Number(counter.textContent) + 1);

  if (isBig) {
    cookie.width = 200;
  } else {
    cookie.width = 250;

  }
  isBig = !isBig;

//  Задача #1 уровень сложности
  const now = new Date();
  const seconds = (now - lastClickTime) / 1000;

  if (seconds > 0) {
    speed.textContent = (1 / seconds).toFixed(2);
  }

  lastClickTime = now;
};
