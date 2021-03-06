    (function ($, window, undefined)
{
    $.widget('getI.tere', {
        options: {
            className: {
                list: '[data-target=comp-list]',
                button: '[data-button=button]',
            },
            url: 'http://aigarsild.ee/laravelservices/public/v2/company/employee/',
            type: 'GET',
        },
        _init: function ()
        {
            this.getItems();
        },
        getItems: function ()
        {
            $(this.options.className.list).on('click', this.options.className.button, function (e)
            {

                var parent_id = $(e.currentTarget).data('id');

                $.ajax({
                           url: 'http://aigarsild.ee/laravelservices/public/api/v2/company/employee/'+parent_id,
                           data: {
                               format: 'json'
                           },
                           type: this.options.type,
                           beforeSend : function(xhr) {
                               $('#loader').show();
                               var token = localStorage.getItem('Authorization');
                               xhr.setRequestHeader('Authorization', token);
                           },
                           error: function (error, xhr)
                           {
                               if (error == 'Unauthorized') {
                                   $(location).attr('href', 'login.php');
                                   localStorage.clear();
                                   alert('Session expired');
                               } else {
                                   alert(xhr.responseText);
                               }

                           },
                           dataType: 'json',
                           complete: function(){
                               $('#loader').hide();
                           },
                           success: function (data)
                           {
                               if (data.length == 0) {
                                   $('[data-id="'+parent_id+'"]').append('<p>There are no workers added</p><br>' +
                                                                         '<a data-target="add_employee" >Add employee/</a>');
                               } else {
                                   $.each(data, function(index, element) {
                                       var id = element.id;
                                       var name = element.name;
                                       $('[data-id="'+parent_id+'"]').append('<h3>'+name+'</h3>' +
                                                                             '<a style="float: right" data-target="delete_employee" data-delete_id="'+id+'" href="#">Delete /</a>' +
                                                                             '<a style="float: right" data-target="add_employee" >Add employee/</a>' +
                                                                             '<li><strong>Email: </strong>'+element.email+'</li>' +
                                                                             '<li><strong>Position: </strong>'+element.position+'</li>' +
                                                                             '<li><strong>Mob: </strong>'+element.contact_number+'</li>');
                                       $('[data-id="'+parent_id+'"]').append('<a href="addnewfeedback.php?employee='+id+'&employeeName='+name+'">Add feedback </a>' +
                                                                             '<a href="feedback.php?employee='+id+'">/ See feedback</a>');

                                   }.bind(this));
                               }
                           }.bind(this)
                       });


            }.bind(this)).on('click','a',function(e) {
                e.stopPropagation();
            });
        }
    });

})(jQuery, window);

    jQuery(document).ready(function ($) {

        $.getI.tere();

    });