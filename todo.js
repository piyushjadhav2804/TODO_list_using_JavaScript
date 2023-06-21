let tasks = [];
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

function addTaskToDOM(task) {

    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${
      task.done ? "checked" : ""
    } class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="https://img.icons8.com/?size=1x&id=4Ozf0g4MsWFS&format=png" class="delete" data-id="${
          task.id
        }" />
    `;

    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = "";

    for(let i=0; i<tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

//change the state of done field of the task
function toggleTask(taskId) {

    //select the required task from the array
    const task = tasks.filter((task) => {
      return task.id == taskId;
    });    

    //check if task is present
    if(task.length > 0) {
        //retrieve the task
        const currentTask = task[0];

        //change the state of done field
        currentTask.done = !currentTask.done;
        
        renderList();
        showNotification("task toggled successfully");
        return;
    }

    showNotification("Could not toggle the task");
}

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

function handleClickListener(event) {
    const target = event.target;
    console.log(target);

    if(target.className == "delete") {

        const taskId = target.dataset.id;  
        deleteTask(taskId);
    }

    else if(target.className == 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
    }
}

document.addEventListener('click', handleClickListener);