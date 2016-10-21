angular.
    module('booking').
    service('bookingSvc', ['$http', '$q', 'authSvc', function ($http, $q, authSvc) {
        var baseUrl = 'http://localhost:35853/api/booking/';
        var callbacks = [];

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

        this.getAllReservations = function () {
            var deferred = $q.defer();

            $http.get(baseUrl).then(
                function (response) {
                    deferred.resolve(response);
                },
                function (response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        this.bookDate = function(date){
            var deferred = $q.defer();

            if (authSvc.isAuthenticated()) {
                var payload = '?date=' + date.toJSON();
                $http.post(baseUrl + 'book' + payload).then(
                    function(response){
                        deferred.resolve(response.data);

                        // New reservation trigger
                        angular.forEach(callbacks, function (value, key) {
                            value();
                        });
                    },
                    function(response){
                        deferred.reject(response);
                    }
                );
            }
            else{
                deferred.reject(false);
            }

            return deferred.promise;
        }

        
        this.onNewReservation = function (callback) {
            callbacks.push(callback);
        }

    }]);
    