/* jshint -W041 */
var defaultResultList;
$(document).ready(function() {
  defaultResultList = $('#results-list');
});
function mainSearch() {
  console.log('searching...');
    var searchBar = $('#searchBox')[0];
    var searchDiv = $('#searchForm')[0];
    var searchDivNav = $('#searchFormNav')[0];
    var searchBarNav = $('#searchBoxNav')[0];
    var results = null;
    var criteria;
    console.log("display", searchDiv.style.display);
    if (searchDiv.style.display == 'none') {
      if (searchBarNav.value == "") {
          return;
      }
      criteria = searchBarNav.value;
      console.log('navsearch', criteria);
    }
    else {
      if (searchBar.value == "") {
          return;
      }
      criteria = searchBar.value;
      $(searchDiv).hide();
      $(searchDivNav).show();
    }
    results = GetSearchResults(criteria);
}

function GetSearchResults(searchCriteria) {
    $.ajax({
        url: 'http://itunes.apple.com/search?term=' + searchCriteria,
        dataType: 'jsonp',
        async: true,
        success: function(data) {
            DisplaySearchResults(data.results);
        }
    });
}

function DisplaySearchResults(results) {
    console.log(results);
    var resultList = $('#results-list');
    var resultDisplay = $('#result');
    resultList.empty();
    resultList.append(resultDisplay);
    for (var result in results) {
      var title = results[result].trackName;
      var artist = results[result].artistName;
      var newResult = '<li id="result' + result + '" class="results"><div><img class="albumArt img-responsive" src="' + results[result].artworkUrl100.replace('100x100','2180x2180') +'"/><div class="artCover"><p class="songTitle">' + title + '</p><p class="songArtist">' + artist + '</p><div class="audioControls"><audio controls class="audioPlayer" src="' + results[result].previewUrl + '"/></div></div></div></li>';
      resultList.append(newResult);
    }
}

function onPressNav(keyPressed) {
    if (keyPressed == 13) {
        mainSearch();
    }
}
function onPressMain(keyPressed, button) {
    if (keyPressed == 13) {
      button.click();
    }
}
