(function() {
	'use strict';

	angular.module('myApp').directive('dropDownTrigger', function() {
		return {
			scope: {},
			link: function(scope, element, attributes) {
				var dataPaneID = attributes.dropDownTrigger
				console.log(dataPaneID)
				var pane = element.siblings('#' + dataPaneID)

				if (pane.position() !== undefined) {
					pane.css('position', 'fixed')
					pane.css('z-index', 5)
					pane.css('width', '300px')
					scope.stillOn = false;
                    var position = element.position();
                    var p_height = pane.height();
                    var arrow =   pane.find('#arrow')
                    var ar_pos = arrow.position();
                    arrow.css('position','fixed');


					   element.on("mouseover",function() {
                        scope.stillOn = true;
						pane.css('display', 'block')

						pane.css('left', element.position().left - (pane.outerWidth() / 2))
						pane.css('top', element.height() + position.top)


                        arrow.css('top', pane.offset().top -9);
						var p_pos = pane.position()

						var right_overflow = window.innerWidth - (p_pos.left + pane.outerWidth());
						var left_overflow = p_pos.left - pane.outerWidth()

						if (right_overflow < 0) {
							pane.css('left', (p_pos.left) + right_overflow)
						}

						if (left_overflow < 0) {
							pane.css('left', 0)
						}
                        var f_pos = element.offset()
                        console.log("&&&" + f_pos.left)
                        arrow.css('left', f_pos.left + (element.width()/4));

					})

					pane.on("mouseenter", function() {
						scope.stillOn = true;
						pane.css('display', 'block')
					})



					element.on("mouseleave",function() {
						setTimeout(function() {
							if (!scope.stillOn) {
								pane.css('display', 'none')
							}
						}, 1550)

					})
					pane.on("mouseleave", function() {
						setTimeout(function() {

							pane.css('display', 'none')
                            scope.stillOn = false;
						}, 550)
					})

				}
			}

		};
	})

})();
