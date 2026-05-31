const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  reveals.forEach(reveal => {
    const { top } = reveal.getBoundingClientRect();

    if (top < window.innerHeight) {
      reveal.classList.add('reveal_active');
    } else {
      reveal.classList.remove('reveal_active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
