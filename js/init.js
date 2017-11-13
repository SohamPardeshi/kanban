// Initialize Firebase
var config = {
    apiKey: "AIzaSyARhDpqQqd3gJXy6P63rOvpK2eAaScM_Kg",
    authDomain: "mykanban-45451.firebaseapp.com",
    databaseURL: "https://mykanban-45451.firebaseio.com",
    projectId: "mykanban-45451",
    storageBucket: "mykanban-45451.appspot.com",
    messagingSenderId: "288865808133"
};
firebase.initializeApp(config);

// Download Data
function createTask(id, name, description, group) {
    firebase.database().ref('tasks/' + id).set({
        time_created: Date.now(),
        time_edited: Date.now(),
        name: name,
        description: description,
        group : group
    });
}

function removeTask(task){
    var id = $(task).parent().parent().attr('id');
    $('#modal2').modal('open');
    $('#modal-delete').on('click', function(){
        $('#' + id).remove();
        firebase.database().ref('tasks/' + id).remove();
    });
}

function viewTask(task){
    var id = $(task).parent().parent().attr('id'); 
    $('#view_title').text($('#' + id).find(".card-title").text());
    $('#view_description').text($('#' + id).find(".card-descr").text());
    $('#modal3').modal('open');
}

function makeCard(id, name, description, group) {
    $('#' + group).prepend("<li id="+id+" ><div class='card blue-grey darken-1'><span class='card-close' onClick='removeTask(this)'><i class='fa fa-times' aria-hidden='true'></i></span><span class='card-view' onClick='viewTask(this)'><i class='fa fa-eye' aria-hidden='true'></i></span><div class='card-content white-text'><span class='card-title'>"+name+"</span><p class='card-descr'>"+description+"</p></div></div></li>");
    return document.getElementById(id);
}

firebase.database().ref('tasks').on("child_added", function(snapshot, prevChildKey) {
    var task = snapshot.val();
    makeCard(task.time_created, task.name, task.description, task.group);
});
firebase.database().ref('tasks').on("child_changed", function(snapshot, prevChildKey) {
    var task = snapshot.val();
    $('#' + task.time_created).remove();
    makeCard(task.time_created, task.name, task.description, task.group);
});
