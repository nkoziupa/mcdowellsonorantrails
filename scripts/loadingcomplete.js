/* check cookie status */

checkCookie();

// check url for shared route and create route if available

/*
let url = new URL('https://example.com?foo=1&bar=2');
let params = new URLSearchParams(url.search.slice(1));

params.has('bar') === true; //true
*/

try {

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

}

catch(err) {

}

/* replace loading button with lets go button */

$("#splash-button").prop("disabled", false).html(
  "<span role='status' aria-hidden='false'></span>Let's Go!");
