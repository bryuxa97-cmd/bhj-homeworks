const dropdowns = Array.from(document.querySelectorAll('.dropdown'));

dropdowns.forEach((dropdown) => {
  const dropdownValue = dropdown.querySelector('.dropdown__value');
  const dropdownList = dropdown.querySelector('.dropdown__list');
  const dropdownItems = Array.from(dropdown.querySelectorAll('.dropdown__item'));

  dropdownValue.addEventListener('click', () => {
    dropdownList.classList.toggle('dropdown__list_active');
  });

  dropdownItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      dropdownValue.textContent = item.textContent.trim();
      dropdownList.classList.remove('dropdown__list_active');
    });
  });
});
