(function () {
    'use strict';

    angular.module('myApp')

        .factory('SessionManager', ['Backand', '$http', function (Backand, $http) {
            var o = {};
            o.api = {};
            o.user= null;
            o.server_error= null;
            o.api.location = null;
            o.api.location_query = null;

            o.api.getLocation = function()
            {

                return o.api.location
            }

            o.errorUpdate = function(msg)
            {

                o.server_error = {msg : msg}
            }

            o.api.isLoggedIn = function () {
                return Backand.getToken() !== null;
            };

            o.api.setUser = function (data) {
                o.user = data
            };
            o.api.isManager = function()
            {
                return (o.user.businesses && o.user.businesses[0].workshops && o.user.businesses[0].workshops.length>0)
            }

            o.api.getUserName = function () {
                return Backand.getUsername();
            };
            o.api.getUserDetails = function () {
                return Backand.getUserDetails()
            };
            o.api.signout = function () {
                Backand.signout();
            };
            o.api.signin = function (username, password) {
                Backand.signin(username, password).then(function (data, status, headers, config) {
                        //enter session
                        console.log("POST SIGNIN");
                        console.log(data)
                    },
                    function (data, status, headers, config) {
                        console.log(data);
                    });
            };
            o.api.signUp = function (firstName, lastName, email, password, confirmPassword) {
                console.log(firstName + ": " + lastName + ": " + email + ": " + password + ": " + confirmPassword);
                return Backand.signup(firstName, lastName, email, password, confirmPassword)
            };
            o.api.readOne = function (name, id, deep, level) {
                return $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/objects/' + name + '/' + id,
                    params: {
                        deep: deep,
                        level: level
                    }
                });
            };


            o.api.readList = function (name,page_size, sort, filter) {
                return $http({
                    method: 'GET',
                    url: Backand.getApiUrl() + '/1/objects/' + name,
                    params: {
                        pageSize: page_size,
                        pageNumber: 1,
                        filter: filter || '',
                        sort: sort || ''
                    }
                });
            };

            o.api.create = function (name, dataObj) {
                console.log(dataObj)
                return $http({
                    method: 'POST',
                    url: Backand.getApiUrl() + "/1/objects/" + name,
                    data: dataObj
                });
            };

            o.api.onDemand = function (name,action, dataObj) {

                return $http({
                    method: 'POST',
                    url: Backand.getApiUrl() + "/1/objects/action/" + name + "/?name=" + action ,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: dataObj
                })
                };

            o.api.update = function (name,id,dataObj,params) {
                return $http({
                    method: 'PUT',
                    url: Backand.getApiUrl() + '/1/objects/' + name + '/' + id,
                   data:dataObj,
                    params:params
                });
            };
            o.api.socialSignup = function (provider,spec) {
                    Backand.socialSignup(provider,spec)
            }
            o.api.socialSignin = function (provider,spec) {
                    Backand.socialSignin(provider,spec)
            }

            o.api.makePayPalPayment = function (amount){
                var parameters = {amount: amount,process:"payment"};
              return o.api.onDemand("workshops","paypalTest",parameters)
         }

         o.api.makePayPalApproval = function (payerId, paymentId) {
             return $http({
             method: 'POST',
             url: Backand.getApiUrl() + '/1/objects/action/workshops/?name=paypalTest',
             params: {
               parameters: {
                 payerId: payerId,
                 paymentId: paymentId,
                 process:"approval"
               }
             }
           });
         }


            return o;

        }]);
})();
