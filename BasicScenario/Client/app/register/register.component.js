angular.
    module('register').
    component('register', {
        templateUrl : 'register/register.template.html',
        controller : [function()
        {
            this.Message = 'Here you can register';
        }]
    });