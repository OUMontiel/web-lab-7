$(document).ready(function() {

    var animals = ["dog", "cat", "rabbit", "frog", "chicken", "bird", "turtle"]

    function populateButtons(arrayToUse, classToAdd, placeholder) {
        $(placeholder).empty()

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>")
            a.addClass(classToAdd)
            a.attr("data-type", animals[i])
            a.text(animals[i])
            $(placeholder).append(a)
        }
    }

    $("#animal-buttons").on("click", ".animal-button", function() {
        $("#animals").empty()
        var search = $(this).attr("data-type")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10"

        $.ajax({url:queryURL})
        .then(function(response) {
            console.log(response)
            var results = response.data
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div class=\"animal-item\">")
                var rating = results[i].rating
                var p = $("<p>").text("Rating: " + rating)

                var animated = results[i].images.fixed_height.url
                var still = results[i].images.fixed_height_still.url

                var animalImage = $("<img>")
                animalImage.attr("src", still)
                animalImage.attr("data-still", still)
                animalImage.attr("data-animate", animated)
                animalImage.attr("data-isAnimated", "false")
                animalImage.addClass("animal-iamge")

                animalDiv.append(p)
                animalDiv.append(animalImage)
                $("#animals").append(animalDiv)
            }
        })
    })

    populateButtons(animals, "animal-button", "#animal-buttons")

});

/*
if (state == "false") {
    $(this).attr("src", $(this).attr("data-animate"))
    $(this).attr("data-isAnimated", "true")
}
else {
    $(this).attr("src", $(this).attr("data-still"))
    $(this).attr("data-isAnimated", "false")
}
*/
