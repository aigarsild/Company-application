(function ($, window, undefined)
{
    $.widget('vaimo.instantMessageRibbon', {
        options: {
            className: {
                button: '[data-target=log-in-button]',
                email: '#InputEmail1',
                password: '#InputPassword1',
                butt: '[data-target=show]'
            },
            url: 'http://kooliprojekt.dev:8000/api/v2/companies'
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

        },
        logIn: function ()
        {
            email = $(this.options.className.email).val();
            password = $(this.options.className.password).val();

            $.ajax({
                       url: 'http://kooliprojekt.dev:8000/api/v1/authenticate',
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
            console.log('tererererer');
            $.ajax({
                       url: 'http://kooliprojekt.dev:8000/api/v1/companies',
                       data: {
                           format: 'json'
                       },
                       beforeSend : function(xhr) {
                           token = localStorage.getItem('Authorization');

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
                       },
                       type: 'GET'
                   });
        }
    });

})(jQuery, window);

jQuery(document).ready(function ($)
                       {
                           $.vaimo.instantMessageRibbon();
                       });
