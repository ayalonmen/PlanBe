(function(){
'use strict';

angular.module('openworkshop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/openworkshop', {
    templateUrl: '../../assets/views/openworkshop.html',
    controller: 'WSCtrl',
    controllerAs:'ctrl'
  });
}])

.controller('WSCtrl', ['Backand','$scope','$http',function(Backand,$scope,$http) {


    if(!$scope.$parent.isLogged)
    {
        $scope.navigateTo("register","/login")
    }else {


        $scope.init = function(){
            $scope.newBiz =null;
            $scope.newWs ={ cancelpolicy: true,isMulti:false};
            $scope.showBizForm= false;
            $scope.showWSForm= false;


            $http({
                method: 'GET',
                url : Backand.getApiUrl() + "/1/objects/businesses",

            }).then(function(response) {
                if(response.data.data.length>0)
                {
                    console.log("We have a biz");
                    $scope.newBiz = response.data.data[0];
                    $scope.showWSForm= true;
                    $scope.newWs.business = $scope.newBiz.id;
                    console.log($scope.newBiz);
                    console.log($scope.newWs)
                }else {
                    {
                        $scope.showBizForm = true;
                    }
                }
            });
        };

        $scope.$on("CREATE_BUSINESS_SUCCESS",function(event,data){
            console.log("on event catch");
            $scope.init();
        });

        $scope.setPolicy=function(val)
        {
            $scope.newWs.cancelpolicy = val;
            console.log(val)
        }
        $scope.setSingleSession=function(val)
        {
            $scope.newWs.isMulti = val;
            console.log(val)
        }


        $scope.prepareAndSubmit = function()
        {
            var atr;
            var obj = $scope.newWs;
            var prev ="";
            var newObj = {};

            for (atr in obj)
            {

                var sub =  atr.substring(0,atr.length-1);
                if(sub === "learn" || sub==="whofor" || sub ==="needto"){
                    if(newObj[sub] !== undefined)
                    {
                        newObj[sub] = newObj[sub] + "-b-" + obj[atr]
                    }else {
                        newObj[sub]  =  obj[atr]
                    }
                }else {
                    newObj[atr] = obj[atr]
                }

            }
            $scope.newWs = newObj;
           $scope.$parent. openWorkshop( $scope.newWs)
        };

        $scope.init();

    }



//      }).then(function(response) {
//               console.log(response.data);
//      });


}]);
})();
