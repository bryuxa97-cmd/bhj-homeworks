const COURSES_URL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
const CACHE_KEY = 'courses';

const loader = document.getElementById('loader');
const itemsEl = document.getElementById('items');

const cached = localStorage.getItem(CACHE_KEY);
if (cached) {
  showCourses(JSON.parse(cached));
}

const xhr = new XMLHttpRequest();
xhr.open('GET', COURSES_URL);
xhr.responseType = 'json';
xhr.addEventListener('load', () => {
  const valute = xhr.response.response.Valute;

  showCourses(valute);
  localStorage.setItem(CACHE_KEY, JSON.stringify(valute));

  loader.classList.remove('loader_active');
});
xhr.send();

function showCourses(valute) {
  itemsEl.innerHTML = '';

  for (const code in valute) {
    const currency = valute[code];

    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
      <div class="item__code">${currency.CharCode}</div>
      <div class="item__value">${currency.Value}</div>
      <div class="item__currency">руб.</div>
    `;

    itemsEl.appendChild(item);
  }
}
