(function(){
    'use strict';

    angular.module('account', ['ngRoute'])

        .config(['$routeProvider',function($routeProvider) {
            $routeProvider.when('/account', {
                templateUrl: '../assets/views/account.html',
                controller:'AccountCtrl',
                controllerAs:'AccountController'
            });
        }])

        .controller('AccountCtrl', function($scope,SessionManager){
            console.log("AccountCtrl :   ******************************")
            var self = this;
            self.user = null;

            self.init = function(userdata)
            {
                console.log("AccountCtrl :   on init")
                self.user = userdata.data
            }

            $scope.$on("SESSION_READY",function(e,data) {
                  console.log("ON SESSION_READY")
                  if(!SessionManager.api.isLoggedIn()) {
                      console.log("ERROR - NOT LOGGED")
                      $scope.navigateTo("updateworkshop","/login")
                  }else {
                      self.init(data);
                  }
            })

            $scope.$on("SESSION_OUT",function(e) {
                  $scope.navigateTo("updateworkshop","/login")
            });

             $scope.$emit("REFRESH_SESSION_REQUEST")

            self.onReadFile = function ($fileContent) {
                            self.isPPicLoaded = 2;
                        var file = $fileContent.substr($fileContent.indexOf(',') + 1, $fileContent.length)
                        var fname = "usr_" + self.user.id + "_"  + (Date.now().getTime()/1000)
                        self.user.profilePic = $fileContent
                        var tempObj = {
                            filename: fname,
                            filedata: file,
                            filedest: "ws_usr",
                        }


                        $scope.$parent.getS3Url(tempObj).then(function (data) {

                            var r_url = data.data.url
                        $scope.$parent.updateUserData({id:self.user.id,profilePic:r_url}).then(function(data)
                        {
                            self.user.profilePic = r_url;
                            self.isPPicLoaded = 0;
                        })

                });


            }

        })


})();
