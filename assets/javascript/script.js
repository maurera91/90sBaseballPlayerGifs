$(document).ready(function(){
var topics = ["The Simpsons","Rick and Morty","South Park","Family Guy","Aqua Team Hunger Force","Adventure Time","American Dad","BoJack Horseman","Futurama","Rocky and Bullwinkle","King of the Hill"]
var gifs = {};
var populateButtons = function(){
    for(var i=0; i <topics.length;i++){
        button = $('<button>').attr("id",topics[i]).html(topics[i]);
        $("#buttons").append(button);
    }
};
var buttonClick = function(){
        $("#gifs").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        $(this).attr("id") + "&api_key=dc6zaTOxFJmzC&limit=10";
        populateGifs(queryURL);
};
var addButton = function(){
        event.preventDefault();
        var name = $("#name").val().trim();
        if(topics.includes(name)){
            alert(`${name} is already included!`);
        }
        else{
        topics.push(name);
        $("#buttons").empty();
        populateButtons();
        }

};
var populateGifs = function(queryURL){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        gifs = response.data;
        for(var i =0; i<gifs.length; i++){
         var gifsDiv = $("<div>");
         var p = $("<p>").text(`Rating: ${gifs[i].rating}`);
         var gif = $("<img>").attr("src",gifs[i].images.fixed_width_still.url).attr("data-still",gifs[i].images.fixed_width_still.url);
         gif.attr("data-animate",gifs[i].images.fixed_width.url).attr("data-state","still").attr("class","cartoongif");
         gifsDiv.append(gif).append(p).attr("class","gifsDiv");
         $("#gifs").append(gifsDiv);
        }
    });
};

var animateGifs = function(){
    console.log("test");
    var state = $(this).attr("data-state");
     
     if (state == "still") {
       $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate");
     } else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
     }
}; 

populateButtons();
$(document).on("click","button",buttonClick);
$(document).on("click",".cartoongif",animateGifs);
$("#submit").on("click", addButton);

});