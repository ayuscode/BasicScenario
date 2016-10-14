describe('Login', function()
{
    // Load the module
    beforeEach(module('core'));
    beforeEach(module('api'));
    beforeEach(module('login'));

    describe('LoginController', function()
    {
        var ctrl;
        var $location;
        var accountSvc;
        var $q;
        var $rootScope;

        beforeEach(inject(function(_$q_, _$location_,_$rootScope_)
        {
            $location = _$location_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        }));

        // Mock the authSvc and get the controller 
        beforeEach(inject(function($componentController, _accountSvc_){
            accountSvc = _accountSvc_;
            spyOn(accountSvc, 'validate').and.callFake(function (user, password)
            {
                var deferred = $q.defer();
                deferred.resolve(true);               
                return deferred.promise;
            });
            ctrl = $componentController('login');
        }));

        describe('LoginController: When Is Authenticated', function(){
            var ctrl;
            var authSvc;

            beforeEach(inject(function($componentController,_authSvc_){
                authSvc = _authSvc_;
                spyOn(authSvc, 'isAuthenticated').and.returnValue(true);
                ctrl = $componentController('login');
                }));

            it('Redirect when user is validated', function() {
                expect($location.url()).toBe('/reservation');
            });
        });

        it('Validate user and redirect', function() {
            
            ctrl.User = 'user';
            ctrl.Password = 'password';
            ctrl.Login();

            $rootScope.$apply();
            
            expect($location.url()).toBe('/reservation');
            
        })
    });
});