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
            url: 'http://aigarsild.ee/laravelservices/public/v2/companies'
        },
        state: {
            isContentOpened: false,
        },
        _init: function ()
        {
            $(this.options.className.button).on('click', function ()
            {
                this.logIn();
            }.bind(this));

            $(this.options.className.butt).on('click', function ()
            {
                this.getCall();
            }.bind(this));

            $(this.options.className.logout).on('click', function ()
            {
                this.logOut();
            }.bind(this));

        },
        logIn: function ()
        {
            email = $(this.options.className.email).val();
            password = $(this.options.className.password).val();

            $.ajax({
                       url: 'http://aigarsild.ee/laravelservices/public/api/v1/authenticate',
                       data: 'email='+email+'&password='+password,
                       type: 'POST',
                       processData: false,
                       error: function() {
                           $('#info').html('<p>An error has occurred</p>');
                       },
                       dataType: 'json',
                       success: function(data) {
                           if (data.result) {
                               if(typeof(Storage) !== 'undefined') {
                                   localStorage.setItem('Authorization', 'Bearer ' +data.token);
                                   $(location).attr('href', 'companies.html');
                               } else {
                                   alert('Update the browser to use this application');
                               }
                           } else {
                               alert('Incorrect password');
                           }
                       },
                   });

        },
        getCall: function ()
        {
            $.ajax({
                       url: 'http://aigarsild.ee/laravelservices/public/api/v1/companies',
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
