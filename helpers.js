const fs = require("fs");
const args = process.argv;

const currentWorkingDirectory = args[1].slice(0, -8);

const fileExist = () => {
  return fs.existsSync(currentWorkingDirectory + "todos.json") === true;
};

const readFile = () => {
  //   read data from the json file
  const todosBuffer = fs.readFileSync(currentWorkingDirectory + "todos.json");

  // convet the data to string
  let stringedTodos = todosBuffer.toString();

  // convert from buffer to a Javascript object
  return JSON.parse(stringedTodos);
};

const writeFile = (data) => {
    
  fs.writeFileSync("todos.json", JSON.stringify(data));
}
module.exports = { currentWorkingDirectory, readFile, fileExist, writeFile };
