// suggested routes

function viewSuggestedRoute(suggestedroute) {

  // check to see if there are segments clicked out

/*

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

  */

  // create the suggestedMarkers array

  var suggestedMarkers = [];

  switch(suggestedroute) {

  case
   "srbrownsmountainsummit":
      suggestedMarkers = ["BRTX", "BP1X", "UR1", "BR3", "BR5", "BT1", "BT2", "BT4", "BMSX", "BT4", "BT2", "BT1", "BR5", "BR3", "UR1", "BP1X", "BRTX"]
      break;

  case
   "srbrownsranchloop":
      suggestedMarkers = ["BRTX", "BSTX", "BTTX", "LGAX", "LG9", "LG13", "LG15", "LG17", "HT1", "HT3", "CN5", "CN3", "UR5", "UR7", "BT6", "UR8", "CL6", "CL5", "CL3", "CL2", "CM7", "CM6", "CM5", "CM4", "TD1", "GM7", "GM6", "GM5", "GM10", "GM4", "GM3", "GM2", "GM9", "RS2", "RS3", "RS4", "CW3", "CM2", "CM1", "CM8", "MV4", "MV2", "BR6", "VT1", "BT1", "BR5", "BR3", "UR1", "BP1X", "BRTX"]
      break;

  case
   "srsunrisepeak":
      suggestedMarkers = ["STX", "SR5", "SR7", "SR9", "SR10", "SSPX", "SR10", "SR9", "SR7", "SR5", "STX"]
      break;

  case
   "srpembertonloop":
      suggestedMarkers = ["XMTS", "XM13", "XM14", "XM15", "XM16", "XM17", "XM18", "XM19", "XM20", "XM21", "XM22", "XM23", "XM24", "XM25", "XM26", "XM01", "XM02", "XM03", "XM04", "XM05", "XM06", "XM07", "XM08", "XM09", "XM10", "XM11", "XM12", "XMTS"]
      break;

  case
   "srtomsthumbsummit":
      suggestedMarkers = ["TTTX", "TT1", "TT2", "TTV1", "TTV2", "TTV3", "TTV4", "EE1", "TT7", "TTX", "TT7", "EE1", "TTV4", "TTV3", "TTV2", "TTV1", "TT2", "TT1", "TTTX"]
      break;

  case
   "srjanerautrailloop":
      suggestedMarkers = ["BRTX", "JRCX", "JRTX", "JR2X", "JR1X", "JRTX", "JRCX", "BRTX"]
      break;

  case
   "srfraesfieldinterpretivetrailloop":
      suggestedMarkers = ["FTX", "WB8", "FIAX", "FIDX", "FIBX", "FIAX", "WB8", "FTX"]
      break;

  case
   "srgranitemountainloop":
      suggestedMarkers = ["GMTX", "GT3X", "GT4X", "BL1X", "BL2", "GM3", "GM2", "GM9", "GM7", "GM6", "GM5", "GM10", "GM4", "BL2", "BL1X", "GT4X", "GT3X", "GMTX"]
      break;

  case
   "srwhiskeybottleloop":
      suggestedMarkers = ["FTX", "WB8", "WB8X", "WB4", "DX2", "DX3", "BH1", "BH4", "BH1X", "FTX"]
      break;

  case
   "srgatewayloop":
      suggestedMarkers = ["GTX", "G02X", "GL7", "GL1", "GL2", "PT5", "BP1", "GL3", "WP1", "GL5", "GL7", "G02X", "GTX"]
      break;

  case
   "srinspirationviewpoint":
      suggestedMarkers = ["GTX", "G02X", "GL7", "GL5", "WP1", "WP3", "TT17", "WP5", "TT17", "WP3", "WP1", "GL5", "GL7", "G02X", "GTX"]
      break;

  case
   "srbellpassloop":
      suggestedMarkers = ["GTX", "G02X", "GL7", "GL1", "GL2", "PT5", "BP1", "BP5", "BP7", "BP9", "WP7", "WP5", "TT17", "WP3", "WP1", "GL5", "GL7", "G02X", "GTX"]
      break;

  case
   "srscenictrailloop":
      suggestedMarkers = ["XMTS", "XM12", "XM11", "XM10", "XM57", "XM11", "XM12", "XMTS"]
      break;

  case
   "srwesterntrailloop":
      suggestedMarkers = ["XFAX", "XF01", "XF02", "XF06", "XF07", "XF23", "XF25", "XF08", "XF09", "XF11", "XF13", "XF14", "XF06", "XF02", "XF01", "XFAX"]
      break;

  }


  // don't show the tutorials

  infoContainer1MapOverlayShown = true;
  infoContainer2MapOverlayShown = true;

  // collapse the nav bar

  $('.navbar-collapse').collapse('hide');

  // hide current modal and show loading route modal

  function showandhidemodals() {
    $('#suggestedroutesModal').modal('hide');
    $('#modalLoadingRoute').modal('show');
  }

  setTimeout(showandhidemodals, 1000);

  // reset the map

  setTimeout(resetMap, 1000);

  function createRoute() {

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

  // close the modal

  $('#modalLoadingRoute').modal('hide');

  }

  setTimeout(createRoute, 2000);

}
