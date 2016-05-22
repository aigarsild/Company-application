(function ($, window, undefined)
{
    $.widget('vaimo.instantMessageRibbon', {
        options: {
            className: {
                button: '[data-target=log-in-button]',
                email: '#InputEmail1',
                password: '#InputPassword1',
                butt: '[data-target=show]',
                logout: '[data-target=logout]'
            },
            url: 'http://kooliprojekt.dev:8000/api/v2/companies'
        },
        state: {
            isContentOpened: false,
        },
        _init: function ()
        {

            $(this.options.className.butt).on('click', function ()
            {
                this.getCall();
            }.bind(this));

            $(this.options.className.logout).on('click', function ()
            {
                this.logOut();
            }.bind(this));

        },
        getCall: function ()
        {
            $.ajax({
                       url: 'http://kooliprojekt.dev:8000/api/v1/companies',
                       data: {
                           format: 'json'
                       },
                       type: 'GET',
                       beforeSend : function(xhr) {
                           var token = localStorage.getItem('Authorization');
                           xhr.setRequestHeader('Authorization', token);
                       },
                       error: function ()
                       {
                           $('#info').html('<p>An error has occurred</p>');
                       },
                       dataType: 'json',
                       success: function (data)
                       {
                           console.log(data[0].name);
                       }
                   });
        },
        logOut: function ()
        {

            var key = 'Authorization'
            localStorage.removeItem(key);

            if (!localStorage.getItem(key)) {
                alert('Successfully logged out');
            }
        }
    });

})(jQuery, window);

jQuery(document).ready(function ($)
                       {
                           $.vaimo.instantMessageRibbon();
                       });
