angular.
    module('user').
    component('user', {
        templateUrl: '/core/user/user.template.html',
        controller: ['coreSvc', 'authSvc', 'accountSvc', '$location', function (coreSvc, authSvc, accountSvc, $location) {
            var self = this;

            self.User = ''
            self.IsLogin = false;

            this.logout = function () {
                self.IsLogin = false;
                authSvc.clear();
                $location.path('/');
            }

            this.updateUser = function () {
                accountSvc.getUser().then(
                    function (response) {
                        self.User = response;
                        self.IsLogin = true;
                    },
                    function (response) {
                        self.IsLogin = false;
                    })
            }

            coreSvc.onUserChanged(self.updateUser);

            this.updateUser();
        }]
    });