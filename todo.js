let tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

function renderList() {}

function markTaskAsComplete(taskId) {}

//delete a particular task
function deleteTask(taskId) {

    //we have to remove the task with "id:taskId" from "tasks" array

    //we will create new array and use filter() over "tasks" to get array with removed task
    const newTasks = tasks.filter((task) => {
        return task.id != taskId;
    });

    tasks = newTasks;
    renderList();
    showNotification("Task deleted successfully!!");
}

//add user's tasks into "task" array
function addTask(task) {

    //check if task is present
    if(task) {
        tasks.push(task);
        renderList();
        showNotification("Task added successfully");
        console.log('tasks: ',tasks);
        return;
    }

    showNotification("Taask cannot be added");
}

function showNotification(text) {
  alert(text);
}

//retreive the input given by user in input field
function handleInputKeyPress(event) {
  //if user pressed "Enter", we get the text by target.value
  if(event.key === "Enter") {
    const text = event.target.value;
    console.log("text: ", text);

    //if user haven't typed anything and just pressed "Enter", will give alert
    if (!text) {
      showNotification("Task text cannot be empty!!");
      return;
    }

    //create "task" object
    const task = {
      text: text, //user input
      id: Date.now().toString(), //whatever task is created, we have to assign an id
      done: false, //whenever user is typing, we should set done as false
    };

    //once the user presses "Enter", we need to make input box empty after addding the text into list
    event.target.value = "";
    
    //add this task into "task" array
    addTask(task);
  }
}

//used 'keyup' even, as we want the input given by user until he/she presses "Enter" button
addTaskInput.addEventListener("keyup", handleInputKeyPress);
