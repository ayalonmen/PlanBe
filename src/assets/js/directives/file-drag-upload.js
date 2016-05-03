(function () {
    'use strict';

    angular.module('myApp')
        .directive('fileDragUpload', function ($parse) {
            return {
                restrict: 'E',
                scope:false,
                template: '<div class="callout uploader" id="container">Drag or click to upload </div> <input type="file" id="upload" ng-hide="true" />',
                transclude:true,
                link: function(scope, element, attrs,ctrl) {

                    element.find("#container").on("click",function(e)
                    {
                        e.preventDefault();
                        e.stopPropagation();
                        angular.element(event.target).siblings('#upload').trigger('click');
                    })

                    element.on('dragover', function(e) {

                        e.preventDefault();
                        e.stopPropagation();

                    });
                    element.on('dragenter', function(e) {
                        console.log("drag")
                       e.target.style.opacity = 0.5;
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    element.on('dragleave', function(e) {
                        e.target.style.opacity = 1;
                        e.preventDefault();
                        e.stopPropagation();
                    });

                    element.find("#upload").on('change', function(onChangeEvent) {
                        var reader = new FileReader();

                        reader.onload = function(onLoadEvent) {
                            scope.$apply(function() {
                                scope.onReadFile(onLoadEvent.target.result);
                            });
                        };
                        reader.readAsDataURL((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                    });

                    element.on('drop', function(e) {
                        e.target.style.opacity = 1;
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.originalEvent.dataTransfer){
                            if (e.originalEvent.dataTransfer.files.length > 0) {
                              console.log(e.originalEvent.dataTransfer.files);
                                var reader = new FileReader();

                                reader.onload = function(onLoadEvent) {

                                    scope.$apply(function() {
                                        scope.onReadFile( onLoadEvent.target.result);
                                    });

                                };
                                reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
                            }
                        }
                        return false;
                    });



                },

            }
        });

})();
