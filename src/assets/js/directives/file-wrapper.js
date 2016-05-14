(function () {
    'use strict';

    angular.module('myApp')
        .directive('fileWrapper', function ($parse) {
            return {
                restrict: 'A',
                scope: true,
                link: function(scope, element, attrs) {

                    element.on('click',function(e)
                    {
                        angular.element(e.target).siblings('#upload').trigger('click');  
                      e.stopPropagation()
                    });

                }
            }})
})();
