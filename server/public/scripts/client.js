console.log('gg');

$(document).ready(readyNow);

function readyNow() {
    getTasks();
    $('#submitBtn').on('click', addTask)
}

// get tasks from db
function getTasks() {
    console.log('getting tasks');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response);
        appendTasks(response);
    }).catch(function (error) {
        console.log('error in GET:', error);
    });
};

// append tasks to DOM
function appendTasks(tasks) {
    $('#taskList').empty();
    for(let i = 0; i < tasks.length; i++) {
        $('#taskList').append(
            `<tr>
               <td>${tasks[i].task_name}</td>
               <td>${tasks[i].task_note}</td>
               <td>${tasks[i].task_priority}</td>
               <td><input type="checkbox" class="completeBox"></td>
               <td><button class="deleteBtn">Delete</button></td>
            </tr>`
        );
    };
};

// add task
function addTask() {
    event.preventDefault();
    let newTask = {
        task_name: $('#nameInput').val(),
        task_note: $('#noteInput').val(),
        task_priority: $('#priorityInput').val()
    };
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function(response) {
        getTasks();
    }).catch(function(error) {
        console.log('error in POST:', error);
    });
}