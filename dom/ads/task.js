const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
  const cases = rotator.querySelectorAll('.rotator__case');
  let index = 0;

  function show() {
    const current = cases[index];
    current.style.color = current.dataset.color;

    const speed = Number(current.dataset.speed) || 1000;
    setTimeout(() => {
      current.classList.remove('rotator__case_active');
      index = (index + 1) % cases.length;
      cases[index].classList.add('rotator__case_active');
      show();
    }, speed);
  }

  show();
});
