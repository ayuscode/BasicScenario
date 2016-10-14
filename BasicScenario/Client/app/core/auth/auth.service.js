angular.
    module('auth').
    service('authSvc', ['$cookies', '$q', function($cookies, $q)
    {
        // Service features:
            // - Manage token authentication
            // - Determine if user is athenticated

        this.isAuthenticated = function()
        {
            var token = $cookies.get('token');
            if (token) return true;
            return false;
        };

        this.setToken = function (token, expiration) {
            // Calculate expire date
            var now = new Date();
            now.setSeconds(now.getSeconds() + expiration);

            // Store token
            $cookies.put('token', token, { expires: now });
        }

        this.getToken = function()
        {
            return $cookies.get('token');
        }

        this.clear = function()
        {
            $cookies.remove('token');
        };
    }]);