    (function ($, window, undefined)
{
    $.widget('get.feedback', {
        options: {
            className: {
                firstList: '[data-target=personal-details]',
                secondList: '[data-target=descriptions]',
                thirdList: '[data-target=personal-feedback]',
                fourthList: '[data-target=personal-data]',
                count: '[data-target=count]',
                button: '[data-button=button]',
            },
            type: 'GET',
        },
        _init: function ()
        {
            this.getFeedback();
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
        getFeedback: function ()
        {
            var employeeId = this.getUrlVars()['employee'];

            $.ajax({
                       //url: 'http://kooliprojekt.dev:8000//api/v2/company/employee/'+employeeId,
                       url: 'http://aigarsild.ee/laravelservices/public/api/v2/employees/'+employeeId,
                       data: {
                           format: 'json'
                       },
                       type: this.options.type,
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
                           var dataLenght = data.length
                           if (dataLenght) {
                               $(this.options.className.count).append(dataLenght);
                           } else {
                               $(this.options.className.count).append('No feedback added');
                           }


                           if (data.length == 0) {

                           } else {
                               $.each(data, function(index, element) {

                                   $(this.options.className.firstList).append('<ul class="col-xs-12">' +
                                                                              '<li><strong>Personal tags: </strong>'+element.personal_tags+'</li>' +
                                                                              '<li style="border-bottom: solid 1px #3e3f3a; margin:0 0 20px 0; padding: 0 0 20px 0;"><strong>Professional tags: </strong>'+element.professional_tags+'</li></ul>');

                                   $(this.options.className.secondList).append('<ul class="col-xs-12"><li><strong>Rated as person: </strong>'+element.rate_person+'</li>' +
                                                                               '<li style="border-bottom: solid 1px #3e3f3a; margin:0 0 20px 0; padding: 0 0 20px 0;"><strong>Rated as professoinal: </strong>'+element.rate_profession+'</li>' +
                                                                               '</ul>');

                                   $(this.options.className.thirdList).append('<ul class="col-xs-12">' +
                                                                              '<li style="margin:20px 0;"><strong>Description of the employee: </strong>'+element.worker_description+'</li>' +
                                                                              '<li style="margin:20px 0;"><strong>Personal description: </strong>'+element.personal_description+'</li>' +
                                                                              '<li style="margin:20px 0;"><strong>Professional feedback: </strong>'+element.professional_feedback+'</li>' +
                                                                              '<li style="border-bottom: solid 1px #3e3f3a; margin:0 0 20px 0; padding: 0 0 20px 0;"><strong>Personal feedback: </strong>'+element.personal_feedback+'</li>' +
                                                                              '</ul>');

                                   $(this.options.className.fourthList).append( function ()
                                                                                {
                                                                                    if(element.sociable) {
                                                                                        return '<li><strong>Sociable:  </strong><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></li>';
                                                                                    } else {
                                                                                        return '<li><strong>Sociable:  </strong><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></li>';
                                                                                    }
                                                                                });
                                   $(this.options.className.fourthList).append( function ()
                                                                                {
                                                                                    if(element.creepy) {
                                                                                        return '<li><strong>Creepy:  </strong><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></li>';
                                                                                    } else {
                                                                                        return '<li><strong>Creepy:  </strong><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></li>';
                                                                                    }
                                                                                });
                                   $(this.options.className.fourthList).append( function ()
                                                                                {
                                                                                    if(element.sociable) {
                                                                                        return '<li style="border-bottom: solid 1px #3e3f3a; margin:0 0 20px 0; padding: 0 0 20px 0;"><strong>Awesome:  </strong><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></li>';
                                                                                    } else {
                                                                                        return '<li style="border-bottom: solid 1px #3e3f3a; margin:0 0 20px 0; padding: 0 0 20px 0;"><strong>Awesome:  </strong><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></li>';
                                                                                    }
                                                                                });

                               }.bind(this));
                           }
                       }.bind(this)
                   });

        }
    });

})(jQuery, window);

    jQuery(document).ready(function ($) {

        $.get.feedback();

    });