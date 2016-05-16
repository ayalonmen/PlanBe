(function () {
    'use strict';

    angular.module('myApp')
        .directive("pbCalendar" ,function(){
            return {
                restrict: "E",
                templateUrl: '../assets/templates/pb-calendar.html',
                scope: {
                    formWatch: "=",
                    workshop:"@"
                },
                link: function (scope, element, attr, ctrl) {

                },
                controller: 'CalControl',
                controlAs: 'ctrl'

            }
        })
        .controller('CalControl',function($scope,TimeOptions)
        {

            $scope.today = Date.today();
            $scope.month = $scope.today.toString("MMM");
            $scope.year = $scope.today.toString("yyyy");

            var numOfDays = $scope.today.getDaysInMonth()
            $scope.days = {}
            for(var i=0;i<numOfDays;i++)
            {
                var dayObj = {date:i+1,c_items:[]}
                $scope.days["date" + (i+1)] = dayObj
            }

            console.log($scope.days)
            console.log($scope.workshop)
            $scope.timeOptiones = TimeOptions;
            $scope.dialogOpen = false
            $scope.newSession ={start:"10:00",end:"11:00"}


            $scope.data = {
                days: {
                    date1: {date: 1, c_items: [{start: 9, end: 15, color: "red"}, {start: 11, end: 17, color: "blue"}]},
                    date2: {
                        date: 2,
                        c_items: [{start: 7, end: 18, color: "yellow"}, {start: 11, end: 17, color: "green"}]
                    },
                    date3: {date: 3, c_items: [{start: 7, end: 18, color: "blue"}]},
                    date4: {date: 4, c_items: [{start: 7, end: 18, color: "blue"}]},
                    date9: {date: 9, c_items: [{start: 9, end: 15, color: "red"}, {start: 11, end: 17, color: "blue"}]},
                    date10: {
                        date: 10,
                        c_items: [{start: 7, end: 18, color: "yellow"}, {start: 11, end: 17, color: "green"}]
                    },
                    date11: {date: 11, c_items: [{start: 7, end: 18, color: "blue"}]},
                    date15: {date: 15, c_items: [{start: 7, end: 18, color: "red"}]},
                    date16: {date: 16, c_items: [{start: 7, end: 18, color: "blue"}]},
                    date17: {
                        date: 17,
                        c_items: [{start: 9, end: 15, color: "red"}, {start: 11, end: 17, color: "blue"}]
                    },
                    date18: {
                        date: 18,
                        c_items: [{start: 7, end: 18, color: "yellow"}, {start: 11, end: 17, color: "green"}]
                    },
                    date19: {date: 19, c_items: [{start: 7, end: 18, color: "blue"}]},
                    date24: {date: 24, c_items: [{start: 7, end: 18, color: "blue"}]}
                }
            }

            for (var obj in $scope.data.days)
            {
                 $scope.days[obj].c_items = $scope.data.days[obj].c_items;
            }



            $scope.initData= function(val)
            {
                return ($scope.days["date"+val] )? $scope.days["date"+val].c_items : null
            }


            $scope.openDialog= function(val,other_scope)
            {
              /* $scope.$apply(function()
               {
                   $scope.dialogOpen = true
                   $scope.selected = val;
                   $scope.child = other_scope
               });*/
                console.log("openDialog" + val)
                $scope.$emit("CALENDAR_DAY_SELECTED" ,$scope.year +"-"+ $scope.month+"-" +val)
            }


            $scope.createSession = function()
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

            }

           $scope.getRandHex = function()
            {
                return '#'+Math.floor(Math.random()*16777215).toString(16)
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
