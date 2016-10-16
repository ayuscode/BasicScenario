describe('BookDate', function () {
    beforeEach(module('bookdate'));
    beforeEach(module('booking'));

    describe('BookDate Controller', function () {
        var ctrl;
        var $rootScope;
        var bookingSvc;
        var $q;

        beforeEach(inject(function ($componentController, _$rootScope_, _$q_, _bookingSvc_) {
            ctrl = $componentController('bookdate');
            $rootScope = _$rootScope_;
            bookingSvc = _bookingSvc_;
            $q = _$q_;
            spyOn(bookingSvc, 'bookDate').and.callFake(function(date){
                var deferred = $q.defer();
                deferred.resolve(true);
                return deferred.promise;
            })
        }));


        it(':: Booking date when isAuthenticated', function () {
            ctrl.Date = new Date(Date.now());
            ctrl.Book();

            $rootScope.$apply();

            expect(ctrl.BookSuccess).toBe(true);

        });

    });
});