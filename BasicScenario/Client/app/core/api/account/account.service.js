angular.
    module('account').
    service('accountSvc', ['$http', 'authSvc', '$q', function($http, authSvc, $q){
        var baseUrl = 'http://localhost:35853/api/account/';

        this.register = function(user, password, confirmPassword)
        {
            var self = this;
            var deferred = $q.defer();

            var UserModel = { UserName : user, Pasword : password, ConfirmPassword: confirmPassword };
            $http.post(baseUrl + 'register', UserModel).then(
                // Success callback
                function(response)
                {
                    deferred.resolve(true);
                },
                // Error callback
                function(response)
                {
                    deferred.resolve(false);
                }
            );

            return deferred.promise;
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