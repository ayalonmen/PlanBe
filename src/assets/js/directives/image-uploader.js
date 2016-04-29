(function () {
    'use strict';

    angular.module('myApp')
        .directive('imageUploader', function ($parse) {
            return {
                restrict: 'E',
                scope: {

                },
                transclude:true,
                templateUrl:'../../assets/templates/image-uploader.html',
                link: function(scope, element, attrs,ctrl) {

                   element.find("#container").on("click",function(e)
                    {
                        angular.element(event.target).siblings('#upload').trigger('click');
                    })

                    element.find("#upload").on('change', function(onChangeEvent) {
                        var reader = new FileReader();

                        reader.onload = function(onLoadEvent) {
                            scope.onReadFile(onLoadEvent.target.result,element)
                        };
                        reader.readAsDataURL((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                    });
                },
                controller: function($scope)
                {
                    var _self = this;
                    $scope.bgImg = "";
                    $scope.onReadFile = function($fileContent,element) {
                        console.log(element)
                        $scope.bgImg  = $fileContent;
                        element.find("#container").css("background-image","url('" +$scope.bgImg +"')");
                    }
                },
                controllerAs:"ctrl"
            };
        });

})();
