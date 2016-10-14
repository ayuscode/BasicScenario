angular.
    module('account').
    service('accountSvc', ['$http', 'authSvc', '$q', function($http, authSvc, $q){
        var baseUrl = 'http://localhost:35853/api/account/';

        this.validate = function (user, password) {
            var self = this;
            var deferred = $q.defer();

            // Call to api service
            var baseUrl = 'http://localhost:35853/token';

            // Data format in this way because the grant_type=password mode 
            var data = "userName=" + user + "&password=" + password + "&grant_type=password"
            $http.post(baseUrl, data, {
                headers: { 'Access-Control-Allow-Origin': '*' }
            }).then(function (response) {
                authSvc.setToken(response.data.access_token, response.data.expires_in);
                deferred.resolve(true);
            }, function (response) {
                authSvc.clear();
                deferred.reject(response);
            });

            return deferred.promise;
        };

        this.register = function(user, password, confirmPassword)
        {
            var self = this;
            var deferred = $q.defer();

            var UserModel = { UserName : user, Password : password, ConfirmPassword: confirmPassword };
            $http.post(baseUrl + 'register', UserModel).then(
                // Success callback
                function(response)
                {
                    deferred.resolve(true);
                },
                // Error callback
                function(response)
                {
                    deferred.reject(response);
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