// suggested routes

function viewSuggestedRoute(suggestedroute) {

  // check to see if there are segments clicked out

  if (segmentArray.length > 0) {
    $('#suggestedroutesModal').modal('hide'); // hide the suggested routes modal
    $('#modalSuggestedRoutesResetMap').modal('show'); // show the confirmation modal
    $('#exitsrbutton').click(function(){
      $('#modalSuggestedRoutesResetMap').modal('hide'); // hide the confirmation modal
      $('.navbar-collapse').collapse('hide'); // collapse the nav bar
    }
    $('#continuesrbutton').click(function(){

    }
    else {

    }
  }

  // create the suggestedMarkers array

  var suggestedMarkers = [];

  switch(suggestedroute) {

  case
   "srbrownsmountainsummit":
      suggestedMarkers = ["BRTX", "BP1X", "UR1", "UR2"]
      break;

  case
   "srbrownsranchloop":
      suggestedMarkers = ["LG1", "LG2", "LG4"]
      break;
  }

  // don't show the tutorials

  infoContainer1MapOverlayShown = true;
  infoContainer2MapOverlayShown = true;

  // reset the map

  resetMap();

  // fire the markers

  var fireMarker = "";

  for (var i = 0; i < suggestedMarkers.length; i++) {
    fireMarker = "marker" + suggestedMarkers[i];
    window[fireMarker].fire('click');
  }

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
