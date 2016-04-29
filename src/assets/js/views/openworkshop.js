(function(){
'use strict';

angular.module('openworkshop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/openworkshop', {
    templateUrl: '../../assets/views/openworkshop.html',
    controller: 'WSCtrl',
    controllerAs:'ctrl'
  });
}])

.controller('WSCtrl', ['Backand','$scope','$http',function(Backand,$scope,$http) {

         var _self = this;
        _self.showWSForm= 0;
        _self.showBizForm = false;
        _self.newBiz = {}

        $scope.init = function(){
            _self.showWSForm= 0;
            _self.showBizForm = false;
            _self.newBiz = {}


            $scope.newWs ={ cancelpolicy: true,isMulti:false};
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
            $scope.$parent.setSessionData();

        });

        $scope.$on("CREATE_WORKSHOP_SUCCESS",function()
        {
            _self.showWSForm= 2;
            console.log("Workshop created succesully")
        });

        $scope.$on("CREATE_WORKSHOP_ERROR",function()
        {
            $scope.error="Something went wrong, please try again"
        });

        $scope.submitOne = function(obj)
        {
           obj.business = _self.newBiz.id;
            console.log("Submit Workshop 1")
            console.log(obj)
            $scope.$parent. openWorkshop( obj)
        }

        $scope.submitTwo = function(obj)
        {
            obj.business = _self.newBiz.id;
            //$scope.$parent. openWorkshop( obj)
            _self.showWSForm= _self.showWSForm +1;
        }



    }

}]);
})();

//
//$scope.setPolicy=function(val)
//{
//    $scope.newWs.cancelpolicy = val;
//    console.log(val)
//}
//$scope.setSingleSession=function(val)
//{
//    $scope.newWs.isMulti = val;
//    console.log(val)
//}
//
//$scope.showContent = function($fileContent,fieldName){
//    $scope.content[fieldName] = $fileContent;$scope.images[fieldName] = new Object();
//    $scope.images[fieldName].filename =  "WS_" +fieldName +"_" +  $scope.$parent.userDetails.id;
//    $scope.images[fieldName].filedest =  Data_Model.application_data.USER_STORAGE_URL;
//    $scope.images[fieldName].filedata = $fileContent.substr( $fileContent.indexOf(',')+1,  $fileContent.length);
//    $scope.uploadImage( $scope.images[fieldName]).then(function(data)
//    {
//        console.log("GetURL DATA:")
//        console.log(data)
//        $scope.newWs[fieldName] = data.data.url;
//        console.log($scope.newWs[fieldName])
//
//    })
//
//};


//
//$scope.prepareAndSubmit = function() {
//    var atr;
//    var obj = $scope.newWs;
//    var prev ="";
//    var newObj = {};
//
//    for (atr in obj)
//    {
//
//        var sub =  atr.substring(0,atr.length-1);
//        if(sub === "learn" || sub==="whofor" || sub ==="needto"){
//            if(newObj[sub] !== undefined)
//            {
//                newObj[sub] = newObj[sub] + "-b-" + obj[atr]
//            }else {
//                newObj[sub]  =  obj[atr]
//            }
//        }else {
//            newObj[atr] = obj[atr]
//        }
//
//    }
//    $scope.newWs = newObj;
//
//};