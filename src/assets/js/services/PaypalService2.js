(function () {
    'use strict';

    angular.module('myApp')


   //Call PayPalApproval on demand action
   .factory.makePayPalApproval = function (payerId, paymentId) {
       return $http({
       method: 'GET',
       url: Backand.getApiUrl() + '/1/objects/action/workshops/?name=paypalTest',
       params: {
         name: 'PayPalPayment',
         parameters: {
           payerId: payerId,
           paymentId: paymentId,
           process:"approval"
         }
       }
     });
   };
   })();
