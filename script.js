// First Thing Is Think How To Do It Step By Step then start code .
// Always Test With console.log() .


let input = document.querySelector(".input");
let submit = document.querySelector('.add');
let taskDiv = document.querySelector('.tasks');

// Empty Array To Store The Tasks 
let arrayOfTasks = [];

// Check If There Tasks In Local Storage  1 
if (localStorage.getItem('tasks')) {
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}

// Trigger Get Data From Local Storage   2 
getDataFromLocalStorage();

// Add Task  3 
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);    // Add Tasks To Array Of Tasks []
        input.value = "";   // Empty The Input Field 
    }
};

// Click On Task Element 4 
taskDiv.addEventListener("click", (e) => {
    // Delete Button  5
    if (e.target.classList.contains("delete")) {
        // Remove Tasks From Local Storage 6
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'));
        // Remove Element From Page 7
        e.target.parentElement.remove();
    }
    // Task Element 
    if (e.target.classList.contains('task')) {
        // Toggle Completed For The Task 8
        toggleStatusTaskWith(e.target.getAttribute('data-id'));
        // Toggle Done Class 9
        e.target.classList.toggle('done');
    }
});

function addTaskToArray(taskText) { // 10
    // Task Data 
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Tasks 
    arrayOfTasks.push(task);
    // Add Task To page DOM 
    addElementsToPageFrom(arrayOfTasks);
    // Add Task To Local Storage 
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) { // 11
    // Empty Tasks Div 
    taskDiv.innerHTML = "";
    // Looping On Array Of Tasks 
    arrayOfTasks.forEach(task => {
        // Create Main Div 
        let div = document.createElement('div');
        div.className = "task";
        // Check id task is done 
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute('data-id',task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button 
        let span = document.createElement('span');
        span.className = "delete";
        span.appendChild(document.createTextNode("Delete"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add Task Div To Tasks Container
        taskDiv.appendChild(div);
    });
}


function addDataToLocalStorageFrom(arrayOfTasks) { //12
    window.localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() { // 13 
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) { // 14 
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

// Toggle Status completed or not <==> True or False 
function toggleStatusTaskWith(taskId) { // 15
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
};


// You Can Add Delete all it's Easy google it or innerHTML = ""; localStorage.setItem =""; 


