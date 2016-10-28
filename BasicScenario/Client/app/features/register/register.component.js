angular.
    module('register').
    component('register', {
        templateUrl : 'features/register/register.template.html',
        controller : ['accountSvc','coreSvc', function(accountSvc, coreSvc)
        {
            coreSvc.clearMessage();
            var self = this;
            this.IsRegistered = false;

            this.Register = function() {
                accountSvc.register(this.User, this.Password, this.ConfirmPassword).then(
                    function(response){
                        if (response)
                            self.IsRegistered = true;
                        else
                            coreSvc.distributeMessage('Warning','Unexpected error when registering. Please, try again');
                    },
                    function (response) {
                        coreSvc.distributeMessage('Error','Unable to register', response);
                    }
                );              
            };

            
            
        }]
    });