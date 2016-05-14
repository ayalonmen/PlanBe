(function(){
    'use strict';

    angular.module('account', ['ngRoute'])

        .config(['$routeProvider',function($routeProvider) {
            $routeProvider.when('/account', {
                templateUrl: '../assets/views/account.html',
                controller:'AccountCtrl',
                controllrAs:'ctrl'
            });
        }])


        .controller('AccountCtrl', function($scope){
            console.log("AccountCtrl :   ******************************")
          $scope.user = {};
            $scope.init = function()
            {
                console.log("AccountCtrl :   on init")
                $scope.user =$scope.$parent.userDetails
            }

            if(!$scope.$parent.isLogged) {
                $scope.navigateTo("updateworkshop","/login")
            }else {
                $scope.init();  
            }

            

            $scope.$on("SESSION_READY",function(e,data) {
                console.log("ON SESSION_READY")
                   $scope.init()

            })

        })





})();

