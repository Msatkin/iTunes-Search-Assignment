/* jshint -W041 */
var songBlocks = [];

function mainSearch() {
    var searchBar = $('#searchBox')[0];
    var searchDiv = $('#searchForm')[0];
    var searchDivNav = $('#searchFormNav')[0];
    var searchBarNav = $('#searchBoxNav')[0];
    var results = null;
    var criteria;
    if (searchDiv.style.display == 'none') {
      if (searchBarNav.value == "") {
          return;
      }
      criteria = searchBarNav.value;
      searchBarNav.value = "";
    }
    else {
      if (searchBar.value == "") {
          return;
      }
      criteria = searchBar.value;
      $(searchDiv).hide();
      //$(searchDivNav).show();
      searchDivNav.style.display = 'inline';
      $('#paginationNav').show();
    }
    results = GetSearchResults(criteria);
}

function GetSearchResults(searchCriteria) {
    $.ajax({
        url: 'http://itunes.apple.com/search?term=' + searchCriteria,
        dataType: 'jsonp',
        async: true,
        success: function(data) {
            FormatSearchResults(data.results);
            CreatePagination();
            displayPage(0);
        }
    });
}

function FormatSearchResults(results) {
    songBlocks = [];
    for (var result in results) {
      var title = results[result].trackName;
      var artist = results[result].artistName;
      var newResult = '<li id="result' + result + '" class="results"><div><img class="albumArt img-responsive" src="' + results[result].artworkUrl100.replace('100x100','2180x2180') +'"/><div class="artCover"><p class="songTitle">' + title + '</p><p class="songArtist">' + artist + '</p><div class="audioControls"><audio controls class="audioPlayer" src="' + results[result].previewUrl + '"/></div></div></div></li>';
      songBlocks.push(newResult);
    }
}

function CreatePagination() {
  var pagesNeeded = songBlocks.length/20;
  var paginationList = $('.pagination')[0];
  $(paginationList).empty();

  for (i = 0; i < pagesNeeded; i++) {
    var newPage = '<li><span onclick="displayPage(' + i + ')">' + (i+1) + '</span></li>';
    $(newPage).appendTo(paginationList);
  }
}

function displayPage(pageNumber) {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  var displayList = $('#results-list')[0];
  $(displayList).empty();
  for (i = 0; i < 20; i ++) {
    if (i + (20 * pageNumber) < songBlocks.length) {
      $(songBlocks[i + (20 * pageNumber)]).appendTo(displayList);
    }
  }
}

function onPress(keyPressed) {
    if (keyPressed == 13) {
      mainSearch();
    }
}
