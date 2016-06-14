(function () {
  'use strict';
 angular.module('myApp')

 .directive("profileIcon" ,function(){
          return {
              restrict: "E",
              templateUrl:'../assets/templates/profile-icon.html',
              scope:{},
              link: function(scope,element,attr)
              {

              },
              controller:function($scope,Debug,SessionManager)
              {
                    var self = this;
                    self.picurl = "";

                    $scope.$on("SESSION_READY",function(e,data) {

                          if(SessionManager.api.isLoggedIn()) {
                                 self.picurl = SessionManager.user.profilePic;
                          }
                    })
              },
              controllerAs:'ppCtrl'
          }
 })


})();
