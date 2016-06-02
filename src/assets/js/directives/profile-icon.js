(function () {
  'use strict';
 angular.module('myApp')

 .directive("profileIcon" ,function(){
          return {
              restrict: "E",
              templateUrl:'../assets/templates/profile-icon.html',
              scope:{
              },
              controller:function($scope,Debug)
              {

              },
              controllerAs:'ctrl'
          }
 })


})();
