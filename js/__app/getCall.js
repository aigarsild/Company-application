    (function ($, window, undefined)
{
    $.widget('get.call', {
        options: {
            className: {
                list: '[data-target=comp-list]',
                button: '[data-button=button]',
            },
            url: 'http://aigarsild.ee/laravelservices/public/api/v1/companies',
            childUrl: 'http://aigarsild.ee/laravelservices/public/api/v2/company/employee/',
            type: 'GET',
        },
        _init: function ()
        {
            this.getCall();
        },
        getCall: function ()
        {
            $.ajax({
                       url: this.options.url,
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
                           $.each(data, function(index, element) {
                               var id = element.id;
                               var name = element.name;
                               $(this.options.className.list).append('<p data-button="button" data-id="'+id+'" class="list-group-item active">' +
                                                                     '<strong data-target="company-name">'+name+'</strong>' +
                                                                     '<a style="float: right" data-target="delete" data-delete_id="'+id+'" href="#">Delete /</a>' +
                                                                     '<a style="float: right" href="editcompany.php?companyId='+id+'">Edit /</a>' +
                                                                     '<a style="float: right" href="addnewcompany.php">Add new /</a>' +
                                                                     '</p>');
                           }.bind(this));
                       }.bind(this)
                   });
        }
    });
    //
    // $.widget('get.employees', $.get.call, {
    //     options: {
    //         active: false,
    //         url: 'http://kooliprojekt.dev:8000/api/v1/employees',
    //     }
    // });

})(jQuery, window);

    jQuery(document).ready(function ($) {

        $.get.call();
        //$.get.employees();


    });