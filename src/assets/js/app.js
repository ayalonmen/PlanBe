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
    'ngMaterial',
    'search'
]);

/** Application Data */
myApp.constant("Data_Model", {
    "application_data": {
        "Application_ENV":"dev",
        "APP_NAME" : "testapp500",
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

myApp.controller('Main',['Backand','$rootScope','$location','SessionManager','$scope', 'Lang', function(Backand,$rootScope,$location,SessionManager,$scope,Lang) {

    ////LISTENERS
    $rootScope.$on(Backand.EVENTS.SIGNUP, function () {
        $scope.setSessionData()

    });

    $rootScope.$on(Backand.EVENTS.SIGNOUT, function () {
        $scope.setSessionData();
        $location.url("")
    });

    $rootScope.$on(Backand.EVENTS.SIGNIN, function () {
        $scope.setSessionData();
        $location.url("")
    });
/////METHODS




    $scope.setSessionData = function () {

        SessionManager.api.getUserDetails().then(function (data) {
            console.log("Main getUserDetails-------------");
            console.log("data = ")
            console.log(data)
            $scope.isLogged = SessionManager.api.isLoggedIn();
            if ($scope.isLogged) {
                console.log("user is logged")

                SessionManager.api.readOne('users', data.userId, true).then(function (data) {
                    console.log("READ ONE USER")
                    $scope.userDetails = data.data;
                    console.log($scope.userDetails);
                    $rootScope.$broadcast("SESSION_READY", data);
                    console.log(" -------------")
                });
            }


        })
    };

    $scope.signUp = function (userObj) {
        SessionManager.api.signUp(userObj.firstName, userObj.lastName, userObj.email, userObj.password, userObj.confirmPassword).then(function (data) {
            $rootScope.$broadcast("SERVER_REGISTRATION_OK", "");

        }, function (data, status, headers, config) {
            SessionManager.errorUpdate("Error on signUp : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
            $rootScope.$broadcast("SERVER_REGISTRATION_ERROR", "");
        })

    };

    $scope.signOut = function (caller, destination) {
        var url = "";
        if (destination !== "undefined") {
            url = destination
        }
        SessionManager.api.signout();
        $location.url(url)
    };

    $scope.navigateTo = function (caller, destination) {
        var url = "";
        if (destination !== "undefined") {
            url = destination
        }
        $location.url(url)
    };

    $scope.signIn = function (caller, username, password) {
        SessionManager.api.signin(username, password);
    };

    $scope.openBusiness = function (bizObj) {

        bizObj.owner = $scope.userDetails.id;
        console.log(bizObj)
        SessionManager.api.create("businesses", bizObj).then(function (data) {
            //TODO
            console.log("Success on create business");
            $rootScope.$broadcast("CREATE_BUSINESS_SUCCESS", data);
        }, function (data) {
            //TODO
            SessionManager.errorUpdate("Error on create business : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
            console.log("Error on create business")
        })
    };

    $scope.openWorkshop = function (wsObj) {


        SessionManager.api.create("workshops", wsObj).then(function (data) {
            //TODO
            console.log("Success on create workshop");
            $rootScope.$broadcast("CREATE_WORKSHOP_SUCCESS", data);
            //$scope.navigateTo("self", "/workshop/" + ( data.data["__metadata"]).id)
        }, function (data) {
            //TODO
            console.log("Error on create workshop")
            SessionManager.errorUpdate("Error on create workshop : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
            $rootScope.$broadcast("CREATE_WORKSHOP_ERROR", data);
        })
    };

    $scope.createSession =function(seObj) {

            SessionManager.api.onDemand("WS_sessions","batchCreate",seObj).then(function(data)
        {
                console.log("Success on create session");
        })
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
            SessionManager.errorUpdate("Error on update workshop : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
            $rootScope.$broadcast("UPDATE_WORKSHOP_ERROR", data);
        })
    };

    $scope.readOne = function (name, id, deep, level) {
        return SessionManager.api.readOne(name, id, deep, level)
    };

    $scope.getS3Url = function(dataObj)
    {
        //var data = {}
       // data.url = dataObj;
        return SessionManager.api.onDemand("images","S3onDemand",dataObj)
    }

    $scope.search = function(queryObj,callback){
        console.log("myApp - Search")
        var obj = {query:queryObj}
       console.log("myApp - Search" + queryObj)
        return SessionManager.api.onDemand("workshops","Search",obj).then(function(data)
        {
         console.log("myApp - Search callback")
          callback(data.data.data);

        },
        function(data)
        {
            SessionManager.errorUpdate("Error on search : " + data)
            $rootScope.$broadcast("SERVER_ERROR", data);
        })
    }

        $scope.loadLangData = function()
        {
            SessionManager.api.readList("languages",1000).then(function(data){
                console.log("LANG DATA")
                Lang.SetData(data.data.data)
                  $rootScope.isReady = true;

            })
        }

    $scope.$on("REFRESH_SESSION_REQUEST",function(event)
    {
        $scope.setSessionData()
    })

//////CONFIG
    $scope.userDetails={};
    $scope.setSessionData();
    $scope.loadLangData();

}])


$(document).foundation();
