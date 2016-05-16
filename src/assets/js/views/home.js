(function(){
'use strict';

angular.module('home', ['ngRoute','backand'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '../assets/views/home.html',
    controller: 'HomeCtrl',
    controllerAs:'ctrl'
  });
}])



.controller('HomeCtrl', function($scope,WorkshopHelper) {

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
        for (var i =0 ; i< searchOutput.length;i++)
        {
            searchOutput[i].workshop = WorkshopHelper.parseWorkshop(searchOutput[i].workshop)
        }
        $scope.res = searchOutput;

        console.log($scope.res)

    }
    $scope.onResults2 = function(searchOutput) {
            for (var i =0 ; i< searchOutput.length;i++)
            {
                searchOutput[i].workshop = WorkshopHelper.parseWorkshop(searchOutput[i].workshop)
            }
            $scope.res2 = searchOutput;

            console.log($scope.res)

        }
    $scope.clickWS= function(event,id) {
        //$event.stopPropagation();
        $scope.navigateTo('search','/workshop/' + id)
        }


      $scope.$parent.search("google",$scope.onResults1);
       $scope.$parent.search("guitar food biking",$scope.onResults2);


});
})();
