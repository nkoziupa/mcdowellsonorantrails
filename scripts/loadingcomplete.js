/* check cookie status */

checkCookie();

// check url for shared route and create route if available

try {

  var m = [];
  var sharedMarkers = [];

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  sharedMarkers = urlParams.getAll('m');

  // check all segments to see if they're valid, if not then bail to catch

  var segmentCheckerA = "";
  var segmentCheckerB = "";
  var segmentCheckerReportA;
  var segmentCheckerReportB;

  for (var i = 0; i < sharedMarkers.length; i++) {
    segmentCheckerA = "segment" + sharedMarkers[i] + sharedMarkers[i + 1];
    segmentCheckerB = "segment" + sharedMarkers[i + 1] + sharedMarkers[i];
    segmentCheckerReportA = segmentList.includes(segmentCheckerA);
    segmentCheckerReportB = segmentList.includes(segmentCheckerB);
    if (segmentCheckerReport == true || segmentCheckerReport == true) {
      alert ("This segment exists.");
    }
    else {
      alert ("Nonexistent segment.");
    }
  }







  // all segments are valid, so continue

  // don't show the tutorials

  infoContainer1MapOverlayShown = true;
  infoContainer2MapOverlayShown = true;

  // fire the markers

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
  window.history.pushState({}, document.title, "/");
}

/* replace loading button with lets go button */

$("#splash-button").prop("disabled", false).html(
  "<span role='status' aria-hidden='false'></span>Let's Go!");
