(function () {
  'use strict';

  angular.module('myApp')
   .directive("businessForm" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/business-form.html',
                scope:
                {
                    submitFunc: "=",
                     ngShow: "="
                },
                controller: function($scope,Backand,$http,$location)
                {

                    $scope.error = "";
                    $scope.$on("SERVER_CREATE_OK",function()
                    {
                        $scope.server_ok = true;
                    });
                    $scope.$on("SERVER_CREATE_ERROR",function()
                    {
                        $scope.server_ok = false;
                        $scope.error="Something went wrong, please try again"
                    });
                },
                controllerAs:'ctrl'
            }
   })


})();
