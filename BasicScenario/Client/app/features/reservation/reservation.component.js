angular.
    module('basicScenario').
    component('reservation', {
        templateUrl: 'features/reservation/reservation.template.html',
        controller: ['$location', 'authSvc', 'coreSvc', 'bookingSvc', function ($location, authSvc, coreSvc, bookingSvc) {
            if (!authSvc.isAuthenticated()){
                $location.path('/');
            }
            
            coreSvc.clearMessage();
            this.reservations = [];
            this.showAll = false;
            this.toggleMessage = 'Show all reservations';

            this.toggleShowAll = function () {
                this.showAll = !this.showAll;
                this.toggleMessage = (this.showAll) ? 'Hide reservations' : 'Show all reservations';
            }
            
            this.updateReservations = function()
            {
                var self = this;
                self.reservations.length = 0;

                bookingSvc.getUserReservations().then(
                    function (response) {
                        self.reservations = response.data;
                    },
                    function (response) {
                        coreSvc.distributeMessage('Error', null, response);
                    });
            }
            
            this.updateReservations();
        }]
    });