(function () {
    'use strict';

    angular.module('myApp')

        .service('WorkshopHelper',  function (lodash) {


            var getTags = function(obj)
            {
                //console.log(obj)
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
                //console.log("WorkshopHelper : parseWorkshop")
                var obj = new Object()
                angular.copy(wsobject, obj);
                //console.log(obj)



                obj.tags = getTags(obj.workshops_tags)
                //console.log(typeof obj.location)
                //console.log(obj.location)
             if(obj.location !== "" && obj.location!== undefined && obj.location!= null) {
                 console.log("LOCATION  : ")
                 console.log(typeof obj.location)
                 console.log(obj.location)
                obj.location = obj.location.split(",")
                obj.lat = parseFloat(obj.location[0])
                obj.long= parseFloat(obj.location[1])
                 obj.location = new Array(obj.lat,obj.long)
                 console.log(obj.location)
             } else{
                obj.location =[]
            }




                obj.assets =  (obj.assets=== undefined || obj.assets==[]) ? []  : JSON.parse(obj.assets)

                //TODO DEBUG /////////////////////////////////////////////////////////////////////

                //obj.learn = (obj.learn==[]) ? [null,null,null]  : JSON.parse(obj.learn)
                //obj.whofor =  (obj.whofor==[]) ? [null] : JSON.parse(obj.whofor)
                // obj.needto  = (obj.needto==[]) ? [null]  : JSON.parse(obj.needto)

                obj.learn = ['Get in-depth knowledge of this field','Find the best solutions' ,'Become independent in making the right decisions']
                obj.whofor = ['Enthusiasts','People who love to learn new things','Buffs']
                obj.needto  = ['No prior knowledge is needed','Wear comfortable shoes']
               //TODO///////////////////////////////////////////////////////////

                //console.log(obj)
                angular.copy(obj,wsobject );
                return obj;
            }

            this.packWorkshop = function(wsobject)
            {

                var obj= new Object();
                angular.copy(wsobject, obj);

                //we check for the right object schema - if we take from deep link it will include the business id
                 obj.business = (obj.business.id !== undefined)? obj.business.id : obj.business

                //we manipultate the tags to contain the cat abd sub cat and send them as params and not  user input i.e delete tags

                if(obj.tags !== undefined && obj.tags!="") {
                    obj.tags =  obj.tags.toLowerCase();
                    obj.tags = obj.tags.split(",")
                   obj.tags.push(obj.category.toLowerCase())
                    obj.tags.push(obj.subcategory.toLowerCase())
                    //console.log(typeof  obj.tags)
                    obj.tags = lodash.uniq(obj.tags)
                    //console.log("TAGS:")
                    //console.log(obj.tags)
                    obj.tags_raw = obj.tags.toString();
                    //console.log(obj.tags_raw)

                    delete obj.tags
                }
                //We set the location coordinates
                if(obj.location){
                    obj.location= [parseFloat(obj.lat),parseFloat(obj.long)]
                }
                delete obj.lat;
                delete obj.long;

                obj.whofor = JSON.stringify(obj.whofor)
                obj.learn = JSON.stringify(obj.learn)
                obj.needto  = JSON.stringify(obj.needto)

                var js = JSON.stringify( obj.assets)
                obj.assets = js

                //delete obj.price

                console.log("WorkshopHelper : packWorkshop : before send")
                console.log(obj)


                return obj;


            }


        })


        })();
