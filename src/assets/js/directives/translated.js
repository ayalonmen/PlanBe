(function () {
    'use strict';

    angular.module('myApp').directive('translated',  function() {
    return {
        restrict:"E",
        scope: {
            key: "@"
        },
        template: "<span>{[{t_key}]}</span>",
        link: function(scope, element, attributes) {

        },
        controller: function($scope,Lang)
        {
            $scope.t_key = Lang.getKey($scope.key)

            //console.log($scope.key)
        }

        }

})

})();
