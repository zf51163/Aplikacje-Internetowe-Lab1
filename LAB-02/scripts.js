// Load tasks from Local Storage
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  for (let i = 0; i < tasks.length; i++) {
    createTaskElement(taskList, tasks[i]);
  }
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskList, task) {
  const li = document.createElement("li");
  li.textContent = task.title + " - Data: " + task.dueDate;
  
  // Create "Edit" button
  const editButton = document.createElement("button");
  editButton.textContent = "edycja";
  editButton.onclick = function() {
    editTask(taskList, task, li);
  };

  // Create "Delete" button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "usun";
  deleteButton.onclick = function() {
    deleteTask(taskList, task);
  };

  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function addTask() {
  const newTaskInput = document.getElementById("newTask");
  const dueDateInput = document.getElementById("dueDate");
  const searchInput = document.getElementById("search");
  const taskList = document.getElementById("taskList");

  const title = newTaskInput.value;
  const dueDate = dueDateInput.value;

  if (title.length < 3 || title.length > 255) {
    alert("Musi zawierac od 3 do 255 znakow");
    return;
  }

  if (dueDate !== "" && new Date(dueDate).getTime() < Date.now()) {
    alert("Niepoprawna data");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ title, dueDate });
  saveTasks(tasks);

  createTaskElement(taskList, { title, dueDate });

  newTaskInput.value = "";
  dueDateInput.value = "";
  searchInput.value = "";

  searchTasks();
}

function editTask(taskList, task, li) {
  const editButton = li.querySelector("button");
  editButton.textContent = "zapisz";
  editButton.onclick = function() {
    saveEditedTask(taskList, task, li);
  };

  const title = li.textContent.split(" - Data: ")[0];
  const dueDate = li.textContent.split(" - Data: ")[1];

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = title;
  titleInput.minLength = 3;
  titleInput.maxLength = 255;

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "datetime-local";
  dueDateInput.value = new Date(dueDate).toISOString().slice(0, 16);

  li.textContent = "";
  li.appendChild(titleInput);
  li.appendChild(dueDateInput);
}

function saveEditedTask(taskList, task, li) {
  const titleInput = li.querySelector("input[type='text']");
  const dueDateInput = li.querySelector("input[type='datetime-local']");

  const updatedTitle = titleInput.value;
  const updatedDueDate = dueDateInput.value;

  if (updatedTitle.length < 3 || updatedTitle.length > 255) {
    alert("Musi zawierac od 3 do 255 znakow");
    return;
  }

  if (updatedDueDate !== "" && new Date(updatedDueDate).getTime() < Date.now()) {
    alert("Niepoprawna data");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskIndex = tasks.findIndex((t) => t.title === task.title && t.dueDate === task.dueDate);

  if (taskIndex > -1) {
    tasks[taskIndex] = { title: updatedTitle, dueDate: updatedDueDate };
    saveTasks(tasks);

    li.textContent = updatedTitle + " - Data: " + updatedDueDate;

    const editButton = document.createElement("button");
    editButton.textContent = "Edycja";
    editButton.onclick = function() {
      editTask(taskList, { title: updatedTitle, dueDate: updatedDueDate }, li);
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "usun";
    deleteButton.onclick = function() {
      deleteTask(taskList, { title: updatedTitle, dueDate: updatedDueDate });
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    searchTasks();
  }
}

function deleteTask(taskList, task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex((t) => t.title === task.title && t.dueDate === task.dueDate);

  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    taskList.removeChild(taskList.childNodes[taskIndex]);
    searchTasks();
  }
}

function searchTasks() {
  const searchInput = document.getElementById("search");
  const taskList = document.getElementById("taskList");

  const searchTerm = searchInput.value.toLowerCase();

  for (let i = 0; i < taskList.childNodes.length; i++) {
    const task = taskList.childNodes[i];
    const title = task.textContent.split(" - Data: ")[0].toLowerCase();

    if (title.includes(searchTerm)) {
      highlightSearchTerm(task, searchTerm);
      task.style.display = "list-item";
    } else {
      task.style.display = "none";
    }
  }
}

function highlightSearchTerm(task, searchTerm) {
  const title = task.textContent.split(" - Data: ")[0];
  const dueDate = task.textContent.split(" - Data: ")[1];

  const highlightedTitle = title.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
  task.innerHTML = highlightedTitle + " - Data: " + dueDate;}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", searchTasks);
