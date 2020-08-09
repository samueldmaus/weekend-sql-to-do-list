
console.log('gg');

$(document).ready(readyNow);

function readyNow() {
    getTasks();
    $('#submitBtn').on('click', addTask);
    $('#taskList').on('click', '.completeBox', updateCompleteStatus);
    $('#taskList').on('click', '.deleteBtn', confirmDelete)
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
        if(tasks[i].task_completed === true) {
            let $tr = $(`<tr></tr>`);
            $tr.data('task', tasks[i]);
            $tr.append(
                `<td>${tasks[i].task_name}</td>
                <td>${tasks[i].task_note}</td>
                <td>${tasks[i].task_priority}</td>
                <td><input type="checkbox" class="completeBox" checked></td>
                <td><button class="deleteBtn">Delete</button></td>`
            );
            $('#taskList').append($tr);
            $tr.addClass('completedTask');
        }else {
            let $tr = $(`<tr></tr>`);
            $tr.data('task', tasks[i]);
            $tr.append(
                `<td>${tasks[i].task_name}</td>
                <td>${tasks[i].task_note}</td>
                <td>${tasks[i].task_priority}</td>
                <td><input type="checkbox" class="completeBox"></td>
                <td><button class="deleteBtn">Delete</button></td>`
            );
            $('#taskList').append($tr);
        }
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
};

function updateCompleteStatus() {
    let taskId = $(this).closest('tr').data('task').id;
    let taskStatus = $(this).closest('tr').data('task').task_completed;
    console.log(taskId, taskStatus);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: {
            newStatus: !taskStatus
        }
    }).then(function(response) {
        getTasks();
    }).catch(function(error) {
        console.log('error in PUT:', error);
    });
};

// deletes task from DOM and db
function deleteTask(clickedId) {
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${clickedId}`,
    }).then(function(response) {
        getTasks();
    }).catch(function(error) {
        console.log('error in DELETE:', error);
    });
};

function confirmDelete() {
    let clickedId = $(this).closest('tr').data('task').id;
    event.preventDefault();
    sweetAlert({
        text: 'Are you sure you wish to DELETE this task?',
        icon: 'warning',
        buttons: {
            accept: true,
            cancel: 'Cancel'
        }
    }).then(function(value) {
        if(value) {
            deleteTask(clickedId);
        };
    });
};