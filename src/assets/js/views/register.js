(function(){
'use strict';

angular.module('register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: '../../assets/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs:'regCtrl'
  });
}])


.controller('RegisterCtrl', ['$scope',function($scope) {
$scope.user = $scope.$parent.user;
}]);



})();
