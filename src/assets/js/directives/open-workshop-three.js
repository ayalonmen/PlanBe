(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopThree" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-three.html',
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

                    $scope.showContent=function($fileContent,index)
                    {
                        alert(index)
                    }

                    $scope.testClick=function()
                    {
                        alert("testClick")
                    }
                },
                controllerAs:'ctrl'
            }
        })

})();
