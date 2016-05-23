(function () {
    'use strict';

    angular.module('myApp')
        .directive('googleMap', function ($rootScope, lazyLoadApi) {

            return {
                restrict: 'CA', // restrict by class name
                scope: {
                    mapId: '@id', // map ID
                    lat: '@', // latitude
                    long: '@' // longitude
                },
                link: function (scope, element, attrs) {
                    var location = null;
                    var map = null;
                    var mapOptions = null;


                    // Check if latitude and longitude are specified
                    if (angular.isDefined(scope.lat) && angular.isDefined(scope.long)) {


                        lazyLoadApi.then(initializeMap)
                    }

                    // Initialize the map
                    function initializeMap() {

                        location = new google.maps.LatLng(scope.lat, scope.long);

                        mapOptions = {
                            zoom: 15,
                            center: location
                        };

                        scope.map = new google.maps.Map(element[0], mapOptions);
                        scope.geocoder = new google.maps.Geocoder();
                        console.log("geocoder")
                        console.log(scope.geocoder)
                        document.getElementById('submit').addEventListener('click', function() {
                            setGeo(scope.map);
                        });
                        new google.maps.Marker({
                            position: location,
                            map: scope.map,
                        });





                    }

                   var setGeo = function (resultsMap) {

                        var address = document.getElementById('address').value
                        scope.geocoder.geocode({'address': address}, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                console.log(typeof (results[0].geometry.location.lng().toString()))
                                console.log(results[0].geometry.location.lng().toString())
                              scope.$emit("ON_COORDINATES_FOUND", (results[0].geometry.location.lat().toString() + ":" + results[0].geometry.location.lng().toString()))
                                resultsMap.setCenter(results[0].geometry.location);
                                var marker = new google.maps.Marker({
                                    map: resultsMap,
                                    position: results[0].geometry.location
                                });
                            } else {
                                alert('Geocode was not successful for the following reason: ' + status);
                            }
                        });
                    }
                },
                controller: function()
                {
                    console.log("GOOGLE_MAP CONTROLLER!!!!!!!!!!")
                }
            };
        });
})();
