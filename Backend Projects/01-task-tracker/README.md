# CLI Task Tracker

This is a simple **Command Line Interface (CLI)** application that helps you manage your tasks. You can add, update, delete, and list tasks, as well as filter tasks based on their status. Tasks are stored in a JSON file (`tasks.json`), which will be automatically created in the project directory when the application is first run.

## Features

- **Add tasks**: Create a new task with a title.
- **Update tasks**: Mark a task as `not done`, `in progress`, or `done`.
- **Delete tasks**: Remove a task from the list.
- **List tasks**: View all tasks, or filter them by status (`not done`, `in progress`, or `done`).

## Getting Started

### Prerequisites

- **Node.js** installed on your machine (version 12 or higher).

### Installation

1. **Clone the repository** or download the `task-tracker.js` file to your project folder.

2. Make the script executable:

   ```bash
   chmod +x task-tracker.js
   ```

### Usage

You can interact with the Task Tracker using the following commands.

#### 1. **Add a Task**

```bash
./task-tracker.js add "<task_title>"
```

#### 2. **Update a Task's Status**

```bash
./task-tracker.js update <task_index> <'not done'|'in progress'|'done'>
```

- `task_index` is the index of the task in the list (starting from 0).

#### 3. **Delete a Task**

```bash
./task-tracker.js delete <task_index>
```

#### 4. **List All Tasks**

```bash
./task-tracker.js list
```

#### 5. **List Tasks by Status**

- To list all tasks that are done:

    ```bash
    ./task-tracker.js list-done
    ```

- To list all tasks that are not done:

    ```bash
    ./task-tracker.js list-not-done
    ```

- To list all tasks that are in progress:

    ```bash
    ./task-tracker.js list-in-progress
    ```

### Example Usage

```bash
# Add tasks
./task-tracker.js add "Write unit tests"
./task-tracker.js add "Implement task tracker CLI"

# List tasks
./task-tracker.js list

# Update task status
./task-tracker.js update 0 in progress

# List tasks again
./task-tracker.js list

# Delete a task
./task-tracker.js delete 1
```

### Notes

- All tasks are stored in a `tasks.json` file located in the same directory as `task-tracker.js`.
- The `tasks.json` file will be created automatically when you first run the program.
- Make sure to run the commands from the directory where `task-tracker.js` is located, or provide the full path to the file.

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
