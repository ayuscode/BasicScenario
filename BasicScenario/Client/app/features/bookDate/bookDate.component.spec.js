describe('BookDate', function () {
    beforeEach(module('bookDate'));

    describe('BookDate Controller', function () {
        var ctrl;
        var $rootScope;

        beforeEach(inject(function ($componentController, _$rootScope_) {
            ctrl = $componentController('bookDate');
            $rootScope = _$rootScope_;
        }));

        it('Message should be funny', function () {
            expect(ctrl.Message).toBe('reserved system');
        });

        it(':: Booking date when isAuthenticated', function () {
            ctrl.BookingDate = Date();
            ctrl.Book();

            $rootScope.$apply();

            expect(ctrl.BookSuccess).toBe(true);

        });

    });
});