(function(){
'use strict';

angular.module('login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '../assets/views/login.html',
    controller: 'LoginCtrl',
    controllerAs:'ctrl'
  });
}])



.controller('LoginCtrl', ['$scope',function($scope) {
 // this.signIn= function()
 // {
 //     alert('Login controller signIn()')
 // }
}]);


})();
