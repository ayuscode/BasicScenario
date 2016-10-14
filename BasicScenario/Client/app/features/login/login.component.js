angular.
    module('login').
    component('login', {
        templateUrl : 'features/login/login.template.html',
        controller: ['$location', 'authSvc', 'accountSvc' ,function LoginController($location, authSvc, accountSvc)
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
                        self.Message = "Invalid user. Please, enter a valid credentials";
                }, 
                function (response)
                {
                    console.log(response);
                    self.Message = 'There was an error validating user: ' + response;
                });
            };
            
        }]
    });