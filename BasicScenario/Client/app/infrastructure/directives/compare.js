angular.module('basicScenario')
    .directive('compare', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.compare = function (modelValue, viewValue) {
                    return modelValue == attrs.compare;
                };
            }
        };
    });