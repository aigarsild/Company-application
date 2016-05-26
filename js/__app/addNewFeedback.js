(function ($, window, undefined)
{
    $.widget('addNew.feedback', {
        options: {
            className: {
                button: '[data-target=add-feedback]',
                count: '[data-target=count]',
            },
            values: {
                personalTags: '[data-target=personal_tags]',
                professionalTags: '[data-target=professional_tags]',
                personalRating: '[data-target=personal_rating]',
                professionalRating: '[data-target=professional_rating]',

                employeeDesc: '[data-target=employee_desc]',
                employeePersonalDesc: '[data-target=employee_personal_desc]',
                employeeProfDesc: '[data-target=employee_prof_desc]',
                employeeFeedback: '[data-target=employee_feedback]',

                sociable: '[data-target=sociable]:checked',
                creepy: '[data-target=creepy]:checked',
                awesome: '[data-target=awesome]:checked',
            },
            url: 'http://kooliprojekt.dev:8000/api/v2/feedbacks/store',
            type: 'POST'
        },
        _init: function ()
        {
            var employeeName = this.getUrlVars()['employeeName'];

            $(this.options.className.count).append('Adding feedback for: ' + decodeURI(employeeName));

            $(this.options.className.button).on('click',function ()
            {
                this.addCall();

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
        addCall: function ()
        {
            var employee = this.getUrlVars()['employee'];
            var personalTags = $(this.options.values.personalTags).val();
            var professionalTags = $(this.options.values.professionalTags).val();
            var personalRating = $(this.options.values.personalRating).val();
            var professionalRating = $(this.options.values.professionalRating).val();

            var employeeDesc = $(this.options.values.employeeDesc).val();
            var employeePersonalDesc = $(this.options.values.employeePersonalDesc).val();
            var employeeProfDesc = $(this.options.values.employeeProfDesc).val();
            var employeeFeedback = $(this.options.values.employeeFeedback).val();

            var sociable = $(this.options.values.sociable).val();
            var creepy = $(this.options.values.creepy).val();
            var awesome = $(this.options.values.awesome).val();

            $.ajax({
                       url: this.options.url,
                       data: 'employee_id='+employee+
                             '&personal_tags='+personalTags+
                             '&professional_tags='+professionalTags+
                             '&rate_person='+personalRating+
                             '&rate_profession='+professionalRating+
                             '&worker_description='+employeeDesc+
                             '&personal_description='+employeePersonalDesc+
                             '&professional_feedback='+employeeProfDesc+
                             '&personal_feedback='+employeeFeedback+
                             '&sociable='+sociable+
                             '&creepy='+creepy+
                             '&awesome='+awesome,
                       type: this.options.type,
                       beforeSend: function(xhr) {
                           $('#loader').show();
                           var token = localStorage.getItem('Authorization');
                           xhr.setRequestHeader('Authorization', token);
                       },
                       complete: function(){
                           $('#loader').hide();
                       },
                       error: function (error)
                       {
                           $(location).attr('href', 'dashboard.php');

                       },
                       dataType: 'json',
                       success: function ()
                       {
                           $(location).attr('href', 'dashboard.php');
                       }
                   });
        }
    });

})(jQuery, window);

jQuery(document).ready(function ($)
                       {
                           $.addNew.feedback();
                       });
