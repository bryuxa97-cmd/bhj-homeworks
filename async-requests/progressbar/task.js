const form = document.getElementById('form');
const progress = document.getElementById('progress');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', form.action);

  xhr.upload.addEventListener('progress', (event) => {
    progress.value = event.loaded / event.total;
  });

  xhr.send(formData);
});
