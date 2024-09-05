#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, 'tasks.json');

// Initialize the tasks file if it doesn't exist
if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, JSON.stringify([]));
}

function readTasks() {
  const tasksData = fs.readFileSync(tasksFilePath);
  return JSON.parse(tasksData);
}

function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

function addTask(title) {
  const tasks = readTasks();
  tasks.push({ title, status: 'not done' });
  writeTasks(tasks);
  console.log(`Added task: "${title}"`);
}

function updateTask(index, status) {
  const tasks = readTasks();
  if (index < 0 || index >= tasks.length) {
    console.error("Invalid task index.");
    return;
  }
  tasks[index].status = status;
  writeTasks(tasks);
  console.log(`Updated task "${tasks[index].title}" to "${status}"`);
}

function deleteTask(index) {
  const tasks = readTasks();
  if (index < 0 || index >= tasks.length) {
    console.error("Invalid task index.");
    return;
  }
  const removed = tasks.splice(index, 1);
  writeTasks(tasks);
  console.log(`Deleted task: "${removed[0].title}"`);
}

function listTasks(filter = null) {
  const tasks = readTasks();
  let filteredTasks = tasks;

  if (filter) {
    filteredTasks = tasks.filter(task => task.status === filter);
  }

  if (filteredTasks.length === 0) {
    console.log("No tasks found.");
  } else {
    filteredTasks.forEach((task, index) => {
      console.log(`${index}. [${task.status}] ${task.title}`);
    });
  }
}

function handleArguments() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add':
      const taskTitle = args.slice(1).join(' ');
      if (!taskTitle) {
        console.error("Please provide a task title.");
        return;
      }
      addTask(taskTitle);
      break;
    case 'update':
      const updateIndex = parseInt(args[1], 10);
      const newStatus = args[2];
      if (isNaN(updateIndex) || !['not done', 'in progress', 'done'].includes(newStatus)) {
        console.error("Usage: update <task_index> <'not done'|'in progress'|'done'>");
        return;
      }
      updateTask(updateIndex, newStatus);
      break;
    case 'delete':
      const deleteIndex = parseInt(args[1], 10);
      if (isNaN(deleteIndex)) {
        console.error("Usage: delete <task_index>");
        return;
      }
      deleteTask(deleteIndex);
      break;
    case 'list':
      listTasks();
      break;
    case 'list-done':
      listTasks('done');
      break;
    case 'list-not-done':
      listTasks('not done');
      break;
    case 'list-in-progress':
      listTasks('in progress');
      break;
    default:
      console.error("Unknown command. Available commands: add, update, delete, list, list-done, list-not-done, list-in-progress");
  }
}

handleArguments();
