angular.
    module('basicScenario').
    factory('httpInterceptor', ['authSvc', function (authSvc) {
        return {
            'request': function (config) {
                config.headers.Authorization = "Bearer " + authSvc.getToken();
                return config;
            },
            //// optional method
            //'requestError': function (rejection) {
            //    // do something on error
            //    if (canRecover(rejection)) {
            //        return responseOrNewPromise
            //    }
            //    return $q.reject(rejection);
            //},
            //// optional method
            //'response': function (response) {
            //    // do something on success
            //    return response;
            //},
            //// optional method
            //'responseError': function (rejection) {
            //    // do something on error
            //    if (canRecover(rejection)) {
            //        return responseOrNewPromise
            //    }
            //    return $q.reject(rejection);
            //}
        }
    }]);