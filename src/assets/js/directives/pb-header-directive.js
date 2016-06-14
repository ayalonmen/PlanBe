(function () {
  'use strict';
 angular.module('myApp')

 .directive("pbHeader" ,function(){
          return {
              restrict: "E",
              templateUrl:'../assets/templates/pb-header.html',
              scope:{
                  isLogged: "=",
                  isManager: "=",
                  signOut:"=",
                  navigateTo: "=",
                  search: "=",
                  state:'='
              },
              controller:function($scope,Debug)
              {
                  $scope.queryParam=""
                  $scope.notifications = [ {id:"1" , text:"You have a new booking request to confirm",time:"3 houres ago"},{id:"1" , text:"You have a new booking request to confirm",time:"3 houres ago"} ,{id:"1" , text:"You have a new booking request to confirm",time:"3 houres ago"} ,{id:"1" , text:"You have a new booking request to confirm",time:"3 houres ago"} ,{id:"1" , text:"You have a new booking request to confirm",time:"3 houres ago"} ,{id:"1" , text:"You have a new booking request to confirm",time:"3 houres ago"} ,{id:"1" , text:"You have a new booking request to confirm",time:"3 houres ago"} ,{id:"1" , text:"You have a new booking request to confirm",time:"3 houres ago"} ,{id:"1" , text:"You have a new booking request to confirm",time:"3 houres ago"}  ]
                  $scope.onSearch = function()
                  {
                      console.log('onSearch')
                    if( $scope.queryParam!="") {
                         $scope.navigateTo('header','/search/'+$scope.queryParam)  ;
                    }

                  }
                  $scope.onMouseOver = function()
                    {
                        Debug.err("Mouse Over")
                    }
                    $scope.onKeyPress = function($event)
                    {
                         if($event.keyCode==13)
                         {
                             $scope.onSearch();
                         }
                    }
                    $scope.$on("SEARCH_ACTION",function(event,data)
                    {
                            console.log("SEARCH_ACTION:" + data)
                            $scope.queryParam = data;
                    })
              },
              controllerAs:'ctrl'
          }
 })


})();
