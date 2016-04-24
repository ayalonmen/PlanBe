(function () {
  'use strict';
 angular.module('myApp')
  .directive("pbFooter" ,function(){
           return {
               restrict: "E",
               templateUrl:'../../assets/templates/pb-footer.html',

           }
  })

})();
