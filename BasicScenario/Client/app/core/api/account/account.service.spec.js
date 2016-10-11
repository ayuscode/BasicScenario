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