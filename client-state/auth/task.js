const signinForm = document.getElementById('signin__form');
const signin = document.getElementById('signin');
const welcome = document.getElementById('welcome');
const userId = document.getElementById('user_id');
const logoutBtn = document.getElementById('logout__btn');

const STORAGE_KEY = 'user_id';

function showWelcome(id) {
  userId.textContent = id;
  signin.classList.remove('signin_active');
  welcome.classList.add('welcome_active');
}

function showSignin() {
  welcome.classList.remove('welcome_active');
  signin.classList.add('signin_active');
}

signinForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(signinForm);

  fetch(signinForm.action, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem(STORAGE_KEY, data.user_id);
        showWelcome(data.user_id);
      } else {
        alert('Неверный логин/пароль');
      }

      signinForm.reset();
    });
});

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    showSignin();
  });
}

const savedUserId = localStorage.getItem(STORAGE_KEY);
if (savedUserId) {
  showWelcome(savedUserId);
}
