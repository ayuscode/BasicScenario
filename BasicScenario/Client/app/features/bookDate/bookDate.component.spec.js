describe('BookDate', function () {
    beforeEach(module('bookdate'));

    describe('BookDate Controller', function () {
        var ctrl;
        var $rootScope;

        beforeEach(inject(function ($componentController, _$rootScope_) {
            ctrl = $componentController('bookdate');
            $rootScope = _$rootScope_;
        }));


        it(':: Booking date when isAuthenticated', function () {
            ctrl.Date = new Date(Date.now());
            ctrl.Book();

            $rootScope.$apply();

            expect(ctrl.BookSuccess).toBe(true);

        });

    });
});