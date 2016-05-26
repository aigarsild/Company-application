(function ($, window, undefined)
{
    $.widget('user.session', {
        options: {
            className: {
                userName: '[data-target=userName]',
                userNameInsert: '[data-target=userNameInsert]',
                loggedIn: '[data-target=login]',
                logInTekst: '[data-target=login-tekst]',
            },
            url: 'http://aigarsild.ee/blog/public/api/v1/authenticate'
        },
        _init: function ()
        {
            this.checkSession();
            this.hideContent();
        },

        checkSession: function ()
        {
            var token = localStorage.getItem('Authorization');

            if (token) {
               var userName = localStorage.getItem('Username');
                $(this.options.className.userName).removeClass('hidden');
                $(this.options.className.userName).append(userName);
            }
        },

        hideContent: function ()
        {
            var token = localStorage.getItem('Authorization');
            if (token) {
                $(this.options.className.loggedIn).addClass('hidden');
                $(this.options.className.logInTekst).append('Log out');
            }
        }
    });

})(jQuery, window);
jQuery(document).ready(function ($)
                       {
                           $.user.session();
                       });
