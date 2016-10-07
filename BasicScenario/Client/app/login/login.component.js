angular.
    module('login').
    component('login', {
        templateUrl : 'login/login.template.html',
        controller: ['$location', 'authSvc',function LoginController($location, authSvc)
        {
            if (authSvc.isAuthenticated())
                $location.path('/booking');

            this.Message = "Please, enter your credentials";

            this.Login = function()
            {
                var self = this;

                authSvc.validate(self.User, self.Password).then(
                function (response)
                {
                    if (response)
                        $location.path('/booking');
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