
var displaySavedArticles = function() {

  console.log('Hello');

  $.ajax({
    method: "GET",
    url: "/savedArticles"

  })
  .done(function(doc) {
    var cardRow = $('#savedArticleRow')

    $('#articleRow').empty();
    var cardDeck = $('<div class="card-deck">').appendTo(cardRow)
    doc.forEach(function(article,index){
      console.log(article);
      var newCardColumnDiv = $('<div class="col-md-4" id= card' + index+ '>').appendTo(cardDeck);
      var newCardClassDiv = $('<div class="card card-inverse card-primary text-center">').appendTo(newCardColumnDiv);
      var newCardBlockDiv = $('<div class="card-block">').appendTo(newCardClassDiv);
      var newCardTitle = $('<h4 class="card-title"> Saved Article #' + (index + 1) + '</h4>').appendTo(newCardBlockDiv);
      var newArticleContent = $('<p class="card-text">' + article.title + '</p>').appendTo(newCardBlockDiv);

      var newNoteArticleButton = $('<input class = "addNote btn btn-primary" value = "Add Notes"> </input>').appendTo(newCardBlockDiv);
      $(newNoteArticleButton).attr('data-articleId',article._id)
      $(newNoteArticleButton).attr('data-id',index)

      var newRemoveSavedArticleButton = $('<input class = "unSaveArticle btn btn-primary" value = "Delete from Save"> </input>').appendTo(newCardBlockDiv);
      $(newRemoveSavedArticleButton).attr('data-articleId',article._id);
      $(newRemoveSavedArticleButton).attr('data-id',index);

    })

    window.scrollTo(0, $("#savedArticles").offset().top);

  })

}

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
        $(newSaveArticleButton).attr('data-articleId',article._id);
        console.log(article.hash);
        $(newSaveArticleButton).attr('data-hashId',article.hash);
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
    method: "POST",
    url: "/saveArticle/" + thisId,
    data: {
      // Value taken from title input
      hash: $(this).attr("data-hashId")

    },
    error: function(errorMessage) {
      if(errorMessage.status == 400) {
        // Empty the notes section
        $('#modalContent').empty();
        $('#notesAddUpdate').remove();
        $('#notesDelete').remove();

        $('#scrapeResult').modal('show');
        $('#scrapeResultText').text('Article Already Saved to your list!')
      }
    }
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
    // Empty the notes section
    $('#modalContent').empty();
    $('#notesAddUpdate').remove();
    $('#notesDelete').remove();

    $('#scrapeResult').modal('show');
    $('#scrapeResultText').text('WSJ Scraped successfully!')

    renderArticles();
  })

})



$('#displaySavedArticles').on('click',function() {

  displaySavedArticles();

});

$('#savedArticleRow').on('click','.unSaveArticle' ,function(){


  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-articleId");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/unSaveArticle/" + thisId
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

$('.modal').on('click','#notesDelete',function() {
  var thisId = $(this).attr("data-articleid");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/deleteArticle/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#note").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $('#modalContent').empty();
      $('#notesAddUpdate').remove();
      $('#notesDelete').remove();
      var successMessage = $('<h3> Notes deleted successfully </h3>').appendTo($('#modalContent'));
    });

})


$('.modal').on('click','#notesAddUpdate',function() {
  var thisId = $(this).attr("data-articleid");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#note").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $('#modalContent').empty();
      $('#notesAddUpdate').remove();
      $('#notesDelete').remove();
      var successMessage = $('<h3> Notes added successfully </h3>').appendTo($('#modalContent'));
    });

})


$('#savedArticleRow').on('click','.addNote' ,function(){

  //Reset modal Form.
  $('#notesAddUpdate').remove();
  $('#notesDelete').remove();

  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-articleId");

  // Run a POST request to change the note, using what's entered in the inputs

  $('#scrapeResult').modal('show');
  $('#scrapeResultText').text('');
  $('.modal-title').text('Please add Notes!');
  $('#modalContent').empty();

  var newFormGroup = $('<div class="form-group"> </div>').appendTo($('#modalContent'));
  var newTitleLabel = $('<label for="title">Add Title: </label>').appendTo(newFormGroup);
  var newTitleText = $('<input type="text" class="form-control" id="titleinput"></input>').appendTo(newFormGroup);

  var newNoteLabel = $('<label for="note">Add Notes: </label>').appendTo(newFormGroup);
  var newNoteArea = $('<textarea class="form-control" rows="3" id="note"></textarea>').appendTo(newFormGroup);

  var addButton = $('<input type="button" class="btn btn-primary" value="Add/Update" id="notesAddUpdate"> </input>').appendTo($('.modal-footer'));
  $(addButton).attr('data-articleId',$(this).attr("data-articleId"));
  var thisCardId = 'card' + $(this).attr("data-id");
  console.log(thisCardId);

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
  .done(function(data) {

  // If there's a note in the article
  if (data.note) {
    // Place the title of the note in the title input
    $("#titleinput").val(data.note.title);
    // Place the body of the note in the body textarea
    $("#note").val(data.note.body);

    var deleteButton = $('<input type="button" class="btn btn-primary" value="Delete" id="notesDelete"> </input>').appendTo($('.modal-footer'));
    $(deleteButton).attr('data-articleId',data._id);
  }
});

})



})
