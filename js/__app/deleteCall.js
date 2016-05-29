    (function ($, window, undefined)
{
    $.widget('delete.call', {
        options: {
            className: {
                parent: '[data-target=comp-list]',
                button: '[data-target=delete]',
            },
            url: 'http://aigarsild.ee/laravelservices/public/companies/delete/',
            type: 'DELETE',
        },
        _init: function ()
        {

            $(this.options.className.parent).on('click',this.options.className.button, function (e)
            {
                if (confirm('Are you sure you want to delete this company? It will delete all the workers and feedbacks assigned to this company')) {
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
                               error: function (data)
                               {
                                   if (data.error == 'token_not_provided') {
                                       $(location).attr('href', 'login.php');
                                       localStorage.clear();
                                       alert('Session expired');
                                   }

                               },
                               dataType: 'json',
                               complete: function(){
                                   $('#loader').hide();
                                   $(location).attr('href', 'dashboard.php');
                                   alert('Company deleted');
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
        }
    });

})(jQuery, window);

    jQuery(document).ready(function ($) {

        $.delete.call();
        $.delete.employees();

    });