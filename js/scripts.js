var lastUpdate = 0;

$(function() {

    $(function() {
        $("#todo, #in-progress, #done").sortable({
            connectWith: ".mycolumn",
            update: function(event, ui) {
                if(Date.now() - lastUpdate > 100) {
                    var id = $(ui.item).attr('id');
                    var group = $(ui.item).parent().attr('id');

                    firebase.database().ref('tasks/' + id).update({
                        time_edited: Date.now(),
                        group : group
                    });
                    lastUpdate = Date.now();
                }
            }
        }).disableSelection();
    });

    
    // Modal-related Actions
    $('.modal').modal();
    $('#modal-cancel').on('click', function(){
        $('#task_title').val('');
        $('#task_description').val('');
    });
    $('#modal-create').on('click', function(){
        createTask(Date.now(), $('#task_title').val(), $('#task_description').val(), "todo");
        $('#task_title').val('');
        $('#task_description').val('');
    });
    
});

 