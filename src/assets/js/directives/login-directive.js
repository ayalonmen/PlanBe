(function () {
  'use strict';

  angular.module('myApp')
.directive("loginForm" ,function(){
         return {
             restrict: "E",
             templateUrl:'../../assets/templates/login-form.html',
             scope:
             {
                 submitFunc: "="
             },
             controller: function($scope,Backand,$http,$location)
             {
                 $scope.username ="";
                 $scope.password ="";
                 $scope.error = "";
                 $scope.$on("SERVER_LOGIN_OK",function()
                 {
                     $scope.server_ok = true;
                 });
                 $scope.$on("SERVER_LOGIN_ERROR",function()
                 {
                     $scope.server_ok = false;
                     $scope.error="Something went wrong, please try again"
                 });
             },
             controllerAs:'ctrl'
         }
})
})();
