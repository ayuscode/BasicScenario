'use strict';

describe('Auth Service', function()
{
    var $httpBackend;
    var authSvc;

    beforeEach(module('auth'));

    beforeEach(inject(function(_authSvc_){
        authSvc = _authSvc_;
    }));

    afterEach(function()
    {
        authSvc.clear();
    });

    it('Auth Service:: Clear token validation', function()
    {
        authSvc.clear();
        var token = authSvc.getToken();

        expect(token).toBeUndefined();
    });

});