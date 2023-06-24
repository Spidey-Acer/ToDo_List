import './style.css';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const todoList = document.getElementById('todo-list');
const addTaskButton = document.getElementById('add-task-button');
const newTaskInput = document.getElementById('new-task-input');
const clearAllButton = document.getElementById('clear-all-button');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateIndexes() {
  tasks.forEach((task, i) => {
    task.index = i;
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateIndexes();
  saveTasks();
}

function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(newTask);
  saveTasks();
}

function renderTasks() {
  todoList.innerHTML = '';

  tasks.forEach((task, i) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
    });
    listItem.appendChild(checkbox);

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-description');
    taskDescription.innerText = task.description;
    listItem.appendChild(taskDescription);

    const editTaskDescription = document.createElement('button');
    editTaskDescription.classList.add('edit-task-description');
    editTaskDescription.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editTaskDescription.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = task.description;
      input.classList.add('task-input');
      input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          task.description = input.value;
          saveTasks();
          renderTasks();
        }
      });
      listItem.replaceChild(input, taskDescription);
      input.focus();
    });
    listItem.appendChild(editTaskDescription);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.style.display = 'none';
    deleteButton.addEventListener('click', () => {
      deleteTask(i);
      renderTasks();
    });
    listItem.appendChild(deleteButton);

    const ellipsisButton = document.createElement('button');
    ellipsisButton.classList.add('ellipsis-button');
    ellipsisButton.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
    ellipsisButton.addEventListener('click', () => {
      deleteButton.style.display = 'inline-block';
      ellipsisButton.style.display = 'none';
    });
    listItem.appendChild(ellipsisButton);

    todoList.appendChild(listItem);
  });
}

addTaskButton.addEventListener('click', () => {
  const newTaskDescription = newTaskInput.value;
  if (newTaskDescription.trim() !== '') {
    addTask(newTaskDescription);
    renderTasks();
    newTaskInput.value = '';
  }
});

newTaskInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTaskButton.click();
  }
});

clearAllButton.addEventListener('click', () => {
  tasks.splice(
    0,
    tasks.length,
    ...tasks.filter((task) => task.completed === false),
  );
  updateIndexes();
  saveTasks();
  renderTasks();
});

renderTasks();
