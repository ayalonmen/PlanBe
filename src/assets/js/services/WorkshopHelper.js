(function () {
    'use strict';

    angular.module('myApp')

        .service('WorkshopHelper',  function () {


            var getTags = function(obj)
            {
                console.log(obj)
                var tagarray = new Array();
                if(obj!==undefined)
                {

                    for (var item in obj)
                    {
                        var tag = obj[item]["tag"]["Name"];
                        tagarray.push(tag)
                    }
                }

                return tagarray.toString();
            }

            this.parseWorkshop = function(wsobject)
            {
                console.log("WorkshopHelper : parseWorkshop")
                var obj = new Object()
                angular.copy(wsobject, obj);
                console.log(obj)
                console.log("WorkshopHelper : parseWorkshop whofor--> " + obj.whofor )
                console.log("WorkshopHelper : parseWorkshop learn--> " +obj.learn )
                console.log("WorkshopHelper : parseWorkshop needto--> " +obj.needto )

                obj.whofor =  (obj.whofor==[]) ? [null] : JSON.parse(obj.whofor)
                obj.tags = getTags(obj.workshops_tags)
                console.log(typeof obj.location)
                console.log(obj.location)
             if(obj.location !== "") {
                obj.location = obj.location.split(",")
                obj.lat = parseFloat(obj.location[0])
                obj.long= parseFloat(obj.location[1])
                 obj.location = new Array(obj.lat,obj.long)
             } else{
                obj.location =[]
            }
                console.log(obj.location)
                console.log(obj.location.length)



                console.log("WorkshopHelper : parseWorkshop whofor--> " + obj.whofor )
                
                obj.needto  = (obj.needto==[]) ? [null]  : JSON.parse(obj.needto)
                console.log("WorkshopHelper : parseWorkshop needto--> " +obj.needto )

                obj.learn = (obj.learn==[]) ? [null,null,null]  : JSON.parse(obj.learn)
                console.log("WorkshopHelper : parseWorkshop learn--> " +obj.learn )
                obj.assets =  (obj.assets=== undefined || obj.assets==[]) ? []  : JSON.parse(obj.assets)
               
                console.log(obj)
                angular.copy(obj,wsobject );
                return obj;
            }

            this.packWorkshop = function(wsobject)
            {

                var obj= new Object();
                angular.copy(wsobject, obj);

                //we check for the right object schema - if we take from deep link it will include the business id
                 obj.business = (obj.business.id !== undefined)? obj.business.id : obj.business
                obj.tags_raw = obj.tags
                if(obj.location){
                    obj.location= [parseFloat(obj.lat),parseFloat(obj.long)]
                }
                delete obj.tags
                delete obj.lat;
                delete obj.long;
                obj.whofor = JSON.stringify(obj.whofor)
                obj.learn = JSON.stringify(obj.learn)
                obj.needto  = JSON.stringify(obj.needto)
                console.log("WorkshopHelper : packWorkshop : before assets")
                var js = JSON.stringify( obj.assets)
                obj.assets = js
                console.log(obj.assets)
                return obj;

            }


        })


        })();