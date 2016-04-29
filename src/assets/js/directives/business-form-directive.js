(function () {
  'use strict';

  angular.module('myApp')
   .directive("businessForm" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/business-form.html',
                scope:
                {
                    submitFunc: "=",
                    getUrlFunc:"=",
                    uploadImage:"=",
                     ngShow: "="
                },
                controller: function($scope,Backand,$http,$location,Data_Model)
                {
                    $scope.cover = {}
                    $scope.logo = {}
                    $scope.error = "";
                    $scope.newBiz = {};
                    $scope.content = {};
                    $scope.images = {};

                    $scope.$on("SERVER_CREATE_OK",function()
                    {
                        $scope.server_ok = true;
                    });



                      $scope.showContent = function($fileContent,fieldName){
                          $scope.images[fieldName] = new Object();
                        $scope.content[fieldName] = $fileContent;
                          $scope.images[fieldName].filename =  "Biz_" +fieldName +"_" +  $scope.$parent.userDetails.id;
                          $scope.images[fieldName].filedest =  Data_Model.application_data.USER_STORAGE_URL;
                          $scope.images[fieldName].filedata = $fileContent.substr( $fileContent.indexOf(',')+1,  $fileContent.length);
                        $scope.uploadImage( $scope.images[fieldName]).then(function(data)
                        {
                            console.log("GetURL DATA:")
                            console.log(data)
                            $scope.newBiz[fieldName] = data.data.url;
                            console.log($scope.newBiz[fieldName])

                        })

                };

                    $scope.$on("SERVER_CREATE_ERROR",function()
                    {
                        $scope.server_ok = false;
                        $scope.error="Something went wrong, please try again"
                    });
                },
                controllerAs:'ctrl'
            }
   })


})();
