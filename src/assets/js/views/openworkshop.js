(function(){
'use strict';

angular.module('openworkshop', ['ngRoute','backand'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/openworkshop', {
    templateUrl: '../../assets/views/openworkshop.html',
    controller: 'WSCtrl',
    controllerAs:'ctrl'
  });
}])



.controller('WSCtrl', ['Backand','SessionManager',function(Backand,SessionManager,$scope) {
 //$scope.userStatus = SessionManager.api.isLoggedIn();
// $scope.isLogged = SessionManager.api.isLoggedIn();
 //console.log("Logged : " + this.userStatus)
}]);
})();
