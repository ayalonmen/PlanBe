(function () {
    'use strict';

    angular.module('myApp')
        .directive("calCell" ,function(){
            return {
                restrict: "E",
                templateUrl:'../assets/templates/cal-cell.html',
                scope:{
                    initData : "=",
                    openDialog:'=',
                    cindex:"@"
                },
                link : function(scope,element,attr)
                {

                    scope.data = scope.initData(scope.cindex)

                    if(scope.data!=null){
                        scope.eventNum = scope.data.length;
                    }

                    element.on('click',function(e)
                    {
                      scope.openDialog(scope.cindex,scope);
                    });  


                    scope.refresh = function()
                    {
                      //  scope.data={}
                      // scope.data = scope.initData(scope.cindex)

                    }
                    scope.testHover=function(e)
                    {
                        var data_array = e.target.id.split("_")
                        var date_index = data_array[0]
                        var pos_index = data_array[1]
                        console.log( scope.data[pos_index-1])
                    }


                }


            }
        })

})();
