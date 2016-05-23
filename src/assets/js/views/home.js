(function(){
'use strict';

angular.module('home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '../assets/views/home.html',
    controller: 'HomeCtrl',
    controllerAs:'ctrl'
  });
}])



.controller('HomeCtrl', function($scope,WorkshopHelper,Debug) {

    $scope.$emit("ENTER_HOME_STATE","");
    $scope.queryParam=""

    $scope.onSearch = function()
    {
      if( $scope.queryParam!="") {
           $scope.navigateTo('header','/search/'+$scope.queryParam)  ;
      }
    }

    $scope.$on("$destroy",function(){
    $scope.$emit("LEFT_HOME_STATE","");
})
$scope.onResults1 = function(searchOutput) {
        if(searchOutput!== undefined){
                for (var i =0 ; i< searchOutput.length;i++)
                {
                    searchOutput[i].workshop = WorkshopHelper.parseWorkshop(searchOutput[i].workshop)
                }
                $scope.res = searchOutput;
            }

        //SessionManager.errorUpdate($scope.res)

    }
    $scope.onResults2 = function(searchOutput) {
        console.log("onResults2")
        if(searchOutput!== undefined){
                for (var i =0 ; i< searchOutput.length;i++)
                {
                    searchOutput[i].workshop = WorkshopHelper.parseWorkshop(searchOutput[i].workshop)
                }
                $scope.res2 = searchOutput;

                Debug.info($scope.res)
            }

        }
    $scope.clickWS= function(event,id) {
        //$event.stopPropagation();
        $scope.navigateTo('search','/workshop/' + id)
        }


      $scope.$parent.search("google",$scope.onResults1,"32 34", "1000");
      $scope.$parent.search("surf food biking",$scope.onResults2,"32 34", "5000");


});
})();
