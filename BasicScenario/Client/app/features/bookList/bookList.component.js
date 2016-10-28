angular.
    module('booklist').
    component('booklist', {
        templateUrl: '/features/booklist/booklist.template.html',
        controller: ['bookingSvc','coreSvc', function (bookingSvc, coreSvc) {
            this.reservations = [];

            var self = this;

            // Handle new reservations
            bookingSvc.onNewReservation(function () {
                self.updateAllReservations();
            });


            this.updateAllReservations = function () {
                this.reservations.length = 0;

                bookingSvc.getAllReservations().then(
                    function (response) {
                        self.reservations = response.data;
                    },
                    function (respose) {
                        coreSvc.distributeMessage('Error', null, response);
                    });
            }

            this.updateAllReservations();

        }]
    });
    