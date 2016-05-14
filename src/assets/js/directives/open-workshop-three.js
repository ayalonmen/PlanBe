(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopThree" ,function() {
            return {
                restrict: "E",
                transclude: true,
                templateUrl: '../assets/templates/open-workshop-three.html',
                //     link: function(scope,element,attr) {
                //         scope.initMap = function () {
                //             var map = new google.maps.Map(document.getElementById('map'), {
                //                 zoom: 3,
                //                 center: {lat: 32.397, lng: 34.644},
                //                 disableDefaultUI: true,
                //                 zoomControl: true
                //             });
                //
                //         var geocoder = new google.maps.Geocoder();
                //
                //         document.getElementById('submit').addEventListener('click', function() {
                //             geocodeAddress(geocoder, map);
                //         });
                //         }
                //
                //     },
                    controller: function($scope) {

                        $scope.coordinates = ""
                         var s ;
                         if(document.getElementById("google_maps_script") == undefined)
                         {
                             s = document.createElement('script')
                             s.setAttribute("id", "google_maps_script");
                             s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCHT4bHwLeqV8VYCGw1q0SQDaCL13xi0i0&callback=initMap'
                             document.body.appendChild(s)
                             console.log("ADDIN GOOGLE SCRIPT")
                         }



                        $scope.$on("ON_COORDINATES_FOUND",function(event,data)
                        {
                            $scope.$apply(function()
                            {
                                $scope.coordinates = data
                            })

                        })
                        //  $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHT4bHwLeqV8VYCGw1q0SQDaCL13xi0i0"


                    }


            }

        })

})();
