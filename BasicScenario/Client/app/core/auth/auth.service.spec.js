'use strict';

describe('Auth Service', function()
{
    var $httpBackend;
    var authSvc;

    beforeEach(module('auth'));

    beforeEach(inject(function(_$httpBackend_, _authSvc_){
        $httpBackend = _$httpBackend_;
        $httpBackend.expectPOST('http://localhost:35853/token').respond(200, { expires_in: 100, access_token: 'TESTING'});

        authSvc = _authSvc_;
    }));

    afterEach(function()
    {
        authSvc.clear();
    });

    it('Validate User', function()
    {
        var validate = authSvc.validate('user', 'password');

        validate.then(function (response)
        {
            expect(response).toBe(true);
        });

        $httpBackend.flush();        

        var token = authSvc.getToken();
        expect(token).toBe('TESTING');

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Clear token validation', function()
    {
        authSvc.clear();
        var token = authSvc.getToken();

        expect(token).toBeUndefined();
    });

});