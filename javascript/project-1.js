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
var arrofRecipes = [];

//functions
function displayRecipe(){
    //url used to search
    var queryURL = "https://floating-plateau-18745.herokuapp.com/http://www.recipepuppy.com/api/?i="+i+"&p="+p;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        //array of recipe responses
        var r = JSON.parse(response);
        //console.log(r);
        arrofRecipes = r.results;
        //console.log(arrofRecipes.length)
        //console.log(typeof(arrofRecipes));

        for (let index = 0; index < 5; index++) {
            const recipe = arrofRecipes[index];
            const recipeName = recipe.title;
            const recipeURL = recipe.href;
            const recipeIMG = recipe.thumbnail;

            //create div with class card for recipe results
            var card = $("<div>")
            card.addClass("card");
        
            //create recipeIMG tag with class rImg & hotlinked to recipeURL
            var rImg = $("<img>");
            rImg.attr("src", recipeIMG).addClass(rImg).attr("href", recipeURL);

            //create <p> for recipeName with class title
            var rTitle = $("<p>");
            rTitle.addClass("title").text(recipeName);

            //append img & p tags to DOM
            card.append(rImg).append(rTitle);
            $("#recipe-results").append(card);
            console.log("card should be added to DOM");

            
         }




    });

}

displayRecipe();