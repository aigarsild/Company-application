    (function ($, window, undefined)
{
    $.widget('create.call', {
        options: {
            className: {
                button: '[data-target=add]',
            },
            values: {
                name: '[data-target=name]',
                contact_number: '[data-target=contact_number]',
                field: '[data-target=field]',
            },
            url: 'http://aigarsild.ee/blog/public/api/v1/companies',
            type: 'POST',
        },
        _init: function ()
        {
            $(this.options.className.button).on('click', function ()
            {
                this.createCall();
            }.bind(this));

        },
        createCall: function ()
        {

            var name = $(this.options.values.name).val();
            var contact_number = $(this.options.values.contact_number).val();
            var field = $(this.options.values.field).val();

            $.ajax({
                       url: this.options.url,
                       data: 'name='+name+'&contact_number='+contact_number+'&field='+field,
                       type: this.options.type,
                       beforeSend : function(xhr) {
                           $('#loader').show();
                           var token = localStorage.getItem('Authorization');
                           xhr.setRequestHeader('Authorization', token);
                       },
                       complete: function(){
                           $('#loader').hide();
                       },
                       error: function (error, xhr)
                       {
                           $(location).attr('href', 'login.php');
                           localStorage.clear();
                       },
                       dataType: 'json',
                       success: function (data)
                       {
                           $(location).attr('href', 'dashboard.php');
                               alert(data.success);
                       },
                   });

        }
    });

})(jQuery, window);


    jQuery(document).ready(function ($) {

        $.create.call();

    });