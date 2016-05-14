(function(){
    'use strict';

    angular.module('business', ['ngRoute'])

        .config(['$routeProvider',function($routeProvider) {
            $routeProvider.when('/business/:id', {
                templateUrl: '../assets/views/business.html',
                controller: 'BizCtrl',
                controllerAs:'bizCtrl'
            });
        }])


        .controller('BizCtrl', ['$routeParams','$scope',function($routeParams,$scope) {
            console.log($routeParams.id);

            $scope.bizid = $routeParams.id
            $scope.business = {}
            $scope.$parent.readOne('businesses',$scope.bizid,true,1).then(function(data)
            {
                console.log("Business found")
                console.log(data)
                $scope.business = data.data

                console.log(  $scope.user )
            },function(data)
            {
                console.log("Business ERROR")
                console.log(data)
            });

            $scope.gotoworkshop=function (id) {
                console.log(id);
                $scope.$parent. navigateTo("business","/workshop/"+id);
            }


            $scope.convertAssets = function(workshop)
            {

                if(workshop.assets && typeof(workshop.assets) == "string")
                {
                   workshop.assets=JSON.parse(workshop.assets)
                }
                return workshop
            }
        }]);



})();
