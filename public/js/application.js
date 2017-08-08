$(document).ready(function(){
  var renderArticles = function() {
    $.ajax({
      method: "GET",
      url: "/scrape/articles"
    })
    .done(function(doc) {
      console.log(doc);
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
