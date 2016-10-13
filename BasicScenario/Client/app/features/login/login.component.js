angular.
    module('login').
    component('login', {
        templateUrl : 'features/login/login.template.html',
        controller: ['$location', 'authSvc',function LoginController($location, authSvc)
        {
            if (authSvc.isAuthenticated())
                $location.path('/reservation');

            this.Message = '';

            this.Login = function()
            {
                var self = this;

                authSvc.validate(self.User, self.Password).then(
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