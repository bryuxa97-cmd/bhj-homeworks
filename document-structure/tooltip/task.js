'use strict';

const GAP = 5;

let activeTooltip = null;

const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
document.body.append(tooltip);

function getCoords(target, position) {
  const rect = target.getBoundingClientRect();

  switch (position) {
    case 'left':
      return {
        left: rect.left - tooltip.offsetWidth - GAP,
        top: rect.top,
      };
    case 'right':
      return {
        left: rect.right + GAP,
        top: rect.top,
      };
    case 'bottom':
      return {
        left: rect.left,
        top: rect.bottom + GAP,
      };
    case 'top':
    default:
      return {
        left: rect.left,
        top: rect.top - tooltip.offsetHeight - GAP,
      };
  }
}

function showTooltip(target) {
  tooltip.textContent = target.getAttribute('title');
  tooltip.classList.add('tooltip_active');

  const position = target.dataset.position;
  const { left, top } = getCoords(target, position);

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;

  activeTooltip = target;
}

function hideTooltip() {
  tooltip.classList.remove('tooltip_active');
  activeTooltip = null;
}

document.querySelectorAll('.has-tooltip').forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();

    if (activeTooltip === element) {
      hideTooltip();
      return;
    }

    showTooltip(element);
  });
});
