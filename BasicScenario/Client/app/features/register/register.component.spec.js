describe('Register', function()
{
    beforeEach(module('register'));

    describe('RegisterController', function()
    {
        var ctrl;
        var accountSvc;
        var $rootScope;

        beforeEach(module('auth'));
        beforeEach(module('account'));

        // Mock the account service and get the controller
        beforeEach(inject(function ($componentController, _accountSvc_, _$rootScope_, $q){
            accountSvc = _accountSvc_;
            spyOn(accountSvc, 'register').and.callFake(function(user, password)
            {
                var deferred = $q.defer();
                deferred.resolve(true);               
                return deferred.promise;
            });
                        
            ctrl = $componentController('register');
            $rootScope = _$rootScope_;
            
        }));

        it('Register is correct', function()
        {
            ctrl.User = 'user';
            ctrl.Password = 'password';
            ctrl.ConfirmPassword = 'password';
            ctrl.Register();

            $rootScope.$apply();

            expect(ctrl.IsRegistered).toBe(true);
        });

        it('Register is not correct', function()
        {
            ctrl.User = '';
            ctrl.Password = '12345';
            ctrl.ConfirmPassword = '1234';

            $rootScope.$apply();

            expect(ctrl.IsRegistered).toBe(false);
        })
    });

});