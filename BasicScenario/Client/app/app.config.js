angular.
    module('basicScenario').
    config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
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
            });            
    }]);