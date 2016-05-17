(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopFive" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-five.html',

                controller: function($scope)
                {
                    

                },
                controllerAs:'ows5ctrl'
            }
        })

})();
