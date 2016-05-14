(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopTwo" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-two.html',
                controller: function($scope)
                {

                    $scope.setPolicy=function(val)
                    {
                    $scope.workshop.cancelpolicy = val;
                    console.log(val)
                    }
                    $scope.setSingleSession=function(val)
                    {
                    $scope.workshop.isMulti = val;
                    console.log(val)
                    }

        },
                controllerAs:'ows2ctrl'
            }
        })


})();
