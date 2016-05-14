(function(){
    'use strict';

    angular.module('search', ['ngRoute'])

        .config(['$routeProvider',function($routeProvider) {
            $routeProvider.when('/search/:term', {
                templateUrl: '../assets/views/search.html',
                controller:'searchCtrl',
                controllrAs:'ctrl'
            });
        }])


        .controller('searchCtrl', function($scope,$routeParams,WorkshopHelper,Lang){

            console.log("Hello Search" + $routeParams.term )
               $scope.term = $routeParams.term



                $scope.onResults = function(searchOutput) {
                        for (var i =0 ; i< searchOutput.length;i++)
                        {
                            searchOutput[i].workshop = WorkshopHelper.parseWorkshop(searchOutput[i].workshop)
                        }
                        $scope.res = searchOutput;

                        console.log($scope.res)

                    }

                    $scope.clickWS= function(event,id) {
                        //$event.stopPropagation();
                        $scope.navigateTo('search','/workshop/' + id)
                        }

                        $scope.addToFav=function(event)
                        {
                            event.stopPropagation();
                            //event.cancel();
                        }


                    /* $scope.$on("SEARCH_REQUEST_SUBMITION",function(event,queryData)
                 {
                     $scope.$parent.search(queryData,$scope.onResults);
                 })*/

                  $scope.$parent.search($routeParams.term,$scope.onResults);


        })





})();
