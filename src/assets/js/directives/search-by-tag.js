(function () {
    'use strict';

    angular.module('myApp')
        .directive("searchByTag" ,function(){
            return {
                restrict: "E",
                templateUrl:'../assets/templates/search-by-tag.html',
                scope:{
                },
                link : function(scope,element,attr){},
                controller: function($scope,$timeout, $q)
                {
                    var self = this;
                    self.readonly = false;
                    self.selectedItem = null;
                    self.searchText = null;
                    self.querySearch = querySearch;
                    self.vegetables = loadVegetables();
                    self.selectedVegetables = [];
                    self.numberChips = [];
                    self.numberChips2 = [];
                    self.numberBuffer = '';
                    self.autocompleteDemoRequireMatch = false;
                    self.transformChip = transformChip;
                    /**
                     * Return the proper object when the append is called.
                     */
                    function transformChip(chip) {
                      // If it is an object, it's already a known chip
                      if (angular.isObject(chip)) {
                        return chip;
                      }
                      // Otherwise, create a new one
                      return { name: chip, type: 'new' }
                    }
                    /**
                     * Search for vegetables.
                     */
                    function querySearch (query) {
                      var results = query ? self.vegetables.filter(createFilterFor(query)) : [];
                      console.log(query)
                      return results;
                    }
                    /**
                     * Create filter function for a query string
                     */
                    function createFilterFor(query) {
                      var lowercaseQuery = angular.lowercase(query);
                      console.log(lowercaseQuery)
                      return function filterFn(vegetable) {
                        return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
                            (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
                      };
                    }
                    function loadVegetables() {
                      var veggies = [
                        {
                          'name': 'Broccoli',
                          'type': 'Brassica'
                        },
                        {
                          'name': 'Cabbage',
                          'type': 'Brassica'
                        },
                        {
                          'name': 'Carrot',
                          'type': 'Umbelliferous'
                        },
                        {
                          'name': 'Lettuce',
                          'type': 'Composite'
                        },
                        {
                          'name': 'Spinach',
                          'type': 'Goosefoot'
                        }
                      ];
                      return veggies.map(function (veg) {
                        veg._lowername = veg.name.toLowerCase();
                        veg._lowertype = veg.type.toLowerCase();
                        return veg;
                      });
                    }
                },
                controllerAs: 'srchCtrl'
            }
        })

})();
