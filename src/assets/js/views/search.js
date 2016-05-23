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


        .controller('searchCtrl', function($scope,$routeParams,WorkshopHelper,Lang,lazyLoadApi,SessionManager,$timeout){
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
                    console.log("MFR22!!")
                    console.log(SessionManager.api.getLocation());
            }

            //@ we use google api to get the user city  based on the coordinates
            $scope.getCurrentLocation = function(posObj)
            {

                              var latlng = {lat: parseFloat(posObj.coords.latitude), lng: parseFloat(posObj.coords.longitude)};
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
                         $scope.getCurrentLocation(pos)
                     }
                }




               //@ we use google api to get the user coordinates based on the city
                $scope.searchLocation = function()
                {
                        $scope.geocoder = new google.maps.Geocoder();
                        console.log("searchLocation")
                            console.log($scope.queryCity)
                        $scope.geocoder.geocode({'address': $scope.queryCity}, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {

                                $scope.location = [parseFloat(results[0].geometry.location.lat()),parseFloat(results[0].geometry.location.lng())]
                                console.log($scope.location )
                                console.log($scope.queryDistance )
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




                     $scope.searchCommand = function(pos)
                     {
                           $scope.$parent.search($routeParams.term,$scope.onResults, pos,$scope.queryDistance);

                     }
                     $scope.onDistanceChange = function()
                     {
                          //
                          $timeout.cancel($scope.futureRequest)
                         $scope.futureRequest = $timeout(function() {
                             var pos=SessionManager.api.getLocation()
                            $scope.searchCommand(pos.coords.latitude +" " +pos.coords.longitude)
                        }, 1500);
                     }

                     $scope.term = $routeParams.term
                     $scope.location = []
                      $scope.queryDistance= 20;
                      $scope.queryCity = ""
                      var pos=SessionManager.api.getLocation()
                      if( pos !==null)
                      {
                          console.log("KICKING OFF")
                           console.log(pos)
                          $scope.searchCommand(pos.coords.latitude +" " +pos.coords.longitude)
                          if( $scope.isGoogleAPIDefined){
                            $scope.getCurrentLocation (pos);
                        }
                      }
                      $scope.$on("USER_LOCATION_FOUND",function()
                  {
                        pos=SessionManager.api.getLocation()
                         $scope.searchCommand(pos.coords.latitude +" " +pos.coords.longitude)
                         if( $scope.isGoogleAPIDefined){
                           $scope.getCurrentLocation (pos);
                       }
                  })


        })





})();
