describe('BookList', function () {
    beforeEach(module('booklist'));
    beforeEach(module('booking'));

    describe('BookList Controller', function () {
        var ctrl;
        var $rootScope;
        var bookingSvc;
        var $q;

        beforeEach(inject(function ($componentController, _$rootScope_, _$q_, _bookingSvc_) {
            bookingSvc = _bookingSvc_;
            $rootScope = _$rootScope_;
            $q = _$q_;

            spyOn(bookingSvc, 'getAllReservations').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve({ data: ['2016-10-17', '2016-10-18'] });
                return deferred.promise;
            })
            ctrl = $componentController('booklist');
        }));


        it(':: Get All Reservations', function () {
            ctrl.updateAllReservations();
            $rootScope.$apply();

            expect(ctrl.reservations.length).toBe(2);
        });

    });
});