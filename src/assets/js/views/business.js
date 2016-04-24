(function(){
    'use strict';

    angular.module('business', ['ngRoute'])

        .config(['$routeProvider',function($routeProvider) {
            $routeProvider.when('/business/:id', {
                templateUrl: '../../assets/views/business.html',
                controller: 'BizCtrl',
                controllerAs:'bizCtrl'
            });
        }])


        .controller('BizCtrl', ['$routeParams','$scope',function($routeParams,$scope) {
            console.log($routeParams.id);
            $scope.bizid = $routeParams.id
            $scope.business = {}
            $scope.$parent.readOne('businesses',$scope.bizid,true).then(function(data)
            {
                console.log("Business found")
                console.log(data)
                $scope.business = data.data
            },function(data)
            {
                console.log("Business ERROR")
                console.log(data)
            });

            $scope.gotoworkshop=function (id) {
                console.log(id);
                $scope.$parent. navigateTo("business","/workshop/"+id);
            }
        }]);



})();

