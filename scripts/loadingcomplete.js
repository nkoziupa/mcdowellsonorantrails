/* check cookie status */

checkCookie();

/* check url for shared route and create route if available */

var m = [];
var sharedMarkers = [];
var sharedMarker = "";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
sharedMarkers = urlParams.getAll('m');
console.log(sharedMarkers);

markerArray = sharedMarkers;

// make all of the markers up to the last marker 'selected'

for (var i = 0; i < markerArray.length - 1; i++) {
  sharedMarker = "marker" + markerArray[i];
  window[sharedMarker].setStyle({status: "selected", color: markerColorSelected, fillColor: markerFillColorSelected, fillOpacity: markerFillOpacitySelected});
}

// make the last marker the 'current' marker

sharedMarker = "marker" + markerArray[markerArray.length - 1];
window[sharedMarker].setStyle({status: "current", color: markerColorCurrent, fillColor: markerFillColorCurrent, fillOpacity: markerFillOpacityCurrent});







/* replace loading button with lets go button */

$("#splash-button").prop("disabled", false).html(
  "<span role='status' aria-hidden='false'></span>Let's Go!");
