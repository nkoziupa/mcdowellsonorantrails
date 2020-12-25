// suggested routes

function viewSuggestedRoute() {
  // don't show the tutorials

  infoContainer1MapOverlayShown = true;
  infoContainer2MapOverlayShown = true;

  // reset the map

  resetMap();

  // create the marker Array

  var suggestedMarkers = [“BRTX”, “BP1X”, “UR1”, “UR2”, “BR5”, “BR3”, “UR1”, “BP1X”, “BRTX”];
  var fireMarker = "";

  // fire the markers

  for (var i = 0; i < suggestedMarkers.length; i++) {
    fireMarker = "marker" + suggestedMarkers[i];
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
}
