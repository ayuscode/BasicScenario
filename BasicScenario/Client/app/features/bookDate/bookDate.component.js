angular.
    module('bookdate').
    component('bookdate', {
        templateUrl: '/features/bookdate/bookdate.template.html',
        controller: ['bookingSvc', 'coreSvc', function (bookingSvc, coreSvc) {
            var self = this;

            this.Message = 'reserved system';
            this.Date = new Date(Date.now());
            this.BookSuccess = false;

            this.Book = function () {
                this.BookSuccess = false;
                bookingSvc.bookDate(this.Date).then(
                    function(data){
                        self.BookSuccess = data.IsSuccess;
                        self.Message = data.Message;
                        if (self.BookSuccess && self.onBook)
                            self.onBook();
                    },
                    function(response){
                        self.Message = coreSvc.parseResponse(response);
                    }
                )
            }

        }],
        bindings:{
            onBook : '&'
        }
    });