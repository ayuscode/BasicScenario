angular.
    module('basicScenario').
    component('reservation', {
        templateUrl: 'features/reservation/reservation.template.html',
        controller: ['$location', 'authSvc', 'coreSvc', 'bookingSvc', function ($location, authSvc, coreSvc, bookingSvc) {
            if (!authSvc.isAuthenticated()){
                $location.path('/');
            }
            
            this.reservations = [];

            this.updateReservations = function()
            {
                var self = this;
                self.reservations.length = 0;

                bookingSvc.getUserReservations().then(
                    function (response) {
                        self.reservations = response.data;
                    },
                    function (response) {
                        this.Message = coreSvc.parseResponse(response);
                    });
            }
            
            this.updateReservations();
        }]
    });