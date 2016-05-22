(function ($, window, undefined)
{
    $.widget('user.session', {
        options: {
            className: {
                userName: '[data-target=userName]',
                userNameInsert: '[data-target=userNameInsert]',
                email: '#InputEmail1',
                password: '#InputPassword1',
            },
            url: 'http://kooliprojekt.dev:8000/api/v1/authenticate'
        },
        _init: function ()
        {
            this.checkSession();
        },
        checkSession: function ()
        {
            var token = localStorage.getItem('Authorization');

            if (token) {
               var userName = localStorage.getItem('Username');
                $(this.options.className.userName).removeClass('hidden');
                $(this.options.className.userName).append(userName);
            }
        }
    });

})(jQuery, window);
jQuery(document).ready(function ($)
                       {
                           $.user.session();
                       });
