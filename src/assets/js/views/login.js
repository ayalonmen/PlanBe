(function(){
'use strict';

angular.module('login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '../../assets/views/login.html',
    controller: 'LoginCtrl',
    controllerAs:'ctrl'
  });
}])



.controller('LoginCtrl', [function() {
 this.test = "dfsfdsfds"
}]);
})();
