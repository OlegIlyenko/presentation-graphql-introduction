$(function() {
  //var graphiqlUrl = "http://localhost:9000/graphiql"
  var graphiqlUrl = "http://try.sangria-graphql.org/graphiql"
  var graphiqlZoom = 140

  var showHideCredits = function (currentSlide) {
    var section = $(currentSlide)

    var credit = section.data("credit")
    var link = section.data("image-link")

    var creditDiv = $("#credit")

    if (link) {
      creditDiv.empty()

      creditDiv.append($("<span class='credit-phote'>Photo:&nbsp;</span>"))

      if (credit) {
        creditDiv.append($("<span class='credit-credit'>" + credit + "&nbsp;</span>"))
      }

      if (link) {
        creditDiv.append($("<a href='" + link + "' target='_blank' class='credit-link'>" + link + "</span>"))
      }

      creditDiv.fadeIn(500)
    } else {
      creditDiv.fadeOut(500)
    }
  }

  Reveal.addEventListener( 'slidechanged', function( event ) {
    showHideCredits(event.currentSlide)
  });

  Reveal.addEventListener( 'ready', function( event ) {
    showHideCredits(event.currentSlide)
  });

  var initGraphiQL = function (selector) {
    selector.map(function (idx, elem) {
      var replaceElem = $(elem).parent().get(0)
      var vars = $(elem).data("vars")
      var varsParam = vars ? "variables=" +encodeURIComponent(vars) : "hideVariables=true"
      var queryAndResp = $(elem).text().trim().split("// Response")
      var query = queryAndResp[0].trim()
      var resp = queryAndResp[1].trim()


      $('<iframe src="' + graphiqlUrl + '?zoom=' + graphiqlZoom + '&query=' + encodeURIComponent(query) + '&response=' + encodeURIComponent(resp) + '&' + varsParam + '" class="graphiql">').insertAfter(replaceElem)

      replaceElem.remove()
    })
  }

  initGraphiQL($("pre code.graphiql"))
})