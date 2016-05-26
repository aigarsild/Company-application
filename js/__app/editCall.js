    (function ($, window, undefined)
{
    $.widget('edit.call', {
        options: {
            className: {
                name: '[data-target=name]',
                number: '[data-target=contact_number]',
                field: '[data-target=field]',
                button: '[data-target=edit]'
            },
            url: 'http://kooliprojekt.dev:8000/api/v1/companies/',
            type: 'GET',
            editUrl: 'http://kooliprojekt.dev:8000/api/v1/companies/edit/',
            editType: 'POST'
        },
        _init: function ()
        {
            this.getCall();
            $(this.options.className.button).on('click', function ()
            {
                this.editCall();
            }.bind(this));
        },
        getUrlVars: function(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++){
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getCall: function ()
        {
            var companyId = this.getUrlVars()['companyId'];
            $.ajax({
                       url: this.options.url+companyId,
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
                           $(this.options.className.name).val(data.name);
                           $(this.options.className.number).val(data.contact_number);
                           $(this.options.className.field).val(data.field);
                       }.bind(this)
                   });
        },
        editCall: function ()
        {
            var name = $(this.options.className.name).val();
            var contact_number = $(this.options.className.number).val();
            var field = $(this.options.className.field).val();

            var companyId = this.getUrlVars()['companyId'];

            $.ajax({
                       url: this.options.editUrl+companyId,
                       data: 'name='+name+'&contact_number='+contact_number+'&field='+field,
                       type: this.options.editType,
                       beforeSend : function(xhr) {
                           $('#loader').show();
                           var token = localStorage.getItem('Authorization');
                           xhr.setRequestHeader('Authorization', token);
                       },
                       complete: function(data){
                           $('#loader').hide();
                           $(location).attr('href', 'dashboard.php');
                       },
                       error: function (data)
                       {
                           if (data.error == 'token_not_provided' || data.error == 'token_expired') {
                               $(location).attr('href', 'login.php');
                               localStorage.clear();
                               alert('Session expired');
                           }
                       },
                       dataType: 'json',
                       success: function (data)
                       {
                           $(location).attr('href', 'dashboard.php');

                       }
                   });
        }
    });
})(jQuery, window);

    jQuery(document).ready(function ($) {

        $.edit.call();

    });