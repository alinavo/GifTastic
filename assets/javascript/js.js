//API information
//API Key: QuYYKFCfRPq0DkGMChE0k7owDdvOSSj6


//array for topics
var topics = ["Harry", "Ron", "Hermione", "Dumbledore", "Neville", "Ginny", "Voldemort"];
console.log(topics);


//function that makes buttons
function renderButtons() {
    // empty divs so there are no repeats when new topics are added
    $("#buttons-display").empty();
    //loop that makes buttons       
for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generates buttons for each element in array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    // a.addClass("movie");
    // Added a data-attribute
    // a.attr("data-name", topics[i]);
    // Provided the initial button text
    a.text(topics[i]);
    // Added the button to the buttons-view div
    $("#buttons-display").append(a);
    console.log(a);
}};

    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var newTopic = $("#topic-input").val().trim();
        console.log(newTopic);
        // Pushes new button topic created into topics array
        topics.push(newTopic);
        console.log(topics);


        renderButtons();
});

