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
        authSvc = _authSvc_;
        spyOn(authSvc,'isAuthenticated').and.callFake(function () {
            return true;
        })
    }));

    it('Booking Get User All Reservations', function () {
        $httpBackend.expectGET('http://localhost:35853/api/booking/user').respond(200, ['2016-10-03', '2016-10-01', '2016-10-02']);
        bookingSvc.getUserReservations().then(function (response) {
            expect(response.data.length).toBe(3);
        });

        $httpBackend.flush();
    });

    it('Booking New Date', function () {
        $httpBackend.expectPOST('http://localhost:35853/api/booking/book').respond(200, true);
        bookingSvc.bookDate(new Date(Date.now())).then(function (response) {
            expect(response).toBe(true);
        });
    });

    it('Booking Get All Reservations', function () {
        $httpBackend.expectGET('http://localhost:35853/api/booking/').respond(200, ['2016-10-03', '2016-10-01', '2016-10-02']);
        bookingSvc.getAllReservations().then(function (response) {
            expect(response.data.length).toBe(3);
        });

        $httpBackend.flush();

    });

});