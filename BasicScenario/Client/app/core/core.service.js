angular.
    module('core').
    factory('coreSvc', function () {
        // Here we can add some code (factory vs service)
        var callbackMessages = [];
        var callbackUser = [];
        var self = this;

        function parse(response)
        {
            if (!response) {
                return null;
            }

            if (response.data && response.data.ModelState) {
                var messages = '';

                for (var key in response.data.ModelState) {
                    for (var i = 0; i < response.data.ModelState[key].length; i++) {
                        messages += (response.data.ModelState[key][i]) + '\n';
                    }
                }

                return messages;
            }

            if (response.data && response.data.Message) {
                return response.data.Message + ': ' + response.data.MessageDetail;
            }

            if (response.data && response.data.error_description) {
                return response.data.error_description;
            }

            return 'Unexpected error';
        }

        return {

            parseResponse: function (response) {
                parse(response);
            },

            onNewMessage: function (callbackMessage) {
                callbackMessages.push(callbackMessage);
            },

            distributeMessage: function (type, message, response) {
                angular.forEach(callbackMessages, function (value, key) {
                    value(type, message, parse(response));
                })
            },

            clearMessage: function () {
                angular.forEach(callbackMessages, function (value, key) {
                    value(null, null, null);
                })
            },

            onUserChanged: function (callback) {
                callbackUser.push(callback);
            },

            userChanged: function() {
                angular.forEach(callbackUser, function(value, key) {
                    value();
                })
            }
        }
    });