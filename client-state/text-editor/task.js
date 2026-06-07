const editor = document.getElementById('editor');
const clearButton = document.getElementById('clear');

const STORAGE_KEY = 'editorText';

const savedText = localStorage.getItem(STORAGE_KEY);
if (savedText) {
  editor.value = savedText;
}

editor.addEventListener('input', () => {
  localStorage.setItem(STORAGE_KEY, editor.value);
});

clearButton.addEventListener('click', () => {
  editor.value = '';
  localStorage.removeItem(STORAGE_KEY);
});
