angular.
    module('register').
    component('register', {
        templateUrl : 'register/register.template.html',
        controller : ['accountSvc', function(accountSvc)
        {
            var self = this;

            this.Message = '';

            this.Register = function() {
                accountSvc.register(this.User, this.Password, this.ConfirmPassword).then(
                    function(response){
                        if (response)
                            self.Message = 'Thank you and welcome to our site';
                        else   
                            self.Message = 'Unable to register';
                    },
                    function (response){
                        self.Message = 'Sorry, try it again later';
                    }
                );                 
            };
        }]
    });