'use strict';

const STORAGE_KEY = 'todo-tasks';

const form = document.getElementById('tasks__form');
const input = document.getElementById('task__input');
const list = document.getElementById('tasks__list');

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveTasks() {
  const titles = [...list.querySelectorAll('.task__title')].map(
    (title) => title.textContent
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(titles));
}

function createTask(title) {
  const task = document.createElement('div');
  task.classList.add('task');

  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task__title');
  taskTitle.textContent = title;

  const removeButton = document.createElement('a');
  removeButton.classList.add('task__remove');
  removeButton.href = '#';
  removeButton.innerHTML = '&times;';

  removeButton.addEventListener('click', (event) => {
    event.preventDefault();
    task.remove();
    saveTasks();
  });

  task.append(taskTitle, removeButton);
  list.append(task);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (title === '') {
    return;
  }

  createTask(title);
  saveTasks();
  input.value = '';
});

loadTasks().forEach((title) => createTask(title));
