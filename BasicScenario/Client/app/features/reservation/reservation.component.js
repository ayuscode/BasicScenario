angular.
    module('basicScenario').
    component('reservation', {
        templateUrl: 'features/reservation/reservation.template.html',
        controller: ['coreSvc', 'bookingSvc', function (coreSvc, bookingSvc) {
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