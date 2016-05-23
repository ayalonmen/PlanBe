(function () {
    'use strict';

    angular.module('myApp')

        .service('Debug',  function () {

            var _self = this
           _self.activeLog = true;

            this.Log=function(msg)
             {
                 if( _self.activeLog)
                {
                    console.log("%c" + msg, "color:green;")
                }

             }

             this.err = function(msg ,caller)
              {
                  if( _self.activeLog)
                 {
                    console.log("%c :" +caller + " :" +  msg, "color:white;background-color:red;font-weight:bold;font-size:11px")
                        console.log(caller)
                 }

              }
              this.info=function(msg)
               {
                   if( _self.activeLog)
                  {
                        console.log("info:")
                      console.log( msg)
                  }

               }


            }

        )
        })();
