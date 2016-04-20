(function(){
'use strict';

angular.module('home', ['ngRoute','backand'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '../../assets/views/home.html',
    controller: 'HomeCtrl',
    controllerAs:'ctrl'
  });
}])



.controller('HomeCtrl', ['Backand','SessionManager',function(Backand,SessionManager,$scope) {


}]);
})();
