(function () {
  'use strict';
 angular.module('myApp')

 .directive("pbHeader" ,function(){
          return {
              restrict: "E",
              templateUrl:'../assets/templates/pb-header.html',
              scope:{
                  isLogged: "=",
                  signOut:"=",
                  navigateTo: "=",
                  search: "="
              },
              controller:function($scope)
              {
                  $scope.queryParam=""

                  $scope.onSearch = function()
                  {
                    if( $scope.queryParam!="") {
                         $scope.navigateTo('header','/search/'+$scope.queryParam)  ;
                    }
                  }
              },
              controllerAs:'ctrl'
          }
 })


})();
