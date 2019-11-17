// VARIABLES
//=======================
var ingredient;
var p = "1";
var arrofRecipes = [];

// edamam api requirements
var appID = "4b51a474";
var appKEY ="b747956cf15e65eba2e9a1f80922b6f8";


// FUNCTIONS
//=======================
function displayRecipe(ingredient){
    /*
    recipe puppy
    example call:  http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
    Optional Parameters:
    i : comma delimited ingredients
    q : normal search query
    p : page 

    */

    //url used to search recipe puppy api
   //var queryURL = "https://floating-plateau-18745.herokuapp.com/http://www.recipepuppy.com/api/?i="+ingredient+"&p="+p;

   var settings = {
        async: true,
        crossDomain: true,
        url: "https://floating-plateau-18745.herokuapp.com/https://api.edamam.com/search?q="+ingredient+"&app_id="+appID+"&app_key="+appKEY+"&from=0&to=5",
        method: "GET",
    }

    $.ajax(settings).done(function (response) {
        // console.log(response);

    /* ajax call used for recipe puppy api
    });

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        array of recipe responses
        var r = JSON.parse(response);
    */

        arrofRecipes = response.hits;
        console.log(arrofRecipes);
        //console.log(arrofRecipes.length)
        //console.log(typeof(arrofRecipes));

        for (let index = 0; index < 5; index++) {
            const recipe = arrofRecipes[index].recipe;
            const recipeName = recipe.label;
            const recipeURL = recipe.url;
            const recipeIMG = recipe.image;

            /* variables used for recipe puppy api
            const recipeName = recipe.title;
            const recipeURL = recipe.href;
            const recipeIMG = recipe.thumbnail;
            */

            //create div with class card for recipe results
            var card = $("<div>")
            card.addClass("card");
        
            //create recipeIMG tag with class rImg & hotlinked to recipeURL
            var rImg = $("<img>");
            rImg.attr("src", recipeIMG).addClass(rImg);

            //create <a> tag for img
            var link = $("<a>");
            link.attr("href", recipeURL).attr("target", "_blank");

            //appends img to <a> tag
            var pic = link.append(rImg);

            //create <p> for recipeName with class title
            var rTitle = $("<p>");
            rTitle.addClass("title").text(recipeName);

            //append img & p tags to DOM
            card.append(pic).append(rTitle);
            $("#recipe-results").append(card);
            //console.log("card should be added to DOM");
         }
    });
}

function funnyFacts(){
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
        //variable to hold response from joke api
        var funnyJoke = response.content;

        //create <p> tag & append joke content
        var pTag = $("<p>")
        pTag.addClass("joke").append(funnyJoke);

        //write joke to DOM
        $("#funnyJoke").append(pTag);
    });
}

// MAIN PROCESS
//=======================
$(document).on("click", ".submitRecipe", function(){
    // Preventing the button from trying to submit the form
    event.preventDefault();

    //gets ingredient from user input
    ingredient = $("#get-recipe").val().trim();

    //calls displayRecipe function, passing user given ingredient
    displayRecipe(ingredient);
    
});

//calls funnyFacts function
funnyFacts();
 