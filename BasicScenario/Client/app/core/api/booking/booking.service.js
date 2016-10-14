angular.
    module('booking').
    service('bookingSvc', ['$http', '$q', 'authSvc', function ($http, $q, authSvc) {
        var baseUrl = 'http://localhost:35853/api/booking/';

        this.getUserReservations = function () {
            var deferred = $q.defer();

            if (authSvc.isAuthenticated()) {
                $http.get(baseUrl + 'user').then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                    }
                );
            }
            else {
                deferred.reject(false);
            }

            return deferred.promise;
        }

    }]);
    