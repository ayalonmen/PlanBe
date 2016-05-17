(function () {
    'use strict';

    angular.module('myApp')
        .directive("workshopStructForm" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/workshop-struct-form.html',
                controller: function($scope) {

                    $scope.setSingleSession=function(val)
                    {
                    $scope.workshop.isMulti = val;
                    console.log(val)
                    }


               },
                controllerAs:'structCtrl'
            }
        })


})();
