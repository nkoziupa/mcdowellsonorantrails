// suggested routes

function viewSuggestedRoute(suggestedroute) {

  var fireMarker = "";
  var suggestedMarkers = [];
  var suggestedMarker = "";
  var suggestedSegment = "";
  var suggestedGroup = new L.featureGroup();
  var suggestedRouteName = "";
  var suggestedRouteButton = "";
  var suggestedRouteLength = 0;
  var suggestedRouteElevGain = 0;

  // assign values

  switch(suggestedroute) {

    case
     "srjanerautrailloop":
        suggestedMarkers = ["BRTX", "JRCX", "JRTX", "JR2X", "JR1X", "JRTX", "JRCX", "BRTX"]
        suggestedRouteName = "Jane Rau Trail Loop";
        suggestedRouteButton = "#srjanerautrailloopbtn";
        break;

    case
     "srfraesfieldinterpretivetrailloop":
        suggestedMarkers = ["FTX", "WB8", "FIAX", "FIDX", "FIBX", "FIAX", "WB8", "FTX"]
        suggestedRouteName = "Fraesfield Interpretive Trail Loop";
        suggestedRouteButton = "#srfraesfieldinterpretivetrailloopbtn";
        break;

    case
     "srtomsthumbtrailheadshortloop":
        suggestedMarkers = ["TTTX", "TT1", "FS1", "ML3", "ML1", "TTTX"]
        suggestedRouteName = "Tom's Thumb Trailhead Short Loop";
        suggestedRouteButton = "#srtomsthumbtrailheadshortloopbtn";
        break;

    case
     "srbajadanaturetrailloop":
        suggestedMarkers = ["GTX", "G02X", "BN1X", "BN2X", "BN3X", "BN4X", "BN1X", "G02X", "GTX"]
        suggestedRouteName = "Bajada Nature Trail Loop";
        suggestedRouteButton = "#srbajadanaturetrailloopbtn";
        break;

    case
     "srhilltoptrailloop":
        suggestedMarkers = ["XMTS", "XM60", "XM61", "XM62", "XM63", "XM61", "XM60", "XMTS"]
        suggestedRouteName = "Hilltop Trail Loop";
        suggestedRouteButton = "#srhilltoptrailloopbtn";
        break;

    case
     "sroverlookeasyaccessoutandback":
        suggestedMarkers = ["XFAX", "XF01", "XF03", "XF04", "XF03", "XF01", "XFAX"]
        suggestedRouteName = "Overlook / Easy Access Out and Back";
        suggestedRouteButton = "#sroverlookeasyaccessoutandbackbtn";
        break;

    case
     "srbrownsmountainsummit":
        suggestedMarkers = ["BRTX", "BP1X", "UR1", "BR3", "BR5", "BT1", "BT2", "BT4", "BMSX", "BT4", "BT2", "BT1", "BR5", "BR3", "UR1", "BP1X", "BRTX"]
        suggestedRouteName = "Brown's Mountain Summit";
        suggestedRouteButton = "#srbrownsmountainsummitbtn";
        break;

    case
     "srwhiskeybottleloop":
        suggestedMarkers = ["FTX", "WB8", "WB8X", "WB4", "DX2", "DX3", "BH1", "BH4", "BH1X", "FTX"]
        suggestedRouteName = "Whiskey Bottle Loop";
        suggestedRouteButton = "#srwhiskeybottleloopbtn";
        break;

    case
     "srtomsthumbsummit":
        suggestedMarkers = ["TTTX", "TT1", "TT2", "TTV1", "TTV2", "TTV3", "TTV4", "EE1", "TT7", "TTX", "TT7", "EE1", "TTV4", "TTV3", "TTV2", "TTV1", "TT2", "TT1", "TTTX"]
        suggestedRouteName = "Tom's Thumb Summit";
        suggestedRouteButton = "#srtomsthumbsummitbtn";
        break;

    case
     "srgatewayloop":
        suggestedMarkers = ["GTX", "G02X", "GL7", "GL1", "GL2", "PT5", "BP1", "GL3", "WP1", "GL5", "GL7", "G02X", "GTX"]
        suggestedRouteName = "Gateway Loop";
        suggestedRouteButton = "#srgatewayloopbtn";
        break;

    case
     "srinspirationviewpoint":
        suggestedMarkers = ["GTX", "G02X", "GL7", "GL5", "WP1", "WP3", "TT17", "WP5", "TT17", "WP3", "WP1", "GL5", "GL7", "G02X", "GTX"]
        suggestedRouteName = "Inspiration Viewpoint";
        suggestedRouteButton = "#srinspirationviewpointbtn";
        break;

    case
     "srsunrisepeak":
        suggestedMarkers = ["STX", "SR5", "SR7", "SR9", "SR10", "SSPX", "SR10", "SR9", "SR7", "SR5", "STX"]
        suggestedRouteName = "Sunrise Peak";
        suggestedRouteButton = "#srsunrisepeakbtn";
        break;

    case
     "srscenictrailloop":
        suggestedMarkers = ["XMTS", "XM12", "XM11", "XM10", "XM57", "XM11", "XM12", "XMTS"]
        suggestedRouteName = "Scenic Trail Loop";
        suggestedRouteButton = "#srscenictrailloopbtn";
        break;

    case
     "srwesterntrailloop":
        suggestedMarkers = ["XFAX", "XF01", "XF02", "XF06", "XF07", "XF23", "XF25", "XF08", "XF11", "XF13", "XF14", "XF06", "XF02", "XF01", "XFAX"]
        suggestedRouteName = "Western Trail Loop";
        suggestedRouteButton = "#srwesterntrailloopbtn";
        break;

    case
     "srgranitemountainloop":
        suggestedMarkers = ["GMTX", "GT3X", "GT4X", "BL1X", "BL2", "GM3", "GM2", "GM9", "GM7", "GM6", "GM5", "GM10", "GM4", "BL2", "BL1X", "GT4X", "GT3X", "GMTX"]
        suggestedRouteName = "Granite Mountain Loop";
        suggestedRouteButton = "#srgranitemountainloopbtn";
        break;

    case
     "sreastendwindgatetomsthumbloop":
        suggestedMarkers = ["TTTX", "TT1", "TT2", "TTV1", "TTV2", "TTV3", "TTV4", "EE1", "EE5", "BP9", "WP7", "WP5", "TT17", "TT15", "TT9", "TL1", "TT7", "EE1", "TTV4", "TTV3", "TTV2", "TTV1", "TT2", "TT1", "TTTX"]
        suggestedRouteName = "East End / Windgate / Tom's Thumb Loop";
        suggestedRouteButton = "#sreastendwindgatetomsthumbloopbtn";
        break;

    case
     "srbellpassloop":
        suggestedMarkers = ["GTX", "G02X", "GL7", "GL1", "GL2", "PT5", "BP1", "BP5", "BP7", "BP9", "WP7", "WP5", "TT17", "WP3", "WP1", "GL5", "GL7", "G02X", "GTX"]
        suggestedRouteName = "Bell Pass Loop";
        suggestedRouteButton = "#srbellpassloopbtn";
        break;

    case
     "srgranitetrailcampgroundloop":
        suggestedMarkers = ["XMTS", "XM13", "XM14", "XM15", "XM16", "XM32", "XM33", "XM34", "XM35", "XM27", "XM28", "XM29", "XM30", "XM31", "XM14", "XM13", "XMTS"]
        suggestedRouteName = "Granite Trail Campground Loop";
        suggestedRouteButton = "#srgranitetrailcampgroundloopbtn";
        break;

    case
     "srsonorantrailsloop":
        suggestedMarkers = ["XFAX", "XF01", "XF02", "XF06", "XF14", "XF13", "XF19", "XF18", "XF31", "XF16", "XM68", "XF15", "XF30", "XF17", "XF34", "XF19", "XF13", "XF14", "XF06", "XF02", "XF01", "XFAX"]
        suggestedRouteName = "Sonoran Trails Loop";
        suggestedRouteButton = "#srsonorantrailsloopbtn";
        break;

    case
     "srfraesfieldtogranitemountainloop":
        suggestedMarkers = ["FTX", "FTAX", "BH2X", "MT1", "MV1", "DX5", "MG1", "TP1", "TP2X", "TP3X", "BH2", "DX3", "BH1", "BH4", "BH1X", "FTX"]
        suggestedRouteName = "Fraesfield to Granite Mountain Loop";
        suggestedRouteButton = "#srfraesfieldtogranitemountainloopbtn";
        break;

    case
     "srtomsthumbfeldsparloop":
        suggestedMarkers = ["TTTX", "TT1", "TT2", "FS1", "ML3", "ML3X", "ML5", "TH3X", "ML1", "TTTX"]
        suggestedRouteName = "Tom's Thumb / Feldspar Loop";
        suggestedRouteButton = "#srtomsthumbfeldsparloopbtn";
        break;

    case
     "srwestworldquartzoutandback":
        suggestedMarkers = ["WWTX", "WW1", "WW1X", "WW5", "QT1", "QT1X", "QT1", "WW5", "WW1X", "WW1", "WWTX"]
        suggestedRouteName = "WestWorld / Quartz Out and Back";
        suggestedRouteButton = "#srwestworldquartzoutandbackbtn";
        break;

    case
     "srstagingareasloop":
        suggestedMarkers = ["XMFS", "XM59", "XM15", "XM14", "XM13", "XM12", "XM11", "XM57", "XM58", "XM59", "XMFS"]
        suggestedRouteName = "Staging Areas Loop";
        suggestedRouteButton = "#srstagingareasloopbtn";
        break;

    case
     "srpromenadeoutandback":
        suggestedMarkers = ["XFAX", "XF01", "XF02", "XF06", "XF14", "XF13", "XF19", "XF13", "XF14", "XF06", "XF02", "XF01", "XFAX"]
        suggestedRouteName = "Promenade Out and Back";
        suggestedRouteButton = "#srpromenadeoutandbackbtn";
        break;

    case
     "srgranitemountainhawknestloop":
        suggestedMarkers = ["GMTX", "GT3X", "GE4X", "AH1", "DV2", "DV3", "CP3", "RG1", "OP3", "BA1", "HW1", "HW4", "HW10", "DV17", "HD5", "TD4", "TD2", "TD1", "GM7", "GM9", "GM2", "GM1", "GM9X", "GM8X", "TP1X", "GMTX"]
        suggestedRouteName = "Granite Mountain Hawknest Loop";
        suggestedRouteButton = "#srgranitemountainhawknestloopbtn";
        break;

    case
     "srgooseneckredbirdloop":
        suggestedMarkers = ["FTX", "WB8", "FT2X", "FT3X", "FT4X", "GNX", "GN1", "GN2", "GN3", "GN5", "RB3", "RB5", "RB7", "SV3", "GN9", "GN7", "GN5", "GN3", "GN2", "GN1", "GNX", "FT4X", "FT3X", "FT2X", "WB8", "FTX"]
        suggestedRouteName = "Gooseneck / Redbird Loop";
        suggestedRouteButton = "#srgooseneckredbirdloopbtn";
        break;

    case
     "srlostdogwestworldtrailloop":
        suggestedMarkers = ["LDTX", "LD1", "LDBX", "SR19", "LD3", "LD5", "LD7", "LD9", "QT5", "QT3", "QT1", "WW5", "WW11", "QT5", "LD9", "LD7", "LD5", "LD3", "SR19", "LDBX", "LD1", "LDTX"]
        suggestedRouteName = "Lost Dog / WestWorld Trail Loop";
        suggestedRouteButton = "#srlostdogwestworldtrailloopbtn";
        break;

    case
     "srgranitedelsiepembertonloop":
        suggestedMarkers = ["XMTS", "XM13", "XM14", "XM15", "XM16", "XM32", "XM29", "XM28", "XM27", "XM26", "XM01", "XM02", "XM03", "XM04", "XM05", "XM06", "XM07", "XM08", "XM09", "XM10", "XM11", "XM12", "XMTS"]
        suggestedRouteName = "Granite / Delsie / Pemberton Loop";
        suggestedRouteButton = "#srgranitedelsiepembertonloopbtn";
        break;

    case
     "sraderocanyontogoldeneagleoutandback":
        suggestedMarkers = ["XFAX", "XF01", "XF02", "XF06", "XF14", "XF13", "XF19", "XF34", "XF17", "XF30", "XF15", "XM68", "XM65", "XM66", "XM67", "XFGX", "XM67", "XM66", "XM65", "XM68", "XF15", "XF30", "XF17", "XF34", "XF19", "XF13", "XF14", "XF06", "XF02", "XF01", "XFAX"]
        suggestedRouteName = "Adero Canyon to Golden Eagle Out and Back";
        suggestedRouteButton = "#sraderocanyontogoldeneagleoutandbackbtn";
        break;

    case
     "srbrownsranchloop":
        suggestedMarkers = ["BRTX", "BSTX", "BTTX", "LGAX", "LG9", "LG13", "LG15", "LG17", "HT1", "HT3", "CN5", "CN3", "UR5", "UR7", "BT6", "UR8", "CL6", "CL5", "CL3", "CL2", "CM7", "CM6", "CM5", "CM4", "TD1", "GM7", "GM6", "GM5", "GM10", "GM4", "GM3", "GM2", "GM9", "RS2", "RS3", "RS4", "CW3", "CM2", "CM1", "CM8", "MV4", "MV2", "BR6", "VT1", "BT1", "BR5", "BR3", "UR1", "BP1X", "BRTX"]
        suggestedRouteName = "Brown's Ranch Loop";
        suggestedRouteButton = "#srbrownsranchloopbtn";
        break;

    case
     "srpembertontocentral":
        suggestedMarkers = ["TTTX", "ML1", "ML3", "ML3X", "ML5", "ML7", "GN21", "RK1", "XM23", "XM24", "XM25", "XM26", "XM01", "MM1", "SN11", "SN9", "SN7", "SN5", "SN3", "SN1", "SV1", "GN10", "GN9", "GN7", "GN5", "RB3", "RB5", "RB7", "SV3", "GN9", "GN10", "GN12", "GN13", "GN15", "GN17", "GN19", "GN21", "ML7", "ML5", "ML3X", "ML3", "ML1", "TTTX"]
        suggestedRouteName = "Pemberton to Central Loop";
        suggestedRouteButton = "#srpembertontocentralbtn";
        break;

    case
     "srlostdogtoprospectorloop":
        suggestedMarkers = ["LDTX", "LD1", "LDBX", "SR19", "LD3", "LD5", "LD7", "LD9", "QT5", "QT3", "PT4X", "PT3X", "PT3", "PT5", "BP1", "BP5", "BP7", "PP5", "PP3", "PP1", "XM65", "XM68", "XF15", "XF30", "XF17", "XF34", "XF19", "XF13", "XF14", "XF06", "XF02", "XF07", "XF23", "XF25", "XF08", "AK4", "AK5", "SR13", "SR15", "SR17", "AS3", "SR19", "LDBX", "LD1", "LDTX"]
        suggestedRouteName = "Lost Dog to Prospector Loop";
        suggestedRouteButton = "#srlostdogtoprospectorloopbtn";
        break;

    case
     "srpembertonloop":
        suggestedMarkers = ["XMTS", "XM13", "XM14", "XM15", "XM16", "XM17", "XM18", "XM19", "XM20", "XM21", "XM22", "XM23", "XM24", "XM25", "XM26", "XM01", "XM02", "XM03", "XM04", "XM05", "XM06", "XM07", "XM08", "XM09", "XM10", "XM11", "XM12", "XMTS"]
        suggestedRouteName = "Pemberton Loop";
        suggestedRouteButton = "#srpembertonloopbtn";
        break;

    case
     "sraderocanyontogatewayloop":
        suggestedMarkers = ["XFAX", "XF01", "XF02", "XF07", "XF23", "XF25", "XF08", "AK4", "AK5", "SR13", "SR15", "SR17", "AS3", "SR19", "LD3", "LD5", "LD7", "LD9", "QT5", "QT3", "PT4X", "PT3X", "PT3", "PT5", "BP1", "BP5", "BP7", "PP5", "PP3", "PP1", "XM65", "XM68", "XF15", "XF30", "XF17", "XF34", "XF19", "XF13", "XF14", "XF06", "XF02", "XF01", "XFAX"]
        suggestedRouteName = "Adero Canyon to Gateway Loop";
        suggestedRouteButton = "sraderocanyontogatewayloopbtn";
        break;

  }

  // change selected button text to spinner and loading text

  // $(suggestedRouteButton).html("<span class='spinner-border spinner-border-sm-suggestedroute' role='status' aria-hidden='true'></span> Loading...");

  // document.getElementById("suggestedRouteButton").innerHTML = "<span class='spinner-border spinner-border-sm-suggestedroute' role='status' aria-hidden='true'></span> Loading...";

  function replaceThisText() {
    document.getElementById("sraderocanyontogatewayloopbtn").innerHTML = "Hi";
  }

  replaceThisText();



  // don't show the tutorials

  infoContainer1MapOverlayShown = true;
  infoContainer2MapOverlayShown = true;

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

  // fire the markers

  for (var i = 0; i < suggestedMarkers.length; i++) {
    fireMarker = "marker" + suggestedMarkers[i];
    window[fireMarker].fire('click');
  }

  // determine selected marker and segment extents and zoom in to fit

  for (var i = 0; i < markerArray.length; i++) {
    suggestedMarker = "marker" + markerArray[i];
    window[suggestedMarker].addTo(suggestedGroup);
  }

  for (var i = 0; i < segmentArray.length; i++) {
    suggestedSegment = segmentArray[i] + "polyline";
    window[suggestedSegment].addTo(suggestedGroup);
  }

  map.fitBounds(suggestedGroup.getBounds());

  // hide modal

  $('#suggestedroutesModal').modal('hide');

  // change selected button text back to View Route

  $(suggestedRouteButton).html("View Route");

  // make suggested route length and elev gain equal route length and gain

  suggestedRouteLength = routeLength;
  suggestedRouteElevGain = routeElevGain;

  // update suggested route name

  $("#suggestedroutename").text(suggestedRouteName);

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
      infoContainer2Visible = true;
    });
  });

}
