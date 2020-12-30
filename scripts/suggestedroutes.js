// suggested routes

function viewSuggestedRoute(suggestedroute) {

  var fireMarker = "";
  var suggestedMarkers = [];
  var suggestedMarker = "";
  var suggestedSegment = "";
  var suggestedGroup = new L.featureGroup();
  var suggestedRouteLength = 0;
  var suggestedRouteElevGain = 0;

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

  // don't show the tutorials

  infoContainer1MapOverlayShown = true;
  infoContainer2MapOverlayShown = true;

  // $('#modalLoadingRoute').modal('show');

  // collapse the nav bar

  $('.navbar-collapse').collapse('hide');

  // reset the map

  // make all of the markers 'selectable'

  for (var i = 0; i < markerList.length; i++) {
    markerListElement = "marker" + markerList[i];
    window[markerListElement].setStyle({status: "selectable", color: markerColorSelectable, fillColor: markerFillColorSelectable, fillOpacity: markerFillOpacitySelectable});
  }

  // make all of the trailheads their own selectable color

  for (var i = 0; i < trailheadList.length; i++) {
    markerListElement = "marker" + trailheadList[i];
    window[markerListElement].setStyle({status: "selectable", color: trailheadColorSelectable, fillColor: trailheadFillColorSelectable, fillOpacity: trailheadFillOpacitySelectable});
  }

  // empty markerArray

  markerArray.length = 0;

  // show markerArray values in the console for debugging

  console.log(markerArray);

  // make all of the segments 'selectable'

  for (var i = 0; i < segmentList.length; i++) {
    segmentListElement = "segment" + segmentList[i] + "polyline";
    window[segmentListElement].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});
  }

  // empty segmentArray

  segmentArray.length = 0;

  // show segmentArray values in the console for debugging

  console.log(segmentArray);

  // reset route length

  routeLength = 0;

  // reset route elev gain

  routeElevGain = 0;

  // reset route plan

  routePlanArray.length = 0;

  // show/hide info containers

  /*

  $("#infocontainer-0").addClass("display-invisible");
  $("#infocontainer-0").removeClass("display-visible");
  $("#infocontainer-1").addClass("display-invisible");
  $("#infocontainer-1").removeClass("display-visible");
  $("#infocontainer-2").addClass("display-invisible");
  $("#infocontainer-2").removeClass("display-visible");
  $("#infocontainer-suggestedroute").addClass("display-visible");
  $("#infocontainer-suggestedroute").removeClass("display-invisible");

  infoContainer2Visible = false;

  */

  // reset map view

  /*

  if ($(window).height() >= 900) {
    markerRadiusInitial = 110;
    trailheadRadiusInitial = 110;
    map.setView([33.702662, -111.786980], 12);
    }
  else if ($(window).height() >= 700 && $(window).height() < 900) {
      markerRadiusInitial = 100;
      trailheadRadiusInitial = 100;
      map.setView([33.702662, -111.786980], 11);
  }
  else {
      markerRadiusInitial = 50;
      trailheadRadiusInitial = 50;
      map.setView([33.702662, -111.786980], 10);
  };

  */

  // create the suggestedMarkers array

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

  // fire the markers

  for (var i = 0; i < suggestedMarkers.length; i++) {
    fireMarker = "marker" + suggestedMarkers[i];
    window[fireMarker].fire('click');
  }

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

  // hide current modal and show loading route modal

  $('#suggestedroutesModal').modal('hide');

  // make suggested route length and elev gain equal route length and gain

  suggestedRouteLength = routeLength;
  suggestedRouteElevGain = routeElevGain;

  // update suggested route elev gain

  $("#suggestedrouteelevgain").text(suggestedRouteElevGain.toFixed(0) + "' elev gain");

  // update suggested route length

  if (suggestedRouteLength === 1) {
    $("#suggestedroutelength").text(suggestedRouteLength.toFixed(2) + " mile");
  }
  else {
    $("#suggestedroutelength").text(suggestedRouteLength.toFixed(2) + " miles");
  }

  // show/hide info containers

  $("#infocontainer-0").addClass("display-invisible");
  $("#infocontainer-0").removeClass("display-visible");
  $("#infocontainer-1").addClass("display-invisible");
  $("#infocontainer-1").removeClass("display-visible");
  $("#infocontainer-2").addClass("display-invisible");
  $("#infocontainer-2").removeClass("display-visible");
  $("#infocontainer-suggestedroute").addClass("display-visible");
  $("#infocontainer-suggestedroute").removeClass("display-invisible");

  infoContainer2Visible = false;

  // add map overlay and remove when button is selected

  $("#mapoverlay").css("visibility", "visible");
  $("#mapoverlay").fadeTo(500, 0.85);
  $("#infocontainer-suggestedroute-button").on("click", function() {
    $("#mapoverlay").fadeTo(500, 0.0, function() {
      $("#mapoverlay").css("visibility", "hidden");
      $("#infocontainer-suggestedroute").addClass("display-invisible");
      $("#infocontainer-suggestedroute").removeClass("display-visible");
      $("#infocontainer-2").addClass("display-visible");
      $("#infocontainer-2").removeClass("display-invisible");
    });
  });

}
