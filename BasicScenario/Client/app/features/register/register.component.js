angular.
    module('register').
    component('register', {
        templateUrl : 'features/register/register.template.html',
        controller : ['accountSvc','coreSvc', function(accountSvc, coreSvc)
        {
            var self = this;

            this.Message = '';
            this.IsRegistered = false;

            this.Register = function() {
                accountSvc.register(this.User, this.Password, this.ConfirmPassword).then(
                    function(response){
                        if (response)
                            self.IsRegistered = true;
                        else   
                            self.Message = 'Unexpected error when registering. Please, try again';
                    },
                    function (response) {
                        self.Message = 'Unable to register:' + coreSvc.parseResponse(response);
                    }
                );                 
            };


            
        }]
    });