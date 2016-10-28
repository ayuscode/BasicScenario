angular.
    module('user').
    component('user', {
        templateUrl: '/core/user/user.template.html',
        controller: ['coreSvc', 'authSvc', 'accountSvc', '$location', function (coreSvc, authSvc, accountSvc, $location) {
            var self = this;

            this.User = ''
            this.logout = function () {
                authSvc.clear();
                $location.path('/');
            }

            this.updateUser = function () {
                accountSvc.getUser().then(
                    function (response) {
                        self.User = response;
                    },
                    function (response) {
                        coreSvc.distributeMessage('Error', null, response);
                    })
            }

            this.updateUser();
        }]
    });