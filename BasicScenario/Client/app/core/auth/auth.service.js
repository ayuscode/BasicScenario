angular.
    module('auth').
    service('authSvc', ['$http', '$cookies', '$q', function($http, $cookies, $q)
    {
        // Service features:
            // - Validate user login (user & password)
            // - Manage token authentication
            // - Determine if user is athenticated

        this.validate = function (user, password)
        {
            var self = this;
            var deferred = $q.defer();

            // Call to api service
            var baseUrl = 'http://localhost:35853/token';
            
            // Data format in this way because the grant_type=password mode 
            var data = "userName=" + user + "&password=" + password + "&grant_type=password"
            $http.post(baseUrl, data, { headers : {'Access-Control-Allow-Origin' : '*'}
            }).then(function (response)
            {
                // Calculate expire date
                var now = new Date();
                now.setSeconds(now.getSeconds() + response.data.expires_in);

                // Store token
                $cookies.put('token', response.data.access_token, { expires: now } );
                deferred.resolve(true);
            }, function (response)
            {
                // Delete cookie
                self.clear();
                deferred.reject(response);
            });

            return deferred.promise;
        };

        this.isAuthenticated = function()
        {
            var token = $cookies.get('token');
            if (token) return true;
            return false;
        };

        this.getToken = function()
        {
            return $cookies.get('token');
        }

        this.clear = function()
        {
            $cookies.remove('token');
        };
    }]);