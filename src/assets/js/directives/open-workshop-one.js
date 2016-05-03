(function () {
    'use strict';

    angular.module('myApp')
        .directive("openWorkshopOne" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/open-workshop-one.html',
                scope:false,
                link : function(scope,element,attr,ctrl)
                {
                     console.log("In Directve One")
                    console.log(element.find("form"))
                }
                //controller:function($scope, $element, $attrs) {
                //    $scope['openWorkshopOne']=this;   // Exposes the directive controller on the parent scope with name myDirectiveName
                //
                //    // Now you can define a function that tells state of the form. Or expose the form on the controller
                //    this.isValid=function() {
                //        return $scope.wsFormOne.$valid;
                //    }
               // }

            }
        })

})();
