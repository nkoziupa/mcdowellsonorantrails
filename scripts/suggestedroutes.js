// suggested routes

function viewSuggestedRoute() {
  // don't show the tutorials

  infoContainer1MapOverlayShown = true;
  infoContainer2MapOverlayShown = true;

  // reset the map

  resetMap();

  // create the marker Array

  var suggestedMarkers = [BRTX, BP1X, UR1, UR2, BR5, BR3, UR1, BP1X, BRTX];
  var fireMarker = "";

  // fire the markers

  for (var i = 0; i < suggestedMarkers.length; i++) {
    fireMarker = "marker" + suggestedMarkers[i];
    window[fireMarker].fire('click');
  }

  // zoom in to show the route

  var suggestedMarker;
  var suggestedSegment;
  var suggestedGroup = new L.featureGroup();

  for (var i = 0; i < markerArray.length; i++) {
    suggestedMarker = "marker" + markerArray[i];
    window[suggestedMarker].addTo(suggestedGroup);
  }

  for (var i = 0; i < segmentArray.length; i++) {
    suggestedSegment = segmentArray[i] + "polyline";
    window[suggestedSegment].addTo(suggestedGroup);
  }

  map.fitBounds(suggestedGroup.getBounds());
}
