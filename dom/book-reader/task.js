const book = document.getElementById('book');
const fontSizes = document.querySelectorAll('.font-size');
const textColors = document.querySelectorAll('[data-text-color]');
const bgColors = document.querySelectorAll('[data-bg-color]');

fontSizes.forEach(fontSize => {
  fontSize.addEventListener('click', event => {
    event.preventDefault();

    fontSizes.forEach(item => item.classList.remove('font-size_active'));
    fontSize.classList.add('font-size_active');

    book.classList.remove('book_fs-small', 'book_fs-big');

    const size = fontSize.dataset.size;
    if (size === 'small') {
      book.classList.add('book_fs-small');
    } else if (size === 'big') {
      book.classList.add('book_fs-big');
    }
  });
});

textColors.forEach(color => {
  color.addEventListener('click', event => {
    event.preventDefault();

    textColors.forEach(item => item.classList.remove('color_active'));
    color.classList.add('color_active');

    book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');
    book.classList.add(`book_color-${color.dataset.textColor}`);
  });
});

bgColors.forEach(color => {
  color.addEventListener('click', event => {
    event.preventDefault();

    bgColors.forEach(item => item.classList.remove('color_active'));
    color.classList.add('color_active');

    book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');
    book.classList.add(`book_bg-${color.dataset.bgColor}`);
  });
});
