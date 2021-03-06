(function ($, window, undefined)
{
    $.widget('app.logIn', {
        options: {
            className: {
                button: '[data-target=log-in-button]',
                email: '#InputEmail1',
                password: '#InputPassword1',
            },
            url: 'http://aigarsild.ee/laravelservices/public/api/v1/authenticate',
            urlUsers: 'http://aigarsild.ee/laravelservices/public/api/v1/users/all'
        },
        _init: function ()
        {
            $(this.options.className.button).on('click', function ()
            {
                this.logIn();
            }.bind(this));
        },
        logIn: function ()
        {
            var email = $(this.options.className.email).val();
            var password = $(this.options.className.password).val();

            $.ajax({
                       url: this.options.url,
                       data: 'email='+email+'&password='+password,
                       type: 'POST',
                       processData: false,
                       beforeSend: function ()
                       {
                           $('#loader').show();
                       },
                       error: function() {
                           alert('Error in login');
                       },
                       complete: function ()
                       {
                           $('#loader').hide();
                       },
                       dataType: 'json',
                       success: function(data) {
                           if (data.result) {
                               if(typeof(Storage) !== 'undefined') {
                                   localStorage.setItem('Authorization', 'Bearer ' +data.token);
                                   this.getUserId();
                               } else {
                                   alert('Update the browser to use this application');
                               }
                           } else {
                               alert('Incorrect credentials');
                           }
                       }.bind(this),
                   });
        },
        getUserId: function ()
        {

            var userEmail = $(this.options.className.email).val();
            $.ajax({
                       url: this.options.urlUsers,
                       type: 'GET',
                       dataType: 'json',
                       success: function(data) {

                           $.each(data, function(index, element) {
                               if (element.email == userEmail) {
                                   if(typeof(Storage) !== 'undefined') {
                                       localStorage.setItem('Username', element.name);
                                       localStorage.setItem('UserId', element.id);
                                       $(location).attr('href', 'dashboard.php');
                                   } else {
                                       alert('Update the browser to use this application');
                                   }
                                   return;
                               }
                           });
                       },
                   });
        }
    });

})(jQuery, window);

jQuery(document).ready(function ($)
                       {
                           $.app.logIn();
                       });
