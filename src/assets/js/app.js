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
    'business'
]);

/** Application Data */
myApp.constant("Data_Model", {
    "application_data": {
        "Application_ENV":"dev",
        "APP_NAME" : "testapp500",
        "SIGN_UP_TOKEN":"dcca42b9-588a-4be5-b56a-eecd5d9aebb8",
        "ANONYMOUS_TOKEN":"b35b8b58-1d64-43dd-930a-95ffc8b5b0f5"
    }
});
myApp.globals =   {
        "Application_ENV":"dev",
        "APP_NAME" : "testapp500",
        "SIGN_UP_TOKEN":"dcca42b9-588a-4be5-b56a-eecd5d9aebb8",
        "ANONYMOUS_TOKEN":"b35b8b58-1d64-43dd-930a-95ffc8b5b0f5"
    };

myApp.controller('Main',['Backand','$rootScope','$location','SessionManager','$scope',function(Backand,$rootScope,$location,SessionManager,$scope)
{

    ////LISTENERS
$rootScope.$on(Backand.EVENTS.SIGNUP,function()
{
    $scope.setSessionData()

});

$rootScope.$on(Backand.EVENTS.SIGNOUT,function()
{
$scope.setSessionData();
$location.url("")
});

$rootScope.$on(Backand.EVENTS.SIGNIN,function()
{
    $scope.setSessionData();
    $location.url("")
});
/////METHODS

    $scope.setSessionData=function()
    {
        SessionManager.api.getUserDetails().then(function(data)
    {
        console.log("Main -------------");
        $scope.userDetails  = data;
        $scope.isLogged = SessionManager.api.isLoggedIn();
        console.log(" -------------")
    })
    };



$scope.signUp=function(userObj)
{
    SessionManager.api.signUp(userObj.firstName,userObj.lastName,userObj.email,userObj.password, userObj.confirmPassword).then(function(data)
{
   $rootScope.$broadcast("SERVER_REGISTRATION_OK", "");

},function(data, status, headers, config)
{
      $rootScope.$broadcast("SERVER_REGISTRATION_ERROR", "");
})

};

$scope.signOut= function(caller,destination) {
    var url = "";
    if(destination !== "undefined")
    {
        url = destination
    }
SessionManager.api.signout();
$location.url(url)
};

$scope.navigateTo=function(caller,destination)
{
    var url = "";
    if (destination !== "undefined") {
        url = destination
    }
    $location.url(url)
};

$scope.signIn = function(caller,username,password)
{
    SessionManager.api.signin(username,password);
};

$scope.openBusiness = function(bizObj){

       bizObj.owner = $scope.userDetails.userId;
      SessionManager.api.create("businesses",bizObj).then(function(data){
          //TODO
          console.log("Success on create business");
          $rootScope.$broadcast("CREATE_BUSINESS_SUCCESS", data);
      },function(data)
  {
      //TODO
      console.log("Error on create business")
  })
};

$scope.openWorkshop= function(wsObj){


      SessionManager.api.create("workshops",wsObj).then(function(data){
          //TODO
          console.log("Success on create workshop");
          $scope.navigateTo("self" , "/workshop/"+ ( data.data["__metadata"]).id)
      },function(data)
  {
      //TODO
      console.log("Error on create workshop")
  })
};
    $scope.readOne  = function (name, id, deep, level) {
    return SessionManager.api.readOne(name, id, deep, level)
};


//////CONFIG
    $scope.userDetails={};
    $scope.setSessionData()

}]);

myApp.config(['$routeProvider','$interpolateProvider',function($routeProvider,$interpolateProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}]);

myApp.config(function (BackandProvider) {
     BackandProvider.setAppName(myApp.globals["APP_NAME"]);
     BackandProvider.setSignUpToken(myApp.globals["SIGN_UP_TOKEN"]);
     BackandProvider.setAnonymousToken(myApp.globals["ANONYMOUS_TOKEN"]);
 })




 .directive('compareTo',  function() {
     return {
         require: "ngModel",
         scope: {
             otherModelValue: "=compareTo"
         },
         link: function(scope, element, attributes, ngModel) {

             ngModel.$validators.compareTo = function(modelValue) {
                 return modelValue == scope.otherModelValue;
             };

             scope.$watch("otherModelValue", function() {
                 ngModel.$validate();
             });
         }
     };
 })

 .factory('SessionManager', ['Backand','$http',function(Backand,$http){
   var o = {};
   o.api={};

   o.api.isLoggedIn = function(){
       return Backand.getToken()!==null;
   };
o.api.getUserName=function() {
    return Backand.getUsername();
};
o.api.getUserDetails=function() {
    return Backand.getUserDetails()
};
o.api.signout = function() {
    Backand.signout();
};
o.api.signin = function(username,password)
{
    Backand.signin(username, password).then(function (data, status, headers, config) {
        //enter session
        console.log("POST SIGNIN");
        console.log(data)
    },
      function (data, status, headers, config) {
          console.log( data);
      });
  };
o.api.signUp = function(firstName,lastName,email,password,confirmPassword)
{
    console.log(firstName + ": " +lastName+  ": " + email+": " +password+ ": " +confirmPassword);
    return Backand.signup(firstName,lastName,email,password,confirmPassword)
};
        o.api.readOne=  function (name, id, deep, level) {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + '/1/objects/' + name + '/' + id,
                params: {
                    deep: deep,
                    level: level
                }
            });
        };

o.api.readList  = function(name, sort, filter) {
      return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/' + name,
        params: {
          pageSize: 20,
          pageNumber: 1,
          filter: filter || '',
          sort: sort || ''
        }
      });
  };

  o.api.create  = function(name,dataObj) {
        return     $http({
               method: 'POST',
               url : Backand.getApiUrl() + "/1/objects/" + name,
               data:  dataObj
    });
};




    return o;
}]);

$(document).foundation();


/*$scope.submit = function () {
   console.log("create");
   console.log($scope.newUser);
 /*return $http({
    method: 'POST',
    url : Backand.getApiUrl() + "/1/user/signup",
    headers: {
      'SignUpToken': 'dcca42b9-588a-4be5-b56a-eecd5d9aebb8'
    },
    data:  $scope.newUser
  }).then(function(response) {
           console.log("Post SignUP");
           console.log(response.data);
           $location.url("/login");
  });
}
{







*/
