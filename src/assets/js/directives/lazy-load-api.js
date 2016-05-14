(function () {
    'use strict';

    angular.module('myApp')
        .service('lazyLoadApi', function lazyLoadApi($window, $q) {


        var deferred = $q.defer()

        $window.initMap = function () {  
            deferred.resolve()  
        }

        return deferred.promise
    });
})();