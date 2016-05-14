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

            //@ We make sure we reload session userdata
            $scope.$emit("REFRESH_SESSION_REQUEST")

            $scope.workshop = {}
            $scope.$parent.readOne('workshops',$scope.wsid,true,1).then(function(data)
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

                //@ we update the user data when the session is being renewed
            $scope.$on("SESSION_READY",function(e,userData)
            {
                console.log("SESSION_READY")
                console.log(userData.data)
                $scope.userId = userData.data.id
                console.log("UID: " + $scope.userId )
            })


            $scope.getNumber = function(num)
            {
                var array = new Array(num)
                for (var i = 0;i<num;i++)
                {
                    array[i] = i+1
                }
                return  array;
            }
        }]);

})();
