const fs = require("fs");
const {
  currentWorkingDirectory,
  readFile,
  fileExist,
  writeFile,
} = require("./helpers.js");

const args = process.argv;

const information = () => {
  const info = `
Welcome to my CLI Todo app. See the instructions below for usage.\n  
Usage :-
$ node index.js add <todo item>  # Add a new todo
$ node index.js list             # Displays all todos todos
$ node index.js deleteTodo <todo id>       # Delete a todo
$ node index.js complete <todo id>      # Complete a todo
`;

  console.log(info);
};

const list = () => {
  let data = [];
  if (fileExist()) {
    let todos = readFile();
    data = [...todos];
  }
  if (data.length > 0) {
    data.forEach((todo) => {
      todo.completed
        ? console.log(`(${todo.id}*) ${todo.todo}`)
        : console.log(`(${todo.id}) ${todo.todo}`);
    });
    return;
  } else {
    console.log(
      `Error: No todo has been added yet! \n Use 'node index.js add' command to add a todo`
    );
  }
};

const add = () => {
  // New todo string argument is stored
  const newTask = args[3];

  // If argument is passed
  if (newTask) {
    // Create the todos.json file if it doesn't exist yet
    if (!fileExist()) {
      writeFile([]);
    }
    //   read data from the json file
    const todoData = readFile();

    const id = todoData.length > 0 ? todoData[todoData.length - 1].id + 1 : 1;
    
    // Add task to the task list
    todoData.push({ id: id, todo: newTask, completed: false });
    writeFile(todoData);
    console.log('Added todo: "' + newTask + '"');
  } else {
    // If argument was no passed
    console.log("Error: Missing todo string. Check and try again!");
  }
};

const deleteTodo = () => {
  // New todo string argument is stored
  const todoIndex = args[3];

  // If argument was no passed
  if (!todoIndex) console.log("Error: Todo id wass not specified!");

  // if todo.json exists
  let data = [];

  if (fileExist() && todoIndex) {
    // read data from the file
    const todos = readFile();
    data = [...todos];
  }

  if (data.length > 0) {
    const newData = data.filter((todo) => todo.id != todoIndex);
    data = [...newData];
    writeFile(data);
    console.log(`Deleted todo: ${todoIndex} `);
  } else {
    // if no todo exists in the todo file
    console.log("No todo has been added yet!");
  }
};

const complete = () => {
  // New todo string argument is stored
  const todoIndex = args[3];

  // If argument was no passed
  if (!todoIndex) {
    console.log("Error: Todo id should be specified!");
    return;
  }

  // if todo.json exists
  let data = [];
  if (fileExist() && todoIndex) {
    // read data from the file
    const todos = readFile();
    data = [...todos];
  }
  if (data.length > 0) {
    data.forEach((todo, index) => {
      // Update completed to true
      if (todo.id == todoIndex) {
        data[index].completed = true;
      }
    });
    writeFile(data)
  } else {
    // if no todo exists in the todo file
    console.log("No todo has been added yet!");
  }
};

switch (args[2]) {
  case "add": {
    add();
    break;
  }

  case "list": {
    list();
    break;
  }

  case "deleteTodo": {
    deleteTodo();
    break;
  }

  case "complete": {
    complete();
    break;
  }

  default: {
    information();
  }
}
