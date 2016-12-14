/* jshint -W041 */
function mainSearch() {
    var searchbar = $('#searchBox');
    var searchDiv = $('#searchForm');
    var searchDivNav = $('#searchFormNav');
    if (searchbar[0].value == "") {
        return;
    }
    $(searchDiv).hide();
    $(searchDivNav).show();
    var results = GetSearchResults(searchbar[0].value);
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

    var resultDisplay = $('#result');
    var resultList = $('#results-list');
    for (var result in results) {
        console.log("result", results[result]);
        var newResult = resultDisplay.clone();
        var title = results[result].trackName;
        var artist = results[result].artistName
        newResult.attr("id", "result" + result);
        newResult.attr("hidden", false);
        newResult.find('.albumArt').attr("src", results[result].artworkUrl100);
        newResult.find('.songTitle').replaceWith("<p class=\"songTitle\">" + title + "</p>");
        newResult.find('.songArtist').replaceWith("<p class=\"songArtist\">" + artist + "</p>");
        newResult.find('.audioPlayer').attr("src", results[result].previewUrl);
        resultList.append(newResult);
    }
}

function enterPress(keyPressed) {
    if (keyPressed == 13) {
        mainSearch();
    }
}
