angular.
    module('login').
    component('login', {
        templateUrl : 'features/login/login.template.html',
        controller: ['$location', 'authSvc', 'accountSvc', 'coreSvc' ,function LoginController($location, authSvc, accountSvc, coreSvc)
        {
            if (authSvc.isAuthenticated())
                $location.path('/reservation');

            this.Message = '';

            this.Login = function()
            {
                var self = this;

                accountSvc.validate(self.User, self.Password).then(
                function (response)
                {
                    if (response)
                        $location.path('/reservation');
                    else
                        coreSvc.distributeMessage('Warning','Invalid user. Please, enter a valid credentials');
                }, 
                function (response)
                {
                    coreSvc.distributeMessage('Error','There was an error validating user', response);
                });
            };
            
        }]
    });