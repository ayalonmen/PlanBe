(function () {
    'use strict';

    angular.module('myApp')
        .directive("pbCalendar" ,function(){
            return {
                restrict: "E",
                templateUrl: '../assets/templates/pb-calendar.html',
                scope: {
                    formWatch: "="
                },
                link: function (scope, element, attr, ctrl) {
                    console.log("PB CLENDAR LINK:")
                        console.log(ctrl)
                },
                controller: 'CalControl',
                controlAs: 'ctrl'

            }
        })
        .controller('CalControl',function($scope)
        {

            var _self = this;
            $scope.data2 = {};

            $scope.today = Date.today();


            $scope.$on("SESSION_DATA_INIT",function(e,data)
        {
            $scope.data2={};
            console.log("SESSION_DATA_INIT")
            console.log(data)
            delete data["__proto__"]

           for(var t in data)
           {
               var sd = Date.parse(data[t].time)
               if( $scope.data2[sd.toString("MMM")] === undefined){
                   $scope.data2[sd.toString("MMM")] = []
               }
               if(    $scope.data2[sd.toString("MMM")]["date"+parseInt(sd.toString("dd"))] === undefined ){
                     $scope.data2[sd.toString("MMM")]["date"+parseInt(sd.toString("dd"))] = {c_items:[]}
                }
                var obj = {}
                obj.start = parseInt(sd.toString("HH"))
                var ed = sd.clone()
                obj.end  = parseInt(ed.addHours(5).toString("HH"))
                obj.color=  $scope.getRandHex()
                 $scope.data2[sd.toString("MMM")]["date"+parseInt(sd.toString("dd"))]["c_items"].push(obj)
            }
               console.log($scope.data2)

            for (var obj in $scope.data2[$scope.today.toString("MMM")])
            {
                console.log(obj)
                 $scope.days[obj].c_items = $scope.data2[$scope.today.toString("MMM")][obj].c_items;
                     console.log($scope.days[obj])
            }

            $scope.$broadcast("CELL_DATA_INIT","")

        })
            _self.setInitdata = function()
            {
                $scope.month = $scope.today.toString("MMM");
                $scope.year = $scope.today.toString("yyyy");

                var numOfDays = $scope.today.getDaysInMonth()
                $scope.days = {}
                for(var i=0;i<numOfDays;i++)
                {
                    var dayObj = {date:i+1,c_items:[]}
                    $scope.days["date" + (i+1)] = dayObj
                }
            }


            _self.setInitdata();






            $scope.initData= function(val)
            {
                return ($scope.days["date"+val] )? $scope.days["date"+val].c_items : null
            }

            $scope.skipMonth = function(mm)
            {
                var testdate = $scope.today .clone()
                testdate = testdate.addMonths(mm);
                if(testdate.compareTo(Date.today())>=0){
                    $scope.today = testdate.clone();
                    _self.setInitdata();
                }

                console.log("skipMonth")

            }


            $scope.openDialog= function(val,other_scope)
            {
                console.log("openDialog" + val)
                $scope.$emit("CALENDAR_DAY_SELECTED" ,$scope.year +"-"+ $scope.month+"-" +val)
            }


            /*$scope.createSession = function()
            {
                $scope.dialogOpen = false;
                $scope.child.refresh();
                var s = parseInt($scope.newSession.start.split(":")[0]);
                var e = parseInt($scope.newSession.end.split(":")[0]);

                if( $scope.days["date" + $scope.selected]==undefined){
                    $scope.days ["date" + $scope.selected] = {date: $scope.selected, c_items:[] }
                }
                var color =$scope.getRandHex()
                $scope.days["date" + $scope.selected].c_items.push({start:s,end:e,color:color})
                console.log( $scope.days)

            }*/

           $scope.getRandHex = function()
            {
                return "tomato";//'#'+Math.floor(Math.random()*16777215).toString(16)
            }
        })



})();
