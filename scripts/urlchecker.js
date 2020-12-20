/* check url for shared route and create route if available */

var m = [];
var sharedMarkers = [];
var sharedMarker = "";
var sharedSegments = [];
var sharedSegment = "";
var sharedSegmentID = "";

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

// create segmentArray


// make the segments 'selected'

for (var i = 0; i < markerArray.length - 1; i++) {

  // create a sharedSegmentID based on the current marker and the next marker, one at a time
  sharedSegmentID = "segment" + markerArray[i] + markerArray[i + 1];

  // through try and catch, determine if the sharedSegmentID correctly matches its variable name or if the marker names should be flipped
  // then run the appropriate statement

  try {
    if (window[sharedSegmentID].segmentMarkerA === markerArray[i]) {
      sharedSegments.push(sharedSegmentID);
    }
  }

  catch(err) {
    sharedSegmentID = "segment" + markerArray[i + 1] + markerArray[i];
      sharedSegments.push(sharedSegmentID);
  }
}

segmentArray = sharedSegments;

// make all of the segments up to the current segment 'selected'

for (var i = 0; i < segmentArray.length; i++) {
  sharedSegment = segmentArray[i] + "polyline";
  window[sharedSegment].setStyle({color: segmentColorSelected, opacity: segmentOpacitySelected});
}
