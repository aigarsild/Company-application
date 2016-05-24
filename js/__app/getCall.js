    (function ($, window, undefined)
{
    $.widget('get.call', {
        options: {
            className: {
                list: '[data-target=comp-list]',
                button: '[data-button=button]',
            },
            url: 'http://kooliprojekt.dev:8000/api/v1/companies',
            childUrl: 'http://kooliprojekt.dev:8000//api/v2/company/employee/',
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
                       },
                       success: function (data)
                       {
                           $.each(data, function(index, element) {
                               var id = element.id;
                               var name = element.name;
                               $(this.options.className.list).append('<p data-button="button" data-id="'+id+'" class="list-group-item active">' +
                                                                     '<strong>'+name+'</strong>' +
                                                                     '<a style="float: right" href="editcompany.php?companyId='+id+'"> Edit</a>' +
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