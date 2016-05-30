(function ($, window, undefined)
{
    $.widget('addNew.employee', {
        options: {
            className: {
                button: '[data-target=add-employee]',
            },
            values: {
                name: '[data-target=name]',
                email: '[data-target=email]',
                contact_number: '[data-target=contact_number]',
                position: '[data-target=position]',
            },
            url: 'http://aigarsild.ee/laravelservices/public/api/v2/companies/'
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
                if ($(this.options.values.name).val() == '') {

                    alert('Name cant be empty');
                    $(this.options.values.name).css('border', 'solid 1px red');

                } else {

                    $(this.options.values.name).css('border', 'solid 1px #dfd7ca');
                    var email = $(this.options.values.email).val();

                    if (email.indexOf('@') >= 0) {

                        $(this.options.values.email).css('border', 'solid 1px #dfd7ca');
                        var phone = $(this.options.values.contact_number).val();

                        if ($.isNumeric(phone)) {

                            $(this.options.values.contact_number).css('border', 'solid 1px #dfd7ca');
                            this.addCall();

                        } else {

                            alert('Number should only contain numbers');
                            $(this.options.values.contact_number).css('border', 'solid 1px red');
                        }

                    } else {
                        alert('Email is not valid');
                        $(this.options.values.email).css('border', 'solid 1px red');
                    }
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
                           error: function (error, xhr)
                           {
                               if (error == 'Unauthorized') {
                                   $(location).attr('href', 'login.php');
                                   localStorage.clear();
                                   alert('Session expired');
                               } else {
                                   alert(xhr.responseText);
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
                       url: 'http://aigarsild.ee/laravelservices/public/api/v1/employees/add',
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
                           alert(error);

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
