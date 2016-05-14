(function () {
    'use strict';

    angular.module('myApp')
        .directive("messagePanel" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/message-panel.html',
                scope:true,
                link:function(scope,element,attr)
                {


                },
                controller: function($scope)
                {
                    var _self = this;
                    $scope.error = null
                    $scope.$on("SERVER_ERROR",function(event,err)
                    {
                        $scope.error = "SERVER_ERROR  - " + err.status + " " + err.data;

                    })

                    $scope.closeMe=function()
                    {
                        $scope.error = null;  
                    }

                },
                controllerAs: 'panelCtrl'

            }
        })
})();
