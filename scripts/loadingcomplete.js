/* check cookie status */

checkCookie();

// check url for shared route and create route if available

var m = [];
var sharedMarkers = [];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
sharedMarkers = urlParams.getAll('m');

// don't show the tutorials

infoContainer1MapOverlayShown = true;
infoContainer2MapOverlayShown = true;

for (var i = 0; i < sharedMarkers.length; i++) {
  fireMarker = "marker" + sharedMarkers[i];
  window[fireMarker].fire('click');
}

// zoom in to show the route

var sharedMarker;
var sharedSegment;
var sharedGroup = new L.featureGroup();

for (var i = 0; i < markerArray.length; i++) {
  sharedMarker = "marker" + markerArray[i];
  window[sharedMarker].addTo(sharedGroup);
}

for (var i = 0; i < segmentArray.length; i++) {
  sharedSegment = segmentArray[i] + "polyline";
  window[sharedSegment].addTo(sharedGroup);
}

map.fitBounds(sharedGroup.getBounds());

// change URL to mcdowellsonorantrails.com

window.history.pushState({}, document.title, "/");

/*
function ChangeUrl(title, url) {
    if (typeof(history.pushState) != "undefined") {
        var obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
    } else {
        alert("Browser does not support HTML5.");
    }
}

<input type="button" value="Page1" onclick="ChangeUrl('Page1', 'Page1.htm');" />
<input type="button" value="Page2" onclick="ChangeUrl('Page2', 'Page2.htm');" />
<input type="button" value="Page3" onclick="ChangeUrl('Page3', 'Page3.htm');" /> 
*/

/* replace loading button with lets go button */

$("#splash-button").prop("disabled", false).html(
  "<span role='status' aria-hidden='false'></span>Let's Go!");
