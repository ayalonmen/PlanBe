(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopTwo" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-two.html',
                scope:
                {
                    submitFunc: "=",
                    getUrlFunc:"=",
                    uploadImage:"=",
                    ngShow: "="
                },
                controller: function($scope)
                {
                    $scope.newWS = {};
                },
                controllerAs:'ctrl'
            }
        })


})();
