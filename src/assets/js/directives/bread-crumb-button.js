(function () {
    'use strict';

    angular.module('myApp')
        .directive("breadCrumbButton" ,function(){
            return {
                restrict: "E",
                templateUrl:'../../assets/templates/bread-crumb-button.html',
                scope:{
                    formWatch : "="
                },
                link : function(scope,element,attr,ctrl)
                {
                    //  console.log("In Directve One")
                    // console.log(element.find("form"))
                }


            }
        })

})();
