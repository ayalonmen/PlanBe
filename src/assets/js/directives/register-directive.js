(function () {
  'use strict';
  angular.module('myApp')
  .directive("registrationForm" ,function(){
           return {
               restrict: "E",
               templateUrl:'../../assets/templates/registration-form.html',
               scope:{
                   signUp: '='
               },
               controller: function($scope,Backand,$http,$location)
               {
                          $scope.newUser =   {firstName:"Jim",lastName: "Curry",email: "string@strong.",password: "123123", confirmPassword: "123123"};
                          $scope.regForm= null;
                          $scope.error="";
                          $scope.server_ok = false;
                          $scope.$on("SERVER_REGISTRATION_OK",function()
                          {
                             $scope.server_ok = true;
                          });
                          $scope.$on("SERVER_REGISTRATION_ERROR",function()
                          {
                             $scope.server_ok = false;
                             $scope.error="Something went wrong, please try again"
                          });

               },
               controllerAs:'ctrl'
           }
  })


})();
