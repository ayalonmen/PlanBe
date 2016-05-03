(function() {
    'use strict';

    angular.module('updateworkshop', ['ngRoute','ngDroplet'])

        .config(['$routeProvider',function ($routeProvider) {
            $routeProvider.when('/updateworkshop/:id', {
                templateUrl: '../../assets/views/update_workshop.html',
                controller: 'UWSCtrl',
                controllerAs: 'wsctrl'
            });
        }])

        .controller('UWSCtrl' ,function($routeParams,$scope,WorkshopHelper) {

            var _self = this;
            _self.wsid = Number($routeParams.id)
            $scope.pendingServer=false;
            $scope.showWSForm= 0;


            $scope.init = function(){

                _self.showBizForm = false;
                _self.newBiz = {}
               $scope.workshop = null
                if($scope.$parent.userDetails.businesses.length>0)
                {
                    console.log("We have a business")
                    if($scope.showWSForm==0)
                    {
                        $scope.showWSForm= 2;
                    }
                    _self.newBiz = $scope.$parent.userDetails.businesses[0]
                    console.log(  _self.newBiz)
                    var workshops =   _self.newBiz.workshops
                    console.log( workshops.length)

                    for (var i =0;i<workshops.length;i++)
                    {
                        var temp = workshops[i]
                        if(Number(temp.id) == _self.wsid)
                        {


                            console.log("we found a workshop")
                            $scope.workshop = WorkshopHelper.parseWorkshop(temp)

                        }
                    }
                    if($scope.workshop==null)
                    {
                        console.log("NO WORKSHOP FOUND")
                        $scope.navigateTo("updateworkshop","/openworkshop")
                    }

                }else{
                      console.log("NO BUSINESS FOUND")
                    $scope.navigateTo("updateworkshop","/openworkshop")
                }
            };


                if(!$scope.$parent.isLogged) {
                    $scope.navigateTo("updateworkshop","/login")
                }
                else {

                       $scope.$parent.setSessionData()
                }

            $scope.$on("SESSION_READY",function(e) {
                $scope.init();
            })

            // $scope.goto=function(val) {
            //
            //         $scope.update();
            //     }
            //     $scope.showWSForm = val;
            // }

            $scope.addNewInput = function(fieldName) {
                $scope.workshop[fieldName].push(null)
                console.log($scope.workshop)
            }

            $scope.omitNewInput = function(fieldName,d_index) {

                if($scope.workshop[fieldName] &&$scope.workshop[fieldName] instanceof Array ) {
                    var index =d_index;
                    if (index > -1) {
                        console.log("omitNewInput" + index)
                        $scope.workshop[fieldName].splice(index, 1);
                    }

                }
            }

            $scope.changeTest=function(event,valid) {
               console.log("ON CHANGE !!");
                var valid =  event.target.getAttribute("class")

               console.log(valid.indexOf("ng-valid")>0);
            }

            $scope.update= function(goto) {
               // if (($scope.wsForm1.$valid || $scope.wsForm1.$pristine) && ($scope.wsForm2.$valid || $scope.wsForm2.$pristine) && ($scope.wsForm3.$valid || $scope.wsForm3.$pristine) && ($scope.wsForm4.$valid || $scope.wsForm4.$pristine) && ($scope.wsForm5.$valid || $scope.wsForm5.$pristine)) {
                if($scope.wsForm1.$dirty || $scope.wsForm2.$dirty|| $scope.wsForm3.$dirty||$scope.wsForm4.$dirty||$scope.wsForm5.$dirty) {

                    $scope.pendingServer = true;
                    $scope.wsForm1.$setPristine()
                    $scope.wsForm2.$setPristine()
                    $scope.wsForm3.$setPristine()
                    $scope.wsForm4.$setPristine()
                    $scope.wsForm5.$setPristine()
                    $scope.$parent.updateWorkshop(WorkshopHelper.packWorkshop($scope.workshop));
                }
                if (goto) {
                    $scope.showWSForm = goto
                    console.log("goto")
                    console.log(goto)
                }
               //TODO
            }

            $scope.onReadFile = function($fileContent) {
               console.log("CONTROLLER SAYS ONREAD FILE")
                console.log($fileContent.length)
                $scope.workshop.assets.push({url:$fileContent ,caption:"test caption",loaded:2})
                var file = $fileContent.substr( $fileContent.indexOf(',')+1,  $fileContent.length)
               var fname = "ws_" + $scope.workshop.id+"_"+$scope.workshop.business.id+"_"+$scope.workshop.assets.length;
                var tempObj = {filename:fname ,filedata:file ,filedest:"ws_img",element_id: $scope.workshop.assets.length-1}
                $scope.$parent.getS3Url(tempObj).then(function(data)
                {
                    console.log("S3 Response:")
                    var r_url = data.data.url
                    console.log(r_url)
                    console.log(data.data.url)
                    $scope.wsForm4.$setDirty();
                    var element_id = data.config.data.element_id
                    console.log(element_id)
                    $scope.workshop.assets[element_id].url = r_url;
                    $scope.workshop.assets[element_id].loaded = 0;
                });


            }


            $scope.$on("UPDATE_WORKSHOP_SUCCESS",function(event,data) {
                $scope.pendingServer=false;
                console.log("UPDATE_WORKSHOP_SUCCESS");
                $scope.$emit("REFRESH_SESSION_REQUEST")
            })


    });

})();