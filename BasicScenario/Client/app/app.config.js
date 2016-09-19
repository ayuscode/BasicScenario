angular.
    module('basicScenario').
    config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/',
            {
                template : '<login></login>'
            }).
            when('/booking', {
                template: '<h6>booking construction page</h6>'
            });            
    }]);