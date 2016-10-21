describe('BookList', function () {
    beforeEach(module('booklist'));
    beforeEach(module('booking'));

    describe('BookList Controller', function () {
        var ctrl;
        var $rootScope;
        var bookingSvc;
        var $q;

        beforeEach(inject(function ($componentController, _$rootScope_, _$q_, _bookingSvc_) {
            ctrl = $componentController('booklist');
            $rootScope = _$rootScope_;
            bookingSvc = _bookingSvc_;
            $q = _$q_;
            spyOn(bookingSvc, 'getAllReservations').and.callFake(function (date) {
                var deferred = $q.defer();
                deferred.resolve(['2016-10-17','2016-10-18']);
                return deferred.promise;
            })
        }));


        it(':: Get All Reservations', function () {
            ctrl.Date = new Date(Date.now());
            ctrl.Book();

            $rootScope.$apply();

            expect(ctrl.BookSuccess).toBe(true);

        });

    });
});