(function(){
    'use strict';

    angular.module('workshop', ['ngRoute'])

        .config(['$routeProvider',function($routeProvider) {
            $routeProvider.when('/workshop/:id', {
                templateUrl: '../../assets/views/workshop.html',
                controller: 'WsCtrl',
                controllerAs:'wsCtrl'
            });
        }])


        .controller('WsCtrl', ['$routeParams','$scope','WorkshopHelper','$location','SessionManager','$window',function($routeParams,$scope,WorkshopHelper,$location,SessionManager,$window) {
            console.log($routeParams.id);

            $scope.wsid = $routeParams.id
            $scope.sessionData= {};

            //@ We make sure we reload session userdata
            $scope.$emit("REFRESH_SESSION_REQUEST")

            $scope.workshop = {}
            $scope.$parent.readOne('workshops',$scope.wsid,true,1).then(function(data)
            {
                console.log("Workshop found")
                console.log(data)
                $scope.workshop = WorkshopHelper.parseWorkshop (data.data)

            },function(data)
            {
                console.log("Workshop ERROR")
                console.log(data)
            });

            $scope.gotoBusiness=function (id) {
              console.log(id);
              $scope.$parent. navigateTo("workshop","/business/"+id);
            }

                //@ we update the user data when the session is being renewed
            $scope.$on("SESSION_READY",function(e,userData)
            {
                console.log("SESSION_READY")
                console.log(userData.data)
                $scope.userId = userData.data.id
                console.log("UID: " + $scope.userId )
            })


            $scope.getNumber = function(num)
            {
                var array = new Array(num)
                for (var i = 0;i<num;i++)
                {
                    array[i] = i+1
                }
                return  array;
            }

            var self = this;

            $scope.commitBooking = function()
            {
                console.log("MFKR")
                $scope.$parent.bookSession($scope.booking_request.start);
            }

                $scope.charge = function () {
                              self.error = "";
                              self.success = "";

                              //get the form's data
                              var form = angular.element(document.querySelector('#paypal-form'))[0];
                            // console.log(form.amount.value)
                              //Call Backand action to prepare the payment
                              var paypalUrl = SessionManager.api.makePayPalPayment(42)
                                .then(function (payment) {
                                  var paypalResponse = payment;
                                  //redirect to PayPal - for user approval of the payment
                                  console.log("ON THEN " + paypalResponse)
                                  $window.location.href = paypalResponse.data;
                                })
                                .catch(function (err) {
                                  if (err.type) {
                                    self.error = 'PayPal error: ' + err.message;
                                  } else {
                                    self.error = 'Other error occurred, possibly with your API' + err.message;
                                  }
                                });
                }
                //check if this is a redirect from PayPal , after the user approves the payment
        // PayPal adds PayerID and  paymentId to the return url we give them

        if ($location.search().PayerID && $location.search().paymentId) {

          //Call Backand action to approve the payment by the facilitator
          SessionManager.api.makePayPalApproval($location.search().PayerID, $location.search().paymentId)
            .then(function (payment) {
              // remove PayPal query string from url
              $location.url($location.path());
              self.success = 'successfully submitted payment for $' + payment.data.transactions[0].amount.total;
            }
          )
      }


        }]);

})();
