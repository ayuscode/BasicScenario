angular.
    module('basicScenario').
    config(['$locationProvider', '$routeProvider','$httpProvider', function($locationProvider, $routeProvider, $httpProvider){
        $httpProvider.interceptors.push('httpInterceptor');

        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/',
            {
                template : '<login></login>'
            }).
            when('/reservation', {
                template: '<reservation></reservation>'
            }).
            when('/newregister',{
                template: '<register></register>'
            }).
            otherwise({
                template : '<login></login>'
            }
            );            
    }]);