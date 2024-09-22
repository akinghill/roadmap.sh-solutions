// Initialize the tasks array
let tasks = [];

// Get elements from the DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add event listener to the "Add" button and input field
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Add a new task
function addTask() {
  const taskDescription = taskInput.value.trim();

  if (taskDescription !== '') {
    const newTask = {
      description: taskDescription,
      completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
  }
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Toggle the completion status of a task
function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Render tasks in the DOM
function renderTasks() {
  // Clear the task list before re-rendering
  taskList.innerHTML = '';

  // Sort tasks: incomplete first, completed last
  const sortedTasks = tasks.slice().sort((a, b) => a.completed - b.completed);

  // Create a list item for each task
  sortedTasks.forEach((task, index) => {
    const taskItem = document.createElement('li');

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('change', () => toggleTaskStatus(tasks.indexOf(task)));

    const taskDescription = document.createElement('span');
    taskDescription.textContent = task.description;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(tasks.indexOf(task)));

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
  });
}