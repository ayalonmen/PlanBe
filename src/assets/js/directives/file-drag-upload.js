(function () {
    'use strict';

    angular.module('myApp')
        .directive('fileDragUpload', function ($parse) {
            return {
                restrict: 'E',
                scope:{
                    onReadFile:'=',
                    dim:'@'
                },
                template: '<div class="callout" id="container"> \
                                        <div style="width: 90%; height: auto;  margin: 20% auto; padding: 10px;  position: relative;" id="upload_button"> \
                                                        <div> \
                                                                    <md-button class="md-fab" aria-label="upload"><md-icon md-svg-src="../assets/img/md-icons/backup.svg"></md-icon></md-button>Upload Photos\
                                                        </div> \
                                                       <div> or drag them inside</div> \
                                        </div>\
                                </div>\
                                 <input type="file" id="upload" ng-hide="true" />',
                link: function(scope, element, attrs,ctrl) {

                    var upload =  element.find("#upload")
                        if(scope.dim == "big")
                        {
                            element.find("#container").addClass('uploader-empty')
                        }else {
                            element.find("#container").addClass('uploader')
                        }

                    element.find("#upload_button").on("click",function(e)
                    {
                        upload.trigger('click');
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
