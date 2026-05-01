'use strict';

const NEED_TO_WIN = 10;
const ALLOWED_MISSES = 5;

const deadCounterEl = document.getElementById('dead');
const lostCounterEl = document.getElementById('lost');

function getHole(index) {
  return document.getElementById(`hole${index}`);
}

function resetStats() {
  deadCounterEl.textContent = '0';
  lostCounterEl.textContent = '0';
}

function onHoleClick(event) {
  const hole = event.currentTarget;
  const hasMole = hole.classList.contains('hole_has-mole');

  if (hasMole) {
    const next = Number(deadCounterEl.textContent) + 1;
    deadCounterEl.textContent = String(next);
    if (next >= NEED_TO_WIN) {
      alert(`Победа! Убито ${NEED_TO_WIN} кротов.`);
      resetStats();
    }
  } else {
    const next = Number(lostCounterEl.textContent) + 1;
    lostCounterEl.textContent = String(next);
    if (next >= ALLOWED_MISSES) {
      alert(`Поражение! ${ALLOWED_MISSES} промахов.`);
      resetStats();
    }
  }
}

for (let i = 1; i <= 9; i += 1) {
  getHole(i).onclick = onHoleClick;
}
