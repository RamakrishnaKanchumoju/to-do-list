var tasks = [];

function addTask() {
  var input = document.getElementById("taskInput");
  var task = input.value.trim();

  if (task !== "") {
    var taskObject = {
      id: Date.now(),
      task: task,
      completed: false,
      addedDate: new Date()
    };

    tasks.push(taskObject);
    renderTasks();
    input.value = "";
  }
}

function renderTasks() {
  var pendingTasksList = document.getElementById("pendingTasks");
  var completedTasksList = document.getElementById("completedTasks");

  // Clear existing task lists
  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  tasks.forEach(function(taskObject) {
    var li = document.createElement("li");
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(taskObject.task));
    li.appendChild(span);

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", function() {
      deleteTask(taskObject.id);
    });
    li.appendChild(deleteButton);

    if (taskObject.completed) {
      li.className = "completed";
      completedTasksList.appendChild(li);
    } else {
      var completeButton = document.createElement("button");
      completeButton.innerHTML = "Complete";
      completeButton.addEventListener("click", function() {
        completeTask(taskObject.id);
      });
      li.appendChild(completeButton);
      pendingTasksList.appendChild(li);
    }
  });
}

function deleteTask(taskId) {
  tasks = tasks.filter(function(task) {
    return task.id !== taskId;
  });

  renderTasks();
}

function completeTask(taskId) {
  tasks.forEach(function(task) {
    if (task.id === taskId) {
      task.completed = true;
    }
  });

  renderTasks();
}

window.onload = function() {
  renderTasks();
};
