(function(){

'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'backand',
  'home',
  'register',
   'login',
   'openworkshop',
    'workshop',
    'business',
    'account',
    'ngLodash',
    'updateworkshop',
    'search',
    'ngMaterial'
]);

/** Application Data */
myApp.constant("Data_Model", {
    "application_data": {
        "Application_ENV":"dev",
        "APP_NAME" : "devapp",
        "SIGN_UP_TOKEN":"dcca42b9-588a-4be5-b56a-eecd5d9aebb8",
        "ANONYMOUS_TOKEN":"b35b8b58-1d64-43dd-930a-95ffc8b5b0f5",
        "USER_STORAGE_URL":"usr_img",
       " WORKSHOP_STORAGE_URL":"ws_img"
    }
});

myApp.config(['$routeProvider','$interpolateProvider',function($routeProvider,$interpolateProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}]);

myApp.config(function (BackandProvider,Data_Model) {
    BackandProvider.setAppName(Data_Model.application_data["APP_NAME"]);
    BackandProvider.setSignUpToken(Data_Model.application_data["SIGN_UP_TOKEN"]);
    BackandProvider.setAnonymousToken(Data_Model.application_data["ANONYMOUS_TOKEN"]);
})


myApp.controller('Main',['Backand','$rootScope','$location','SessionManager','$scope', 'Lang', 'Debug',function(Backand,$rootScope,$location,SessionManager,$scope,Lang,Debug) {

    ////LISTENERS
    $rootScope.$on(Backand.EVENTS.SIGNUP, function () {
        $scope.setSessionData()
         $rootScope.requestPending = false;

    });

    $rootScope.$on(Backand.EVENTS.SIGNOUT, function () {
        $scope.setSessionData();
        $location.url("")
         $rootScope.requestPending = false;
    });

    $rootScope.$on(Backand.EVENTS.SIGNIN, function () {
        $scope.setSessionData();
        $location.url("")
         $rootScope.requestPending = false;
    });

    $rootScope.$on("LEFT_HOME_STATE", function () {
     $rootScope.home_state = false;
    });

    $rootScope.$on("ENTER_HOME_STATE", function () {
     $rootScope.home_state = true;
     Debug.err("ENTER_HOME_STATE",this)

    });

    $scope.$on("REFRESH_SESSION_REQUEST",function(event)
    {
        $scope.setSessionData()
    })
    $scope.$on("SERVER_RESPONSE",function(event)
    {
    $rootScope.requestPending = false;
    })

/////METHODS




    $scope.setSessionData = function () {

       $rootScope.requestPending = true;
        SessionManager.api.getUserDetails().then(function (data) {
            Debug.Log("Get User Details");
            Debug.info(data)
            $scope.isLogged = SessionManager.api.isLoggedIn();


            if ($scope.isLogged) {
                   Debug.Log("user is logged")
                   SessionManager.api.readOne('users', data.userId, true).then(function (data) {
                    Debug.Log("read one --> user")
                    $scope.userDetails = data.data;
                     $rootScope.requestPending = false;
                    $rootScope.$broadcast("SESSION_READY", data);
                    Debug.Log("SESSION_READY")
                });
            }


        })
    };

    $scope.signUp = function (userObj) {
         $rootScope.requestPending = true;
        SessionManager.api.signUp(userObj.firstName, userObj.lastName, userObj.email, userObj.password, userObj.confirmPassword).then(function (data) {
            $rootScope.$broadcast("SERVER_REGISTRATION_OK", "");

        }, function (data, status, headers, config) {
            //SessionManager.errorUpdate("Error on signUp : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
            $rootScope.$broadcast("SERVER_REGISTRATION_ERROR", "");
        })

    };

    $scope.signOut = function (caller, destination) {
         $rootScope.requestPending = true;
        var url = "";
        if (destination !== "undefined") {
            url = destination
        }
        SessionManager.api.signout();
        $location.url(url)
    };
    $scope.socialSignup = function()
    {
        SessionManager.api.socialSignup("facebook","left=1,top=1,width=800,height=600")
    }
    $scope.socialSignin = function()
    {
        SessionManager.api.socialSignin("facebook","left=1,top=1,width=800,height=600")
    }

    $scope.navigateTo = function (caller, destination) {
        var url = "";
        if (destination !== "undefined") {
            url = destination
        }
        $location.url(url)

    };

    $scope.signIn = function (caller, username, password) {
         $rootScope.requestPending = true;
        SessionManager.api.signin(username, password);
    };

    $scope.openBusiness = function (bizObj) {
         $rootScope.requestPending = true;
        bizObj.owner = $scope.userDetails.id;

        console.log(bizObj)
        SessionManager.api.create("businesses", bizObj).then(function (data) {
            //TODO
            console.log("Success on create business");
            $rootScope.$broadcast("CREATE_BUSINESS_SUCCESS", data);
        }, function (data) {
            //TODO
            //SessionManager.errorUpdate("Error on create business : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
            console.log("Error on create business")
        })
    };

    $scope.openWorkshop = function (wsObj) {
   $rootScope.requestPending = true;

        SessionManager.api.create("workshops", wsObj).then(function (data) {
            //TODO
            console.log("Success on create workshop");
            $rootScope.$broadcast("CREATE_WORKSHOP_SUCCESS", data);
              $rootScope.requestPending = false;
            //$scope.navigateTo("self", "/workshop/" + ( data.data["__metadata"]).id)
        }, function (data) {
            //TODO
            console.log("Error on create workshop")
           $rootScope.requestPending = false;
            //SessionManager.errorUpdate("Error on create workshop : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
            $rootScope.$broadcast("CREATE_WORKSHOP_ERROR", data);
        })
    };

    $scope.createSession =function(seObj) {
         $rootScope.requestPending = true;

            SessionManager.api.onDemand("WS_sessions","batchCreate",seObj).then(function(data)
        {
            $rootScope.$broadcast("CREATE_SESSION_SUCCESS", data);
        }, function(data)
        {
                $rootScope.$broadcast("SERVER_ERROR", data);
        }
    )
            /*SessionManager.api.create("WS_sessions", seObj).then(function (data) {
                //TODO
                console.log("Success on create workshop");
                $rootScope.$broadcast("CREATE_SESSION_SUCCESS", data);
                console.log("Success on create session")
                //$scope.navigateTo("self", "/workshop/" + ( data.data["__metadata"]).id)
            }, function (data) {
                //TODO
                console.log("Error on create session")
                SessionManager.errorUpdate("Error on create session : " + data)
                $rootScope.$broadcast("SERVER_ERROR", data);
                $rootScope.$broadcast("CREATE_WORKSHOP_ERROR", data);
            })*/


    }

    $scope.updateWorkshop = function (wsObj) {


        SessionManager.api.update("workshops",wsObj.id, wsObj,wsObj.tags).then(function (data) {
            //TODO
            console.log("Success on create workshop");
            $rootScope.$broadcast("UPDATE_WORKSHOP_SUCCESS", data);
        }, function (data) {
            //TODO
            console.log("Error on create workshop")
            //SessionManager.errorUpdate("Error on update workshop : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
            $rootScope.$broadcast("UPDATE_WORKSHOP_ERROR", data);
        })
    };

    $scope.readOne = function (name, id, deep, level) {
         $rootScope.requestPending = true;
        return SessionManager.api.readOne(name, id, deep, level)
    };

    $scope.getS3Url = function(dataObj)
    {
        //var data = {}
       // data.url = dataObj;
        return SessionManager.api.onDemand("images","S3onDemand",dataObj)
    }

    $scope.search = function(queryObj, callback, _location, _distance){
         $rootScope.requestPending = true;
          $rootScope.$broadcast("SEARCH_ACTION", queryObj);
        var obj = {query:queryObj}
        if(_location!==undefined)
        {
            obj.location = _location
        }
        if(_distance!==undefined)
        {
                obj.distance = _distance
        }
        console.log(obj)
        return SessionManager.api.onDemand("workshops","Search",obj).then(function(data)
        {
          callback(data.data.data);

           $rootScope.requestPending = false;
        },
        function(data)
        {
            //SessionManager.errorUpdate("Error on search : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
        })
    }

        $scope.loadLangData = function()
        {
             Debug.Log("Loading Lang Data")
            SessionManager.api.readList("languages",1000).then(function(data){

                Lang.SetData(data.data.data)
                  $rootScope.isReady = true;

            })
        }

//////CONFIG
    $scope.userDetails={};
    $rootScope.isReady = false;
    $rootScope.requestPending = false;
    $scope.setSessionData();
    $scope.loadLangData();
   //@ we check for the user current position
    if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(function(position){
             $scope.$apply(function(){
               SessionManager.api.location = position;
               console.log("Location found by main controller" )
               $rootScope.$broadcast("USER_LOCATION_FOUND","")
             });
           });
       }else {
            $rootScope.$broadcast("USER_LOCATION_ERROR","")
       }


}])
})();
