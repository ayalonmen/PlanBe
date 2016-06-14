(function() {
	'use strict';

	angular.module('myApp').directive('offCanvasTrigger', function($window) {
		return {
			scope: {},
			link: function(scope, element, attributes) {
				var dataPaneID = attributes.offCanvasTrigger

				var pane = element.siblings('#'+dataPaneID)
                var background_element = angular.element("<div class='fade-in container-background'></div>")
                 pane.css('display', 'none')
                 pane.addClass("slide-in mui-enter")
                 scope.gate = false;

                   angular.element($window).bind('resize', function(){
                          closeGate();
                          pane.css('display', 'none')
                    })
                    pane.on('click',function()
                    {
                        scope.gate  = false;
                      closeGate();
                    })
					//pane.on('touchmove', function(e) {

        				//e.preventDefault();
					//}, false);
                   element.on("click",function(event) {
                       event.preventDefault()
                       scope.gate  = !scope.gate;
                       if(scope.gate ){
                            openGate();
                        }else {
                            closeGate();
                        }
                   })

                  var closeGate= function()
                  {
                        scope.gate = false;
                      pane.removeClass("mui-enter-active")
                      pane.addClass("slide-out mui-leave")
                       pane.addClass("mui-leave-active")
                      background_element.remove();
                  }
                  var openGate = function()
                  {
                      if (pane.position() !== undefined) {

                              pane.css('display', 'block')
                              pane.css('left', window.innerWidth-pane.outerWidth())//element.position().left - (pane.outerWidth() -element.outerWidth()))
                              pane.css('top', 0)
                              background_element.css('width',window.innerWidth)
                                element.append(background_element)
                                 pane.removeClass("mui-leave-active")
                                 pane.addClass("mui-enter-active")
                        }
                  }

			}

		};
	})

})();
