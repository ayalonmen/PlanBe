'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'backand',
  'home',
  'register',
   'login',
   'openworkshop'
])

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
    $scope.isLogged = SessionManager.api.isLoggedIn();
    $scope.user = SessionManager.api.getUserName();

    $rootScope.$on(Backand.EVENTS.SIGNOUT,function()
{
    $scope.isLogged = SessionManager.api.isLoggedIn();
    $location.url("")
})
$rootScope.$on(Backand.EVENTS.SIGNIN,function()
{
    $scope.isLogged = SessionManager.api.isLoggedIn();
    $location.url("")
})
$scope.signOut= function(destination)
{
    var url = "";
    if(destination !== "undefined")
    {
        url = destination
    }
SessionManager.api.signout();
$location.url(url)
}
$scope.navigateToLogin= function()
{
$location.url("/login")
}
$scope.navigateToRegister= function()
{
$location.url("/register")
}
$scope.navigateToOpenWorkshop= function()
{
$location.url("/openworkshop")
}
}])

myApp.config(['$routeProvider','$interpolateProvider',function($routeProvider,$interpolateProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}]);

myApp.config(function (BackandProvider) {
     BackandProvider.setAppName(myApp.globals["APP_NAME"]);
     BackandProvider.setSignUpToken(myApp.globals["SIGN_UP_TOKEN"]);
     BackandProvider.setAnonymousToken(myApp.globals["ANONYMOUS_TOKEN"]);
 })

 .directive("registrationForm" ,function(){
          return {
              restrict: "E",
              templateUrl:'../../assets/templates/registration-form.html',
              scope:{},
              controller: function($scope,Backand,$http,$location)
              {
                         $scope.newUser =   {firstName:"Jim",lastName: "Curry",email: "string@strong.",password: "123123", confirmPassword: "123123"};
                         $scope.regForm= null;
                         $scope.error = ""
                         $scope.submit = function () {
                            console.log("create")
                            console.log($scope.newUser)
                           return $http({
                             method: 'POST',
                             url : Backand.getApiUrl() + "/1/user/signup",
                             headers: {
                               'SignUpToken': 'dcca42b9-588a-4be5-b56a-eecd5d9aebb8'
                             },
                             data:  $scope.newUser
                           }).then(function(response) {
                                    console.log("Post SignUP")
                                    console.log(response.data)
                                    $location.url("/login");
                           });
                       }
              },
              controllerAs:'ctrl'
          }
 })

 .directive("loginForm" ,function(){
          return {
              restrict: "E",
              templateUrl:'../../assets/templates/login-form.html',
              controller: function($scope,Backand,$http,$location)
              {
                  $scope.username ="";
                  $scope.password ="";
                 $scope.logForm= null;
                 $scope.error = ""
                 $scope.submit = function() {
                console.log("Controller signin")
                   Backand.signin($scope.username, $scope.password)
                   .then(
                     function (data, status, headers, config) {
                       //enter session
                       console.log(data)

                     },
                     function (data, status, headers, config) {

                         console.log( data)
                         $scope.error = "Something went wrong. Seems like "  + data.error_description;
                         $scope.password=""
                         console.log(     $scope.logForm.$submitted)
                     }
                   );
                 }
              },
              controllerAs:'ctrl'
          }
 })

 .directive("pbHeader" ,function(){
          return {
              restrict: "E",
              templateUrl:'../../assets/templates/pb-header.html',
              replace:true,
              scope:{
                  isLogged: "=",
                  signOut:"=",
                   navigateToLogin:"=",
                   navigateToRegister: "=",
                     navigateToOpenWorkshop: "="
              },
              controllerAs:'ctrl'
          }
 })

 .directive("pbFooter" ,function(){
          return {
              restrict: "E",
              templateUrl:'../../assets/templates/pb-footer.html',

          }
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

 .factory('SessionManager', ['Backand',function(Backand){
   var o = {};
   o.api={};

   o.api.isLoggedIn = function(){
       return Backand.getToken()!==null;
   };
o.api.getUserName=function()
{
    return Backand.getUsername();
}
o.api.signout = function()
{
    Backand.signout();
}


   return o;
}]);


$(document).foundation();
