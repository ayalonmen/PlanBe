(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopSix" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-six.html',

                controller: function($scope,TimeOptions)
                {
                           $scope.session = {duration:0}
                           $scope.startTime = "10:00"
                           $scope.dialogOpen = false;
                           $scope.timeOptiones = TimeOptions;
                           console.log($scope.timeOptiones)
                           $scope.dialogOpen = false
                          // $scope.newSession = {};
                          // $scope.newSession.start={timeRep:"10:00"}

                           var unixtime = Date.parse("24-Nov-2009 17:57:35").getTime()/1000

                            $scope.session.date=  "2016-07-21";
                            $scope.session.hour = "09:00:00"
                           $scope.session.hour_end = "12:00:00"

                            $scope.$on("CALENDAR_DAY_SELECTED",function($event,date)
                        {
                            $scope.$apply(function()
                             {
                                 $scope.dialogOpen = true
                                 $scope.cdate = Date.parse(date)
                                $scope.cdate = Date.parse( $scope.cdate.toString("yyyy-MM-dd"+" " + $scope.startTime))

                                 $scope.cdate_end_time = Date.parse($scope.cdate.toString("yyyy-MM-dd HH:mm"))
                                  $scope.cdate_end_time.addHours(parseInt($scope.workshop.duration))

                                 $scope.session_month =   $scope.cdate.toString("MMM")
                                  $scope.session_year =   $scope.cdate.toString("yyyy")
                                 $scope.session_day =   $scope.cdate.toString("dd")
                                  $scope.session_end_time =  $scope.cdate_end_time.toString("HH:mm")


                                 console.log( $scope.cdate.toString())
                                 console.log( $scope.cdate_end_time.toString())

                                 //$scope.selected = val;
                                 //$scope.child = other_scope
                             });

                        })
                            $scope.createSession = function()
                            {

                                          var obj  = {};

                                          obj.time =     ($scope.session.date) .trim()+ " " + ($scope.session.hour).trim();
                                          obj.end_time =     Date.parse(($scope.session.date) .trim()+ " " + ($scope.session.hour_end).trim()).addHours(workshop.duration).toString("yyyy-MM-dd HH:mm:00");
                                          obj.workshop = $scope.workshop.id;

                                          if($scope.workshop.isMulti)
                                          {
                                                         obj.multi_session_array = [];
                                                          for(var i=0;i<$scope.workshop.multiNum-1;i++)
                                                          {
                                                             var time = Date.parse(($scope.session.date) .trim()+ " " + ($scope.session.hour).trim());
                                                             time = time.addDays((i+1)*5)
                                                             var dtime= time.toString("yyyy-MM-dd HH:mm:00")
                                                             console.log(dtime)
                                                              obj.multi_session_array .push(dtime)
                                                          }
                                                          obj.sessionType = "3";
                                          }else{

                                                     obj.recurringInterval= ($scope.session.recurringInterval).toString();
                                                     obj.recurring_length= ($scope.session.recurring_length).toString();
                                                     obj.sessionType = "2";
                                           }
                                         console.log(obj)
                                        $scope.$parent.createSession(obj)
                                     }

                                     $scope.onChange=function()
                                     {
                                         console.log($scope.startTime)
                                     }

                },
                controllerAs:'ows5ctrl'
            }
        })

})();
