
//array for topics
var topics = ["Harry Potter", "Ron Weasley", "Hermion Granger", "Albus Dumbledore", "Neville Longbottom", "Ginny Weasley", "Lord Voldemort"];
console.log(topics);

//sets up the page with current topics in buttons
function getButtons() {
    //empties display div to prevent repetition
    $("#buttons-display").empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]);
        button.attr("data-name", topics[i]);
        button.addClass("gif-button");
        $("#buttons-display").append(button);
        console.log(button);

    }
}




//adding a new topic to empty array
$(document).on('click', "#add-topic", function () {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var alreadyExist = false;
	if(topics.indexOf($("#topic-input").val()) !== -1) {
        alreadyExist = true;
        alert("That button already exists!");
	}
	if($("#topic-input").val() !== "" && alreadyExist === false) {
    var newTopic = $("#topic-input").val().trim();
    console.log(newTopic);
    // Pushes new button topic created into topics array
    topics.push(newTopic);
    console.log(topics);
    $("#topic-input").val('');
    getButtons();
    }
});


$(document).on("click", ".gif-button", function () {
    // "this"= button that was clicked
    var person = $(this).attr("data-name");
    // Constructing a URL to search Giphy for the name of the character
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=QuYYKFCfRPq0DkGMChE0k7owDdvOSSj6&limit=10";
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(results);

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div for the gif
                    var gifDiv = $("<div>");
                    // Storing the result item's rating
                    var rating = results[i].rating;
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);
                    // Creating an image tag
                    var gifImage = $("<img class = 'result'>");
                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    gifImage.attr("src", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    // Appending the paragraph and personImage we created to the "gifDiv" div 
                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    // Prepending the gifDiv to the "#gifs-display in HTML
                    $("#gifs-display").prepend(gifDiv);
                }
            }
        });
//using the class added to the gifImage
    $(document).on("click", ".result", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });
    getButtons();
});
