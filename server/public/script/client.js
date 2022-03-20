$(readyNow);

function readyNow() {
    console.log('hello');
    $('#addTask').on('click', addTask)
    $('.table').on('click', '.deleteBtn', doubleCheckDelete)
    $('.table').on('click', '.completeBtn', markComplete)

    refreshList();
}

function refreshList() {
    $.ajax({
        url: "/tasks",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        renderTasks(response);
    }).catch(function(error) {
        console.log(error);
        alert('Issue in GET (ajax)')
    })
};

function renderTasks( tasks ) {
    $('#toDoList').empty();

    for (const task of tasks) {
        if(task.is_it_complete === false) {
        $('#toDoList').append(`
        <tr data-id=${task.id}>
            <td>${task.task}</td>
            <td><button type="button" class="completeBtn btn btn-success">Mark Complete</button></td>
            <td><button type="button" class="deleteBtn btn btn-danger">Delete</button></td>
        </tr>
        `)
        } else if (task.is_it_complete === true) {
            let date = task.time_completed;
            date = date.toString().substring(0, 10);

            $('#toDoList').append(`
        <tr data-id=${task.id}>
            <td>${task.task}</td>
            <td>
            <p class="complete rainbow-text">Completed!</p>
            <span class="complete dateCompleted">Completed on: ${date}</span>
            </td>
            <td><button type="button" class="deleteBtn btn btn-danger">Delete</button></td>
        </tr>
        `)
        }
    }
}

function addTask() {
    let newTask = $('#task').val();
    console.log(newTask);
    $('#task').val('');
    
    $.ajax({
        url: '/tasks',
        method: 'POST',
        data: {task: newTask}
    }).then(function(response) {
            console.log(response);
            refreshList();
        }).catch(function(error) {
            console.log('Error in ajax POST', error);
            alert('error in ajax post', error)
    })
}

function doubleCheckDelete() {
    let id = $(this).closest('tr').data('id')
            console.log(id);
    swal({
        title: "Delete this task?",
        icon: "warning",
        buttons: ['No...', 'Yeah!'],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Well aren't you the busy bee", {
            icon: "success",
          });
          deleteTask();
        } else {
        
        }
      });
    function deleteTask() {
    
            // let id = $(this).closest('tr').data('id')
            // console.log(id);
            
        
            $.ajax({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }).then(function(response) {
                console.log(response);
                refreshList();
            }).catch(function(error) {
                console.log('error in delete', error);
                alert('error in delete', error)
            })
    }
}

// function deleteTask() {
//     let id = $(this).closest('tr').data('id')
//     console.log(id);
    

//     $.ajax({
//         url: `/tasks/${id}`,
//         method: 'DELETE'
//     }).then(function(response) {
//         console.log(response);
//         refreshList();
//     }).catch(function(error) {
//         console.log('error in delete', error);
//         alert('error in delete', error)
//     })
// }


function markComplete() {
    let id = $(this).closest('tr').data('id');
    console.log(id, 'is complete!');

    $.ajax({
        url: `/tasks/${id}`,
        method: 'PUT'
    }).then(function(response) {
        console.log('Updated!');
        refreshList();
    }).catch(function(error) {
        console.log('error in put', error);
        alert('error in put', error);
    })
    
}