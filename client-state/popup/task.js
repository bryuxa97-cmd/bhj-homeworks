const modal = document.getElementById('subscribe-modal');
const modalClose = modal.querySelector('.modal__close');

const COOKIE_NAME = 'subscribeModalClosed';

function isModalClosed() {
  return document.cookie.split('; ').some((cookie) => cookie.startsWith(COOKIE_NAME + '='));
}

function setModalClosed() {
  const year = 60 * 60 * 24 * 365;
  document.cookie = COOKIE_NAME + '=true; max-age=' + year + '; path=/';
}

if (!isModalClosed()) {
  modal.classList.add('modal_active');
}

modalClose.addEventListener('click', () => {
  modal.classList.remove('modal_active');
  setModalClosed();
});
