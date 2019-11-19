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
            const card = $("<div>")
            card.addClass("card");
        
            //create recipeIMG tag with class rImg & hotlinked to recipeURL
            const rImg = $("<img>");
            rImg.attr("src", recipeIMG).addClass(rImg);

            //create <a> tag for img
            const link = $("<a>");
            link.attr("href", recipeURL).attr("target", "_blank");

            //appends img to <a> tag
            const pic = link.append(rImg);

            //create <p> for recipeName with class title
            const rTitle = $("<p>");
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
        console.log("joke api response", response)
    });
}

function displayTrivia(triviaCategory){
    //empty div
    $(".card-text").empty();

    //api url
    var triviaURL = "https://opentdb.com/api.php?amount=1&type=multiple&category="+triviaCategory;

    $.ajax({
        url: triviaURL,
        method: "GET",
    }).then(function(response){
        //array containing trivia data
        var questArr = response.results;

        for (let index = 0; index < questArr.length; index++) {         var question = questArr[index].question;
            //console.log(question);
            var answer = questArr[index].correct_answer;
            //console.log(answer);

            //create <p> tag for question & add class question
            var q = $("<p>")
            q.addClass("question").append(question);
            
            //create <p> tag for answer & add class answer text-muted
            var a = $("<p>");
            a.addClass("answer text-muted").append(answer);

            //write question & answer to DOM
            $(".card-text").append(q).append(a);
            
        }
    });
}

async function sweetAlert() {
// swal.fire({
//     title: "Are you sure, you don't want a joke??",
//     type: "warning",
//     showCancelButton: true,
//     confirmButtonClass: "btn-primary",
//     confirmButtonText: "Give me a joke pls!",
//     cancelButtonText: "No thanks, give me food",
//     closeOnConfirm: false,
//     closeOnCancel: false
//   },
//   function(isConfirm) {
//     if (isConfirm) {
//       swal.fire("Perfect!", "Here's your joke");
//     } else {
//       swal.fire("No problems", "Here's your food)");
//     }
//   });
const { value: conversation } = await Swal.fire({
    title: 'Do you want a opener?',
    input: 'select',
    inputOptions: {
    generalKnowledge: 'General Knowledge',
    scienceNature: 'Science & Nature',
    film: 'Film',
    music: 'Music',
    book: 'Books',
    celebrities: 'Celebrities',
    animals: 'Animals'
    },
    inputPlaceholder: 'Select a conversation',
    showCancelButton: true,
  })
  
  if (recipe) {
    Swal.fire(`You selected: ${recipe}`)
  }
};
// MAIN PROCESS
//=======================
//when submit button for recipe clicked...do this
$(document).on("click", ".submitRecipe", function(){
    //clear div
    event.preventDefault();
     console.log('here');
     $("#recipe-results").empty();
     sweetAlert();

    // Preventing the button from trying to submit the form

    //gets ingredient from user input
    ingredient = $("#get-recipe").val().trim();

    //calls displayRecipe function, passing user given ingredient
    displayRecipe(ingredient);
    
});

//when trivia button clicked....do this
$(document).on("click", ".triviabutton", function(){
    //prevent click event
    event.preventDefault();

    //get category from button clicked
    var triviaCategory = $(this).attr("category");
    console.log(triviaCategory);

    //call displayTrivia function, passing category attribute
    displayTrivia(triviaCategory);
});


//calls funnyFacts function
funnyFacts();

 