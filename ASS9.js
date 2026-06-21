const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const emptyMessage = document.getElementById("emptyMessage");
const counter = document.getElementById("counter");

const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompleted = document.getElementById("clearCompleted");

let currentFilter = "all";


// =====================
// Add Task
// =====================

addBtn.addEventListener("click", addTask);

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    updateCounter();
    applyFilter();
}


// =====================
// Task Click (Complete + Delete)
// =====================

taskList.addEventListener("click", function (e) {

    // COMPLETE TASK
    if (e.target.classList.contains("task-text")) {
        e.target.parentElement.classList.toggle("completed");
    }

    // DELETE TASK
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    }

    updateCounter();
    applyFilter();
});


// =====================
// Counter
// =====================

function updateCounter() {

    const activeTasks = document.querySelectorAll("#taskList li:not(.completed)").length;

    counter.textContent = `${activeTasks} tasks remaining`;

    if (taskList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// =====================
// Filters
// =====================

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        currentFilter = this.dataset.filter;

        applyFilter();
    });

});

function applyFilter() {

    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {

        if (currentFilter === "all") {
            task.style.display = "flex";
        }

        else if (currentFilter === "active") {
            task.style.display = task.classList.contains("completed") ? "none" : "flex";
        }

        else if (currentFilter === "completed") {
            task.style.display = task.classList.contains("completed") ? "flex" : "none";
        }
    });
}


// =====================
// Clear Completed
// =====================

clearCompleted.addEventListener("click", function () {

    document.querySelectorAll("#taskList .completed").forEach(task => {
        task.remove();
    });

    updateCounter();
    applyFilter();
});


// =====================
// Initial State
// =====================

updateCounter();