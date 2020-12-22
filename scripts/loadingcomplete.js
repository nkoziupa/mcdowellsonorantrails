/* check cookie status */

checkCookie();

// check url for shared route and create route if available

try {

  var m = [];
  var sharedMarkers = [];

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  sharedMarkers = urlParams.getAll('m');

  // if there aren't any marker parameters, the code should bail to catch at this point

  // check all segments to see if they're valid

  var segmentCheckerA = "";
  var segmentCheckerB = "";
  var segmentCheckerReportA;
  var segmentCheckerReportB;
  var finalSegmentCheckerReport = true;

  for (var i = 0; i < sharedMarkers.length - 1; i++) {
    segmentCheckerA = sharedMarkers[i] + sharedMarkers[i + 1];
    segmentCheckerB = sharedMarkers[i + 1] + sharedMarkers[i];
    segmentCheckerReportA = segmentList.includes(segmentCheckerA);
    segmentCheckerReportB = segmentList.includes(segmentCheckerB);
    if (segmentCheckerReportA === true || segmentCheckerReportB === true) {
      console (segmentCheckerA + " or " + segmentCheckerB + " is a valid segment.");
    }
    else {
      console (segmentCheckerA + " and " + segmentCheckerB + " are nonexistent segments.");
      finalSegmentCheckerReport = false;
    }
  }

  // create the route if all segments are valid, otherwise skip

  if (finalSegmentCheckerReport === true) {

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

  else {
    window.history.pushState({}, document.title, "/");
  }

}

catch(err) {
  window.history.pushState({}, document.title, "/");
}

/* replace loading button with lets go button */

$("#splash-button").prop("disabled", false).html(
  "<span role='status' aria-hidden='false'></span>Let's Go!");
