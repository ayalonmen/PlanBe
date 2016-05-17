(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopSix" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-six.html',

                controller: function($scope,TimeOptions)
                {
                           $scope.session = {};
                           $scope.dialogOpen = false;
                           $scope.timeOptiones = TimeOptions;
                           $scope.startTime =   $scope.timeOptiones[20]
                           var _self = this;
                          _self.recurringFlag = false;


                            $scope.$on("CALENDAR_DAY_SELECTED",function($event,date)
                        {
                            $scope.$apply(function()
                             {
                                 $scope.dialogOpen = true
                                 $scope.cdate = Date.parse(date)
                                 $scope.cdate = Date.parse( $scope.cdate.toString("yyyy-MM-dd"+" " + $scope.startTime.timeRep))
                                 $scope.cdate_end_time = Date.parse($scope.cdate.toString("yyyy-MM-dd HH:mm"))
                                 $scope.cdate_end_time.addHours(parseInt($scope.workshop.duration))
                                 $scope.session_month =   $scope.cdate.toString("MMM")
                                 $scope.session_year =   $scope.cdate.toString("yyyy")
                                 $scope.session_day =   $scope.cdate.toString("dd")
                                 $scope.session_end_time =  $scope.cdate_end_time.toString("HH:mm")

                             });

                        })


                             $scope.onChange=function()
                             {
                                 $scope.cdate = Date.parse( $scope.cdate.toString("yyyy-MM-dd"+" " + $scope.startTime.timeRep))
                                 $scope.cdate_end_time = Date.parse($scope.cdate.toString("yyyy-MM-dd HH:mm"))
                                 $scope.cdate_end_time.addHours(parseInt($scope.workshop.duration))
                                 $scope.session_end_time =  $scope.cdate_end_time.toString("HH:mm")
                             }

                             $scope.isRecurring=function()
                             {

                                _self.recurringFlag = !_self.recurringFlag

                             }


                             $scope.createSession = function()
                             {

                                           var obj  = {};
                                           obj.time =     $scope.cdate.toString("yyyy-MM-dd HH:mm:00")
                                           obj.end_time =     $scope.cdate_end_time.toString("yyyy-MM-dd HH:mm:00")
                                           obj.workshop = $scope.workshop.id;
                                           if($scope.workshop.isMulti) {
                                                          obj.multi_session_array = [];
                                                           for(var i=0;i<$scope.workshop.multiNum-1;i++)
                                                           {
                                                              var time = Date.parse($scope.cdate.toString("yyyy-MM-dd HH:mm:00"));
                                                              time = time.addDays((i+1)*7)
                                                              var dtime= time.toString("yyyy-MM-dd HH:mm:00")
                                                              console.log(dtime)
                                                               obj.multi_session_array .push(dtime)
                                                           }
                                                           obj.sessionType = "3";
                                           }else{
                                               if(_self.recurringFlag){
                                                   obj.recurringInterval= ($scope.session.recurringInterval).toString();
                                                   obj.recurring_length= ($scope.session.recurring_length).toString();
                                                   obj.sessionType = "2";
                                               }else {
                                                     console.log("IN RECURRINGFLAG FALSE")
                                                      console.log( _self.recurringFlag)
                                                        obj.sessionType = "1";
                                               }


                                            }

                                          console.log(obj)
                                         $scope.$parent.createSession(obj)

                                      }
                                    

                },
                controllerAs:'ows6ctrl'
            }
        })

        .service("TimeOptions",function()
        {
            var opt = new Array();


            for (var i=0;i<24;i++)
            {
                var minRep  =":00"
                var hourRep = i.toString()
                if( i<10 ) {
                    hourRep = "0"+ hourRep
                }
                var timeRep =  hourRep +minRep
                opt.push({timeRep:timeRep})
                minRep = ":30";
                timeRep =  hourRep +minRep
                opt.push({timeRep:timeRep})

            }
            return opt;
        })

})();
