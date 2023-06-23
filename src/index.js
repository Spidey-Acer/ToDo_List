import './style.css';

const tasks = [
  {
    description: 'Complete JavaScript project',
    completed: false,
    index: 0,
  },
  {
    description: 'Learn React',
    completed: true,
    index: 1,
  },
  {
    description: 'Practice coding exercises',
    completed: false,
    index: 2,
  },
];

const todoList = document.getElementById('todo-list');
const addTaskButton = document.getElementById('add-task-button');
const newTaskInput = document.getElementById('new-task-input');
const clearAllButton = document.getElementById('clear-all-button');

function renderTasks() {
  todoList.innerHTML = '';

  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];

    const listItem = document.createElement('li');
    listItem.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
    });
    listItem.appendChild(checkbox);

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-description');
    taskDescription.innerText = task.description;
    listItem.appendChild(taskDescription);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.style.display = 'none';
    deleteButton.addEventListener('click', () => {
      tasks.splice(i, 1);
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
  }
}

addTaskButton.addEventListener('click', () => {
  const newTaskDescription = newTaskInput.value;
  if (newTaskDescription.trim() !== '') {
    const newTask = {
      description: newTaskDescription,
      completed: false,
      index: tasks.length,
    };
    tasks.push(newTask);
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
  const completedTasks = tasks.filter((task) => task.completed);
  tasks.splice(0, tasks.length, ...completedTasks);
  renderTasks();
});

renderTasks();
