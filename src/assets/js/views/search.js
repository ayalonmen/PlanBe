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


        .controller('searchCtrl', function($scope,$routeParams,WorkshopHelper,Lang,lazyLoadApi,SessionManager,$timeout,$rootScope){
            $scope.isGoogleAPIDefined = false;
             var s ;
            if(document.getElementById("google_maps_script") == undefined)
            {
                lazyLoadApi.then(initSearch)
                s = document.createElement('script')
                s.setAttribute("id", "google_maps_script");
                s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCHT4bHwLeqV8VYCGw1q0SQDaCL13xi0i0&callback=initMap'
                document.body.appendChild(s)
                console.log("ADDIN GOOGLE SCRIPT")
            }else {
                   $scope.isGoogleAPIDefined = true;

            }

            //@ we use google api to get the user city  based on the coordinates
            $scope.getCurrentLocation = function(posObj)
            {

                              var latlng = {lat: parseFloat(posObj[0]), lng: parseFloat(posObj[1])};
                              $scope.geocoder = new google.maps.Geocoder();
                               console.log(latlng);
                                $scope.geocoder.geocode({'location': latlng}, function(results, status) {
                                if (status === google.maps.GeocoderStatus.OK) {
                                         console.log('Geocoder success!!');
                                         if(results && results.length>0){

                                                        for(var i =0;i<results.length;i++)
                                                        {
                                                                   console.log(i)
                                                                  var types = results[i].types
                                                                  if(types && types.length>0)
                                                                  {
                                                                          for(var j =0;j<types.length;j++)
                                                                          {
                                                                              if(types[j] == "locality" || types[j] == "political")
                                                                              {
                                                                                  $scope.$apply(function(){
                                                                                      $scope.queryCity = results[i].formatted_address;
                                                                                         console.log($scope.queryCity);
                                                                                  });

                                                                                  i = results.length;
                                                                                  break;
                                                                              }
                                                                          }
                                                                  }
                                                      }
                                                  }
                                } else {
                                  console.log('Geocoder failed due to: ' + status);
                                }
                            })
            }


                function initSearch()
                {

                     $scope.isGoogleAPIDefined = true;
                     var pos=SessionManager.api.getLocation()
                     if( pos !==null)
                     {
                         $scope.getCurrentLocation([pos.coords.latitude,pos.coords.longitude])
                     }
                }




               //@ we use google api to get the user coordinates based on the city
                $scope.searchLocationCorByName = function()
                {
                        $scope.geocoder = new google.maps.Geocoder();
                        console.log("searchLocation")
                            console.log($scope.queryCity)
                        $scope.geocoder.geocode({'address': $scope.queryCity}, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {

                                //$scope.location = [parseFloat(results[0].geometry.location.lat()),parseFloat(results[0].geometry.location.lng())]
                                $scope.location = [results[0].geometry.location.lat(),results[0].geometry.location.lng()]
                                $rootScope.currentLocation = $scope.location;
                                console.log($scope.location )
                                console.log("________" )
                                console.log(SessionManager.location_query )
                                $scope.searchCommand();
                            } else {
                                alert('Geocode was not successful for the following reason: ' + status);
                            }
                });
            }





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




                     $scope.searchCommand = function()
                     {
                         var pos = $scope.location[0].toString() + " " + $scope.location[1].toString()
                           $scope.$parent.search($routeParams.term,$scope.onResults, pos,$scope.queryDistance);

                     }

                     $scope.onDistanceChange = function()
                     {
                          //
                          $timeout.cancel($scope.futureRequest)
                         $scope.futureRequest = $timeout(function() {
                             //var pos=SessionManager.api.getLocation()
                            $scope.searchCommand()
                        }, 1500);
                     }


                     $scope.onCityChange = function()  
                     {
                            //$scope.location = []
                            if($scope.isGoogleAPIDefined)
                            {
                                  $timeout.cancel($scope.futureRequest)
                                $scope.futureRequest = $timeout(function() {
                                    //var pos=SessionManager.api.getLocation()
                                    $scope.searchLocationCorByName()
                               }, 1500);

                            }

                     }

                     $scope.term = $routeParams.term
                      $scope.queryDistance= 40;
                      $scope.queryCity = ""

                      var pos=SessionManager.api.getLocation()
                      console.log(pos)
                      if( pos !==null)
                      {
                         console.log("KICKING OFF")
                         console.log(pos)
                         if($rootScope.currentLocation== undefined){
                              $scope.location =  [pos.coords.latitude,pos.coords.longitude]
                         }else {
                             {
                                   $scope.location  = $rootScope.currentLocation
                             }
                         }

                          $scope.searchCommand()
                          if( $scope.isGoogleAPIDefined){
                            $scope.getCurrentLocation ( $scope.location);
                        }
                      }


                      $scope.$on("USER_LOCATION_FOUND",function()
                  {
                      if($rootScope.currentLocation==undefined){
                        pos=SessionManager.api.getLocation()
                         $scope.location = [pos.coords.latitude,pos.coords.longitude]
                     }else {
                          $scope.location =rootScope.currentLocation
                              pos=SessionManager.api.getLocation()
                     }
                         $scope.searchCommand()
                         if( $scope.isGoogleAPIDefined){
                           $scope.getCurrentLocation ($scope.location);
                       }
                  })


        })





})();
