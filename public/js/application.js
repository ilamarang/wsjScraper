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
        var newCardColumnDiv = $('<div class="col-md-4">').appendTo(cardDeck);
        var newCardClassDiv = $('<div class="card card-inverse card-primary text-center">').appendTo(newCardColumnDiv);
        var newCardBlockDiv = $('<div class="card-block">').appendTo(newCardClassDiv);
        var newCardTitle = $('<h4 class="card-title"> This is Article #' + (index + 1) + '</h4>').appendTo(newCardBlockDiv);
        var newArticleContent = $('<p class="card-text">' + article.title + '</p>').appendTo(newCardBlockDiv);

        var newArticleLink = $('<a class="btn btn-primary"  target="_blank"> Read Article </a>').appendTo(newCardBlockDiv);
        $(newArticleLink).attr('href',article.link);

        var newSaveArticleButton = $('<input id = "saveArticle" class="btn btn-primary" value = "Save Article"> </input>').appendTo(newCardBlockDiv);


      })

  })
}

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




})
