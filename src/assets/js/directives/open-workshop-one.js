(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopOne" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-one.html',
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
