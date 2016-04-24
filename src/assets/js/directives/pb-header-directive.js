(function () {
  'use strict';
 angular.module('myApp')

 .directive("pbHeader" ,function(){
          return {
              restrict: "E",
              templateUrl:'../../assets/templates/pb-header.html',
              replace:true,
              scope:{
                  isLogged: "=",
                  signOut:"=",
                  navigateTo: "="
              },
              controllerAs:'ctrl'
          }
 })


})();
