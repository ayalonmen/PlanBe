(function(){
    'use strict';

    angular.module('workshop', ['ngRoute'])

        .config(['$routeProvider',function($routeProvider) {
            $routeProvider.when('/workshop/:id', {
                templateUrl: '../../assets/views/workshop.html',
                controller: 'WsCtrl',
                controllerAs:'wsCtrl'
            });
        }])


        .controller('WsCtrl', ['$routeParams','$scope','WorkshopHelper',function($routeParams,$scope,WorkshopHelper) {
            console.log($routeParams.id);
            $scope.wsid = $routeParams.id
            $scope.userDetails = $scope.$parent.userDetails
            $scope.workshop = {}
            $scope.$parent.readOne('workshops',$scope.wsid,true).then(function(data)
            {
                console.log("Workshop found")
                console.log(data)
                $scope.workshop = WorkshopHelper.parseWorkshop (data.data)

            },function(data)
            {
                console.log("Workshop ERROR")
                console.log(data)
            });

            $scope.gotoBusiness=function (id) {
              console.log(id);
              $scope.$parent. navigateTo("workshop","/business/"+id);
            }
        }]);



})();

