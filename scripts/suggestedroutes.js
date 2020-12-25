// suggested routes

function viewSuggestedRoute(suggestedroute) {

  var srbrownsmountainsummit = ["BRTX", "BP1X", "UR1", "UR2"];
  var srbrownsranchloop = ["LG1", "LG2", "LG4"];

  



  alert(suggestedroute);


  // don't show the tutorials

  infoContainer1MapOverlayShown = true;
  infoContainer2MapOverlayShown = true;

  // reset the map

  resetMap();

  // create the marker Array


  var suggestedMarkers = ["BRTX", "BP1X", "UR1", "UR2"];
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

  // collapse the nav bar

  $('.navbar-collapse').collapse('hide');

  // close the modal

  $('#suggestedroutesModal').modal('hide');

}
