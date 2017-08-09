$(document).ready(function(){

  var renderArticles = function() {
    $.ajax({
      method: "GET",
      url: "/scrape/article"
    })
    .done(function(doc) {
      console.log(doc);
      var cardRow = $('#articleRow')

      $('#articleRow').empty();
      var cardDeck = $('<div class="card-deck">').appendTo(cardRow)
      doc.forEach(function(article,index){
        console.log(article);
        var newCardColumnDiv = $('<div class="col-md-4" id= card' + index+ '>').appendTo(cardDeck);
        var newCardClassDiv = $('<div class="card card-inverse card-primary text-center">').appendTo(newCardColumnDiv);
        var newCardBlockDiv = $('<div class="card-block">').appendTo(newCardClassDiv);
        var newCardTitle = $('<h4 class="card-title"> This is Article #' + (index + 1) + '</h4>').appendTo(newCardBlockDiv);
        var newArticleContent = $('<p class="card-text">' + article.title + '</p>').appendTo(newCardBlockDiv);

        var newArticleLink = $('<a class="btn btn-primary"  target="_blank"> Read Article </a>').appendTo(newCardBlockDiv);
        $(newArticleLink).attr('href',article.link);

        var newSaveArticleButton = $('<input id = "saveArticle" class="btn btn-primary" value = "Save Article"> </input>').appendTo(newCardBlockDiv);
        $(newSaveArticleButton).attr('data-articleId',article._id)
        $(newSaveArticleButton).attr('data-id',index)
      })

      window.scrollTo(0, $("#about").offset().top);

  })
}

$('#articleRow').on('click','#saveArticle' ,function(){


  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-articleId");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/saveArticle/" + thisId
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);

    });

var thisCardId = 'card' + $(this).attr("data-id");
console.log(thisCardId);

$('#'+thisCardId).fadeOut("slow", function() {
    // Animation complete.
});
})


$('#scrapeWSJ').on('click',function() {

  // Now make an ajax call for the Article
  console.log('Hello');

  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .done(function(data) {

    $('#scrapeResult').modal('show');
    $('#scrapeResultText').text('WSJ Scraped successfully!')

    renderArticles();
  })

})

$('#displaySavedArticles').on('click',function() {

  // Now make an ajax call for the Article
  console.log('Hello');

  $.ajax({
    method: "GET",
    url: "/savedArticles"
  })
  .done(function(doc) {

    console.log(doc)
  })

})



})
