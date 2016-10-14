'use strict';

describe('Account Service', function () {

    beforeEach(module('account'));
    beforeEach(module('auth'));

    var accountSvc;
    var $httpBackend;
    var $q;
    var authSvc;

    beforeEach(inject(function (_$httpBackend_, _$q_, _accountSvc_, _authSvc_) {
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        authSvc = _authSvc_;

        $httpBackend.expectPOST('http://localhost:35853/api/account/register').
                respond(200, true);

        spyOn(authSvc, 'isAuthenticated').and.callFake(function (user, password) {
            return false;
        });

        accountSvc = _accountSvc_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
    });

    it(':: Regiser new user', function () {
        accountSvc.register('user', 'password', 'password').then(
            function (response) {
                expect(response).toBe(true);
            });

        $httpBackend.flush();
    });

    it(':: Get User fails when not authenticated', function () {
        var user = accountSvc.getUser();
        expect(user).toBe('Not Authenticated');
    });
});

describe('Account::Validation Service', function () {
    var $httpBackend;
    var accountSvc;
    var authSvc;

    beforeEach(module('account'));
    beforeEach(module('auth'));

    beforeEach(inject(function (_$httpBackend_, _accountSvc_, _authSvc_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectPOST('http://localhost:35853/token').respond(200, { expires_in: 100, access_token: 'TESTING' });
        accountSvc = _accountSvc_;
        authSvc = _authSvc_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Validate User', function () {
        var validate = accountSvc.validate('user', 'password');

        validate.then(function (response) {
            expect(response).toBe(true);
        });

        $httpBackend.flush();

        var token = authSvc.getToken();
        expect(token).toBe('TESTING');

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});