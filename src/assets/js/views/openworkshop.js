(function(){
'use strict';

angular.module('openworkshop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/openworkshop', {
    templateUrl: '../../assets/views/openworkshop.html',
    controller: 'WS1Ctrl',
    controllerAs:'ctrl'
  });
}])

.controller('WS1Ctrl', function($scope,WorkshopHelper) {

         var _self = this;
        _self.showWSForm= 0;
        _self.showBizForm = false;
        _self.newBiz = {}
        $scope.workshop = {};

        $scope.init = function(){
            _self.showWSForm= 0;
            _self.showBizForm = false;
            _self.newBiz = {}

            if($scope.$parent.userDetails.businesses.length>0)
            {
                console.log("length>0")
              _self.showWSForm= 1;
               _self.showBizForm = false;
                _self.newBiz = $scope.$parent.userDetails.businesses[0]
                console.log(_self.newBiz)
            }else{
                _self.showBizForm = true;
                _self.showWSForm= 0;
            }

        };

    if(!$scope.$parent.isLogged)
    {
        $scope.navigateTo("register","/login")
    }else {

        if($scope.$parent.userDetails && $scope.$parent.userDetails.businesses)
        {
            console.log("openworkshop init")
            $scope.init();
        }
        $scope.$on("SESSION_READY",function(event,data)
        {
            console.log("SESSION_READY")
            console.log("before init")
            $scope.init();
            console.log("after init")
        });

        $scope.$on("CREATE_BUSINESS_SUCCESS",function(event,data){
            //$scope.$parent.setSessionData();
            $scope.$emit("REFRESH_SESSION_REQUEST","")
            //TODO
        });

        $scope.$on("CREATE_WORKSHOP_SUCCESS",function(event,data)
        {

            var wsid = data.data["__metadata"].id
            console.log("Workshop created succesully")
            $scope.$parent.navigateTo("openwokshop","/updateworkshop/" + wsid);

            //TODO
        });

        $scope.$on("CREATE_WORKSHOP_ERROR",function()
        {
            $scope.error="Something went wrong, please try again"

            //TODO
        });

        $scope.update = function(val)
        {
            $scope.workshop.business = _self.newBiz.id;
            console.log("Submit Workshop 1")
            console.log($scope.workshop)
            $scope.$parent. openWorkshop( WorkshopHelper.packWorkshop($scope.workshop))
        }


    }

});
})();
