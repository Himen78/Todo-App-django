$(document).ready(function(){
    
    var csrfToken = $("input[name=csrfmiddlewaretoken]").val()

$("#createButton").click(function() {

    var serializedData = $("#createTask").serialize();
    
    $.ajax({
        url: $("createTask").data('url'), // get the url from task list html file
        data : serializedData, 
        type : 'post',
        success: function(response){
            $("#taskList").append('<div id="taskcard" data-id="'+response.task.id+'">'+ response.task.title +
            '<button type="button" data-id="'+ response.task.id +'">Close Task</button></div>')
            // location.reload(true);
            // setInterval('refreshPage()', 1000)
        }
    });

    $("#createTask")[0].reset();
});
// $("#taskcard").click(function(event){
    
$("#taskcard").on('click', function(event){
    
    event.stopPropagation();
    event.preventDefault();
    var dataId = $(this).data('id');

    $.ajax({
        url: '/tasks/' + dataId + '/delete/',
        data : {
            csrfmiddlewaretoken: csrfToken,
            id: dataId
        },
        type: 'post',
        dataType: 'json',
        success : function() {
            $('#taskcard[data-id="'+ dataId +'"]').remove();
        }
        // window.location.reload();
});
});
});