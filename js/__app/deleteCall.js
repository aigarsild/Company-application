    (function ($, window, undefined)
{
    $.widget('delete.call', {
        options: {
            className: {
                parent: '[data-target=comp-list]',
                button: '[data-target=delete]',
            },
            url: 'http://aigarsild.ee/laravelservices/public/api/v1/companies/delete/',
            type: 'DELETE',
            message: 'Are you sure you want to delete this company? It will delete all the workers and feedbacks assigned to this company',
        },
        _init: function ()
        {

            $(this.options.className.parent).on('click',this.options.className.button, function (e)
            {
                if (confirm(this.options.message)) {
                    var parent_id = $(e.currentTarget).data('delete_id');
                    $.ajax({
                               url: this.options.url+parent_id,
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
                                   $(location).attr('href', 'dashboard.php');
                                   alert('Successfully deleted');
                               },
                               success: function ()
                               {

                               }
                           });
                }
            }.bind(this));
        }
    });


    $.widget('delete.employees', $.delete.call, {
        options: {
            className: {
                parent: '[data-target=comp-list]',
                button: '[data-target=delete_employee]',
            },
            url: 'http://aigarsild.ee/laravelservices/public/api/v1/employees/delete/',
            message: 'Are you sure you want to delete this employee? It will delete all the feedbacks assigned to this worker',
        }
    });

})(jQuery, window);

    jQuery(document).ready(function ($) {

        $.delete.call();
        $.delete.employees();

    });