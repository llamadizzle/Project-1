/*
recipe puppy
example call:  http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
Optional Parameters:
i : comma delimited ingredients
q : normal search query
p : page 

*/

//variables
var i = "chicken";
var p = "1";

//functions
function displayRecipe(){
    //url used to search
    var queryURL = "https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i="+i+"&p="+p;

    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){

        //variable to store all data returned
        var arrOfRecipes = JSON.parse(response);
        console.log(arrOfRecipes.results);
    })
}

//displayRecipe();

function funnyFacts(){

    //var queryURL = " https://joke3.p.rapidapi.com/v1/joke"

    // $.ajax({
    //     url:queryURL,
    //     method: "GET"
    // }).then(function(response){
    //     console.log(response)
    // });
    // var unirest = require("unirest");

    var settings = {
        async: true,
        crossDomain: true,
        url: "https://joke3.p.rapidapi.com/v1/joke",
        method: "GET",
        headers: {
            "x-rapidapi-host": "joke3.p.rapidapi.com",
            "x-rapidapi-key": "75ed2bc80amsh952e0bb4ee2170dp105942jsn797a7158557b"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response.content);
    });
}

funnyFacts();