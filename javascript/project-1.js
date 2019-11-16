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

displayRecipe();