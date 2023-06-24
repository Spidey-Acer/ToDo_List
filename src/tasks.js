// tasks.js

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
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

function deleteTask(index) {
  tasks.splice(index, 1);
  tasks.forEach((task, i) => {
    task.index = i;
  });
  saveTasks();
}

function editTaskDescription(index, description) {
  tasks[index].description = description;
  saveTasks();
}

export {
  tasks, addTask, deleteTask, editTaskDescription,
};
