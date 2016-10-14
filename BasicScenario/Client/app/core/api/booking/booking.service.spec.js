describe('booking', function () {
    beforeEach(module('auth'));
    beforeEach(module('booking'));
    
    var $q;
    var $httpBackend;
    var bookingSvc;
    var authSvc;
    
    beforeEach(inject(function ($componentController, _$httpBackend_, _$q_, _bookingSvc_, _authSvc_) {
        $q = _$q_;
        bookingSvc = _bookingSvc_;
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('http://localhost:35853/api/booking/user').respond(200, ['2016-10-03', '2016-10-01', '2016-10-02']);

        authSvc = _authSvc_;
        spyOn(authSvc,'isAuthenticated').and.callFake(function () {
            return true;
        })
    }));

    it('Booking Get All Dates', function () {
        bookingSvc.getUserReservations().then(function (response) {
            expect(response.data.length).toBe(3);
        });

        $httpBackend.flush();
    });

});