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
                  search: "=",
                  state:'='
              },
              controller:function($scope,Debug)
              {
                  $scope.queryParam=""

                  $scope.onSearch = function()
                  {
                    if( $scope.queryParam!="") {
                         $scope.navigateTo('header','/search/'+$scope.queryParam)  ;
                    }

                  }
                  $scope.onMouseOver = function()
                    {
                        Debug.err("Mouse Over")
                    }
              },
              controllerAs:'ctrl'
          }
 })


})();
