(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopSix" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-six.html',

                controller: function($scope)
                {
                           $scope.session = {duration:0}

                           var unixtime = Date.parse("24-Nov-2009 17:57:35").getTime()/1000
                            $scope.session.date=  "2016-07-21";
                            $scope.session.hour = "09:00:00"
                           $scope.session.hour_end = "12:00:00"
                            $scope.createSession = function()
                            {
                                var obj  = {};
                               obj.time =     ($scope.session.date) .trim()+ " " + ($scope.session.hour).trim();
                               obj.end_time =     ($scope.session.date) .trim()+ " " + ($scope.session.hour_end).trim();
                              obj.workshop = $scope.workshop.id;

                             obj.recurringInterval= ($scope.session.recurringInterval).toString();
                             obj.recurring_length= ($scope.session.recurring_length).toString();
                             obj.sessionType = "2";
                                console.log(obj)
                               $scope.$parent.createSession(obj)
                            }

                },
                controllerAs:'ows5ctrl'
            }
        })

})();
