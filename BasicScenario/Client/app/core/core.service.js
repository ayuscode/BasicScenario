﻿angular.
    module('core').
    factory('coreSvc', function () {
        return {
            parseResponse : function(response)
            {
                if (response.error_description) {
                    return response.error_description;
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

                return 'Unexpected error';
            }
        }
    });