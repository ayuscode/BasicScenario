angular.
    module('account').
    service('accountSvc', ['$http', 'authSvc', function($http, authSvc){
        var baseUrl = 'http://localhost:35853/api/account/';

        //$http.post('/someUrl', data, config).then(successCallback, errorCallback);
        this.register = function(user, password)
        {
            var UserModel = { UserName : user, Pasword : password, ConfirmPassword: password };
            $http.post(baseUrl + 'register', UserModel).then(
                // Success callback
                function(response)
                {
                    return true;
                },
                // Error callback
                function(response)
                {
                    return false;
                }
            );
        }

        this.getUser = function()
        {
            if (authSvc.isAuthenticated())
            {
                $http.get(baseUrl + 'user', 
                {
                    headers : {
                                "accept": "application/json",
                                "content-type": "application/json",
                                "authorization": "Bearer " + authSvc.token
                    }
                }).then(
                    function(response)
                    {
                        return response.data;
                    },
                    function(response)
                    {
                        return 'Invalid User';
                    }
                );
            }
            return 'Not Authenticated';
        } 
    }]);