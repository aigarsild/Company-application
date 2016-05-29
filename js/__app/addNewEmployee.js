(function ($, window, undefined)
{
    $.widget('addNew.employee', {
        options: {
            className: {
                button: '[data-target=add-employee]',
            },
            values: {
                form: '[data-target=employee-form]',
                name: '[data-target=name]',
                email: '[data-target=email]',
                contact_number: '[data-target=contact_number]',
                position: '[data-target=position]',
            },
            url: 'http://aigarsild.ee/laravelservices/publicx/api/v2/companies/'
        },
        state: {
            isContentOpened: false,
        },
        _init: function ()
        {

            $('[data-target=comp-list]').on('click', '[data-target=add_employee]',function (e)
            {
                var parentId = $(e.currentTarget).closest('p').data('id');
                $(location).attr('href', 'addnewemployee.php?companyIdforEmployee='+parentId);

            }.bind(this));

            $('[data-target=add-employee]').on('click',function ()
            {
                var $form = this.options.className.form;
                if (!$form.checkValidity) {
                    console.log('tere');
                    this.addCall();
                }


            }.bind(this));

            var companyIdforEmployee = this.getUrlVars()['companyIdforEmployee'];
            if (companyIdforEmployee) {
                $.ajax({
                           url: this.options.url+companyIdforEmployee,
                           data: {
                               format: 'json'
                           },
                           type: 'GET',
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
                               $('[data-target=parent_name]').append(data.name);

                           }.bind(this)
                       });
            }

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
        addCall: function ()
        {
            var companyId = this.getUrlVars()['companyIdforEmployee'];
            var name = $(this.options.values.name).val();
            var email = $(this.options.values.email).val();
            var contact_number = $(this.options.values.contact_number).val();
            var field = $(this.options.values.position).val();

            $.ajax({
                       url: 'http://kooliprojekt.dev:8000/api/v1/employees/add',
                       data: 'company_id='+companyId+'&name='+name+'&email='+email+'&contact_number='+contact_number+'&position='+field,
                       type: 'POST',
                       beforeSend : function(xhr) {
                           $('#loader').show();
                           var token = localStorage.getItem('Authorization');
                           xhr.setRequestHeader('Authorization', token);
                       },
                       complete: function(){
                           $('#loader').hide();
                       },
                       error: function (error)
                       {
                           alert('There has been an error');
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

jQuery(document).ready(function ($)
                       {
                           $.addNew.employee();
                       });
