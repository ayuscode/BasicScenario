angular.
    module('messages').
    component('messages', {
        templateUrl: '/core/messages/messages.template.html',
        controller: ['coreSvc', function (coreSvc) {
            var self = this;

            // type = null, 0-Info, 1-Warning, 2-Error
            this.updateMessage = function (type, message, response) {
                self.Type = type;
                self.Message = '';
                self.Response = '';

                if (message) {
                    self.Message = message;
                }

                if (response) {
                    self.Response = response;
                }
            }

            coreSvc.onNewMessage(self.updateMessage);

        }]
    });