(function () {
    'use strict';

    angular.module('myApp')

        .service('Lang',  function (lodash,Debug) {

            this.keys ={};
            this.lang = "en"

            this.SetData=function(langdata)
             {
                 var temp = {};
                 for (var i=0;i<langdata.length;i++)
                 {
                     var key = langdata[i].key
                    temp[key] = langdata[i]
                 }
                 this.keys = temp
                // Debug.Log("Lang Loaded")
                // Debug.info(this.keys)

             }

             this.getKey=function(key)
             {
                 // console.log("GET DATA" + key )
                 return this.keys[key]["val_"+this.lang]
             }
            }

        )


        })();
