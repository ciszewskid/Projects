// ? Setting reference for the DOM

const taskInput = document.getElementById("new-item");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

// ? Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// ? Adding event listeners
// ? Whenever the button is clicked, the function "addTask" is called
addTaskButton.addEventListener("click", addTask);

// ? Adding event for when the enter key is pressed
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    // ? Get task text from user input field and remove any extra spaces around it
    const taskText = taskInput.value.trim();

    // ? If the input field is not empty:
    if (taskText !== "") {
        // ! Create a new list item to hold the task
        const li = document.createElement("li");

        // ? Set the textcontent of the list element to the specified above task text
        li.textContent = taskText;

        // * Creating a delete button to remove a task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        // ? Adds a class name "delete-button" to the button for future styling
        deleteButton.classList.add("delete-Button");

        // ? Adding an event listener for the del button
        deleteButton.addEventListener("click", function () {
            // ? Removes the task when the button is pressed
            li.remove();
            saveTasksToLocalStorage();
        });

        // * Appending the delete button to the list item
        li.appendChild(deleteButton);

        // * Appending the new task list (li) to the task list (ul)
        taskList.appendChild(li);

        // * Clears the input field after the task is added
        taskInput.value = "";
        // ? Save tasks to local storage
        saveTasksToLocalStorage();

    }
}

// ? Function to load tasks from local storage when page loads
function loadTasksFromLocalStorage() {
    // ? Retrieve and parse tasks from the local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        // ? Set the text of the list item
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-Button");

        deleteButton.addEventListener("click", function () {
            li.remove();
            // ? Updates the local storage after deletion
            saveTasksToLocalStorage();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// ? Function to save tasks to local storage
function saveTasksToLocalStorage() {
    // ? An array to hold the list of tasks
    const tasks = Array.from(taskList.querySelectorAll("li")).map(li => ({
        text: li.textContent.replace("Delete", "").trim(),
        // ? Checks if the task is completed
        completed: li.classList.contains("completed")
    }));

    // ? Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ? Adding an event listener to the task list to handle the above function
taskList.addEventListener("click", function (e) {
    // ? Checking IF the clicked element is a list item
    if (e.target.tagName === "LI") {
        // * Toggle the completed class on the list item
        e.target.classList.toggle("completed");
        // ? Update local storage when a task complete status changes
        saveTasksToLocalStorage();
    }
});