(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopThree" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-three.html',

                controller: function($scope)
                {

                },
                controllerAs:'ows3ctrl'  
            }
        })

})();
