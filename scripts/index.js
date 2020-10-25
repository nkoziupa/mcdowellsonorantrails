$("#splash-button").on("click", function() {
    $(this).parents('#splashscreen').fadeOut(1000);
});

// set info container status

var infoContainer1MapOverlayShown = false;
var infoContainer2MapOverlayShown = false;
var infoContainer2Visible = false;

// cookie code

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  if (getCookie("hasTutorialBeenViewed") == "yes") {
    infoContainer1MapOverlayShown = true;
    infoContainer2MapOverlayShown = true;
  }
  else {
    infoContainer1MapOverlayShown = false;
    infoContainer2MapOverlayShown = false;
  }
  if (getCookie("hasPolicyBeenAccepted") == "yes") {
    // do something
  }
  else {
    // do something
  }
}

function tutorialViewed() {
  setCookie("hasTutorialBeenViewed", "yes", 30);
}

function policyAccepted() {
  setCookie("hasPolicyBeenAccepted", "yes", 30);
  $("#cookiebanner").fadeOut(500);
}

if (getCookie("hasPolicyBeenAccepted") != "yes") {
  $("#cookiebanner").delay(1000).fadeIn(500);
};

// variables

var myRenderer = L.canvas({ padding: 0.5 });

var routeLength = 0;
var routeElevGain = 0;
var routePlanArray = [];
var markerArray = [];
var segmentArray = [];

// set marker colors

var markerColorUnselectable = "#998b68";
var markerFillColorUnselectable = "#d6c9a5";
var markerFillOpacityUnselectable = 1.0;
var markerRadiusUnselectable = 90;
var markerWeightUnselectable = 4;

var markerColorSelectable = "#2e900f";
var markerFillColorSelectable = "#bdc993";
var markerFillOpacitySelectable = 1.0;
var markerRadiusSelectable = 90;
var markerWeightSelectable = 4;

var markerColorSelectableSelected = "#2e900f";
var markerFillColorSelectableSelected = "#ffffff";
var markerFillOpacitySelectableSelected = 1.0;
var markerRadiusSelectableSelected = 90;
var markerWeightSelectableSelected = 4;

var markerColorSelected = "#1e120b";
var markerFillColorSelected = "#ffffff";
var markerFillOpacitySelected = 1.0;
var markerRadiusSelected = 90;
var markerWeightSelected = 4;

var markerColorCurrent = "#1e120b";
var markerFillColorCurrent = "#ffbd43";
var markerFillOpacityCurrent = 1.0;
var markerRadiusCurrent = 90;
var markerWeightCurrent = 4;

var markerColorPrevious = "#2e900f";
var markerFillColorPrevious = "#ffffff";
var markerFillOpacityPrevious = 1.0;
var markerRadiusPrevious = 90;
var markerWeightPrevious = 4;

var markerColorInitial = markerColorSelectable;
var markerFillColorInitial = markerFillColorSelectable;
var markerFillOpacityInitial = markerFillOpacitySelectable;
var markerRadiusInitial = markerRadiusSelectable;
var markerWeightInitial = 1;

// set trailhead colors

var trailheadColorSelectable = "#2e900f";
var trailheadFillColorSelectable = "#2e900f";
var trailheadFillOpacitySelectable = 1.0;
var trailheadRadiusSelectable = 90;
var trailheadWeightSelectable = 4;

var trailheadColorInitial = trailheadColorSelectable;
var trailheadFillColorInitial = trailheadFillColorSelectable;
var trailheadFillOpacityInitial = trailheadFillOpacitySelectable;
var trailheadRadiusInitial = trailheadRadiusSelectable;
var trailheadWeightInitial = 1;

// set segment colors

var segmentColorSelected = "#1e120b";
var segmentOpacitySelected = 1.0;
var segmentWeightSelected = 4.0;

var segmentColorSelectable = "#77a155";
var segmentOpacitySelectable = 1.0;
var segmentWeightSelectable = 4.0;

var segmentColorSelectableSelected = "#20660a";
var segmentOpacitySelectableSelected = 1.0;
var segmentWeightSelectableSelected = 4.0;

var segmentColorUnselected = "#f3f0e4";
var segmentOpacityUnselected = 1.0;
var segmentWeightUnselected = 4.0;

var segmentColorCurrent = "#000000";
var segmentOpacityCurrent = 1.0;
var segmentWeightCurrent = 4.0;

var segmentColorInitial = segmentColorUnselected;
var segmentOpacityInitial = segmentOpacityUnselected;
var segmentWeightInitial = 1;

// set maricopa trail segment color

var segmentMTColor = "#998b68";
var segmentMTOpacity = 1.0;
var segmentMTWeightInitial = 1;

// set header plus main container height to full screen height

var mainContainerHeight = $(window).height() - 56;
$(".mainheight").css("height", mainContainerHeight);

// set map container height based on initial window width

if ($(window).width() >= 992) {
    $("#mapcontainer").css("height", mainContainerHeight);
  }
  else if ($(window).width() >= 768 && $(window).width() < 992) {
    $("#mapcontainer").css("height", mainContainerHeight - 320);
  }
  else {
    $("#mapcontainer").css("height", mainContainerHeight - 230);
  };

// if window is resized, maintain header and main container height as full screen height
// also, change map container height as needed based on new window width

$(window).resize(function() {
  var mainContainerHeightResized = $(window).height() - 56;
  $(".mainheight").css("height", mainContainerHeightResized);
  if ($(window).width() >= 992) {
    $("#mapcontainer").css("height", mainContainerHeightResized);
  }
  else if ($(window).width() >= 768 && $(window).width() < 992) {
    $("#mapcontainer").css("height", mainContainerHeightResized - 320);
  }
  else {
    $("#mapcontainer").css("height", mainContainerHeightResized - 230);
  }
});

// show/hide info containers at start

$("#infocontainer-0").addClass("display-visible");
$("#infocontainer-0").removeClass("display-invisible");
$("#infocontainer-1").addClass("display-invisible");
$("#infocontainer-1").removeClass("display-visible");
$("#infocontainer-2").addClass("display-invisible");
$("#infocontainer-2").removeClass("display-visible");

// set initial marker radii and map view

if ($(window).height() >= 900) {
    markerRadiusInitial = 110;
    trailheadRadiusInitial = 110;
    var map = L.map("mapcontainer").setView([33.702662, -111.829247], 12);

  }
  else if ($(window).height() >= 700 && $(window).height() < 900) {
    markerRadiusInitial = 100;
    trailheadRadiusInitial = 100;
    var map = L.map("mapcontainer").setView([33.702662, -111.829247], 11);
  }
  else {
    markerRadiusInitial = 90;
    trailheadRadiusInitial = 90;
    var map = L.map("mapcontainer").setView([33.702662, -111.829247], 10);
  };

// add basemap tiles

L.tileLayer('https://api.mapbox.com/styles/v1/nkoziupa/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    minZoom: 10,
    maxZoom: 17,
    id: 'cjxqb3a8c5eaf1cqqf5y44qej',
    accessToken: 'pk.eyJ1Ijoibmtveml1cGEiLCJhIjoiY2p2Mncxajc0MDFoYzQ0cDQ0dm5qdmpqeSJ9.1Krz0peP4ShVr8rYaNmQvA',
    opacity: 1.0,
    renderer: L.canvas()
}).addTo(map);

// create custom map tile panes and add transparent label tiles

map.createPane('labels-nr');
map.getPane('labels-nr').style.zIndex = 650;
map.getPane('labels-nr').style.pointerEvents = 'none';
var layerNR;
var options = {
      minZoom: 10,
      maxZoom: 17,
      opacity: 1.0,
      pane: 'labels-nr',
      tms: false
};
layerNR = L.tileLayer('../maptiles/northernregion/{z}/{x}/{y}.png', options).addTo(map);

map.createPane('labels-cr');
map.getPane('labels-cr').style.zIndex = 650;
map.getPane('labels-cr').style.pointerEvents = 'none';
var layerCR;
var options = {
      minZoom: 10,
      maxZoom: 17,
      opacity: 1.0,
      pane: 'labels-cr',
      tms: false
};
layerCR = L.tileLayer('../maptiles/centralregion/{z}/{x}/{y}.png', options).addTo(map);

map.createPane('labels-sr');
map.getPane('labels-sr').style.zIndex = 650;
map.getPane('labels-sr').style.pointerEvents = 'none';
var layerSR;
var options = {
      minZoom: 10,
      maxZoom: 17,
      opacity: 1.0,
      pane: 'labels-sr',
      tms: false
};
layerSR = L.tileLayer('../maptiles/southernregion/{z}/{x}/{y}.png', options).addTo(map);

// remove attributions

map.attributionControl.remove();

// marker list

var markerList = ["AG1", "AG3", "AG5", "AG7", "AG9", "AG11", "AG13", "AG15", "AG17", "AGWX", "AGX", "AH1", "AHX", "AMPX", "BA1", "BAX", "BH1", "BH1X", "BH2", "BH2X", "BH3", "BH3X", "BH4", "BH4X", "BHX", "BL1X", "BL2", "BMSX", "BP1X", "BP2X", "BP3X", "BP4X", "BR3", "BR5", "BR6", "BR9", "BROX", "BRTX", "BRX", "BS1", "BSTX", "BT1", "BT2", "BT4", "BT6", "BTTX", "CC1", "CL1", "CL2", "CL3", "CL5", "CL6", "CM1", "CM2", "CM4", "CM5", "CM6", "CM7", "CM8", "CN3", "CN5", "CP1", "CP3", "CRX", "CW3", "CW5", "CW7", "CW11", "DS1", "DS3", "DS5", "DS7", "DS9", "DS11", "DV1", "DV2", "DV3", "DV5", "DV7", "DV8", "DV9", "DV11", "DV13", "DV17", "DV19", "DV21", "DV23", "DX1", "DX1X", "DX2", "DX3", "DX5", "DXX", "FT2X", "FT3X", "FT4X", "FTAX", "FTX", "GE1X", "GE2X", "GE3X", "GE4X", "GM1", "GM2", "GM3", "GM4", "GM5", "GM6", "GM7", "GM8X", "GM9", "GM9X", "GM10", "GMHX", "GMTX", "GN1", "GN2", "GNX", "GT1X", "GT3X", "GT4X", "HD1", "HD3", "HD5", "HT1", "HT3", "HV6", "HV9", "HV51", "HV55", "HV56", "HV57", "HV58", "HV65", "HV73", "HV75", "HW1", "HW4", "HW10", "HW12", "HW16", "HW20", "HW26", "HW28", "HW30", "HW31", "HW33", "HW35", "HW37", "HW40", "HW41", "HW42", "HW44", "JR1X", "JR2X", "JRCX", "JRTX", "LG1", "LG2", "LG3", "LG4", "LG5", "LG7", "LG9", "LG13", "LG15", "LG17", "LG19", "LG21", "LG24", "LG29", "LGAX", "MG1", "MGX", "MO1", "MP1", "MP3", "MPX", "MT1", "MTX", "MV1", "MV2", "MV3", "MV4", "MVX", "ND1", "ND1X", "ND2X", "ND3X", "ND4X", "ND5X", "ND6X", "ND7X", "ND8X", "ND9X", "ND5", "OC1", "OC3", "OC7", "OHTX", "OP1", "OP3", "OP5", "OP7", "OP9", "OP11", "PDTX", "PR1X", "PR2X", "PR3X", "RC1", "RC4", "RC5", "RCAX", "RCRX", "RG1", "RG5", "RG7", "RG9", "RG11", "RGX", "RH3", "RH7", "RH9", "RH11", "RH13", "RH15", "RH17", "RHX", "RS2", "RS3", "RS4", "SB1", "SB3", "SBX", "SC1", "SC7", "SC17", "SC27", "SD1", "SD1X", "SD2X", "SD3X", "SD4X", "SD5X", "SD6X", "SD7X", "SD8X", "SD5", "SE3", "SP1", "SP3", "SP5", "SP7", "SP9", "SP11", "SPPX", "SPX", "STR5", "STR9", "SV1X", "SV2X", "SVBX", "SVTX", "TD1", "TD2", "TD4", "TNFX", "TP1", "TP1X", "TP2X", "TP3X", "UR1", "UR2", "UR3", "UR4", "UR5", "UR7", "UR8", "VT1", "VT3", "WB1", "WB3", "WB3X", "WB4", "WB8", "WB8X", "WE11", "WE13", "WE5", "WE7", "WE9", "WE17", "WE19", "WE21", "WE23", "YT1", "FS1", "GN10", "GN12", "GN13", "GN15", "GN17", "GN19", "GN21", "GN3", "GN5", "GN7", "GN9", "JX1", "JXX", "ML1", "ML3", "ML3X", "ML5", "ML7", "MM1", "MM3", "MSPX", "RB1", "RB3", "RB5", "RB7", "RK1", "SN1", "SN11", "SN3", "SN5", "SN7", "SN9", "SV1", "SV3", "SV5", "SV7", "TH1X", "TH3X", "TT1", "TT1X", "TT2", "TTTX", "136X", "AK4", "AK5", "AS1", "AS1X", "AS3", "ASX", "BN1X", "BN2X", "BN3X", "BN4X", "BP1", "BP5", "BP7", "BP9", "BTX", "DP11", "DP3", "DP5", "DP7", "DP9", "DPTX", "EB1", "EB3", "EE1", "EE5", "G01X", "G02X", "GAMX", "GL1", "GL2", "GL3", "GL5", "GL7", "GTX", "HC3", "HHVX", "KT1X", "KT2X", "KT3X", "KT4X", "KT5X", "KT6X", "LD1", "LD4X", "LD5X", "LDAX", "LDBX", "LDHX", "LD3", "LD5", "LD7", "LD9", "LDOX", "LDTX", "LT1", "LT3", "ML1X", "ML2X", "ML25", "MLX", "PC1", "PC3", "PFOX", "PP1", "PP3", "PP5", "PT3", "PT3X", "PT4X", "PT5", "QT1", "QT1X", "QT2X", "QT3", "QT5", "QT7", "RRSX", "RT1", "RT3", "RT5", "RTX", "SL1X", "SL2X", "SL3X", "SR1", "SR2", "SR5", "SR7", "SR10", "SR11", "SR13", "SR15", "SR17", "SR19", "SR9", "SSPX", "SSVX", "STOX", "STX", "TL1", "TL3", "TOX", "TPX", "TT17", "TT7", "TT9", "TT15", "TTV1", "TTV2", "TTV3", "TTV4", "TTX", "VVSX", "WCPX", "WM1", "WP1", "WP3", "WP5", "WP7", "WW1", "WW1X", "WW11", "WW15", "WW5", "WWTX", "XM01", "XM02", "XM03", "XM04", "XM05", "XM06", "XM07", "XM08", "XM09", "XM10", "XM11", "XM12", "XM13", "XM14", "XM15", "XM16", "XM17", "XM18", "XM19", "XM20", "XM21", "XM22", "XM23", "XM24", "XM25", "XM26", "XM27", "XM28", "XM29", "XM30", "XM31", "XM32", "XM33", "XM34", "XM35", "XM36", "XM37", "XM38", "XM39", "XM40", "XM41", "XM42", "XM43", "XM44", "XM45", "XM46", "XM47", "XM48", "XM49", "XM50", "XM51", "XM52", "XM53", "XM54", "XM55", "XM56", "XM57", "XM58", "XM59", "XM60", "XM61", "XM62", "XM63", "XM64", "XM65", "XM66", "XM67", "XM68", "XM69", "XM70", "XM71", "XM72", "XM73", "XM74", "XM75", "XM76", "XM77", "XM78", "XM79", "XM80", "XM81", "XF01", "XF02", "XF03", "XF04", "XF05", "XF06", "XF07", "XF08", "XF09", "XF10", "XF11", "XF12", "XF13", "XF14", "XF15", "XF16", "XF17", "XF18", "XF19", "XF20", "XF21", "XF22", "XF23", "XF24", "XF25", "XF26", "XF27", "XF28", "XF29", "XF30", "XF31", "XF32", "XF33", "XF34", "XF35", "XF36"];

// trailhead list (these are already in the marker list, but they are duplicated here for specific trailhead operations)

var trailheadList = ["TTTX", "BRTX", "FTX", "GMTX", "PDTX", "136X", "BTX", "GTX", "LDTX", "QT1X", "RTX", "STX", "WWTX", "XMCS", "XMFS", "XMTS", "XFAX", "XFGX"];

// segment list

var segmentList = ["AG1AG3", "AG1AGWX", "AG3AG5", "AG3STR9", "AG5AG7", "AG5RH11", "AG7AG9", "AG7STR9", "AG9AG11", "AG9RH9", "AG11AG13", "AG11RH7", "AG11STR5", "AG13RCAX", "AG15AG17", "AG15RCAX", "AG15STR5", "AG17AGX", "AG17RH3", "AGWXRH13", "AGWXWE13", "AH1AHX", "AH1DV2", "AMPXCM8", "BA1BAX", "BA1HW1", "BA1OP3", "BA1OP7", "BH1BH4", "BH1DX3", "BH1MV1", "BH2DX3", "BH2GM1", "BH2WB3", "BH3BHX", "BH3MT1", "BH4DX2", "BL2GM3", "BL2GM4", "BMSXBT4", "BP1XBRTX", "BP1XJRCX", "BP1XUR1", "BP2XBP4X", "BP2XLG1", "BP2XLG7", "BP2XJRCX", "BP3XLG7", "BP3XLGAX", "BP4XBRTX", "BP4XBTTX", "BR3UR1", "BR3BR5", "BR3CW11", "BR5CW11", "BR5UR2", "BR5BT1", "BR5VT3", "BR6VT1", "BR6CL1", "BR6MV2", "BR9WE11", "BR9RH15", "BR9RH17", "BR9WE9", "BR9MP3", "BROXHW31", "BRTXBSTX", "BSTXBTTX", "BSTXSVBX", "BRTXJRCX", "BRXRS3", "BRXRS4", "BS1OC1", "BS1OC3", "BS1WE5", "BS1HV51", "BT1VT1", "BT1BT2", "BT2UR4", "BT2VT1", "BT2BT4", "BT4BT6", "BT6UR7", "BT6UR8", "BTTXLGAX", "CC1DV5", "CC1GM6", "CC1SB1", "CL1UR8", "CL1CL2", "CL2CM7", "CL2CL3", "CL3HD1", "CL3CL5", "CL5CL6", "CL5HW26", "CL6UR8", "CL6HW28", "CM1CM8", "CM1MV3", "CM1CM2", "CM2CW3", "CM2CM4", "CM4CM5", "CM4TD1", "CM5SC1", "CM5CM6", "CM6CRX", "CM6CM7", "CM7MV4", "CM8MV4", "CN5UR4", "CP1DV3", "CP1GM5", "CP1DV5", "CP1CP3", "CP3DV3", "CP3OP1", "CP3RG1", "CW3RS4", "CW3HV9", "CW5CW7", "CW5WB1", "CW5HV9", "CW5LG5", "CW7CW11", "CW7VT3", "CW7LG4", "DV1DV2", "DV1DV3", "DV11OP9", "DV11DV13", "DV13RG11", "DV13OP11", "DV13DV17", "DV17HW10", "DV17HD5", "DV17HW12", "DV19HW12", "DV19DV21", "DV19OC7", "DV2DV3", "DV21DV23", "DV23HV51", "DV23SC7", "DV23OC7", "DV5DV7", "DV7RG5", "DV7DV8", "DV7SBX", "DV8RG5", "DV8RG7", "DV8DV9", "DV9OP7", "DV9DV11", "DX1LG4", "DX1DX1X", "DX1XWB3X", "DX1XWB4", "DX2WB4", "DX2DX3", "DX3DX5", "DX5DXX", "DX5MV1", "DX5MG1", "GM1HV6", "GM1GM2", "GM10SV2X", "GM2GM3", "GM2GM9", "GM3GM4", "GM4GM10", "GM5GM6", "GM5GM10", "GM6GM7", "GM7GM9", "GM7TD1", "GM9RS2", "GN1GN2", "HD1HW20", "HD1HD3", "HD3HW16", "HD3SC1", "HD3HD5", "HD5RG11", "HD5TD4", "HV51WE5", "HV51SC7", "HV6YT1", "HV6RS2", "HV65HW35", "HV65HW37", "HV73RC5", "HV73HV75", "HV73LG29", "HV73HW44", "HV73RH3", "HV75PDTX", "HV75LG29", "HV9WB1", "HV9YT1", "HW1HW4", "HW1MO1", "HW10HW12", "HW12HW16", "HW16OC7", "HW16HW20", "HW20MP1", "HW20OC3", "HW26HW28", "HW26MP1", "HW28HW30", "HW28RH17", "HW30UR7", "HW30HW31", "HW35HW37", "HW35RH15", "HW35RH13", "HW37HW40", "HW37RH9", "HW4OP11", "HW4HW10", "HW40RH7", "HW44RC5", "JR1XJR2X", "JR1XJRTX", "JR2XJRTX", "JRCXJRTX", "LG1LG7", "LG1LG2", "LG13UR2", "LG13LG15", "LG15UR3", "LG15LG17", "LG2LG4", "LG2LG3", "LG24LG29", "LG29PR2X", "LG4LG5", "LG5WB3", "LG7LGAX", "LG9LGAX", "LG9LG13", "MG1MGX", "MG1TP1", "MP1MP3", "MP3WE7", "MPXSC27", "MT1MV1", "MT1MTX", "MV1MVX", "MV2MV4", "MV2MV3", "MV3WB1", "ND1TD4", "ND1ND1X", "ND1ND2X", "ND1XND2X", "ND1XND3X", "ND2XND3X", "ND3XND5", "ND4XND5", "ND4XND5X", "ND4XND6X", "ND5XND6X", "ND5ND7X", "ND7XND8X", "ND7XND9X", "ND8XND9X", "ND9XSD1", "OC1OC3", "OC3OC7", "OHTXSC17", "OP1OP3", "OP3RG1", "OP3OP5", "OP5RG5", "OP5OP7", "OP7OP9", "OP9OP11", "PDTXPR2X", "RG1RG5", "RG7RGX", "RG7RG9", "RG9SB1", "RG9RG11", "RGXSBX", "RGXSB3", "RH11RH13", "RH13RH15", "RH15RH17", "RH3RHX", "RH7RH9", "RH9RH11", "RS2RS3", "RS3RS4", "SB1SB3", "SB3SBX", "SC1SD1", "SC17SC27", "SC27WE7", "SC7SC17", "SC7TNFX", "SD1SD1X", "SD1XSD2X", "SD1XSD3X", "SD2XSD3X", "SD3XSD4X", "SD4XSD5X", "SD4XSD6X", "SD5SD6X", "SD5SD7X", "SD5SD8X", "SD5XSD6X", "SD7XSD8X", "SD8XTD2", "STR5STR9", "TD1TD2", "TD2TD4", "UR1UR2", "UR2UR3", "UR3UR4", "UR4UR5", "UR5UR7", "VT1VT3", "VT3WB1", "WB3WB3X", "WB3XWB4", "WB3YT1", "WE11WE13", "WE5WE7", "WE7WE9", "WE9WE11", "BRTXSVBX", "CN3CN5", "CN3HW33", "CN3UR5", "CN5HT3", "DS1DS3", "DS1RC4", "DS1SP11", "DS3DS5", "DS3WE23", "DS5DS7", "DS5SP1", "DS7DS9", "DS7WE21", "DS9DS11", "DS9SP1", "DS11SE3", "DS11WE19", "HT1HT3", "HT1LG17", "HT1WE21", "HT3WE17", "HV65SE3", "HV65WE17", "HW31HW33", "HW33HW35", "HW35WE17", "HW40HW41", "HW41SE3", "HW41SP7", "HW41HW42", "HW42HW44", "HW42SP9", "HW44RCRX", "LG9SVTX", "LG13PR3X", "LG17LG19", "LG19LG21", "LG19PR3X", "LG21LG24", "LG21WE23", "LG24RC1", "LG24RC4", "PR2XRC1", "PR3XRC1", "RC4RC5", "RC5SPPX", "RCAXRCRX", "RCRXRH3", "RCRXRH7", "SE3SP5", "SP1SP3", "SP11SPPX", "SP3SP5", "SP3SPX", "SP5SP7", "SP5SPPX", "SP7SP9", "SP9SPPX", "SV1XSVTX", "SVBXSVTX", "WE17WE19", "WE19WE21", "WE21WE23", "HV55HV56", "HV55OC1", "HV55PR1X", "HV56PR1X", "HV57PR1X", "HV57HV58", "HV58MP3", "HV58PR1X", "BH1XBH2X", "BH1XBH4", "BH1XFTX", "BH1XWB8X", "BH2XBH3X", "BH2XMT1", "BH3BH4X", "BH3XBH4X", "BH4XFT4X", "FT2XFT3X", "FT2XWB8", "FT3XFT4X", "FT4XGNX", "FTAXFTX", "FTXWB8", "GN1GNX", "WB4WB8X", "WB8WB8X", "FTAXWB8", "BH2XFTAX", "AH1GE4X", "BH2TP3X", "BL1XBL2", "BL1XGM9X", "BL1XGT4X", "GE1XGE2X", "GE1XGT1X", "GE1XTP1", "GE1XTP1X", "GE2XGE3X", "GE2XGT1X", "GE3XGE4X", "GE3XGT3X", "GE4XGT3X", "GM1GM9X", "GM8XGM9X", "GM8XGMHX", "GM8XTP1X", "GM9XTP3X", "GMHXGMTX", "GMHXGT4X", "GMHXTP1X", "GMTXGT3X", "GMTXTP1X", "GT3XGT4X", "TP1TP2X", "TP1XTP2X", "TP2XTP3X", "FS1TT1", "FS1ML3", "FS1TT2", "GN10SV1", "GN10GN12", "GN12GN13", "GN13GN15", "GN15SN11", "GN15GN17", "GN17GN19", "GN17MM1", "GN19GN21", "GN2GN3", "GN21RK1", "GN21ML7", "GN3GN5", "GN5GN7", "GN5RB3", "GN5RB1", "GN7JX1", "GN7GN9", "GN9SV3", "GN9GN10", "JXXSN3", "ML3ML3X", "ML3XML5", "ML1ML3", "ML5ML7", "ML3XMSPX", "ML5TH3X", "MM1SN11", "MM3SN9", "RB3RB5", "RB5SV7", "RB5RB7", "RB5SV3", "RB7SV5", "RB7SV3", "SN1SV1", "SN1SN3", "SN1SN11", "SN3SN5", "SN5SN7", "SN7SN9", "SN9SN11", "ML1TTTX", "TT1TT2", "TT1TTTX", "TT1XTTTX", "ML1TH3X", "TH1XTH3X", "136XSR15", "AK4AK5", "AK5SR13", "AS1AS1X", "AS1AS3", "AS1RT1", "AS1XASX", "AS1XLD4X", "AS3SR19", "AS3SR17", "BN1XBN2X", "BN1XBN4X", "BN1XG02X", "BN2XBN3X", "BN2XBN4X", "BN3XBN4X", "BP1BP5", "BP1GL3", "BP1PT5", "BP5BP7", "BP7BP9", "BP7PP5", "BP9WP7", "BP9EE5", "BTXLT1", "DP3DP5", "DP3WP3", "DP11G01X", "DP11GTX", "DP5DPTX", "DP5DP7", "DP7HC3", "DP7DP9", "DP9GL5", "DP9DP11", "EB1G01X", "EB1EB3", "EB3WCPX", "EB3PC3", "EE1TTV4", "EE1TT7", "EE1EE5", "EE5WM1", "G01XGTX", "G02XGAMX", "G02XGL7", "G02XGTX", "GL1GL2", "GL1GL7", "GL1PC1", "GL2PT5", "GL2LT3", "GL3WP1", "GL5WP1", "GL5GL7", "GL7SL1X", "HHVXTTV1", "KT1XKT2X", "KT1XKT3X", "KT1XLD1", "KT2XKT3X", "KT4XKT5X", "KT4XKT6X", "KT4XLD1", "KT5XKT6X", "LD1LDBX", "LD1LDTX", "LD3LD5", "LD3SR19", "LD3RT5", "LD4XLD5X", "LD4XLDHX", "LD5LD7", "LD5RT3", "LD7LD9", "LD7TOX", "LD9QT5", "LD9QT7", "LDAXLDBX", "LDBXSR19", "LDHXLDTX", "LDOXRT5", "LT1PC3", "LT1LT3", "LT3PT3", "ML25MLX", "ML7ML25", "ML1XMLX", "ML1XML2X", "ML2XMLX", "PC1PC3", "PFOXTTV4", "PP1PP3", "PP3PP5", "PP3TPX", "PT3PT3X", "PT3PT5", "PT3XPT4X", "PT4XQT3", "QT1WW5", "QT1QT1X", "QT1QT3", "QT2XQT7", "QT3QT5", "QT5WW11", "RRSXTTV2", "RT1RTX", "RT1SR17", "RT3RT5", "RT3SR17", "SL1XSL2X", "SL1XSL3X", "SL2XSL3X", "SR10SR11", "SR10SSPX", "SR11SR13", "SR13SR15", "SR15SR17", "SR9SR10", "SR9SR11", "SR1STOX", "SR1SR2", "SR2STX", "SR5STX", "SR5SR7", "SR7SSVX", "SR7SR9", "STOXSTX", "TL1TT7", "TL1TL3", "TL1TT9", "TT17WP3", "TT17WP5", "TT2TTV1", "TT7TTX", "TT9TT15", "TT15TT17", "TTV1TTV2", "TTV2TTV3", "TTV3TTV4", "TTV3VVSX", "WP1WP3", "WP5WP7", "WW1WW1X", "WW1WWTX", "WW1XWW5", "WW5WW11", "WW11WW15"];

// maricopa trail segments

var segmentMTList = ["DV19DV21MT", "DV19HW12MT", "DV17HW12MT", "DV17HD5MT", "HD5TD4MT", "TD2TD4MT", "TD1TD2MT", "GM7TD1MT", "GM6GM7MT", "GM5GM6MT", "GM5GM10MT", "GM4GM10MT", "BL2GM4MT", "BL1XBL2MT", "BL1XGM9XMT", "GM9XTP3XMT", "BH2TP3XMT", "BH2DX3MT", "BH1DX3MT", "BH1BH4MT", "BH1XBH4MT", "BH1XFTXMT", "FTXWB8MT", "FT2XWB8MT", "FT2XFT3XMT", "FT3XFT4XMT", "FT4XGNXMT", "GN1GNXMT", "GN1GN2MT", "GN2GN3MT", "GN3GN5MT", "GN5GN7MT", "GN7GN9MT", "GN9GN10MT", "GN10GN12MT", "GN12GN13MT", "GN13GN15MT", "GN15GN17MT", "GN17MM1MT", "EE5WM1MT", "BP9EE5MT", "BP9WP7MT", "WP5WP7MT", "TT17WP5MT", "TT17WP3MT", "WP1WP3MT", "GL5WP1MT", "GL5GL7MT", "GL1GL7MT", "GL1GL2MT", "GL2PT5MT", "PT3PT5MT", "PT3PT3XMT", "PT3XPT4XMT", "PT4XQT3MT", "QT1QT3MT", "QT1WW5MT", "WW5WW11MT", "WW11WW15MT"];

// tech trail segments (these are already in the segment list, but they are duplicated here for specific operations)

var segmentTechList = ["DS1DS3", "DS1RC4", "DS1SP11", "DS3DS5", "DS3WE23", "DS5DS7", "DS5SP1", "DS7DS9", "DS7WE21", "DS9SP1", "DS9DS11", "DS11SE3", "DS11WE19", "HW41SE3", "HW41SP7", "HW42SP9", "SP1SP3", "SP3SP5", "SP3SPX", "SP5SP7", "SP7SP9", "SP9SPPX", "SP11SPPX", "SC1SD1", "ND1TD4", "ND1ND1X", "ND1ND2X", "ND1XND2X", "ND1XND3X", "ND2XND3X", "ND3XND5", "ND4XND5", "ND4XND5X", "ND4XND6X", "ND5XND6X", "ND5ND7X", "ND7XND8X", "ND7XND9X", "ND8XND9X", "ND9XSD1", "SD1SD1X", "SD1XSD2X", "SD1XSD3X", "SD2XSD3X", "SD3XSD4X", "SD4XSD5X", "SD4XSD6X", "SD5SD6X", "SD5SD7X", "SD5SD8X", "SD5XSD6X", "SD7XSD8X", "SD8XTD2"];

// create markers

function CreateMarker(id, name, elev, neighbors) {
  this.id = id;
  this.name = name;
  this.elev = elev;
  this.neighbors = neighbors;
}

CreateMarker.prototype.status = "selectable";
CreateMarker.prototype.color = markerColorInitial;
CreateMarker.prototype.fillColor = markerFillColorInitial;
CreateMarker.prototype.fillOpacity = markerFillOpacityInitial;
CreateMarker.prototype.radius = markerRadiusInitial;
CreateMarker.prototype.weight = markerWeightInitial;
CreateMarker.prototype.renderer = myRenderer;

// create trailheads

function CreateMarkerTrailhead(id, name, elev, neighbors) {
  this.id = id;
  this.name = name;
  this.elev = elev;
  this.neighbors = neighbors;
}

CreateMarkerTrailhead.prototype.status = "selectable";
CreateMarkerTrailhead.prototype.color = trailheadColorInitial;
CreateMarkerTrailhead.prototype.fillColor = trailheadFillColorInitial;
CreateMarkerTrailhead.prototype.fillOpacity = trailheadFillOpacityInitial;
CreateMarkerTrailhead.prototype.radius = trailheadRadiusInitial;
CreateMarkerTrailhead.prototype.weight = trailheadWeightInitial;
CreateMarkerTrailhead.prototype.renderer = myRenderer;

// use this code to reposition markers

// map.dragging.disable();

/* markerBP1X.on({
          mousedown: function () {
            map.on('mousemove', function (e) {
              markerBP1X.setLatLng(e.latlng);
            });
          }
       });
       map.on('mouseup',function(e){
         map.removeEventListener('mousemove');
         alert(e.latlng);
       }) */

// central region markers

var markerFS1 = L.circle([33.690476, -111.800189], new CreateMarker("FS1", "FS1", 2855, ["TT1", "TT2", "ML3"])).addTo(map).on("click", onMapClick);
var markerJX1 = L.circle([33.726817, -111.804326], new CreateMarker("JX1", "JX1", 2609, ["GN7"])).addTo(map).on("click", onMapClick);
var markerRB1 = L.circle([33.730699, -111.804429], new CreateMarker("RB1", "RB1", 2594, ["GN5"])).addTo(map).on("click", onMapClick);
var markerGN13 = L.circle([33.716281, -111.80446], new CreateMarker("GN13", "GN13", 2628, ["GN12", "GN15"])).addTo(map).on("click", onMapClick);
var markerGN12 = L.circle([33.71629, -111.804857], new CreateMarker("GN12", "GN12", 2628, ["GN10", "GN13"])).addTo(map).on("click", onMapClick);
var markerGN15 = L.circle([33.717017, -111.79145], new CreateMarker("GN15", "GN15", 2517, ["GN13", "GN17", "SN11"])).addTo(map).on("click", onMapClick);
var markerGN17 = L.circle([33.715182, -111.79006], new CreateMarker("GN17", "GN17", 2508, ["GN15", "MM1", "GN19"])).addTo(map).on("click", onMapClick);
var markerGN19 = L.circle([33.709235, -111.791724], new CreateMarker("GN19", "GN19", 2542, ["GN17", "GN21"])).addTo(map).on("click", onMapClick);
var markerGN21 = L.circle([33.696200, -111.791296], new CreateMarker("GN21", "GN21", 2609, ["GN19", "ML7", "RK1"])).addTo(map).on("click", onMapClick);
var markerGN3 = L.circle([33.741244, -111.804384], new CreateMarker("GN3", "GN3", 2569, ["GN2", "GN5"])).addTo(map).on("click", onMapClick);
var markerGN5 = L.circle([33.731394, -111.805993], new CreateMarker("GN5", "GN5", 2604, ["GN3", "RB1", "RB3", "GN7"])).addTo(map).on("click", onMapClick);
var markerGN7 = L.circle([33.726606, -111.805659], new CreateMarker("GN7", "GN7", 2624, ["GN5", "JX1", "GN9"])).addTo(map).on("click", onMapClick);
var markerSN1 = L.circle([33.720115, -111.804465], new CreateMarker("SN1", "SN1", 2608, ["SV1", "SN3", "SN11"])).addTo(map).on("click", onMapClick);
var markerSV1 = L.circle([33.720262, -111.804825], new CreateMarker("SV1", "SV1", 2617, ["GN10", "SN1"])).addTo(map).on("click", onMapClick);
var markerGN10 = L.circle([33.720253, -111.805876], new CreateMarker("GN10", "GN10", 2625, ["GN9", "SV1", "GN12"])).addTo(map).on("click", onMapClick);
var markerGN9 = L.circle([33.720271, -111.806273], new CreateMarker("GN9", "GN9", 2624, ["SV3", "GN7", "GN10"])).addTo(map).on("click", onMapClick);
var markerJXX = L.circle([33.726811, -111.799978], new CreateMarker("JXX", "Access Point", 2568, ["SN3"])).addTo(map).on("click", onMapClick);
var markerML3 = L.circle([33.693982, -111.796835], new CreateMarker("ML3", "ML3", 2733, ["ML3X", "FS1", "ML1"])).addTo(map).on("click", onMapClick);
var markerMSPX = L.circle([33.693888, -111.794929], new CreateMarker("MSPX", "Scenic Point", 2723, ["ML3X"])).addTo(map).on("click", onMapClick);
var markerML3X = L.circle([33.694233, -111.795290], new CreateMarker("ML3X", "Intersection", 2709, ["ML3", "ML5", "MSPX"])).addTo(map).on("click", onMapClick);
var markerML5 = L.circle([33.694536, -111.794771], new CreateMarker("ML5", "ML5", 2693, ["ML7", "ML3X", "TH3X"])).addTo(map).on("click", onMapClick);
var markerML7 = L.circle([33.694483, -111.794180], new CreateMarker("ML7", "ML7", 2681, ["GN21", "ML5", "ML25"])).addTo(map).on("click", onMapClick);
var markerMM1 = L.circle([33.716580, -111.787415], new CreateMarker("MM1", "MM1", 2508, ["SN11", "GN17", "XM01"])).addTo(map).on("click", onMapClick);
var markerMM3 = L.circle([33.725130, -111.787282], new CreateMarker("MM3", "MM3", 2474, ["SN9", "XM02", "XM36"])).addTo(map).on("click", onMapClick);
var markerRB3 = L.circle([33.731070, -111.817036], new CreateMarker("RB3", "RB3", 2682, ["GN5", "RB5"])).addTo(map).on("click", onMapClick);
var markerRB5 = L.circle([33.726130, -111.816333], new CreateMarker("RB5", "RB5", 2681, ["SV7", "RB3", "SV3", "RB7"])).addTo(map).on("click", onMapClick);
var markerSV5 = L.circle([33.721990, -111.816015], new CreateMarker("SV5", "SV5", 2693, ["RB7"])).addTo(map).on("click", onMapClick);
var markerRB7 = L.circle([33.721980, -111.815513], new CreateMarker("RB7", "RB7", 2700, ["SV5", "SV3", "RB5"])).addTo(map).on("click", onMapClick);
var markerRK1 = L.circle([33.695025, -111.787399], new CreateMarker("RK1", "RK1", 2542, ["GN21", "XM23"])).addTo(map).on("click", onMapClick);
var markerSN11 = L.circle([33.718966, -111.791734], new CreateMarker("SN11", "SN11", 2518, ["SN9", "SN1", "MM1", "GN15"])).addTo(map).on("click", onMapClick);
var markerSN3 = L.circle([33.724646, -111.798433], new CreateMarker("SN3", "SN3", 2559, ["JXX", "SN1", "SN5"])).addTo(map).on("click", onMapClick);
var markerSN7 = L.circle([33.726389, -111.795466], new CreateMarker("SN7", "SN7", 2538, ["SN5", "SN9"])).addTo(map).on("click", onMapClick);
var markerSN5 = L.circle([33.726527, -111.796159], new CreateMarker("SN5", "SN5", 2540, ["SN3", "SN7"])).addTo(map).on("click", onMapClick);
var markerSN9 = L.circle([33.724472, -111.790239], new CreateMarker("SN9", "SN9", 2494, ["SN7", "MM3", "SN11"])).addTo(map).on("click", onMapClick);
var markerSV3 = L.circle([33.720422, -111.808045], new CreateMarker("SV3", "SV3", 2641, ["RB5", "RB7", "GN9"])).addTo(map).on("click", onMapClick);
var markerSV7 = L.circle([33.726450, -111.817358], new CreateMarker("SV7", "SV7", 2683, ["RB5"])).addTo(map).on("click", onMapClick);
var markerTH3X = L.circle([33.696607, -111.799892], new CreateMarker("TH3X", "Intersection", 2739, ["TH1X", "ML1", "ML5"])).addTo(map).on("click", onMapClick);
var markerTH1X = L.circle([33.696816, -111.800602], new CreateMarker("TH1X", "Access Point", 2751, ["TH3X"])).addTo(map).on("click", onMapClick);
var markerML1 = L.circle([33.694407, -111.801052], new CreateMarker("ML1", "ML1", 2787, ["TH3X", "TTTX", "ML3"])).addTo(map).on("click", onMapClick);
var markerTT1 = L.circle([33.692924, -111.802534], new CreateMarker("TT1", "TT1", 2840, ["TTTX", "TT2", "FS1"])).addTo(map).on("click", onMapClick);
var markerTT1X = L.circle([33.697573, -111.804472], new CreateMarker("TT1X", "Access Point", 2785, ["TTTX"])).addTo(map).on("click", onMapClick);

// central region trailheads

var markerTTTX = L.circle([33.694461, -111.801725], new CreateMarkerTrailhead("TTTX", "Trailhead", 2806, ["TT1X", "ML1", "TT1"])).addTo(map).on("click", onMapClick);

// northern region markers

var markerAG1 = L.circle([33.780574, -111.865561], new CreateMarker("AG1", "AG1", 2563, ["AG3", "AGWX"])).addTo(map).on("click", onMapClick);
var markerWE13 = L.circle([33.781011, -111.864981], new CreateMarker("WE13", "WE13", 2567, ["AGWX", "WE11"])).addTo(map).on("click", onMapClick);
var markerAGWX = L.circle([33.780793, -111.865269], new CreateMarker("AGWX", "Intersection", 2565, ["AG1", "RH13", "WE13"])).addTo(map).on("click", onMapClick);
var markerAG3 = L.circle([33.779683, -111.867837], new CreateMarker("AG3", "AG3", 2549, ["AG1", "AG5", "STR9"])).addTo(map).on("click", onMapClick);
var markerAG5 = L.circle([33.777800, -111.868984], new CreateMarker("AG5", "AG5", 2535, ["AG3", "RH11", "AG7"])).addTo(map).on("click", onMapClick);
var markerSTR9 = L.circle([33.776927, -111.871505], new CreateMarker("STR9", "STR9", 2522, ["AG3", "AG7", "STR5"])).addTo(map).on("click", onMapClick);
var markerAG7 = L.circle([33.776704, -111.871215], new CreateMarker("AG7", "AG7", 2521, ["STR9", "AG5", "AG9"])).addTo(map).on("click", onMapClick);
var markerRH9 = L.circle([33.772959, -111.873039], new CreateMarker("RH9", "RH9", 2488, ["AG9", "RH11", "HW37", "RH7"])).addTo(map).on("click", onMapClick);
var markerAG9 = L.circle([33.773469, -111.873603], new CreateMarker("AG9", "AG9", 2500, ["AG7", "RH9", "AG11"])).addTo(map).on("click", onMapClick);
var markerSTR5 = L.circle([33.768293, -111.880861], new CreateMarker("STR5", "STR5", 2446, ["STR9", "AG11", "AG15"])).addTo(map).on("click", onMapClick);
var markerAG11 = L.circle([33.768387, -111.879971], new CreateMarker("AG11", "AG11", 2441, ["STR5", "AG9", "RH7", "AG13"])).addTo(map).on("click", onMapClick);
var markerAG13 = L.circle([33.764382, -111.882933], new CreateMarker("AG13", "AG13", 2423, ["AG11", "RCAX"])).addTo(map).on("click", onMapClick);
var markerAG15 = L.circle([33.760717, -111.888380], new CreateMarker("AG15", "AG15", 2379, ["AG17", "STR5", "RCAX"])).addTo(map).on("click", onMapClick);
var markerAG17 = L.circle([33.759806, -111.889087], new CreateMarker("AG17", "AG17", 2369, ["AG15", "RH3", "AGX"])).addTo(map).on("click", onMapClick);
var markerAGX = L.circle([33.758403, -111.890895], new CreateMarker("AGX", "Stepover Gate", 2355, ["AG17"])).addTo(map).on("click", onMapClick);
var markerAH1 = L.circle([33.777038, -111.787907], new CreateMarker("AH1", "AH1", 2595, ["DV2", "AHX", "GE4X"])).addTo(map).on("click", onMapClick);
var markerAHX = L.circle([33.777568, -111.786979], new CreateMarker("AHX", "Stepover Gate", 2585, ["AH1"])).addTo(map).on("click", onMapClick);
var markerAMPX = L.circle([33.779507, -111.826116], new CreateMarker("AMPX", "Scenic Point", 2855, ["CM8"])).addTo(map).on("click", onMapClick);
var markerBA1 = L.circle([33.801331, -111.787902], new CreateMarker("BA1", "BA1", 2692, ["OP3", "OP7", "HW1", "BAX"])).addTo(map).on("click", onMapClick);
var markerBAX = L.circle([33.801582, -111.786954], new CreateMarker("BAX", "Stepover Gate", 2684, ["BA1"])).addTo(map).on("click", onMapClick);
var markerBH1 = L.circle([33.754162, -111.799626], new CreateMarker("BH1", "BH1", 2593, ["DX3", "MV1", "BH4"])).addTo(map).on("click", onMapClick);
var markerBH2 = L.circle([33.765207, -111.799466], new CreateMarker("BH2", "BH2", 2651, ["WB3", "GM1", "TP3X", "DX3"])).addTo(map).on("click", onMapClick);
var markerBH2X = L.circle([33.746231, -111.794546], new CreateMarker("BH2X", "Intersection", 2548, ["FTAX", "BH1X", "MT1", "BH3X"])).addTo(map).on("click", onMapClick);
var markerBH3 = L.circle([33.742168, -111.788802], new CreateMarker("BH3", "BH3", 2496, ["BH4X", "MT1", "BHX"])).addTo(map).on("click", onMapClick);
var markerBH3X = L.circle([33.744894, -111.79403], new CreateMarker("BH3X", "Access Point", 2539, ["BH2X", "BH4X"])).addTo(map).on("click", onMapClick);
var markerBH4 = L.circle([33.752476, -111.799572], new CreateMarker("BH4", "BH4", 2596, ["DX2", "BH1", "BH1X"])).addTo(map).on("click", onMapClick);
var markerBH4X = L.circle([33.744092, -111.792916], new CreateMarker("BH4X", "Access Point", 2531, ["BH3X", "BH3", "FT4X"])).addTo(map).on("click", onMapClick);
var markerBHX = L.circle([33.741724, -111.787050], new CreateMarker("BHX", "Stepover Gate", 2482, ["BH3"])).addTo(map).on("click", onMapClick);
var markerBL1X = L.circle([33.771255, -111.790824], new CreateMarker("BL1X", "Intersection", 2597, ["GM9X", "BL2", "GT4X"])).addTo(map).on("click", onMapClick);
var markerBL2 = L.circle([33.774728, -111.796461], new CreateMarker("BL2", "BL2", 2689, ["BL1X", "GM3", "GM4"])).addTo(map).on("click", onMapClick);
var markerBMSX = L.circle([33.774995, -111.846024], new CreateMarker("BMSX", "Scenic Point", 3253, ["BT4"])).addTo(map).on("click", onMapClick);
var markerBP2X = L.circle([33.759358, -111.842121], new CreateMarker("BP2X", "Intersection", 2733, ["JRCX", "LG1", "LG7", "BP4X"])).addTo(map).on("click", onMapClick);
var markerBP3X = L.circle([33.755660, -111.843944], new CreateMarker("BP3X", "Access Point", 2723, ["LGAX", "LG7"])).addTo(map).on("click", onMapClick);
var markerBP4X = L.circle([33.759761, -111.842478], new CreateMarker("BP4X", "Intersection", 2725, ["BTTX", "BRTX", "BP2X"])).addTo(map).on("click", onMapClick);
var markerBR3 = L.circle([33.764545, -111.842648], new CreateMarker("BR3", "BR3", 2712, ["UR1", "BR5", "CW11"])).addTo(map).on("click", onMapClick);
var markerCW11 = L.circle([33.766245, -111.841398], new CreateMarker("CW11", "CW11", 2740, ["BR3", "BR5", "CW7"])).addTo(map).on("click", onMapClick);
var markerBR5 = L.circle([33.766617, -111.841628], new CreateMarker("BR5", "BR5", 2729, ["UR2", "BR3", "CW11", "VT3", "BT1"])).addTo(map).on("click", onMapClick);
var markerBR6 = L.circle([33.775474, -111.837564], new CreateMarker("BR6", "BR6", 2733, ["VT1", "CL1", "MV2"])).addTo(map).on("click", onMapClick);
var markerBR9 = L.circle([33.784447, -111.859152], new CreateMarker("BR9", "BR9", 2610, ["RH17", "RH15", "WE11", "WE9", "MP3"])).addTo(map).on("click", onMapClick);
var markerBROX = L.circle([33.783255, -111.856755], new CreateMarker("BROX", "Scenic Point", 2629, ["HW31"])).addTo(map).on("click", onMapClick);
var markerBRX = L.circle([33.776942, -111.813607], new CreateMarker("BRX", "Scenic Point", 2856, ["RS3", "RS4"])).addTo(map).on("click", onMapClick);
var markerBS1 = L.circle([33.802016, -111.846830], new CreateMarker("BS1", "BS1", 2751, ["HV51", "OC3", "OC1", "WE5"])).addTo(map).on("click", onMapClick);
var markerBT1 = L.circle([33.770060, -111.840421], new CreateMarker("BT1", "BT1", 2751, ["BR5", "BT2", "VT1"])).addTo(map).on("click", onMapClick);
var markerBT2 = L.circle([33.771752, -111.840863], new CreateMarker("BT2", "BT2", 2777, ["BT1", "UR4", "BT4", "VT1"])).addTo(map).on("click", onMapClick);
var markerBT4 = L.circle([33.775201, -111.844335], new CreateMarker("BT4", "BT4", 3076, ["BMSX", "BT6", "BT2"])).addTo(map).on("click", onMapClick);
var markerBT6 = L.circle([33.778776, -111.850720], new CreateMarker("BT6", "BT6", 2714, ["UR7", "UR8", "BT4"])).addTo(map).on("click", onMapClick);
var markerBTTX = L.circle([33.759847, -111.842848], new CreateMarker("BTTX", "Intersection", 2721, ["BSTX", "BP4X", "LGAX"])).addTo(map).on("click", onMapClick);
var markerBSTX = L.circle([33.760146, -111.84271], new CreateMarker("BSTX", "Intersection", 2723, ["BRTX", "BTTX", "SVBX"])).addTo(map).on("click", onMapClick);
var markerCC1 = L.circle([33.796312, -111.802238], new CreateMarker("CC1", "CC1", 2808, ["GM6", "SB1", "DV5"])).addTo(map).on("click", onMapClick);
var markerCL1 = L.circle([33.778971, -111.840438], new CreateMarker("CL1", "CL1", 2699, ["BR6", "UR8", "CL2"])).addTo(map).on("click", onMapClick);
var markerCL2 = L.circle([33.782803, -111.832452], new CreateMarker("CL2", "CL2", 2763, ["CL1", "CL3", "CM7"])).addTo(map).on("click", onMapClick);
var markerCL3 = L.circle([33.788110, -111.838360], new CreateMarker("CL3", "CL3", 2747, ["CL5", "HD1", "CL2"])).addTo(map).on("click", onMapClick);
var markerCL5 = L.circle([33.785939, -111.843553], new CreateMarker("CL5", "CL5", 2684, ["CL6", "HW26", "CL3"])).addTo(map).on("click", onMapClick);
var markerCL6 = L.circle([33.782687, -111.848973], new CreateMarker("CL6", "CL6", 2645, ["UR8", "HW28", "CL5"])).addTo(map).on("click", onMapClick);
var markerCM1 = L.circle([33.779247, -111.824562], new CreateMarker("CM1", "CM1", 2835, ["CM2", "CM8", "MV3"])).addTo(map).on("click", onMapClick);
var markerCM2 = L.circle([33.779481, -111.822069], new CreateMarker("CM2", "CM2", 2855, ["CW3", "CM1", "CM4"])).addTo(map).on("click", onMapClick);
var markerCM4 = L.circle([33.789348, -111.819155], new CreateMarker("CM4", "CM4", 2991, ["CM5", "TD1", "CM2"])).addTo(map).on("click", onMapClick);
var markerCM5 = L.circle([33.791036, -111.826518], new CreateMarker("CM5", "CM5", 2900, ["CM6", "SC1", "CM4"])).addTo(map).on("click", onMapClick);
var markerCRX = L.circle([33.786388, -111.829005], new CreateMarker("CRX", "Scenic Point", 2850, ["CM6"])).addTo(map).on("click", onMapClick);
var markerCM6 = L.circle([33.786317, -111.828593], new CreateMarker("CM6", "CM6", 2835, ["CM7", "CRX", "CM5"])).addTo(map).on("click", onMapClick);
var markerCM7 = L.circle([33.783443, -111.828875], new CreateMarker("CM7", "CM7", 2813, ["MV4", "CL2", "CM6"])).addTo(map).on("click", onMapClick);
var markerCM8 = L.circle([33.780081, -111.825304], new CreateMarker("CM8", "CM8", 2841, ["CM1", "MV4", "AMPX"])).addTo(map).on("click", onMapClick);
var markerCN3 = L.circle([33.773064, -111.855195], new CreateMarker("CN3", "CN3", 2683, ["HW33", "UR5", "CN5"])).addTo(map).on("click", onMapClick);
var markerCN5 = L.circle([33.767949, -111.860717], new CreateMarker("CN5", "CN5", 2599, ["CN3", "UR4", "HT3"])).addTo(map).on("click", onMapClick);
var markerCP1 = L.circle([33.787152, -111.790808], new CreateMarker("CP1", "CP1", 2652, ["GM5", "DV5", "CP3", "DV3"])).addTo(map).on("click", onMapClick);
var markerCP3 = L.circle([33.789727, -111.788639], new CreateMarker("CP3", "CP3", 2623, ["CP1", "RG1", "OP1", "DV3"])).addTo(map).on("click", onMapClick);
var markerCW3 = L.circle([33.780433, -111.817640], new CreateMarker("CW3", "CW3", 2873, ["RS4", "CM2", "HV9"])).addTo(map).on("click", onMapClick);
var markerCW5 = L.circle([33.768792, -111.824878], new CreateMarker("CW5", "CW5", 2759, ["CW7", "WB1", "HV9", "LG5"])).addTo(map).on("click", onMapClick);
var markerCW7 = L.circle([33.768963, -111.826146], new CreateMarker("CW7", "CW7", 2767, ["CW11", "VT3", "CW5", "LG4"])).addTo(map).on("click", onMapClick);
var markerDS1 = L.circle([33.758611, -111.873436], new CreateMarker("DS1", "DS1", 2474, ["RC4", "SP11", "DS3"])).addTo(map).on("click", onMapClick);
var markerDS3 = L.circle([33.760959, -111.869636], new CreateMarker("DS3", "DS3", 2505, ["DS1", "DS5", "WE23"])).addTo(map).on("click", onMapClick);
var markerSP1 = L.circle([33.764619, -111.868340], new CreateMarker("SP1", "SP1", 2546, ["SP3", "DS9", "DS5"])).addTo(map).on("click", onMapClick);
var markerDS5 = L.circle([33.764307, -111.868232], new CreateMarker("DS5", "DS5", 2549, ["DS3", "SP1", "DS7"])).addTo(map).on("click", onMapClick);
var markerDS9 = L.circle([33.764521, -111.866331], new CreateMarker("DS9", "DS9", 2561, ["SP1", "DS11", "DS7"])).addTo(map).on("click", onMapClick);
var markerDS7 = L.circle([33.764177, -111.866930], new CreateMarker("DS7", "DS7", 2559, ["DS5", "DS9", "WE21"])).addTo(map).on("click", onMapClick);
var markerDS11 = L.circle([33.768868, -111.865832], new CreateMarker("DS11", "DS11", 2542, ["SE3", "WE19", "DS9"])).addTo(map).on("click", onMapClick);
var markerDV3 = L.circle([33.785405, -111.787601], new CreateMarker("DV3", "DV3", 2616, ["DV2", "DV1", "CP1", "CP3"])).addTo(map).on("click", onMapClick);
var markerDV1 = L.circle([33.784782, -111.786954], new CreateMarker("DV1", "DV1", 2614, ["DV2", "DV3"])).addTo(map).on("click", onMapClick);
var markerDV2 = L.circle([33.784748, -111.787693], new CreateMarker("DV2", "DV2", 2620, ["DV3", "DV1", "AH1"])).addTo(map).on("click", onMapClick);
var markerDV5 = L.circle([33.794427, -111.797014], new CreateMarker("DV5", "DV5", 2724, ["CC1", "DV7", "CP1"])).addTo(map).on("click", onMapClick);
var markerDV7 = L.circle([33.798105, -111.796849], new CreateMarker("DV7", "DV7", 2734, ["SBX", "DV8", "RG5", "DV5"])).addTo(map).on("click", onMapClick);
var markerDV8 = L.circle([33.799576, -111.797241], new CreateMarker("DV8", "DV8", 2757, ["RG7", "DV9", "RG5", "DV7"])).addTo(map).on("click", onMapClick);
var markerOP7 = L.circle([33.800998, -111.797263], new CreateMarker("OP7", "OP7", 2746, ["DV9", "OP9", "BA1", "OP5"])).addTo(map).on("click", onMapClick);
var markerDV9 = L.circle([33.800538, -111.797610], new CreateMarker("DV9", "DV9", 2750, ["DV8", "DV11", "OP7"])).addTo(map).on("click", onMapClick);
var markerOP9 = L.circle([33.803418, -111.801392], new CreateMarker("OP9", "OP9", 2780, ["DV11", "OP11", "OP7"])).addTo(map).on("click", onMapClick);
var markerDV11 = L.circle([33.803141, -111.801595], new CreateMarker("DV11", "DV11", 2780, ["DV13", "OP9", "DV9"])).addTo(map).on("click", onMapClick);
var markerDV13 = L.circle([33.805412, -111.807515], new CreateMarker("DV13", "DV13", 2821, ["RG11", "DV17", "OP11", "DV11"])).addTo(map).on("click", onMapClick);
var markerDV17 = L.circle([33.810846, -111.820704], new CreateMarker("DV17", "DV17", 2948, ["HW12", "HW10", "DV13", "HD5"])).addTo(map).on("click", onMapClick);
var markerDV19 = L.circle([33.813190, -111.829421], new CreateMarker("DV19", "DV19", 2903, ["HW12", "OC7", "DV21"])).addTo(map).on("click", onMapClick);
var markerDV21 = L.circle([33.813751, -111.832764], new CreateMarker("DV21", "DV21", 2887, ["DV19", "DV23"])).addTo(map).on("click", onMapClick);
var markerDV23 = L.circle([33.810035, -111.838349], new CreateMarker("DV23", "DV23", 2826, ["DV21", "OC7", "HV51", "SC7"])).addTo(map).on("click", onMapClick);
var markerDX1 = L.circle([33.755889, -111.825968], new CreateMarker("DX1", "DX1", 2768, ["LG4", "DX1X"])).addTo(map).on("click", onMapClick);
var markerDX1X = L.circle([33.755844, -111.812830], new CreateMarker("DX1X", "Intersection", 2660, ["DX1", "WB3X", "WB4"])).addTo(map).on("click", onMapClick);
var markerDX2 = L.circle([33.755818, -111.804269], new CreateMarker("DX2", "DX2", 2629, ["WB4", "DX3", "BH4"])).addTo(map).on("click", onMapClick);
var markerDX3 = L.circle([33.755801, -111.800830], new CreateMarker("DX3", "DX3", 2605, ["DX2", "BH2", "DX5", "BH1"])).addTo(map).on("click", onMapClick);
var markerDX5 = L.circle([33.755523, -111.788204], new CreateMarker("DX5", "DX5", 2527, ["DX3", "MG1", "DXX", "MV1"])).addTo(map).on("click", onMapClick);
var markerDXX = L.circle([33.755934, -111.786980], new CreateMarker("DXX", "Stepover Gate", 2518, ["DX5"])).addTo(map).on("click", onMapClick);
var markerFT3X = L.circle([33.744772, -111.794621], new CreateMarker("FT3X", "Access Point", 2539, ["FT2X", "FT4X"])).addTo(map).on("click", onMapClick);
var markerFT2X = L.circle([33.745507, -111.795065], new CreateMarker("FT2X", "Access Point", 2544, ["WB8", "FT3X"])).addTo(map).on("click", onMapClick);
var markerGNX = L.circle([33.743349, -111.793601], new CreateMarker("GNX", "Access Point", 2522, ["FT4X", "GN1"])).addTo(map).on("click", onMapClick);
var markerFT4X = L.circle([33.743777, -111.79339], new CreateMarker("FT4X", "Access Point", 2529, ["FT3X", "BH4X", "GNX"])).addTo(map).on("click", onMapClick);
var markerFTAX = L.circle([33.746280, -111.795117], new CreateMarker("FTAX", "Intersection", 2549, ["WB8", "FTX", "BH2X"])).addTo(map).on("click", onMapClick);
var markerGT1X = L.circle([33.770105, -111.786954], new CreateMarker("GT1X", "Access Point", 2564, ["GE1X", "GE2X"])).addTo(map).on("click", onMapClick);
var markerGE1X = L.circle([33.76992, -111.787939], new CreateMarker("GE1X", "Intersection", 2571, ["TP1X", "GE2X", "GT1X", "TP1"])).addTo(map).on("click", onMapClick);
var markerGE2X = L.circle([33.770461, -111.787744], new CreateMarker("GE2X", "Intersection", 2572, ["GE3X", "GT1X", "GE1X"])).addTo(map).on("click", onMapClick);
var markerGE3X = L.circle([33.77055, -111.78812], new CreateMarker("GE3X", "Intersection", 2573, ["GT3X", "GE4X", "GE2X"])).addTo(map).on("click", onMapClick);
var markerGE4X = L.circle([33.771172, -111.788276], new CreateMarker("GE4X", "Intersection", 2578, ["GT3X", "AH1", "GE3X"])).addTo(map).on("click", onMapClick);
var markerGM1 = L.circle([33.769973, -111.798380], new CreateMarker("GM1", "GM1", 2667, ["HV6", "GM2", "GM9X", "BH2"])).addTo(map).on("click", onMapClick);
var markerGM2 = L.circle([33.772629, -111.798897], new CreateMarker("GM2", "GM2", 2715, ["GM3", "GM1", "GM9"])).addTo(map).on("click", onMapClick);
var markerGM3 = L.circle([33.773737, -111.798041], new CreateMarker("GM3", "GM3", 2732, ["GM4", "BL2", "GM2"])).addTo(map).on("click", onMapClick);
var markerGM4 = L.circle([33.781841, -111.797209], new CreateMarker("GM4", "GM4", 2745, ["GM10", "GM3", "BL2"])).addTo(map).on("click", onMapClick);
var markerGM5 = L.circle([33.786781, -111.799277], new CreateMarker("GM5", "GM5", 2759, ["GM6", "CP1", "GM10"])).addTo(map).on("click", onMapClick);
var markerGM6 = L.circle([33.789525, -111.805166], new CreateMarker("GM6", "GM6", 2825, ["GM7", "CC1", "GM5"])).addTo(map).on("click", onMapClick);
var markerGM7 = L.circle([33.788631, -111.810897], new CreateMarker("GM7", "GM7", 2899, ["TD1", "GM9", "GM6"])).addTo(map).on("click", onMapClick);
var markerRS2 = L.circle([33.775981, -111.809323], new CreateMarker("RS2", "RS2", 2803, ["GM9", "HV6", "RS3"])).addTo(map).on("click", onMapClick);
var markerGM9 = L.circle([33.776326, -111.808979], new CreateMarker("GM9", "GM9", 2814, ["GM2", "RS2", "GM7"])).addTo(map).on("click", onMapClick);
var markerGM9X = L.circle([33.770149, -111.79151], new CreateMarker("GM9X", "Intersection", 2601, ["GM1", "BL1X", "GM8X", "TP3X"])).addTo(map).on("click", onMapClick);
var markerGM8X = L.circle([33.770168, -111.791113], new CreateMarker("GM8X", "Intersection", 2598, ["GM9X", "GMHX", "TP1X"])).addTo(map).on("click", onMapClick);
var markerSV2X = L.circle([33.784263, -111.795519], new CreateMarker("SV2X", "Scenic Point", 2780, ["GM10"])).addTo(map).on("click", onMapClick);
var markerGM10 = L.circle([33.784257, -111.795914], new CreateMarker("GM10", "GM10", 2774, ["GM5", "GM4", "SV2X"])).addTo(map).on("click", onMapClick);
var markerGN1 = L.circle([33.741607, -111.796788], new CreateMarker("GN1", "GN1", 2536, ["GNX", "GN2"])).addTo(map).on("click", onMapClick);
var markerGN2 = L.circle([33.741498, -111.804127], new CreateMarker("GN2", "GN2", 2568, ["GN1", "GN3"])).addTo(map).on("click", onMapClick);
var markerGT3X = L.circle([33.7708, -111.789429], new CreateMarker("GT3X", "Intersection", 2585, ["GT4X", "GE4X", "GE3X", "GMTX"])).addTo(map).on("click", onMapClick);
var markerGT4X = L.circle([33.771041, -111.790534], new CreateMarker("GT4X", "Intersection", 2594, ["BL1X", "GT3X", "GMHX"])).addTo(map).on("click", onMapClick);
var markerGMHX = L.circle([33.7704150, -111.7901330], new CreateMarker("GMHX", "Intersection", 2591, ["GMTX", "TP1X", "GM8X", "GT4X"])).addTo(map).on("click", onMapClick);
var markerHD1 = L.circle([33.794714, -111.837863], new CreateMarker("HD1", "HD1", 2765, ["CL3", "HW20", "HD3"])).addTo(map).on("click", onMapClick);
var markerHD3 = L.circle([33.797466, -111.829352], new CreateMarker("HD3", "HD3", 2860, ["HD1", "HW16", "HD5", "SC1"])).addTo(map).on("click", onMapClick);
var markerHD5 = L.circle([33.800418, -111.820477], new CreateMarker("HD5", "HD5", 2927, ["HD3", "DV17", "RG11", "TD4"])).addTo(map).on("click", onMapClick);
var markerHT1 = L.circle([33.764919, -111.860292], new CreateMarker("HT1", "HT1", 2598, ["HT3", "LG17", "WE21"])).addTo(map).on("click", onMapClick);
var markerHT3 = L.circle([33.767395, -111.861424], new CreateMarker("HT3", "HT3", 2595, ["WE17", "CN5", "HT1"])).addTo(map).on("click", onMapClick);
var markerHV6 = L.circle([33.769958, -111.808184], new CreateMarker("HV6", "HV6", 2745, ["YT1", "RS2", "GM1"])).addTo(map).on("click", onMapClick);
var markerHV9 = L.circle([33.769932, -111.823048], new CreateMarker("HV9", "HV9", 2765, ["CW5", "WB1", "CW3", "YT1"])).addTo(map).on("click", onMapClick);
var markerHV51 = L.circle([33.809298, -111.841702], new CreateMarker("HV51", "HV51", 2811, ["SC7", "DV23", "BS1", "WE5"])).addTo(map).on("click", onMapClick);
var markerHV55 = L.circle([33.798463, -111.849092], new CreateMarker("HV55", "HV55", 2729, ["OC1", "HV56", "PR1X"])).addTo(map).on("click", onMapClick);
var markerHV56 = L.circle([33.795890, -111.850882], new CreateMarker("HV56", "HV56", 2702, ["HV55", "PR1X"])).addTo(map).on("click", onMapClick);
var markerHV57 = L.circle([33.793266, -111.853017], new CreateMarker("HV57", "HV57", 2674, ["HV58", "PR1X"])).addTo(map).on("click", onMapClick);
var markerHV58 = L.circle([33.790451, -111.855092], new CreateMarker("HV58", "HV58", 2651, ["MP3", "HV57", "PR1X"])).addTo(map).on("click", onMapClick);
var markerHV65 = L.circle([33.772094, -111.867846], new CreateMarker("HV65", "HV65", 2523, ["HW37", "HW35", "WE17", "SE3"])).addTo(map).on("click", onMapClick);
var markerHV73 = L.circle([33.750989, -111.882196], new CreateMarker("HV73", "HV73", 2389, ["RH3", "HW44", "RC5", "LG29", "HV75"])).addTo(map).on("click", onMapClick);
var markerHV75 = L.circle([33.745661, -111.885934], new CreateMarker("HV75", "HV75", 2339, ["HV73", "LG29", "PDTX"])).addTo(map).on("click", onMapClick);
var markerHW1 = L.circle([33.806739, -111.787193], new CreateMarker("HW1", "HW1", 2687, ["BA1", "HW4", "MO1"])).addTo(map).on("click", onMapClick);
var markerHW4 = L.circle([33.812815, -111.805406], new CreateMarker("HW4", "HW4", 2873, ["HW1", "OP11", "HW10"])).addTo(map).on("click", onMapClick);
var markerHW10 = L.circle([33.812070, -111.820435], new CreateMarker("HW10", "HW10", 2949, ["HW12", "HW4", "DV17"])).addTo(map).on("click", onMapClick);
var markerHW12 = L.circle([33.812496, -111.824029], new CreateMarker("HW12", "HW12", 2933, ["HW16", "DV19", "HW10", "DV17"])).addTo(map).on("click", onMapClick);
var markerHW16 = L.circle([33.806316, -111.834025], new CreateMarker("HW16", "HW16", 2835, ["HD3", "HW20", "OC7", "HW12"])).addTo(map).on("click", onMapClick);
var markerHW20 = L.circle([33.799002, -111.842907], new CreateMarker("HW20", "HW20", 2745, ["HD1", "MP1", "OC3", "HW16"])).addTo(map).on("click", onMapClick);
var markerRH17 = L.circle([33.784453, -111.856152], new CreateMarker("RH17", "RH17", 2610, ["HW28", "RH15", "BR9"])).addTo(map).on("click", onMapClick);
var markerHW28 = L.circle([33.784355, -111.855776], new CreateMarker("HW28", "HW28", 2613, ["HW26", "CL6", "HW30", "RH17"])).addTo(map).on("click", onMapClick);
var markerHW26 = L.circle([33.785096, -111.855252], new CreateMarker("HW26", "HW26", 2618, ["MP1", "CL5", "HW28"])).addTo(map).on("click", onMapClick);
var markerHW31 = L.circle([33.782650, -111.855417], new CreateMarker("HW31", "HW31", 2632, ["HW30", "BROX", "HW33"])).addTo(map).on("click", onMapClick);
var markerHW30 = L.circle([33.782500, -111.855068], new CreateMarker("HW30", "HW30", 2632, ["HW28", "UR7", "HW31"])).addTo(map).on("click", onMapClick);
var markerHW33 = L.circle([33.775188, -111.863133], new CreateMarker("HW33", "HW33", 2579, ["HW31", "HW35", "CN3"])).addTo(map).on("click", onMapClick);
var markerHW35 = L.circle([33.775781, -111.865098], new CreateMarker("HW35", "HW35", 2560, ["RH13", "RH15", "HW33", "WE17", "HV65", "HW37"])).addTo(map).on("click", onMapClick);
var markerHW37 = L.circle([33.772097, -111.870277], new CreateMarker("HW37", "HW37", 2515, ["RH9", "HW35", "HV65", "HW40"])).addTo(map).on("click", onMapClick);
var markerHW40 = L.circle([33.768189, -111.876019], new CreateMarker("HW40", "HW40", 2454, ["RH7", "HW37", "HW41"])).addTo(map).on("click", onMapClick);
var markerSP7 = L.circle([33.765951, -111.874983], new CreateMarker("SP7", "SP7", 2484, ["HW41", "SP5", "SP9"])).addTo(map).on("click", onMapClick);
var markerHW41 = L.circle([33.766196, -111.875423], new CreateMarker("HW41", "HW41", 2474, ["HW40", "SE3", "SP7", "HW42"])).addTo(map).on("click", onMapClick);
var markerHW42 = L.circle([33.764620, -111.876612], new CreateMarker("HW42", "HW42", 2445, ["HW41", "SP9", "HW44"])).addTo(map).on("click", onMapClick);
var markerHW44 = L.circle([33.758994, -111.880939], new CreateMarker("HW44", "HW44", 2415, ["RCRX", "HW42", "RC5", "HV73"])).addTo(map).on("click", onMapClick);
var markerJR1X = L.circle([33.76238, -111.839463], new CreateMarker("JR1X", "Loop Point", 2757, ["JRTX", "JR2X"])).addTo(map).on("click", onMapClick);
var markerJR2X = L.circle([33.761442, -111.839161], new CreateMarker("JR2X", "Loop Point", 2758, ["JRTX", "JR1X"])).addTo(map).on("click", onMapClick);
var markerJRTX = L.circle([33.761578, -111.840895], new CreateMarker("JRTX", "Loop Point", 2733, ["JRCX", "JR1X", "JR2X"])).addTo(map).on("click", onMapClick);
var markerJRCX = L.circle([33.761524, -111.841271], new CreateMarker("JRCX", "Intersection", 2731, ["BRTX", "JRTX", "BP1X", "BP2X"])).addTo(map).on("click", onMapClick);
var markerLG1 = L.circle([33.758820, -111.841372], new CreateMarker("LG1", "LG1", 2751, ["BP2X", "LG7", "LG2"])).addTo(map).on("click", onMapClick);
var markerLG2 = L.circle([33.757354, -111.834404], new CreateMarker("LG2", "LG2", 2833, ["LG4", "LG3", "LG1"])).addTo(map).on("click", onMapClick);
var markerLG3 = L.circle([33.755826, -111.834572], new CreateMarker("LG3", "LG3", 2815, ["LG2"])).addTo(map).on("click", onMapClick);
var markerLG4 = L.circle([33.757704, -111.826035], new CreateMarker("LG4", "LG4", 2770, ["CW7", "LG5", "DX1", "LG2"])).addTo(map).on("click", onMapClick);
var markerLG5 = L.circle([33.758122, -111.818382], new CreateMarker("LG5", "LG5", 2706, ["LG4", "CW5", "WB3"])).addTo(map).on("click", onMapClick);
var markerLG7 = L.circle([33.758197, -111.842923], new CreateMarker("LG7", "LG7", 2738, ["BP3X", "LGAX", "BP2X", "LG1"])).addTo(map).on("click", onMapClick);
var markerLG13 = L.circle([33.760950, -111.856629], new CreateMarker("LG13", "LG13", 2597, ["LG15", "UR2", "LG9", "PR3X"])).addTo(map).on("click", onMapClick);
var markerLG15 = L.circle([33.761607, -111.856785], new CreateMarker("LG15", "LG15", 2604, ["UR3", "LG13", "LG17"])).addTo(map).on("click", onMapClick);
var markerLG17 = L.circle([33.762342, -111.858722], new CreateMarker("LG17", "LG17", 2590, ["LG15", "LG19", "HT1"])).addTo(map).on("click", onMapClick);
var markerPR2X = L.circle([33.749401, -111.879056], new CreateMarker("PR2X", "Intersection", 2397, ["LG29", "RC1", "PDTX"])).addTo(map).on("click", onMapClick);
var markerPR3X = L.circle([33.757912, -111.864542], new CreateMarker("PR3X", "Intersection", 2534, ["LG13", "LG19", "RC1"])).addTo(map).on("click", onMapClick);
var markerLG19 = L.circle([33.758179, -111.864767], new CreateMarker("LG19", "LG19", 2534, ["LG17", "LG21", "PR3X"])).addTo(map).on("click", onMapClick);
var markerLG21 = L.circle([33.759338, -111.870996], new CreateMarker("LG21", "LG21", 2498, ["LG24", "WE23", "LG19"])).addTo(map).on("click", onMapClick);
var markerLG24 = L.circle([33.754789, -111.875112], new CreateMarker("LG24", "LG24", 2453, ["RC4", "LG21", "RC1", "LG29"])).addTo(map).on("click", onMapClick);
var markerLG29 = L.circle([33.749974, -111.879729], new CreateMarker("LG29", "LG29", 2397, ["HV73", "LG24", "HV75", "PR2X"])).addTo(map).on("click", onMapClick);
var markerSV1X = L.circle([33.759443, -111.844465], new CreateMarker("SV1X", "Scenic Point", 2734, ["SVTX"])).addTo(map).on("click", onMapClick);
var markerSVTX = L.circle([33.759163, -111.844067], new CreateMarker("SVTX", "Intersection", 2742, ["SVBX", "LG9", "SV1X"])).addTo(map).on("click", onMapClick);
var markerLG9 = L.circle([33.758774, -111.843784], new CreateMarker("LG9", "LG9", 2741, ["LG13", "LGAX", "SVTX"])).addTo(map).on("click", onMapClick);
var markerLGAX = L.circle([33.758179, -111.843309], new CreateMarker("LGAX", "Intersection", 2736, ["LG9", "BTTX", "LG7", "BP3X"])).addTo(map).on("click", onMapClick);
var markerMG1 = L.circle([33.762842, -111.788278], new CreateMarker("MG1", "MG1", 2561, ["TP1", "MGX", "DX5"])).addTo(map).on("click", onMapClick);
var markerMGX = L.circle([33.763088, -111.786941], new CreateMarker("MGX", "Stepover Gate", 2555, ["MG1"])).addTo(map).on("click", onMapClick);
var markerMO1 = L.circle([33.811990, -111.786936], new CreateMarker("MO1", "MO1", 2696, ["HW1"])).addTo(map).on("click", onMapClick);
var markerMP1 = L.circle([33.785861, -111.855649], new CreateMarker("MP1", "MP1", 2628, ["MP3", "HW20", "HW26"])).addTo(map).on("click", onMapClick);
var markerMP3 = L.circle([33.788399, -111.856241], new CreateMarker("MP3", "MP3", 2659, ["HV58", "MP1", "BR9", "WE7"])).addTo(map).on("click", onMapClick);
var markerMPX = L.circle([33.792023, -111.879142], new CreateMarker("MPX", "Access Point", 2546, ["SC27"])).addTo(map).on("click", onMapClick);
var markerMT1 = L.circle([33.745989, -111.788934], new CreateMarker("MT1", "MT1", 2500, ["BH2X", "MV1", "MTX", "BH3"])).addTo(map).on("click", onMapClick);
var markerMTX = L.circle([33.745741, -111.787009], new CreateMarker("MTX", "Stepover Gate", 2489, ["MT1"])).addTo(map).on("click", onMapClick);
var markerMV1 = L.circle([33.752354, -111.788211], new CreateMarker("MV1", "MV1", 2522, ["BH1", "DX5", "MVX", "MT1"])).addTo(map).on("click", onMapClick);
var markerMV2 = L.circle([33.779995, -111.829272], new CreateMarker("MV2", "MV2", 2783, ["MV4", "BR6", "MV3"])).addTo(map).on("click", onMapClick);
var markerMV3 = L.circle([33.772777, -111.825485], new CreateMarker("MV3", "MV3", 2788, ["MV2", "CM1", "WB1"])).addTo(map).on("click", onMapClick);
var markerMV4 = L.circle([33.781191, -111.828199], new CreateMarker("MV4", "MV4", 2805, ["CM7", "CM8", "MV2"])).addTo(map).on("click", onMapClick);
var markerMVX = L.circle([33.752336, -111.786957], new CreateMarker("MVX", "Stepover Gate", 2513, ["MV1"])).addTo(map).on("click", onMapClick);
var markerND1 = L.circle([33.796811, -111.822362], new CreateMarker("ND1", "ND1", 2932, ["ND2X", "ND1X", "TD4"])).addTo(map).on("click", onMapClick);
var markerND1X = L.circle([33.798184, -111.823695], new CreateMarker("ND1X", "Intersection", 2923, ["ND3X", "ND1", "ND2X"])).addTo(map).on("click", onMapClick);
var markerND2X = L.circle([33.797694, -111.823775], new CreateMarker("ND2X", "Intersection", 2932, ["ND3X", "ND1X", "ND1"])).addTo(map).on("click", onMapClick);
var markerND3X = L.circle([33.797998, -111.824342], new CreateMarker("ND3X", "Intersection", 2914, ["ND5", "ND1X", "ND2X"])).addTo(map).on("click", onMapClick);
var markerND4X = L.circle([33.797159, -111.82492], new CreateMarker("ND4X", "Intersection", 2914, ["ND6X", "ND5X", "ND5"])).addTo(map).on("click", onMapClick);
var markerND5X = L.circle([33.797586, -111.825188], new CreateMarker("ND5X", "Loop Point", 2910, ["ND6X", "ND4X"])).addTo(map).on("click", onMapClick);
var markerND6X = L.circle([33.79729, -111.825399], new CreateMarker("ND6X", "Loop Point", 2911, ["ND5X", "ND4X"])).addTo(map).on("click", onMapClick);
var markerND7X = L.circle([33.796156, -111.826114], new CreateMarker("ND7X", "Intersection", 2885, ["ND5", "ND8X", "ND9X"])).addTo(map).on("click", onMapClick);
var markerND8X = L.circle([33.795869, -111.825835], new CreateMarker("ND8X", "Loop Point", 2888, ["ND7X", "ND9X"])).addTo(map).on("click", onMapClick);
var markerND9X = L.circle([33.79588, -111.82634], new CreateMarker("ND9X", "Intersection", 2888, ["ND7X", "ND8X", "SD1"])).addTo(map).on("click", onMapClick);
var markerND5 = L.circle([33.797329, -111.824587], new CreateMarker("ND5", "ND5", 2913, ["ND7X", "ND4X", "ND3X"])).addTo(map).on("click", onMapClick);
var markerOC3 = L.circle([33.801032, -111.847037], new CreateMarker("OC3", "OC3", 2746, ["BS1", "OC7", "HW20", "OC1"])).addTo(map).on("click", onMapClick);
var markerOC1 = L.circle([33.800737, -111.847485], new CreateMarker("OC1", "OC1", 2745, ["BS1", "OC3", "HV55"])).addTo(map).on("click", onMapClick);
var markerOC7 = L.circle([33.807971, -111.836723], new CreateMarker("OC7", "OC7", 2827, ["OC3", "DV23", "DV19", "HW16"])).addTo(map).on("click", onMapClick);
var markerOHTX = L.circle([33.809961, -111.875619], new CreateMarker("OHTX", "Access Point", 2640, ["SC17"])).addTo(map).on("click", onMapClick);
var markerOP1 = L.circle([33.791276, -111.787323], new CreateMarker("OP1", "OP1", 2626, ["CP3", "OP3"])).addTo(map).on("click", onMapClick);
var markerOP3 = L.circle([33.794492, -111.790391], new CreateMarker("OP3", "OP3", 2666, ["RG1", "OP5", "BA1", "OP1"])).addTo(map).on("click", onMapClick);
var markerOP5 = L.circle([33.797710, -111.794445], new CreateMarker("OP5", "OP5", 2712, ["RG5", "OP7", "OP3"])).addTo(map).on("click", onMapClick);
var markerOP11 = L.circle([33.806065, -111.806314], new CreateMarker("OP11", "OP11", 2816, ["DV13", "HW4", "OP9"])).addTo(map).on("click", onMapClick);
var markerPR1X = L.circle([33.794261, -111.852173], new CreateMarker("PR1X", "Intersection", 2685, ["HV55", "HV56", "HV57", "HV58"])).addTo(map).on("click", onMapClick);
var markerRC1 = L.circle([33.752414, -111.874458], new CreateMarker("RC1", "RC1", 2450, ["PR2X", "LG24", "PR3X"])).addTo(map).on("click", onMapClick);
var markerRC4 = L.circle([33.757725, -111.876256], new CreateMarker("RC4", "RC4", 2443, ["RC5", "DS1", "LG24"])).addTo(map).on("click", onMapClick);
var markerRC5 = L.circle([33.758214, -111.877171], new CreateMarker("RC5", "RC5", 2441, ["HW44", "SPPX", "RC4", "HV73"])).addTo(map).on("click", onMapClick);
var markerRCRX = L.circle([33.761914, -111.883506], new CreateMarker("RCRX", "Intersection", 2390, ["RH3", "RCAX", "RH7", "HW44"])).addTo(map).on("click", onMapClick);
var markerRCAX = L.circle([33.762467, -111.883745], new CreateMarker("RCAX", "Intersection", 2398, ["AG15", "AG13", "RCRX"])).addTo(map).on("click", onMapClick);
var markerRG1 = L.circle([33.794067, -111.790377], new CreateMarker("RG1", "RG1", 2671, ["CP3", "RG5", "OP3"])).addTo(map).on("click", onMapClick);
var markerRG5 = L.circle([33.798162, -111.796086], new CreateMarker("RG5", "RG5", 2735, ["DV7", "DV8", "OP5", "RG1"])).addTo(map).on("click", onMapClick);
var markerSB3 = L.circle([33.798874, -111.801322], new CreateMarker("SB3", "SB3", 2792, ["SB1", "RGX", "SBX"])).addTo(map).on("click", onMapClick);
var markerRGX = L.circle([33.799250, -111.800963], new CreateMarker("RGX", "Intersection", 2795, ["SB3", "RG7", "SBX"])).addTo(map).on("click", onMapClick);
var markerRG7 = L.circle([33.799648, -111.801244], new CreateMarker("RG7", "RG7", 2801, ["RG9", "RGX", "DV8"])).addTo(map).on("click", onMapClick);
var markerRG9 = L.circle([33.799801, -111.803436], new CreateMarker("RG9", "RG9", 2813, ["RG11", "RG7", "SB1"])).addTo(map).on("click", onMapClick);
var markerRG11 = L.circle([33.803144, -111.808787], new CreateMarker("RG11", "RG11", 2849, ["HD5", "DV13", "RG9"])).addTo(map).on("click", onMapClick);
var markerRH3 = L.circle([33.757299, -111.888895], new CreateMarker("RH3", "RH3", 2340, ["AG17", "RCRX", "HV73", "RHX"])).addTo(map).on("click", onMapClick);
var markerRH7 = L.circle([33.768204, -111.877372], new CreateMarker("RH7", "RH7", 2447, ["AG11", "RH9", "HW40", "RCRX"])).addTo(map).on("click", onMapClick);
var markerRH11 = L.circle([33.776887, -111.869211], new CreateMarker("RH11", "RH11", 2523, ["AG5", "RH13", "RH9"])).addTo(map).on("click", onMapClick);
var markerRH13 = L.circle([33.779636, -111.865275], new CreateMarker("RH13", "RH13", 2551, ["RH15", "HW35", "RH11", "AGWX"])).addTo(map).on("click", onMapClick);
var markerRH15 = L.circle([33.782955, -111.860013], new CreateMarker("RH15", "RH15", 2586, ["BR9", "RH17", "HW35", "RH13"])).addTo(map).on("click", onMapClick);
var markerRHX = L.circle([33.755738, -111.890874], new CreateMarker("RHX", "Stepover Gate", 2329, ["RH3"])).addTo(map).on("click", onMapClick);
var markerRS3 = L.circle([33.776588, -111.813007], new CreateMarker("RS3", "RS3", 2823, ["RS2", "RS4", "BRX"])).addTo(map).on("click", onMapClick);
var markerRS4 = L.circle([33.777428, -111.813814], new CreateMarker("RS4", "RS4", 2835, ["RS3", "BRX", "CW3"])).addTo(map).on("click", onMapClick);
var markerSB1 = L.circle([33.797629, -111.804635], new CreateMarker("SB1", "SB1", 2811, ["CC1", "RG9", "SB3"])).addTo(map).on("click", onMapClick);
var markerSBX = L.circle([33.798660, -111.799479], new CreateMarker("SBX", "Intersection", 2767, ["SB3", "RGX", "DV7"])).addTo(map).on("click", onMapClick);
var markerSD1 = L.circle([33.795057, -111.825641], new CreateMarker("SD1", "SD1", 2899, ["SC1", "ND9X", "SD1X"])).addTo(map).on("click", onMapClick);
var markerSC1 = L.circle([33.794477, -111.825933], new CreateMarker("SC1", "SC1", 2891, ["CM5", "HD3", "SD1"])).addTo(map).on("click", onMapClick);
var markerSC7 = L.circle([33.812436, -111.839382], new CreateMarker("SC7", "SC7", 2845, ["TNFX", "DV23", "HV51", "SC17"])).addTo(map).on("click", onMapClick);
var markerSC17 = L.circle([33.807236, -111.859244], new CreateMarker("SC17", "SC17", 2712, ["SC7", "SC27", "OHTX"])).addTo(map).on("click", onMapClick);
var markerSC27 = L.circle([33.789652, -111.858537], new CreateMarker("SC27", "SC27", 2632, ["SC17", "WE7", "MPX"])).addTo(map).on("click", onMapClick);
var markerSD1X = L.circle([33.795109, -111.824398], new CreateMarker("SD1X", "Intersection", 2907, ["SD1", "SD2X", "SD3X"])).addTo(map).on("click", onMapClick);
var markerSD2X = L.circle([33.794578, -111.824069], new CreateMarker("SD2X", "Loop Point", 2923, ["SD1X", "SD3X"])).addTo(map).on("click", onMapClick);
var markerSD3X = L.circle([33.794508, -111.823529], new CreateMarker("SD3X", "Intersection", 2924, ["SD1X", "SD2X", "SD4X"])).addTo(map).on("click", onMapClick);
var markerSD4X = L.circle([33.79361, -111.82133], new CreateMarker("SD4X", "Intersection", 2949, ["SD3X", "SD5X", "SD6X"])).addTo(map).on("click", onMapClick);
var markerSD5X = L.circle([33.79306, -111.821198], new CreateMarker("SD5X", "Loop Point", 2960, ["SD4X", "SD6X"])).addTo(map).on("click", onMapClick);
var markerSD6X = L.circle([33.79281, -111.821968], new CreateMarker("SD6X", "Intersection", 2959, ["SD4X", "SD5X", "SD5"])).addTo(map).on("click", onMapClick);
var markerSD7X = L.circle([33.792481, -111.824053], new CreateMarker("SD7X", "Loop Point", 2932, ["SD5", "SD8X"])).addTo(map).on("click", onMapClick);
var markerSD8X = L.circle([33.791578, -111.823085], new CreateMarker("SD8X", "Intersection", 2964, ["SD7X", "SD5", "TD2"])).addTo(map).on("click", onMapClick);
var markerSD5 = L.circle([33.791977, -111.823175], new CreateMarker("SD5", "SD5", 2955, ["SD6X", "SD7X", "SD8X"])).addTo(map).on("click", onMapClick);
var markerSE3 = L.circle([33.767823, -111.870497], new CreateMarker("SE3", "SE3", 2513, ["HW41", "HV65", "DS11", "SP5"])).addTo(map).on("click", onMapClick);
var markerSP3 = L.circle([33.764399, -111.869646], new CreateMarker("SP3", "SP3", 2541, ["SP5", "SP1", "SPX"])).addTo(map).on("click", onMapClick);
var markerSP5 = L.circle([33.766116, -111.871663], new CreateMarker("SP5", "SP5", 2510, ["SP7", "SE3", "SP3", "SPPX"])).addTo(map).on("click", onMapClick);
var markerSP9 = L.circle([33.760445, -111.875989], new CreateMarker("SP9", "SP9", 2455, ["HW42", "SP7", "SPPX"])).addTo(map).on("click", onMapClick);
var markerSP11 = L.circle([33.759901, -111.875582], new CreateMarker("SP11", "SP11", 2454, ["SPPX", "DS1"])).addTo(map).on("click", onMapClick);
var markerSPPX = L.circle([33.760174, -111.875786], new CreateMarker("SPPX", "Intersection", 2454, ["SP9", "SP5", "SP11", "RC5"])).addTo(map).on("click", onMapClick);
var markerSPX = L.circle([33.763910, -111.870456], new CreateMarker("SPX", "Scenic Point", 2561, ["SP3"])).addTo(map).on("click", onMapClick);
var markerSVBX = L.circle([33.760639, -111.843658], new CreateMarker("SVBX", "Access Point", 2715, ["BRTX", "BSTX", "SVTX"])).addTo(map).on("click", onMapClick);
var markerTD1 = L.circle([33.790704, -111.817726], new CreateMarker("TD1", "TD1", 2972, ["CM4", "TD2", "GM7"])).addTo(map).on("click", onMapClick);
var markerTD2 = L.circle([33.791603, -111.817850], new CreateMarker("TD2", "TD2", 2969, ["TD4", "TD1", "SD8X"])).addTo(map).on("click", onMapClick);
var markerTD4 = L.circle([33.798604, -111.819604], new CreateMarker("TD4", "TD4", 2938, ["HD5", "TD2", "ND1"])).addTo(map).on("click", onMapClick);
var markerTNFX = L.circle([33.813864, -111.838491], new CreateMarker("TNFX", "Stepover Gate", 2866, ["SC7"])).addTo(map).on("click", onMapClick);
var markerTP1 = L.circle([33.769666, -111.788891], new CreateMarker("TP1", "TP1", 2578, ["TP2X", "GE1X", "MG1"])).addTo(map).on("click", onMapClick);
var markerTP2X = L.circle([33.769667, -111.789676], new CreateMarker("TP2X", "Intersection", 2586, ["TP3X", "TP1X", "TP1"])).addTo(map).on("click", onMapClick);
var markerTP1X = L.circle([33.770006, -111.789613], new CreateMarker("TP1X", "Access Point", 2583, ["GM8X", "GMHX", "GMTX", "GE1X", "TP2X"])).addTo(map).on("click", onMapClick);
var markerTP3X = L.circle([33.769121, -111.791877], new CreateMarker("TP3X", "Intersection", 2603, ["BH2", "GM9X", "TP2X"])).addTo(map).on("click", onMapClick);
var markerUR1 = L.circle([33.762444, -111.842416], new CreateMarker("UR1", "UR1", 2713, ["BP1X", "UR2", "BR3"])).addTo(map).on("click", onMapClick);
var markerBP1X = L.circle([33.762016, -111.842172], new CreateMarker("BP1X", "Intersection", 2716, ["UR1", "JRCX", "BRTX"])).addTo(map).on("click", onMapClick);
var markerUR2 = L.circle([33.765146, -111.845668], new CreateMarker("UR2", "UR2", 2703, ["UR1", "BR5", "UR3", "LG13"])).addTo(map).on("click", onMapClick);
var markerUR3 = L.circle([33.766843, -111.848407], new CreateMarker("UR3", "UR3", 2689, ["UR2", "LG15", "UR4"])).addTo(map).on("click", onMapClick);
var markerUR4 = L.circle([33.767639, -111.848686], new CreateMarker("UR4", "UR4", 2705, ["UR3", "UR5", "CN5", "BT2"])).addTo(map).on("click", onMapClick);
var markerUR5 = L.circle([33.773169, -111.852094], new CreateMarker("UR5", "UR5", 2659, ["UR7", "UR4", "CN3"])).addTo(map).on("click", onMapClick);
var markerUR7 = L.circle([33.779658, -111.851869], new CreateMarker("UR7", "UR7", 2677, ["UR5", "BT6", "HW30"])).addTo(map).on("click", onMapClick);
var markerUR8 = L.circle([33.781390, -111.845558], new CreateMarker("UR8", "UR8", 2666, ["BT6", "CL6", "CL1"])).addTo(map).on("click", onMapClick);
var markerVT1 = L.circle([33.773685, -111.837659], new CreateMarker("VT1", "VT1", 2749, ["BT1", "BT2", "BR6", "VT3"])).addTo(map).on("click", onMapClick);
var markerVT3 = L.circle([33.769955, -111.826044], new CreateMarker("VT3", "VT3", 2769, ["VT1", "BR5", "CW7", "WB1"])).addTo(map).on("click", onMapClick);
var markerWB1 = L.circle([33.769970, -111.825171], new CreateMarker("WB1", "WB1", 2772, ["VT3", "MV3", "HV9", "CW5"])).addTo(map).on("click", onMapClick);
var markerWB3X = L.circle([33.756585, -111.813450], new CreateMarker("WB3X", "Intersection", 2669, ["WB3", "WB4", "DX1X"])).addTo(map).on("click", onMapClick);
var markerWB3 = L.circle([33.756935, -111.813884], new CreateMarker("WB3", "WB3", 2676, ["LG5", "YT1", "BH2", "WB3X"])).addTo(map).on("click", onMapClick);
var markerWB4 = L.circle([33.755831, -111.812405], new CreateMarker("WB4", "WB4", 2657, ["DX1X", "WB3X", "DX2", "WB8X"])).addTo(map).on("click", onMapClick);
var markerWB8X = L.circle([33.746921, -111.795820], new CreateMarker("WB8X", "Intersection", 2554, ["WB4", "BH1X", "WB8"])).addTo(map).on("click", onMapClick);
var markerBH1X = L.circle([33.746922, -111.795244], new CreateMarker("BH1X", "Intersection", 2544, ["WB8X", "BH4", "BH2X", "FTX"])).addTo(map).on("click", onMapClick);
var markerWB8 = L.circle([33.746556, -111.795776], new CreateMarker("WB8", "WB8", 2552, ["WB8X", "FTX", "FTAX", "FT2X"])).addTo(map).on("click", onMapClick);
var markerWE5 = L.circle([33.799178, -111.854328], new CreateMarker("WE5", "WE5", 2695, ["HV51", "BS1", "WE7"])).addTo(map).on("click", onMapClick);
var markerWE7 = L.circle([33.789527, -111.857987], new CreateMarker("WE7", "WE7", 2631, ["SC27", "WE5", "MP3", "WE9"])).addTo(map).on("click", onMapClick);
var markerWE9 = L.circle([33.785208, -111.860864], new CreateMarker("WE9", "WE9", 2610, ["WE7", "BR9", "WE11"])).addTo(map).on("click", onMapClick);
var markerWE11 = L.circle([33.782064, -111.863610], new CreateMarker("WE11", "WE11", 2585, ["WE9", "BR9", "WE13"])).addTo(map).on("click", onMapClick);
var markerWE17 = L.circle([33.770543, -111.865363], new CreateMarker("WE17", "WE17", 2547, ["HV65", "HW35", "HT3", "WE19"])).addTo(map).on("click", onMapClick);
var markerWE19 = L.circle([33.769092, -111.865243], new CreateMarker("WE19", "WE19", 2548, ["DS11", "WE17", "WE21"])).addTo(map).on("click", onMapClick);
var markerWE21 = L.circle([33.762602, -111.865033], new CreateMarker("WE21", "WE21", 2545, ["DS7", "WE19", "HT1", "WE23"])).addTo(map).on("click", onMapClick);
var markerWE23 = L.circle([33.760123, -111.869976], new CreateMarker("WE23", "WE23", 2502, ["DS3", "WE21", "LG21"])).addTo(map).on("click", onMapClick);
var markerYT1 = L.circle([33.769937, -111.816252], new CreateMarker("YT1", "YT1", 2759, ["HV9", "HV6", "WB3"])).addTo(map).on("click", onMapClick);

// northern region trailheads

var markerBRTX = L.circle([33.761545, -111.842328], new CreateMarkerTrailhead("BRTX", "Trailhead", 2722, ["BP1X", "JRCX", "BSTX", "BP4X", "SVBX"])).addTo(map).on("click", onMapClick);
var markerFTX = L.circle([33.746574, -111.795351], new CreateMarkerTrailhead("FTX", "Trailhead", 2550, ["BH1X", "FTAX", "WB8"])).addTo(map).on("click", onMapClick);
var markerGMTX = L.circle([33.77047, -111.789601], new CreateMarkerTrailhead("GMTX", "Trailhead", 2586, ["GMHX", "GT3X", "TP1X"])).addTo(map).on("click", onMapClick);
var markerPDTX = L.circle([33.743416, -111.887740], new CreateMarkerTrailhead("PDTX", "Trailhead", 2315, ["HV75", "PR2X"])).addTo(map).on("click", onMapClick);

// southern region markers

var markerAK4 = L.circle([33.624389, -111.784624], new CreateMarker("AK4", "AK4", 2762, ["AK5", "XF08"])).addTo(map).on("click", onMapClick);
var markerAK5 = L.circle([33.621291, -111.791151], new CreateMarker("AK5", "AK5", 2940, ["SR13", "AK4"])).addTo(map).on("click", onMapClick);
var markerAS1 = L.circle([33.597739, -111.810828], new CreateMarker("AS1", "AS1", 1737, ["AS1X", "RT1", "AS3"])).addTo(map).on("click", onMapClick);
var markerAS1X = L.circle([33.597412, -111.812037], new CreateMarker("AS1X", "Intersection", 1728, ["LD4X", "ASX", "AS1"])).addTo(map).on("click", onMapClick);
var markerAS3 = L.circle([33.602366, -111.809552], new CreateMarker("AS3", "AS3", 1785, ["SR19", "SR17", "AS1"])).addTo(map).on("click", onMapClick);
var markerASX = L.circle([33.597295, -111.813267], new CreateMarker("ASX", "Access Point", 1715, ["AS1X"])).addTo(map).on("click", onMapClick);
var markerBN1X = L.circle([33.649175, -111.856935], new CreateMarker("BN1X", "Loop Point", 1730, ["G02X", "BN4X", "BN2X"])).addTo(map).on("click", onMapClick);
var markerBN2X = L.circle([33.648437, -111.857908], new CreateMarker("BN2X", "Loop Point", 1716, ["BN1X", "BN4X", "BN3X"])).addTo(map).on("click", onMapClick);
var markerBN3X = L.circle([33.647065, -111.858427], new CreateMarker("BN3X", "Loop Point", 1695, ["BN2X", "BN4X"])).addTo(map).on("click", onMapClick);
var markerBN4X = L.circle([33.648226, -111.857522], new CreateMarker("BN4X", "Loop Point", 1715, ["BN2X", "BN1X", "BN3X"])).addTo(map).on("click", onMapClick);
var markerBP1 = L.circle([33.646938, -111.836908], new CreateMarker("BP1", "BP1", 2016, ["GL3", "BP5", "PT5"])).addTo(map).on("click", onMapClick);
var markerBP5 = L.circle([33.654984, -111.813388], new CreateMarker("BP5", "BP5", 3204, ["BP7", "BP1"])).addTo(map).on("click", onMapClick);
var markerBP7 = L.circle([33.657912, -111.808155], new CreateMarker("BP7", "BP7", 2929, ["BP9", "BP5", "PP5"])).addTo(map).on("click", onMapClick);
var markerBP9 = L.circle([33.664837, -111.801458], new CreateMarker("BP9", "BP9", 2586, ["WP7", "EE5", "BP7"])).addTo(map).on("click", onMapClick);
var markerDP3 = L.circle([33.668660, -111.839496], new CreateMarker("DP3", "DP3", 2194, ["DP5", "WP3"])).addTo(map).on("click", onMapClick);
var markerDP5 = L.circle([33.664788, -111.861289], new CreateMarker("DP5", "DP5", 1833, ["DP3", "DPTX", "DP7"])).addTo(map).on("click", onMapClick);
var markerDP7 = L.circle([33.654468, -111.863033], new CreateMarker("DP7", "DP7", 1686, ["DP5", "DP9", "HC3"])).addTo(map).on("click", onMapClick);
var markerDP9 = L.circle([33.653664, -111.861875], new CreateMarker("DP9", "DP9", 1705, ["DP7", "GL5", "DP11"])).addTo(map).on("click", onMapClick);
var markerDP11 = L.circle([33.649744, -111.859102], new CreateMarker("DP11", "DP11", 1716, ["DP9", "GTX", "G01X"])).addTo(map).on("click", onMapClick);
var markerDPTX = L.circle([33.671838, -111.868450], new CreateMarker("DPTX", "Access Point", 1866, ["DP5"])).addTo(map).on("click", onMapClick);
var markerEB1 = L.circle([33.647729, -111.859272], new CreateMarker("EB1", "EB1", 1699, ["G01X", "EB3"])).addTo(map).on("click", onMapClick);
var markerEB3 = L.circle([33.646332, -111.858597], new CreateMarker("EB3", "EB3", 1689, ["EB1", "WCPX", "PC3"])).addTo(map).on("click", onMapClick);
var markerEE1 = L.circle([33.679146, -111.803971], new CreateMarker("EE1", "EE1", 3607, ["TTV4", "TT7", "EE5"])).addTo(map).on("click", onMapClick);
var markerEE5 = L.circle([33.664859, -111.800119], new CreateMarker("EE5", "EE5", 2573, ["BP9", "EE1", "WM1"])).addTo(map).on("click", onMapClick);
var markerG01X = L.circle([33.649449, -111.858887], new CreateMarker("G01X", "Access Point", 1716, ["DP11", "GTX", "EB1"])).addTo(map).on("click", onMapClick);
var markerGAMX = L.circle([33.649842, -111.856720], new CreateMarker("GAMX", "Scenic Point", 1737, ["G02X"])).addTo(map).on("click", onMapClick);
var markerG02X = L.circle([33.649525, -111.856820], new CreateMarker("G02X", "Intersection", 1734, ["GAMX", "GL7", "BN1X", "GTX"])).addTo(map).on("click", onMapClick);
var markerPC1 = L.circle([33.647306, -111.851734], new CreateMarker("PC1", "PC1", 1753, ["GL1", "PC3"])).addTo(map).on("click", onMapClick);
var markerGL1 = L.circle([33.647648, -111.851511], new CreateMarker("GL1", "GL1", 1762, ["PC1", "GL7", "GL2"])).addTo(map).on("click", onMapClick);
var markerGL2 = L.circle([33.645056, -111.848036], new CreateMarker("GL2", "GL2", 1841, ["GL1", "PT5", "LT3"])).addTo(map).on("click", onMapClick);
var markerGL3 = L.circle([33.654409, -111.835222], new CreateMarker("GL3", "GL3", 2375, ["WP1", "BP1"])).addTo(map).on("click", onMapClick);
var markerGL5 = L.circle([33.651872, -111.851530], new CreateMarker("GL5", "GL5", 1811, ["WP1", "GL7", "DP9"])).addTo(map).on("click", onMapClick);
var markerHC3 = L.circle([33.654548, -111.864528], new CreateMarker("HC3", "HC3", 1695, ["DP7"])).addTo(map).on("click", onMapClick);
var markerHHVX = L.circle([33.688326, -111.804996], new CreateMarker("HHVX", "Scenic Point", 3103, ["TTV1"])).addTo(map).on("click", onMapClick);
var markerTT2 = L.circle([33.689226, -111.805365], new CreateMarker("TT2", "TT2", 2967, ["TT1", "FS1", "TTV1"])).addTo(map).on("click", onMapClick);
var markerKT2X = L.circle([33.600944, -111.810296], new CreateMarker("KT2X", "Loop Point", 1763, ["KT1X", "KT3X"])).addTo(map).on("click", onMapClick);
var markerKT3X = L.circle([33.600211, -111.810548], new CreateMarker("KT3X", "Loop Point", 1754, ["KT1X", "KT2X"])).addTo(map).on("click", onMapClick);
var markerKT1X = L.circle([33.600608, -111.810597], new CreateMarker("KT1X", "Loop Point", 1756, ["LD1", "KT2X", "KT3X"])).addTo(map).on("click", onMapClick);
var markerKT5X = L.circle([33.599739, -111.811190], new CreateMarker("KT5X", "Loop Point", 1747, ["KT4X", "KT6X"])).addTo(map).on("click", onMapClick);
var markerKT6X = L.circle([33.599305, -111.811606], new CreateMarker("KT6X", "Loop Point", 1743, ["KT4X", "KT5X"])).addTo(map).on("click", onMapClick);
var markerKT4X = L.circle([33.600160, -111.811458], new CreateMarker("KT4X", "Loop Point", 1756, ["LD1", "KT5X", "KT6X"])).addTo(map).on("click", onMapClick);
var markerLD4X = L.circle([33.598332, -111.813094], new CreateMarker("LD4X", "Intersection", 1721, ["LD5X", "LDHX", "AS1X"])).addTo(map).on("click", onMapClick);
var markerLD5X = L.circle([33.598005, -111.813285], new CreateMarker("LD5X", "Access Point", 1717, ["LD4X"])).addTo(map).on("click", onMapClick);
var markerLDAX = L.circle([33.601180, -111.811262], new CreateMarker("LDAX", "Scenic Point", 1768, ["LDBX"])).addTo(map).on("click", onMapClick);
var markerLDBX = L.circle([33.600850, -111.811251], new CreateMarker("LDBX", "Intersection", 1761, ["LD1", "LDAX", "SR19"])).addTo(map).on("click", onMapClick);
var markerLDHX = L.circle([33.599590, -111.813215], new CreateMarker("LDHX", "Access Point", 1735, ["LDTX", "LD4X"])).addTo(map).on("click", onMapClick);
var markerLD1 = L.circle([33.600519, -111.811241], new CreateMarker("LD1", "LD1", 1753, ["LDTX", "LDBX", "KT1X", "KT4X"])).addTo(map).on("click", onMapClick);
var markerLD3 = L.circle([33.605331, -111.813833], new CreateMarker("LD3", "LD3", 1834, ["LD5", "RT5", "SR19"])).addTo(map).on("click", onMapClick);
var markerLD5 = L.circle([33.616657, -111.819951], new CreateMarker("LD5", "LD5", 2021, ["LD7", "RT3", "LD3"])).addTo(map).on("click", onMapClick);
var markerTOX = L.circle([33.617912, -111.827368], new CreateMarker("TOX", "Scenic Point", 2092, ["LD7"])).addTo(map).on("click", onMapClick);
var markerLD7 = L.circle([33.618305, -111.826748], new CreateMarker("LD7", "LD7", 2093, ["LD9", "TOX", "LD5"])).addTo(map).on("click", onMapClick);
var markerLD9 = L.circle([33.622697, -111.827630], new CreateMarker("LD9", "LD9", 1970, ["QT5", "QT7", "LD7"])).addTo(map).on("click", onMapClick);
var markerLDOX = L.circle([33.608829, -111.808784], new CreateMarker("LDOX", "Scenic Point", 1988, ["RT5"])).addTo(map).on("click", onMapClick);
var markerLT1 = L.circle([33.643343, -111.856663], new CreateMarker("LT1", "LT1", 1704, ["PC3", "LT3", "BTX"])).addTo(map).on("click", onMapClick);
var markerLT3 = L.circle([33.643478, -111.849097], new CreateMarker("LT3", "LT3", 1800, ["GL2", "PT3", "LT1"])).addTo(map).on("click", onMapClick);
var markerML1X = L.circle([33.682019, -111.789353], new CreateMarker("ML1X", "Loop Point", 2711, ["MLX", "ML2X"])).addTo(map).on("click", onMapClick);
var markerML2X = L.circle([33.681559, -111.78774], new CreateMarker("ML2X", "Loop Point", 2650, ["MLX", "ML1X"])).addTo(map).on("click", onMapClick);
var markerML25 = L.circle([33.684391, -111.787525], new CreateMarker("ML25", "ML25", 2543, ["ML7", "MLX", "XM21"])).addTo(map).on("click", onMapClick);
var markerMLX = L.circle([33.682991, -111.788827], new CreateMarker("MLX", "Loop Point", 2671, ["ML25", "ML1X", "ML2X"])).addTo(map).on("click", onMapClick);
var markerPC3 = L.circle([33.647241, -111.856708], new CreateMarker("PC3", "PC3", 1711, ["EB3", "PC1", "LT1"])).addTo(map).on("click", onMapClick);
var markerPFOX = L.circle([33.681021, -111.804161], new CreateMarker("PFOX", "Scenic Point", 3681, ["TTV4"])).addTo(map).on("click", onMapClick);
var markerPP1 = L.circle([33.653401, -111.787363], new CreateMarker("PP1", "PP1", 2293, ["PP3", "XM64", "XM65"])).addTo(map).on("click", onMapClick);
var markerPP3 = L.circle([33.653105, -111.792384], new CreateMarker("PP3", "PP3", 2407, ["PP5", "PP1", "TPX"])).addTo(map).on("click", onMapClick);
var markerPP5 = L.circle([33.655017, -111.802755], new CreateMarker("PP5", "PP5", 2679, ["BP7", "PP3"])).addTo(map).on("click", onMapClick);
var markerPT3 = L.circle([33.643619, -111.839408], new CreateMarker("PT3", "PT3", 1931, ["PT5", "PT3X", "LT3"])).addTo(map).on("click", onMapClick);
var markerPT3X = L.circle([33.631668, -111.844380], new CreateMarker("PT3X", "Access Point", 1692, ["PT3", "PT4X"])).addTo(map).on("click", onMapClick);
var markerPT4X = L.circle([33.631489, -111.844994], new CreateMarker("PT4X", "Access Point", 1694, ["PT3X", "QT3"])).addTo(map).on("click", onMapClick);
var markerPT5 = L.circle([33.646171, -111.840286], new CreateMarker("PT5", "PT5", 1973, ["GL2", "BP1", "PT3"])).addTo(map).on("click", onMapClick);
var markerQT1 = L.circle([33.625333, -111.856660], new CreateMarker("QT1", "QT1", 1566, ["QT1X", "QT3", "WW5"])).addTo(map).on("click", onMapClick);
var markerQT2X = L.circle([33.633600, -111.806787], new CreateMarker("QT2X", "End of Trail", 2627, ["QT7"])).addTo(map).on("click", onMapClick);
var markerQT3 = L.circle([33.629349, -111.844551], new CreateMarker("QT3", "QT3", 1650, ["PT4X", "QT5", "QT1"])).addTo(map).on("click", onMapClick);
var markerQT5 = L.circle([33.623254, -111.828732], new CreateMarker("QT5", "QT5", 1970, ["WW11", "QT3", "LD9"])).addTo(map).on("click", onMapClick);
var markerQT7 = L.circle([33.631651, -111.820384], new CreateMarker("QT7", "QT7", 2202, ["LD9", "QT2X", "LD9"])).addTo(map).on("click", onMapClick);
var markerRRSX = L.circle([33.686554, -111.804339], new CreateMarker("RRSX", "Scenic Point", 3318, ["TTV2"])).addTo(map).on("click", onMapClick);
var markerRT1 = L.circle([33.598590, -111.804877], new CreateMarker("RT1", "RT1", 1720, ["SR17", "RTX", "AS1"])).addTo(map).on("click", onMapClick);
var markerRT3 = L.circle([33.610619, -111.807988], new CreateMarker("RT3", "RT3", 1954, ["LD5", "RT5", "SR17"])).addTo(map).on("click", onMapClick);
var markerRT5 = L.circle([33.609142, -111.808934], new CreateMarker("RT5", "RT5", 1988, ["LDOX", "RT3", "LD3"])).addTo(map).on("click", onMapClick);
var markerSL3X = L.circle([33.649107, -111.850603], new CreateMarker("SL3X", "Loop Point", 1812, ["SL2X", "SL1X"])).addTo(map).on("click", onMapClick);
var markerSL2X = L.circle([33.649884, -111.850170], new CreateMarker("SL2X", "Loop Point", 1844, ["SL1X", "SL3X"])).addTo(map).on("click", onMapClick);
var markerSL1X = L.circle([33.649274, -111.851324], new CreateMarker("SL1X", "Loop Point", 1802, ["GL7", "SL2X", "SL3X"])).addTo(map).on("click", onMapClick);
var markerSR2 = L.circle([33.593378, -111.767312], new CreateMarker("SR2", "SR2", 1866, ["SR1", "STX"])).addTo(map).on("click", onMapClick);
var markerSR1 = L.circle([33.593584, -111.767660], new CreateMarker("SR1", "SR1", 1875, ["STOX", "SR2"])).addTo(map).on("click", onMapClick);
var markerSR5 = L.circle([33.596408, -111.768626], new CreateMarker("SR5", "SR5", 1940, ["SR7", "STX"])).addTo(map).on("click", onMapClick);
var markerSSVX = L.circle([33.604835, -111.777906], new CreateMarker("SSVX", "Scenic Point", 2460, ["SR7"])).addTo(map).on("click", onMapClick);
var markerSR7 = L.circle([33.605148, -111.778046], new CreateMarker("SR7", "SR7", 2474, ["SR9", "SR5", "SSVX"])).addTo(map).on("click", onMapClick);
var markerGL7 = L.circle([33.649308, -111.852108], new CreateMarker("GL7", "GL7", 1790, ["GL5", "SL1X", "GL1", "G02X"])).addTo(map).on("click", onMapClick);
var markerSSPX = L.circle([33.609963, -111.781852], new CreateMarker("SSPX", "Scenic Point", 3069, ["SR10"])).addTo(map).on("click", onMapClick);
var markerSR10 = L.circle([33.610445, -111.782059], new CreateMarker("SR10", "SR10", 3008, ["SR11", "SR9", "SSPX"])).addTo(map).on("click", onMapClick);
var markerSR11 = L.circle([33.611692, -111.783040], new CreateMarker("SR11", "SR11", 2841, ["SR13", "SR10", "SR9"])).addTo(map).on("click", onMapClick);
var markerSR13 = L.circle([33.613721, -111.784124], new CreateMarker("SR13", "SR13", 2785, ["SR15", "AK5", "SR11"])).addTo(map).on("click", onMapClick);
var markerSR15 = L.circle([33.611948, -111.790956], new CreateMarker("SR15", "SR15", 2575, ["SR17", "SR13", "136X"])).addTo(map).on("click", onMapClick);
var markerSR17 = L.circle([33.606933, -111.805752], new CreateMarker("SR17", "SR17", 1925, ["RT3", "SR15", "RT1", "AS3"])).addTo(map).on("click", onMapClick);
var markerSR19 = L.circle([33.602600, -111.810481], new CreateMarker("SR19", "SR19", 1770, ["LD3", "AS3", "LDBX"])).addTo(map).on("click", onMapClick);
var markerSR9 = L.circle([33.610380, -111.780219], new CreateMarker("SR9", "SR9", 2858, ["SR11", "SR10", "SR7"])).addTo(map).on("click", onMapClick);
var markerSTOX = L.circle([33.593504, -111.768046], new CreateMarker("STOX", "Alt. Parking", 1880, ["STX", "SR1"])).addTo(map).on("click", onMapClick);
var markerTL1 = L.circle([33.678136, -111.809372], new CreateMarker("TL1", "TL1", 3752, ["TT7", "TL3", "TT9"])).addTo(map).on("click", onMapClick);
var markerTL3 = L.circle([33.673090, -111.812114], new CreateMarker("TL3", "TL3", 3858, ["TL1"])).addTo(map).on("click", onMapClick);
var markerTPX = L.circle([33.644337, -111.812368], new CreateMarker("TPX", "Scenic Point", 3969, ["PP3"])).addTo(map).on("click", onMapClick);
var markerTT17 = L.circle([33.666996, -111.829632], new CreateMarker("TT17", "TT17", 2562, ["TT15", "WP3", "WP5"])).addTo(map).on("click", onMapClick);
var markerTT7 = L.circle([33.679552, -111.808839], new CreateMarker("TT7", "TT7", 3741, ["EE1", "TTX", "TL1"])).addTo(map).on("click", onMapClick);
var markerTT9 = L.circle([33.677587, -111.815980], new CreateMarker("TT9", "TT9", 3496, ["TL1", "TT15"])).addTo(map).on("click", onMapClick);
var markerTT15 = L.circle([33.671391, -111.828500], new CreateMarker("TT15", "TT15", 2438, ["TT9", "TT17"])).addTo(map).on("click", onMapClick);
var markerTTV1 = L.circle([33.687998, -111.804961], new CreateMarker("TTV1", "TTV1", 3120, ["TT2", "TTV2", "HHVX"])).addTo(map).on("click", onMapClick);
var markerTTV2 = L.circle([33.686291, -111.804025], new CreateMarker("TTV2", "TTV2", 3341, ["TTV1", "TTV3", "RRSX"])).addTo(map).on("click", onMapClick);
var markerVVSX = L.circle([33.683362, -111.804342], new CreateMarker("VVSX", "Scenic Point", 3619, ["TTV3"])).addTo(map).on("click", onMapClick);
var markerTTV3 = L.circle([33.683196, -111.803916], new CreateMarker("TTV3", "TTV3", 3677, ["TTV2", "TTV4", "VVSX"])).addTo(map).on("click", onMapClick);
var markerTTV4 = L.circle([33.681001, -111.803693], new CreateMarker("TTV4", "TTV4", 3684, ["TTV3", "EE1", "PFOX"])).addTo(map).on("click", onMapClick);
var markerTTX = L.circle([33.681656, -111.811214], new CreateMarker("TTX", "Scenic Point", 3840, ["TT7"])).addTo(map).on("click", onMapClick);
var markerWCPX = L.circle([33.641985, -111.861395], new CreateMarker("WCPX", "Alt. Parking", 1645, ["EB3"])).addTo(map).on("click", onMapClick);
var markerWM1 = L.circle([33.662502, -111.787476], new CreateMarker("WM1", "WM1", 2485, ["EE5", "XM69"])).addTo(map).on("click", onMapClick);
var markerWP1 = L.circle([33.659134, -111.839423], new CreateMarker("WP1", "WP1", 2178, ["WP3", "GL3", "GL5"])).addTo(map).on("click", onMapClick);
var markerWP3 = L.circle([33.666059, -111.834944], new CreateMarker("WP3", "WP3", 2293, ["TT17", "WP1", "DP3"])).addTo(map).on("click", onMapClick);
var markerWP5 = L.circle([33.667931, -111.827829], new CreateMarker("WP5", "WP5", 2714, ["TT17", "WP7"])).addTo(map).on("click", onMapClick);
var markerWP7 = L.circle([33.667869, -111.814559], new CreateMarker("WP7", "WP7", 3031, ["WP5", "BP9"])).addTo(map).on("click", onMapClick);
var markerWW1 = L.circle([33.630119, -111.869872], new CreateMarker("WW1", "WW1", 1526, ["WWTX", "WW1X"])).addTo(map).on("click", onMapClick);
var markerWW1X = L.circle([33.626384, -111.868660], new CreateMarker("WW1X", "Intersection", 1516, ["WW1", "WW5"])).addTo(map).on("click", onMapClick);
var markerWW11 = L.circle([33.611268, -111.855390], new CreateMarker("WW11", "WW11", 1540, ["WW5", "QT5", "WW15"])).addTo(map).on("click", onMapClick);
var markerWW15 = L.circle([33.597555, -111.843103], new CreateMarker("WW15", "WW15", 1474, ["WW11"])).addTo(map).on("click", onMapClick);
var markerWW5 = L.circle([33.620438, -111.864400], new CreateMarker("WW5", "WW5", 1516, ["WW1X", "QT1", "WW11"])).addTo(map).on("click", onMapClick);

// southern region trailheads and overflow parking

var marker136X = L.circle([33.594952, -111.786379], new CreateMarkerTrailhead("136X", "Trailhead", 1773, ["SR15"])).addTo(map).on("click", onMapClick);
var markerBTX = L.circle([33.640531, -111.856722], new CreateMarkerTrailhead("BTX", "Trailhead", 1694, ["LT1"])).addTo(map).on("click", onMapClick);
var markerGTX = L.circle([33.649484, -111.858415], new CreateMarkerTrailhead("GTX", "Trailhead", 1721, ["DP11", "G02X", "G01X"])).addTo(map).on("click", onMapClick);
var markerLDTX = L.circle([33.600439, -111.811906], new CreateMarkerTrailhead("LDTX", "Trailhead", 1755, ["LD1", "LDHX"])).addTo(map).on("click", onMapClick);
var markerQT1X = L.circle([33.627011, -111.857127], new CreateMarkerTrailhead("QT1X", "Trailhead", 1586, ["QT1"])).addTo(map).on("click", onMapClick);
var markerRTX = L.circle([33.598084, -111.804753], new CreateMarkerTrailhead("RTX", "Trailhead", 1708, ["RT1"])).addTo(map).on("click", onMapClick);
var markerSTX = L.circle([33.596212, -111.768089], new CreateMarkerTrailhead("STX", "Trailhead", 1933, ["SR5", "SR2", "STOX"])).addTo(map).on("click", onMapClick);
var markerWWTX = L.circle([33.630502, -111.870109], new CreateMarkerTrailhead("WWTX", "Trailhead", 1529, ["WW1"])).addTo(map).on("click", onMapClick);

// mcdowell mountain park markers

var markerXM01 = L.circle([33.71676, -111.786777], new CreateMarker("XM01", "Intersection", 2477, ["MM1", "XM02", "XM26"])).addTo(map).on("click", onMapClick);
var markerXM02 = L.circle([33.716963, -111.786667], new CreateMarker("XM02", "Intersection", 2479, ["XM01", "MM3", "XM03"])).addTo(map).on("click", onMapClick);
var markerXM03 = L.circle([33.718468, -111.758137], new CreateMarker("XM03", "Intersection", 2267, ["XM02", "XM04", "XM28"])).addTo(map).on("click", onMapClick);
var markerXM04 = L.circle([33.718366, -111.755815], new CreateMarker("XM04", "Intersection", 2247, ["XM03", "XM36", "XM05"])).addTo(map).on("click", onMapClick);
var markerXM05 = L.circle([33.718534, -111.737949], new CreateMarker("XM05", "Intersection", 2097, ["XM04", "XM38", "XM06"])).addTo(map).on("click", onMapClick);
var markerXM06 = L.circle([33.713502, -111.722842], new CreateMarker("XM06", "Intersection", 1954, ["XM05", "XM40", "XM07"])).addTo(map).on("click", onMapClick);
var markerXM07 = L.circle([33.712573, -111.7211], new CreateMarker("XM07", "Intersection", 1939, ["XM06", "XM42", "XM08"])).addTo(map).on("click", onMapClick);
var markerXM08 = L.circle([33.711984, -111.720593], new CreateMarker("XM08", "Intersection", 1935, ["XM07", "XM45", "XM09"])).addTo(map).on("click", onMapClick);
var markerXM09 = L.circle([33.706518, -111.717555], new CreateMarker("XM09", "Intersection", 1902, ["XM08", "XM53", "XM10"])).addTo(map).on("click", onMapClick);
var markerXM10 = L.circle([33.700954, -111.718648], new CreateMarker("XM10", "Intersection", 1901, ["XM09", "XM57", "XM11"])).addTo(map).on("click", onMapClick);
var markerXM11 = L.circle([33.692096, -111.718086], new CreateMarker("XM11", "Intersection", 1874, ["XM10", "XM57", "XM12"])).addTo(map).on("click", onMapClick);
var markerXM12 = L.circle([33.690878, -111.718416], new CreateMarker("XM12", "Access Point", 1872, ["XM11", "XMTS", "XM13"])).addTo(map).on("click", onMapClick);
var markerXM13 = L.circle([33.690264, -111.718502], new CreateMarker("XM13", "Access Point", 1872, ["XM14", "XM12", "XMTS"])).addTo(map).on("click", onMapClick);
var markerXM14 = L.circle([33.6899, -111.719125], new CreateMarker("XM14", "Intersection", 1877, ["XM15", "XM31", "XM13"])).addTo(map).on("click", onMapClick);
var markerXM15 = L.circle([33.688659, -111.721008], new CreateMarker("XM15", "Intersection", 1886, ["XM16", "XM14", "XM59"])).addTo(map).on("click", onMapClick);
var markerXM16 = L.circle([33.683491, -111.725035], new CreateMarker("XM16", "Intersection", 1897, ["XM17", "XM32", "XM15"])).addTo(map).on("click", onMapClick);
var markerXM17 = L.circle([33.681062, -111.726933], new CreateMarker("XM17", "Intersection", 1867, ["XM18", "XM33", "XM16"])).addTo(map).on("click", onMapClick);
var markerXM18 = L.circle([33.678221, -111.728969], new CreateMarker("XM18", "Intersection", 1864, ["XM19", "XM22", "XM17"])).addTo(map).on("click", onMapClick);
var markerXM19 = L.circle([33.668295, -111.75516], new CreateMarker("XM19", "Intersection", 2123, ["XM64", "XM20", "XM18"])).addTo(map).on("click", onMapClick);
var markerXM20 = L.circle([33.673448, -111.766339], new CreateMarker("XM20", "Intersection", 2187, ["XM69", "XM21", "XM19"])).addTo(map).on("click", onMapClick);
var markerXM21 = L.circle([33.681708, -111.770795], new CreateMarker("XM21", "Intersection", 2280, ["ML25", "XM22", "XM20"])).addTo(map).on("click", onMapClick);
var markerXM22 = L.circle([33.685305, -111.770561], new CreateMarker("XM22", "Intersection", 2304, ["XM21", "XM23", "XM18"])).addTo(map).on("click", onMapClick);
var markerXM23 = L.circle([33.694124, -111.778492], new CreateMarker("XM23", "Intersection", 2431, ["RK1", "XM24", "XM22"])).addTo(map).on("click", onMapClick);
var markerXM24 = L.circle([33.696787, -111.776264], new CreateMarker("XM24", "Intersection", 2391, ["XM23", "XM25", "XM34"])).addTo(map).on("click", onMapClick);
var markerXM25 = L.circle([33.711667, -111.781379], new CreateMarker("XM25", "Intersection", 2433, ["XM26", "XM35", "XM24"])).addTo(map).on("click", onMapClick);
var markerXM26 = L.circle([33.716498, -111.786635], new CreateMarker("XM26", "Intersection", 2473, ["XM01", "XM27", "XM25"])).addTo(map).on("click", onMapClick);
var markerXM27 = L.circle([33.703136, -111.751089], new CreateMarker("XM27", "Intersection", 2172, ["XM35", "XM26", "XM28"])).addTo(map).on("click", onMapClick);
var markerXM28 = L.circle([33.702572, -111.749646], new CreateMarker("XM28", "Intersection", 2156, ["XM27", "XM03", "XM29"])).addTo(map).on("click", onMapClick);
var markerXM29 = L.circle([33.698599, -111.743355], new CreateMarker("XM29", "Intersection", 2101, ["XM28", "XM30", "XM32"])).addTo(map).on("click", onMapClick);
var markerXM30 = L.circle([33.694208, -111.730947], new CreateMarker("XM30", "Access Point", 1984, ["XM29", "XM31"])).addTo(map).on("click", onMapClick);
var markerXM31 = L.circle([33.693172, -111.729025], new CreateMarker("XM31", "Access Point", 1966, ["XM30", "XM14"])).addTo(map).on("click", onMapClick);
var markerXM32 = L.circle([33.694504, -111.742576], new CreateMarker("XM32", "Intersection", 2083, ["XM33", "XM29", "XM16"])).addTo(map).on("click", onMapClick);
var markerXM33 = L.circle([33.695521, -111.744553], new CreateMarker("XM33", "Intersection", 2067, ["XM34", "XM35", "XM32", "XM17"])).addTo(map).on("click", onMapClick);
var markerXM34 = L.circle([33.696369, -111.757496], new CreateMarker("XM34", "Intersection", 2214, ["XM24", "XM35", "XM33"])).addTo(map).on("click", onMapClick);
var markerXM35 = L.circle([33.70258, -111.751495], new CreateMarker("XM35", "Intersection", 2166, ["XM34", "XM25", "XM27", "XM33"])).addTo(map).on("click", onMapClick);
var markerXM36 = L.circle([33.723797, -111.75732], new CreateMarker("XM36", "Intersection", 2267, ["MM3", "XM37", "XM38", "XM04"])).addTo(map).on("click", onMapClick);
var markerXM37 = L.circle([33.726924, -111.756625], new CreateMarker("XM37", "Stepover Gate", 2262, ["XM36"])).addTo(map).on("click", onMapClick);
var markerXM38 = L.circle([33.720327, -111.737062], new CreateMarker("XM38", "Intersection", 2094, ["XM36", "XM39", "XM40", "XM05"])).addTo(map).on("click", onMapClick);
var markerXM39 = L.circle([33.726978, -111.739156], new CreateMarker("XM39", "Stepover Gate", 2126, ["XM38"])).addTo(map).on("click", onMapClick);
var markerXM40 = L.circle([33.715506, -111.722358], new CreateMarker("XM40", "Intersection", 1956, ["XM38", "XM41", "XM42", "XM06"])).addTo(map).on("click", onMapClick);
var markerXM41 = L.circle([33.727035, -111.71755], new CreateMarker("XM41", "Stepover Gate", 1938, ["XM40"])).addTo(map).on("click", onMapClick);
var markerXM42 = L.circle([33.714936, -111.720303], new CreateMarker("XM42", "Intersection", 1936, ["XM40", "XM43", "XM45", "XM07"])).addTo(map).on("click", onMapClick);
var markerXM43 = L.circle([33.723796, -111.696873], new CreateMarker("XM43", "Intersection", 1748, ["XM42", "XM44", "XM47"])).addTo(map).on("click", onMapClick);
var markerXM44 = L.circle([33.727118, -111.683583], new CreateMarker("XM44", "Stepover Gate", 1663, ["XM43"])).addTo(map).on("click", onMapClick);
var markerXM45 = L.circle([33.713647, -111.716679], new CreateMarker("XM45", "Intersection", 1901, ["XM08", "XM42", "XM46"])).addTo(map).on("click", onMapClick);
var markerXM46 = L.circle([33.715444, -111.713922], new CreateMarker("XM46", "Intersection", 1882, ["XM45", "XM47", "XM48"])).addTo(map).on("click", onMapClick);
var markerXM47 = L.circle([33.721445, -111.699612], new CreateMarker("XM47", "Intersection", 1775, ["XM46", "XM43", "XM48"])).addTo(map).on("click", onMapClick);
var markerXM48 = L.circle([33.719014, -111.697693], new CreateMarker("XM48", "Intersection", 1754, ["XM46", "XM47", "XM49"])).addTo(map).on("click", onMapClick);
var markerXM49 = L.circle([33.719171, -111.696389], new CreateMarker("XM49", "Access Point", 1745, ["XM48"])).addTo(map).on("click", onMapClick);
var markerXM50 = L.circle([33.710279, -111.705347], new CreateMarker("XM50", "Access Point", 1803, ["XM51"])).addTo(map).on("click", onMapClick);
var markerXM51 = L.circle([33.709812, -111.708067], new CreateMarker("XM51", "End of Trail", 1820, ["XM50"])).addTo(map).on("click", onMapClick);
var markerXM52 = L.circle([33.709546, -111.701851], new CreateMarker("XM52", "Access Point", 1776, ["XM53"])).addTo(map).on("click", onMapClick);
var markerXM53 = L.circle([33.709035, -111.701857], new CreateMarker("XM53", "Intersection", 1773, ["XM09", "XM52", "XM58", "XM54"])).addTo(map).on("click", onMapClick);
var markerXM54 = L.circle([33.708321, -111.701445], new CreateMarker("XM54", "Intersection", 1764, ["XM53", "XM55", "XM56"])).addTo(map).on("click", onMapClick);
var markerXM55 = L.circle([33.706253, -111.698088], new CreateMarker("XM55", "Loop Point", 1863, ["XM56", "XM54"])).addTo(map).on("click", onMapClick);
var markerXM56 = L.circle([33.705455, -111.7015], new CreateMarker("XM56", "Loop Point", 2014, ["XM54", "XM55"])).addTo(map).on("click", onMapClick);
var markerXM57 = L.circle([33.682124, -111.705157], new CreateMarker("XM57", "Intersection", 1743, ["XM11", "XM10", "XM58"])).addTo(map).on("click", onMapClick);
var markerXM58 = L.circle([33.675303, -111.699622], new CreateMarker("XM58", "Intersection", 1686, ["XM59", "XM57", "XM53"])).addTo(map).on("click", onMapClick);
var markerXM59 = L.circle([33.672975, -111.702127], new CreateMarker("XM59", "Access Point", 1695, ["XM15", "XM58", "XMFS"])).addTo(map).on("click", onMapClick);
var markerXM60 = L.circle([33.689913, -111.717609], new CreateMarker("XM60", "Access Point", 1870, ["XMTS", "XM61"])).addTo(map).on("click", onMapClick);
var markerXM61 = L.circle([33.689285, -111.714876], new CreateMarker("XM61", "Intersection", 1933, ["XM60", "XM62", "XM63"])).addTo(map).on("click", onMapClick);
var markerXM62 = L.circle([33.689051, -111.714224], new CreateMarker("XM62", "Loop Point", 1930, ["XM61", "XM63"])).addTo(map).on("click", onMapClick);
var markerXM63 = L.circle([33.688996, -111.714606], new CreateMarker("XM63", "Loop Point", 1932, ["XM61", "XM62"])).addTo(map).on("click", onMapClick);
var markerXM64 = L.circle([33.655065, -111.775319], new CreateMarker("XM64", "Intersection", 2323, ["PP1", "XM69", "XM19"])).addTo(map).on("click", onMapClick);
var markerXM65 = L.circle([33.644246, -111.775298], new CreateMarker("XM65", "Intersection", 2171, ["XM68", "PP1", "XM66"])).addTo(map).on("click", onMapClick);
var markerXM66 = L.circle([33.639652, -111.768385], new CreateMarker("XM66", "Access Point", 2106, ["XM65", "XM67"])).addTo(map).on("click", onMapClick);
var markerXM67 = L.circle([33.635877, -111.768485], new CreateMarker("XM67", "Access Point", 2142, ["XM66", "XFGX"])).addTo(map).on("click", onMapClick);
var markerXM68 = L.circle([33.640088, -111.786312], new CreateMarker("XM68", "Intersection", 2502, ["XF16", "XM65", "XF15"])).addTo(map).on("click", onMapClick);
var markerXM69 = L.circle([33.662148, -111.784781], new CreateMarker("XM69", "Intersection", 2437, ["WM1", "XM20", "XM64"])).addTo(map).on("click", onMapClick);
var markerXM70 = L.circle([33.669187, -111.702063], new CreateMarker("XM70", "Start", 1678, ["XM77", "XM71", "XMCS"])).addTo(map).on("click", onMapClick);
var markerXM71 = L.circle([33.668686, -111.712487], new CreateMarker("XM71", "Intersection", 1749, ["XM72", "XM70", "XM73"])).addTo(map).on("click", onMapClick);
var markerXM72 = L.circle([33.668217, -111.71342], new CreateMarker("XM72", "Intersection", 1753, ["XM76", "XM71", "XM78"])).addTo(map).on("click", onMapClick);
var markerXM73 = L.circle([33.666245, -111.703235], new CreateMarker("XM73", "Intersection", 1623, ["XM71", "XM76", "XM74"])).addTo(map).on("click", onMapClick);
var markerXM74 = L.circle([33.66623, -111.702549], new CreateMarker("XM74", "Intersection", 1624, ["XM73", "XM75", "XM78"])).addTo(map).on("click", onMapClick);
var markerXM75 = L.circle([33.667992, -111.701406], new CreateMarker("XM75", "Finish", 1664, ["XM74", "XM77", "XMCS"])).addTo(map).on("click", onMapClick);
var markerXM76 = L.circle([33.668264, -111.703395], new CreateMarker("XM76", "Intersection", 1661, ["XM72", "XM77", "XM73"])).addTo(map).on("click", onMapClick);
var markerXM77 = L.circle([33.668831, -111.702145], new CreateMarker("XM77", "Start", 1675, ["XM76", "XM70", "XMCS", "XM75"])).addTo(map).on("click", onMapClick);
var markerXM78 = L.circle([33.661244, -111.704382], new CreateMarker("XM78", "Intersection", 1655, ["XM72", "XM74", "XM80"])).addTo(map).on("click", onMapClick);
var markerXM79 = L.circle([33.667087, -111.699121], new CreateMarker("XM79", "Start", 1647, ["XMCS", "XM81", "XM80"])).addTo(map).on("click", onMapClick);
var markerXM80 = L.circle([33.660962, -111.704076], new CreateMarker("XM80", "Intersection", 1659, ["XM78", "XM79", "XM81"])).addTo(map).on("click", onMapClick);
var markerXM81 = L.circle([33.667277, -111.698956], new CreateMarker("XM81", "Finish", 1649, ["XM79", "XMCS", "XM80"])).addTo(map).on("click", onMapClick);

// mcdowell mountain park trailheads

var markerXMCS = L.circle([33.667963, -111.700476], new CreateMarkerTrailhead("XMCS", "Trailhead", 1662, ["XM75", "XM77", "XM70", "XM81", "XM79"])).addTo(map).on("click", onMapClick);
var markerXMFS = L.circle([33.672499, -111.701885], new CreateMarkerTrailhead("XMFS", "Trailhead", 1689, ["XM59"])).addTo(map).on("click", onMapClick);
var markerXMTS = L.circle([33.690353, -111.717885], new CreateMarkerTrailhead("XMTS", "Trailhead", 1870, ["XM13", "XM12", "XM60"])).addTo(map).on("click", onMapClick);

// fountain hills mcdowell mountain preserve markers

var markerXF01 = L.circle([33.621368, -111.776442], new CreateMarker("XF01", "Intersection", 2477, ["XFAX", "XF02", "XF03"])).addTo(map).on("click", onMapClick);
var markerXF02 = L.circle([33.621534, -111.776364], new CreateMarker("XF02", "Intersection", 2487, ["XF01", "XF20", "XF06"])).addTo(map).on("click", onMapClick);
var markerXF03 = L.circle([33.621006, -111.774359], new CreateMarker("XF03", "Intersection", 2507, ["XF01", "XF04", "XF05"])).addTo(map).on("click", onMapClick);
var markerXF04 = L.circle([33.621038, -111.772823], new CreateMarker("XF04", "End of Trail", 2511, ["XF03"])).addTo(map).on("click", onMapClick);
var markerXF05 = L.circle([33.618613, -111.771459], new CreateMarker("XF05", "End of Trail", 2512, ["XF03"])).addTo(map).on("click", onMapClick);
var markerXF06 = L.circle([33.622515, -111.777168], new CreateMarker("XF06", "Intersection", 2556, ["XF02", "XF07", "XF14"])).addTo(map).on("click", onMapClick);
var markerXF07 = L.circle([33.622581, -111.77804], new CreateMarker("XF07", "Intersection", 2628, ["XF21", "XF23", "XF06"])).addTo(map).on("click", onMapClick);
var markerXF08 = L.circle([33.622967, -111.778603], new CreateMarker("XF08", "Intersection", 2666, ["AK4", "XF09", "XF25"])).addTo(map).on("click", onMapClick);
var markerXF09 = L.circle([33.624045, -111.780465], new CreateMarker("XF09", "Intersection", 2863, ["XF10", "XF11", "XF08"])).addTo(map).on("click", onMapClick);
var markerXF10 = L.circle([33.623819, -111.780498], new CreateMarker("XF10", "Scenic Point", 2836, ["XF09"])).addTo(map).on("click", onMapClick);
var markerXF11 = L.circle([33.625412, -111.780844], new CreateMarker("XF11", "Intersection", 3037, ["XF09", "XF13", "XF12"])).addTo(map).on("click", onMapClick);
var markerXF12 = L.circle([33.625178, -111.78019], new CreateMarker("XF12", "Scenic Point", 3036, ["XF11"])).addTo(map).on("click", onMapClick);
var markerXF13 = L.circle([33.628826, -111.778312], new CreateMarker("XF13", "Intersection", 2540, ["XF11", "XF19", "XF14"])).addTo(map).on("click", onMapClick);
var markerXF14 = L.circle([33.625833, -111.774384], new CreateMarker("XF14", "Intersection", 2519, ["XF06", "XF13"])).addTo(map).on("click", onMapClick);
var markerXF15 = L.circle([33.637442, -111.785731], new CreateMarker("XF15", "Intersection", 2614, ["XF16", "XM68", "XF30"])).addTo(map).on("click", onMapClick);
var markerXF16 = L.circle([33.636392, -111.7875], new CreateMarker("XF16", "Intersection", 2734, ["XM68", "XF15", "XF31"])).addTo(map).on("click", onMapClick);
var markerXF17 = L.circle([33.63456, -111.782076], new CreateMarker("XF17", "Intersection", 2474, ["XF18", "XF30", "XF32"])).addTo(map).on("click", onMapClick);
var markerXF18 = L.circle([33.63405, -111.782644], new CreateMarker("XF18", "Intersection", 2513, ["XF29", "XF26", "XF17"])).addTo(map).on("click", onMapClick);
var markerXF19 = L.circle([33.629652, -111.778399], new CreateMarker("XF19", "Intersection", 2522, ["XF13", "XF29", "XF34"])).addTo(map).on("click", onMapClick);
var markerXF20 = L.circle([33.62159, -111.778455], new CreateMarker("XF20", "Intersection", 2537, ["XF22", "XF21", "XF02"])).addTo(map).on("click", onMapClick);
var markerXF21 = L.circle([33.622172, -111.778397], new CreateMarker("XF21", "Intersection", 2597, ["XF20", "XF22", "XF07"])).addTo(map).on("click", onMapClick);
var markerXF22 = L.circle([33.622045, -111.779526], new CreateMarker("XF22", "Loop Point", 2592, ["XF21", "XF20"])).addTo(map).on("click", onMapClick);
var markerXF23 = L.circle([33.622772, -111.778293], new CreateMarker("XF23", "Intersection", 2645, ["XF24", "XF25", "XF07"])).addTo(map).on("click", onMapClick);
var markerXF24 = L.circle([33.622627, -111.778532], new CreateMarker("XF24", "Loop Point", 2641, ["XF25", "XF23"])).addTo(map).on("click", onMapClick);
var markerXF25 = L.circle([33.622859, -111.778469], new CreateMarker("XF25", "Intersection", 2655, ["XF24", "XF08", "XF23"])).addTo(map).on("click", onMapClick);
var markerXF26 = L.circle([33.6342, -111.782809], new CreateMarker("XF26", "Intersection", 2520, ["XF27", "XF28", "XF18"])).addTo(map).on("click", onMapClick);
var markerXF27 = L.circle([33.633903, -111.783741], new CreateMarker("XF27", "Intersection", 2593, ["XF31", "XF28", "XF26"])).addTo(map).on("click", onMapClick);
var markerXF28 = L.circle([33.634096, -111.783348], new CreateMarker("XF28", "Loop Point", 2560, ["XF27", "XF26"])).addTo(map).on("click", onMapClick);
var markerXF29 = L.circle([33.631403, -111.782565], new CreateMarker("XF29", "Intersection", 2638, ["XF36", "XF18", "XF19"])).addTo(map).on("click", onMapClick);
var markerXF30 = L.circle([33.635294, -111.781874], new CreateMarker("XF30", "Intersection", 2517, ["XF17", "XF31", "XF15"])).addTo(map).on("click", onMapClick);
var markerXF31 = L.circle([33.634606, -111.784923], new CreateMarker("XF31", "Intersection", 2704, ["XF16", "XF30", "XF27"])).addTo(map).on("click", onMapClick);
var markerXF32 = L.circle([33.632867, -111.779122], new CreateMarker("XF32", "Intersection", 2436, ["XF33", "XF17", "XF34"])).addTo(map).on("click", onMapClick);
var markerXF33 = L.circle([33.632608, -111.779348], new CreateMarker("XF33", "Scenic Point", 2454, ["XF32"])).addTo(map).on("click", onMapClick);
var markerXF34 = L.circle([33.631565, -111.7795], new CreateMarker("XF34", "Intersection", 2474, ["XF35", "XF32", "XF19"])).addTo(map).on("click", onMapClick);
var markerXF35 = L.circle([33.631451, -111.779233], new CreateMarker("XF35", "Scenic Point", 2457, ["XF34"])).addTo(map).on("click", onMapClick);
var markerXF36 = L.circle([33.631171, -111.782641], new CreateMarker("XF36", "Scenic Point", 2654, ["XF29"])).addTo(map).on("click", onMapClick);

// fountain hills mcdowell mountain preserve trailheads

var markerXFAX = L.circle([33.621149, -111.776984], new CreateMarkerTrailhead("XFAX", "Trailhead", 2459, ["XF01"])).addTo(map).on("click", onMapClick);
var markerXFGX = L.circle([33.635563, -111.768477], new CreateMarkerTrailhead("XFGX", "Trailhead", 2137, ["XM67"])).addTo(map).on("click", onMapClick);

var mapZoomLevel;
map.on("zoomend", function () {
  mapZoomLevel = map.getZoom();
  switch (mapZoomLevel) {
    case 10:

      // change marker styles
      for (var i = 0; i < markerList.length; i++) {
      markerListElement = "marker" + markerList[i];
      window[markerListElement].setRadius(90);
      window[markerListElement].setStyle({weight: 1});
      }

      // change trailhead marker styles
      for (var i = 0; i < trailheadList.length; i++) {
      trailheadListElement = "marker" + trailheadList[i];
      window[trailheadListElement].setRadius(94);
      window[trailheadListElement].setStyle({weight: 1});
      }

      // change segment styles
      for (var i = 0; i < segmentList.length; i++) {
      segmentListElement = "segment" + segmentList[i] + "polyline";
      window[segmentListElement].setStyle({weight: 1});
      }

      // change maricopa trail segment styles
      for (var i = 0; i < segmentMTList.length; i++) {
      segmentMTListElement = "segment" + segmentMTList[i] + "polyline";
      window[segmentMTListElement].setStyle({weight: 0, dashArray: '1,1'});
      }

      // change tech trail segment styles
      for (var i = 0; i < segmentTechList.length; i++) {
      segmentTechListElement = "segment" + segmentTechList[i] + "polyline";
      window[segmentTechListElement].setStyle({dashArray: '1,1'});
      }

      break;

    case 11:

      // change marker styles
      for (var i = 0; i < markerList.length; i++) {
      markerListElement = "marker" + markerList[i];
      window[markerListElement].setRadius(100);
      window[markerListElement].setStyle({weight: 1});
      }

      // change trailhead marker styles
      for (var i = 0; i < trailheadList.length; i++) {
      trailheadListElement = "marker" + trailheadList[i];
      window[trailheadListElement].setRadius(104);
      window[trailheadListElement].setStyle({weight: 1});
      }

      // change segment styles
      for (var i = 0; i < segmentList.length; i++) {
      segmentListElement = "segment" + segmentList[i] + "polyline";
      window[segmentListElement].setStyle({weight: 1});
      }

      // change maricopa trail segment styles
      for (var i = 0; i < segmentMTList.length; i++) {
      segmentMTListElement = "segment" + segmentMTList[i] + "polyline";
      window[segmentMTListElement].setStyle({weight: 0, dashArray: '1,1'});
      }

      // change tech trail segment styles
      for (var i = 0; i < segmentTechList.length; i++) {
      segmentTechListElement = "segment" + segmentTechList[i] + "polyline";
      window[segmentTechListElement].setStyle({dashArray: '1,1'});
      }

      break;

    case 12:

      // change marker styles
      for (var i = 0; i < markerList.length; i++) {
      markerListElement = "marker" + markerList[i];
      window[markerListElement].setRadius(110);
      window[markerListElement].setStyle({weight: 1});
      }

      // change trailhead marker styles
      for (var i = 0; i < trailheadList.length; i++) {
      trailheadListElement = "marker" + trailheadList[i];
      window[trailheadListElement].setRadius(104);
      window[trailheadListElement].setStyle({weight: 1});
      }

      // change segment styles
      for (var i = 0; i < segmentList.length; i++) {
      segmentListElement = "segment" + segmentList[i] + "polyline";
      window[segmentListElement].setStyle({weight: 1});
      }

      // change maricopa trail segment styles
      for (var i = 0; i < segmentMTList.length; i++) {
      segmentMTListElement = "segment" + segmentMTList[i] + "polyline";
      window[segmentMTListElement].setStyle({weight: 0, dashArray: '1,1'});
      }

      // change tech trail segment styles
      for (var i = 0; i < segmentTechList.length; i++) {
      segmentTechListElement = "segment" + segmentTechList[i] + "polyline";
      window[segmentTechListElement].setStyle({dashArray: '1,1'});
      }

      break;

    case 13:

      // change marker styles
      for (var i = 0; i < markerList.length; i++) {
      markerListElement = "marker" + markerList[i];
      window[markerListElement].setRadius(60);
      window[markerListElement].setStyle({weight: 1});
      }

      // change trailhead marker styles
      for (var i = 0; i < trailheadList.length; i++) {
      trailheadListElement = "marker" + trailheadList[i];
      window[trailheadListElement].setRadius(64);
      window[trailheadListElement].setStyle({weight: 1});
      }

      // change segment styles
      for (var i = 0; i < segmentList.length; i++) {
      segmentListElement = "segment" + segmentList[i] + "polyline";
      window[segmentListElement].setStyle({weight: 1});
      }

      // change maricopa trail segment styles
      for (var i = 0; i < segmentMTList.length; i++) {
      segmentMTListElement = "segment" + segmentMTList[i] + "polyline";
      window[segmentMTListElement].setStyle({weight: 0, dashArray: '1,1'});
      }

      // change tech trail segment styles
      for (var i = 0; i < segmentTechList.length; i++) {
      segmentTechListElement = "segment" + segmentTechList[i] + "polyline";
      window[segmentTechListElement].setStyle({dashArray: '1,1'});
      }

      break;

    case 14:

      // change marker styles
      for (var i = 0; i < markerList.length; i++) {
      markerListElement = "marker" + markerList[i];
      window[markerListElement].setRadius(54);
      window[markerListElement].setStyle({weight: 2});
      }

      // change trailhead marker styles
      for (var i = 0; i < trailheadList.length; i++) {
      trailheadListElement = "marker" + trailheadList[i];
      window[trailheadListElement].setRadius(59);
      window[trailheadListElement].setStyle({weight: 2});
      }

      // change segment styles
      for (var i = 0; i < segmentList.length; i++) {
      segmentListElement = "segment" + segmentList[i] + "polyline";
      window[segmentListElement].setStyle({weight: 2});
      }

      // change maricopa trail segment styles
      for (var i = 0; i < segmentMTList.length; i++) {
      segmentMTListElement = "segment" + segmentMTList[i] + "polyline";
      window[segmentMTListElement].setStyle({weight: 1, dashArray: '0.1,2'});
      }

      // change tech trail segment styles
      for (var i = 0; i < segmentTechList.length; i++) {
      segmentTechListElement = "segment" + segmentTechList[i] + "polyline";
      window[segmentTechListElement].setStyle({dashArray: '4,3'});
      }

      break;

    case 15:

      // change marker styles
      for (var i = 0; i < markerList.length; i++) {
      markerListElement = "marker" + markerList[i];
      window[markerListElement].setRadius(54);
      window[markerListElement].setStyle({weight: 3});
      }

      // change trailhead marker styles
      for (var i = 0; i < trailheadList.length; i++) {
      trailheadListElement = "marker" + trailheadList[i];
      window[trailheadListElement].setRadius(58);
      window[trailheadListElement].setStyle({weight: 3});
      }

      // change segment styles
      for (var i = 0; i < segmentList.length; i++) {
      segmentListElement = "segment" + segmentList[i] + "polyline";
      window[segmentListElement].setStyle({weight: 3});
      }

      // change maricopa trail segment styles
      for (var i = 0; i < segmentMTList.length; i++) {
      segmentMTListElement = "segment" + segmentMTList[i] + "polyline";
      window[segmentMTListElement].setStyle({weight: 2, dashArray: '0.1,3'});
      }

      // change tech trail segment styles
      for (var i = 0; i < segmentTechList.length; i++) {
      segmentTechListElement = "segment" + segmentTechList[i] + "polyline";
      window[segmentTechListElement].setStyle({dashArray: '6,5'});
      }

      break;

    case 16:

      // change marker styles
      for (var i = 0; i < markerList.length; i++) {
      markerListElement = "marker" + markerList[i];
      window[markerListElement].setRadius(30);
      window[markerListElement].setStyle({weight: 4});
      }

      // change trailhead marker styles
      for (var i = 0; i < trailheadList.length; i++) {
      trailheadListElement = "marker" + trailheadList[i];
      window[trailheadListElement].setRadius(34);
      window[trailheadListElement].setStyle({weight: 4});
      }

      // change segment styles
      for (var i = 0; i < segmentList.length; i++) {
      segmentListElement = "segment" + segmentList[i] + "polyline";
      window[segmentListElement].setStyle({weight: 4});
      }

      // change maricopa trail segment styles
      for (var i = 0; i < segmentMTList.length; i++) {
      segmentMTListElement = "segment" + segmentMTList[i] + "polyline";
      window[segmentMTListElement].setStyle({weight: 3, dashArray: '0.1,5'});
      }

      // change tech trail segment styles
      for (var i = 0; i < segmentTechList.length; i++) {
      segmentTechListElement = "segment" + segmentTechList[i] + "polyline";
      window[segmentTechListElement].setStyle({dashArray: '8,7'});
      }

      break;

    case 17:

      // change marker styles
      for (var i = 0; i < markerList.length; i++) {
      markerListElement = "marker" + markerList[i];
      window[markerListElement].setRadius(18);
      window[markerListElement].setStyle({weight: 5});
      }

      // change trailhead marker styles
      for (var i = 0; i < trailheadList.length; i++) {
      trailheadListElement = "marker" + trailheadList[i];
      window[trailheadListElement].setRadius(22);
      window[trailheadListElement].setStyle({weight: 5});
      }

      // change segment styles
      for (var i = 0; i < segmentList.length; i++) {
      segmentListElement = "segment" + segmentList[i] + "polyline";
      window[segmentListElement].setStyle({weight: 5});
      }

      // change maricopa trail segment styles
      for (var i = 0; i < segmentMTList.length; i++) {
      segmentMTListElement = "segment" + segmentMTList[i] + "polyline";
      window[segmentMTListElement].setStyle({weight: 4, dashArray: '0.1,10'});
      }

      // change tech trail segment styles
      for (var i = 0; i < segmentTechList.length; i++) {
      segmentTechListElement = "segment" + segmentTechList[i] + "polyline";
      window[segmentTechListElement].setStyle({dashArray: '10,9'});
      }

      break;

    default:
  }
});


// fly to selected trailhead, if applicable

var trailheadCarouselIndex = 0;

$('#trailheadCarousel').on('slide.bs.carousel', function (e) {
  trailheadCarouselIndex = e.to;
  return trailheadCarouselIndex;
});

$("#infocontainer-0-button").on("click", function() {
  switch (trailheadCarouselIndex) {
    case 0:
      markerBRTX.fire('click');
      map.flyTo([33.761545, -111.842328], 17, {animate: true, duration: 0.1});
    break;

    case 1:
      markerFTX.fire('click');
      map.flyTo([33.746523, -111.795308], 17, {animate: true, duration: 0.1});
    break;

    case 2:
      markerGTX.fire('click');
      map.flyTo([33.649484, -111.858415], 17, {animate: true, duration: 0.1});
    break;

    case 3:
      markerGMTX.fire('click');
      map.flyTo([33.770558, -111.789568], 17, {animate: true, duration: 0.1});
    break;

    case 4:
      markerLDTX.fire('click');
      map.flyTo([33.600348, -111.811841], 17, {animate: true, duration: 0.1});
    break;

    case 5:
      markerPDTX.fire('click');
      map.flyTo([33.74337985, -111.887773], 16, {animate: true, duration: 0.1});
    break;

    case 6:
      markerQT1X.fire('click');
      map.flyTo([33.627011, -111.857127], 16, {animate: true, duration: 0.1});
    break;

    case 7:
      markerRTX.fire('click');
      map.flyTo([33.598084, -111.804753], 17, {animate: true, duration: 0.1});
    break;

    case 8:
      markerSTX.fire('click');
      map.flyTo([33.596214, -111.768246], 17, {animate: true, duration: 0.1});
    break;

    case 9:
      markerTTTX.fire('click');
      map.flyTo([33.694507, -111.801702], 16, {animate: true, duration: 0.1});
    break;

    case 10:
      markerWWTX.fire('click');
      map.flyTo([33.630502, -111.870109], 17, {animate: true, duration: 0.1});
    break;

    case 11:
      markerBTX.fire('click');
      map.flyTo([33.640358, -111.856724], 15, {animate: true, duration: 0.1});
    break;

    case 12:
      marker136X.fire('click');
      map.flyTo([33.594952, -111.786379], 15, {animate: true, duration: 0.1});
    break;

    default:
      alert("Incorrect trailhead carousel index number!");

  }

});


// if the user selects the info panel and it's currently displaying a single marker, fly to the current marker

$("#markercontainer-1").on("click", function() {

  if (markerArray.length == 1 && $("#infocontainer-1").hasClass("display-visible")) {
    var czl = map.getZoom();

    var cme = window["marker" + markerArray[0]];

    var cll = cme.getLatLng();
    var clat = cll.lat;
    var clng = cll.lng;

    map.flyTo([clat, clng], czl, {animate: true, duration: 0.1});
  };

});

$("#infocontainer").on("click", function() {

  // if the second info overlay has been shown and segments are showing in the info panel, show the route plan modal

  if (infoContainer2MapOverlayShown === true && infoContainer2Visible === true) {

    $("#modalRoutePlan").modal("show");

    var routePlanArrayHTML = "";
    var x = 0;

    for (var i = 0; i < routePlanArray.length / 5; i++) {
    routePlanArrayHTML = routePlanArrayHTML + "<span class='routeplanmarker'>" + routePlanArray[x] + "</span>" + " " + "<span class='routeplanseparator'>to</span>" + " " + "<span class='routeplanmarker'>" + routePlanArray[x + 1] + "</span>" + "<br>" + "<span class='routeplanseparator'>via</span>" + " " + "<span class='routeplansegment'>" + routePlanArray[x + 2] + "</span>" + "<br>" + "<span class='routeplanmiles'>" + routePlanArray[x + 3] + "</span>" + "<span class='routeplanelevgain'>" + routePlanArray[x + 4] + "</span>" + "<br>" + "<br>";
    x = x + 5;
    };

    if (routeLength === 1) {
      routePlanArrayHTML = routePlanArrayHTML + "<hr class='routeplanhr'>" + "<span class='routeplantotals'>Route Totals</span>" + "<br>" + Math.abs(routeLength).toFixed(2) + "<span class='routeplantotalmiles'> mile</span>" + Math.abs(routeElevGain).toFixed(0) + "' elev gain";
    }
    else {
      routePlanArrayHTML = routePlanArrayHTML + "<hr class='routeplanhr'>" + "<span class='routeplantotals'>Route Totals</span>" + "<br>" + Math.abs(routeLength).toFixed(2) + "<span class='routeplantotalmiles'> miles</span>" + Math.abs(routeElevGain).toFixed(0) + "' elev gain";
    }

    $("#routeplan").html(routePlanArrayHTML);
  };
});

// reset map when user selects reset map from the route plan modal

function resetMap() {

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

  $("#infocontainer-0").addClass("display-visible");
  $("#infocontainer-0").removeClass("display-invisible");
  $("#infocontainer-1").addClass("display-invisible");
  $("#infocontainer-1").removeClass("display-visible");
  $("#infocontainer-2").addClass("display-invisible");
  $("#infocontainer-2").removeClass("display-visible");

  infoContainer2Visible = false;

  // reset map view

  if ($(window).height() >= 900) {
    markerRadiusInitial = 110;
    trailheadRadiusInitial = 110;
    map.setView([33.702662, -111.829247], 12);
    }
  else if ($(window).height() >= 700 && $(window).height() < 900) {
      markerRadiusInitial = 100;
      trailheadRadiusInitial = 100;
      map.setView([33.702662, -111.829247], 11);
  }
  else {
      markerRadiusInitial = 50;
      trailheadRadiusInitial = 50;
      map.setView([33.702662, -111.829247], 10);
  };

}

// get, display, and remove user's location

var locationMarker = {};
var locationCircle = {};
var locationIcon = L.divIcon({
  iconSize: [8, 8],
  iconAnchor: [4, 4],
  popupAnchor: [4, 0],
  shadowSize: [0, 0],
  className: 'animated-location-icon my-location-icon',
  html: ''
});

function onLocationFound(e) {

  if (locationMarker != undefined) {
    map.removeLayer(locationMarker);
    map.removeLayer(locationCircle);
  };

  var radius = e.accuracy / 2;
  // locationMarker = L.marker(e.latlng, {interactive: false}).addTo(map);

  locationMarker = L.marker(e.latlng, {icon: locationIcon, interactive: false}).addTo(map);
  locationCircle = L.circle(e.latlng, radius, {interactive: false, className: "locationCircleHide"}).addTo(map);

  setTimeout (function() {
    $(".locationCircleHide").animate({ opacity: 0 }, 1000, function() {
       // Animation complete.
    });
  }, 10000);
  var myLocationIcon = document.querySelector('.my-location-icon');
  // setTimeout (function() {
  //   myLocationIcon.style.opacity = 0
  // }, 5000);

    setTimeout (function() {
    $(".my-location-icon").animate({ opacity: 0 }, 1000, function() {
       // Animation complete.
    });
  }, 10000);

}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// add locate button to map

L.Control.zoomHome = L.Control.extend({
    options: {
        position: 'topright',
        zoomHomeText: '<i class="fas fa-location-arrow locatebuttonicon"></i>',
        zoomHomeTitle: 'Locate'
    },

    onAdd: function (map) {
        var controlName = 'gin-control-zoom',
            container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
            options = this.options;

        this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
        controlName + '-home', container, this._zoomHome);

        return container;
    },

    _zoomHome: function (e) {
      map.locate({setView: true, maxZoom: 17});
    },

    _createButton: function (html, title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);

        return link;
    },

});

var zoomHome = new L.Control.zoomHome();
zoomHome.addTo(map);

// ------------------------------------------------------------------------------------------------------------
// the main function: the four cases when the user chooses a marker -------------------------------------------
// ------------------------------------------------------------------------------------------------------------

function onMapClick(e) {
  var panAnimateSpeed;
  var marker = e.target;
  var markerID = marker.options.id;
  var markerName = marker.options.name;
  var markerListElement;
  var currentMarker;
  var previousMarker;
  var previousMarkerName;
  var previousPreviousMarker;
  var previouslySelectedMarkers;
  var neighborMarkers;
  var previousNeighborMarkers;
  var newNeighborMarkers;
  var segmentID;
  var previouslySelectedSegments;
  var segmentPolyline;
  var infoFadeOutTime = 200;
  var infoFadeInTime = 200;

  // center map to selected marker
  // if user selects current marker, center map to previous marker

  if ($(window).width() >= 992) {
    panAnimateSpeed = 0.5;
  }
  else if ($(window).width() >= 768 && $(window).width() < 992) {
    panAnimateSpeed = 0.33;
  }
  else {
    panAnimateSpeed = 0.25;
  };

  function centerMarker() {
    map.dragging.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.panTo(L.latLng(marker.getLatLng()), {animate: true, duration: panAnimateSpeed, easeLinearity: 0.25});
    // map.setView(L.latLng(marker.getLatLng()), markerZoomLevel);

    map.on('moveend', function() {
      map.dragging.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
    });
  };

  function centerPreviousMarker() {
    map.dragging.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.panTo(L.latLng(window[previousMarker].getLatLng()), {animate: true, duration: panAnimateSpeed, easeLinearity: 0.25});

    map.on('moveend', function() {
      map.dragging.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
    });
  };

  // case 1: if markerArray is empty --------------------------------------------------------------------------
  // i.e., the user chooses the very first marker -------------------------------------------------------------

  if (markerArray.length === 0) {

    // if they haven't been shown yet, show focused instructions 1

    if (infoContainer1MapOverlayShown === false) {
      $("#mapoverlay").css("visibility", "visible");
      $("#mapoverlay").fadeTo(500, 0.85);
      $("#infocontainer-1-instructions-button").on("click", function() {
        $("#mapoverlay").fadeTo(500, 0.0, function() {
          $("#mapoverlay").css("visibility", "hidden");
          $("#infocontainer-1-instructions").css("display", "none");
          $("#markercontainer-1").css("display", "block");
          infoContainer1MapOverlayShown = true;
        });
      });
    }

      else {
        $("#mapoverlay").css("visibility", "hidden");
        $("#infocontainer-1-instructions").css("display", "none");
        $("#markercontainer-1").css("display", "block");
        infoContainer1MapOverlayShown = true;
      }

    infoContainer2Visible = false;

    // center the selected marker on the map

    centerMarker();

    // make all of the markers 'unselectable'

    for (var i = 0; i < markerList.length; i++) {
      markerListElement = "marker" + markerList[i];
      window[markerListElement].setStyle({status: "unselectable", color: markerColorUnselectable, fillColor: markerFillColorUnselectable, fillOpacity: markerFillOpacityUnselectable});
    }

    // make the chosen marker the 'current' marker

    marker.setStyle({status: "current", color: markerColorCurrent, fillColor: markerFillColorCurrent, fillOpacity: markerFillOpacityCurrent});

    // make the neighbor markers 'selectable'

    for (var i = 0; i < marker.options.neighbors.length; i++) {
      neighborMarkers = "marker" + marker.options.neighbors[i];
      window[neighborMarkers].setStyle({status: "selectable", color: markerColorSelectable, fillColor: markerFillColorSelectable, fillOpacity: markerFillOpacitySelectable});
    }

    // make the neighbor segments 'selectable'

    for (var i = 0; i < marker.options.neighbors.length; i++) {

      // create a segmentID based on the current marker and neighbor markers, one at a time
      segmentID = "segment" + markerID + marker.options.neighbors[i];

      // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
      // then run the appropriate statements

      try {
        if (window[segmentID].segmentMarkerA === markerID) {
          // change the segment to selectable
          segmentPolyline = segmentID + "polyline";
          window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
        }
      }

      catch(err) {
        segmentID = "segment" + marker.options.neighbors[i] + markerID;
        // change the segment to selectable
        segmentPolyline = segmentID + "polyline";
        window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
      }
    }

    // add the current marker to markerArray

    markerArray.push(markerID);

    // show markerArray values in the console for debugging

    console.log(markerArray);

    // empty segmentArray

    segmentArray.length = 0;

    // show segmentArray values in the console for debugging

    console.log(segmentArray);

    // show/hide info containers

    $("#infocontainer-0").addClass("display-invisible");
    $("#infocontainer-0").removeClass("display-visible");
    $("#infocontainer-1").addClass("display-visible");
    $("#infocontainer-1").removeClass("display-invisible");
    $("#infocontainer-2").addClass("display-invisible");
    $("#infocontainer-2").removeClass("display-visible");

    // update info

    $("#markername").text(marker.options.name);
    $("#markerelev").text(marker.options.elev + "'");

    // reset route elev gain

    routeElevGain = 0;

  }

  // case 2: if markerArray has one element and the user chooses the 'current' marker ---------------
  // i.e., the user immediately chooses the first marker again or backtracks to the first marker ----

  else if (markerArray.length === 1 && marker.options.status === "current") {

    // make the neighbor segments 'unselected'

    for (var i = 0; i < marker.options.neighbors.length; i++) {

      // create a segmentID based on the current marker and neighbor markers, one at a time
      segmentID = "segment" + markerID + marker.options.neighbors[i];

      // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
      // then run the appropriate statements

      try {
        if (window[segmentID].segmentMarkerA === markerID) {
          // change the segment to 'unselected'
          segmentPolyline = segmentID + "polyline";
          window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});
        }
      }

      catch(err) {
        segmentID = "segment" + marker.options.neighbors[i] + markerID;
        // change the segment to 'unselected'
        segmentPolyline = segmentID + "polyline";
        window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});
      }
    }

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

    // remove the current marker from markerArray

    markerArray.pop();

    // show markerArray values in the console for debugging

    console.log(markerArray);

    // empty segmentArray

    segmentArray.length = 0;

    // show segmentArray values in the console for debugging

    console.log(segmentArray);

    // reset route elev gain

    routeElevGain = 0;

    // show/hide info containers

    $("#infocontainer-0").addClass("display-visible");
    $("#infocontainer-0").removeClass("display-invisible");
    $("#infocontainer-1").addClass("display-invisible");
    $("#infocontainer-1").removeClass("display-visible");
    $("#infocontainer-2").addClass("display-invisible");
    $("#infocontainer-2").removeClass("display-visible");

    infoContainer2Visible = false;

  }

  // case 3: if markerArray has at least one element and the user chooses a 'selectable' marker -----------------
  // ------------------------------------------------------------------------------------------------------------

  else if (markerArray.length > 0 && marker.options.status === "selectable" || marker.options.status === "selectableselected") {

    // if they haven't been shown yet, show focused instructions 2

    if (infoContainer2MapOverlayShown === false) {
      $("#mapoverlay").css("visibility", "visible");
      $("#mapoverlay").fadeTo(500, 0.85);
      $("#infocontainer-2-instructions-button").on("click", function() {
        $("#mapoverlay").fadeTo(500, 0.0, function() {
          $("#mapoverlay").css("visibility", "hidden");
          $("#infocontainer-2-instructions").css("display", "none");
          $("#infocontainer-2-markercontainer-2").css("display", "block");
          infoContainer2MapOverlayShown = true;
        });
      });
    }
      else {
        $("#mapoverlay").css("visibility", "hidden");
        $("#infocontainer-2-instructions").css("display", "none");
        $("#infocontainer-2-markercontainer-2").css("display", "block");
        infoContainer2MapOverlayShown = true;
      }

    infoContainer2Visible = true;

    // make the previous neighbors 'unselectable'

    previousMarker = "marker" + markerArray[markerArray.length - 1];

    for (var i = 0; i < window[previousMarker].options.neighbors.length; i++) {
      previousNeighborMarkers = "marker" + window[previousMarker].options.neighbors[i];
      window[previousNeighborMarkers].setStyle({status: "unselectable", color: markerColorUnselectable, fillColor: markerFillColorUnselectable, fillOpacity: markerFillOpacityUnselectable});
    }

    // make the previous selectable neighbor segments 'unselected'

    for (var i = 0; i < window[previousMarker].options.neighbors.length; i++) {

      // create a segmentID based on the current marker and neighbor markers, one at a time
      segmentID = "segment" + markerArray[markerArray.length - 1] + window[previousMarker].options.neighbors[i];

      // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
      // then run the appropriate statements

      try {
        if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 1]) {
          // change the segment to unselected
          segmentPolyline = segmentID + "polyline";
          window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});
        }
      }

      catch(err) {
        segmentID = "segment" + window[previousMarker].options.neighbors[i] + markerArray[markerArray.length - 1];
        // change the segment to unselected
        segmentPolyline = segmentID + "polyline";
        window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});
      }
    }

    // make all of the markers up to the current marker 'selected'

    for (var i = 0; i < markerArray.length - 1; i++) {
      previouslySelectedMarkers = "marker" + markerArray[i];
      window[previouslySelectedMarkers].setStyle({status: "selected", color: markerColorSelected, fillColor: markerFillColorSelected, fillOpacity: markerFillOpacitySelected});
    }

    // make all of the segments up to the current segment 'selected'

    for (var i = 0; i < segmentArray.length; i++) {
      previouslySelectedSegments = segmentArray[i] + "polyline";
      window[previouslySelectedSegments].setStyle({color: segmentColorSelected, opacity: segmentOpacitySelected});
    }

    // make the new neighbor markers 'selectable'

    for (var i = 0; i < marker.options.neighbors.length; i++) {
      newNeighborMarkers = "marker" + marker.options.neighbors[i];
      window[newNeighborMarkers].setStyle({status: "selectable", color: markerColorSelectable, fillColor: markerFillColorSelectable, fillOpacity: markerFillOpacitySelectable});
    }

    // make the new neighbor segments 'selectable'

    for (var i = 0; i < marker.options.neighbors.length; i++) {

      // create a segmentID based on the current marker and neighbor markers, one at a time
      segmentID = "segment" + markerID + marker.options.neighbors[i];

      // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
      // then run the appropriate statements

      try {
        if (window[segmentID].segmentMarkerA === markerID) {
          // change the segment to selectable
          segmentPolyline = segmentID + "polyline";
          window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
        }
      }

      catch(err) {
        segmentID = "segment" + marker.options.neighbors[i] + markerID;
        // change the segment to selectable
        segmentPolyline = segmentID + "polyline";
        window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
      }
    }

    // if a new neighbor marker was previously selected, make it 'selectableselected'

    for (var i = 0; i < markerArray.length; i++) {
      for (var j = 0; j < marker.options.neighbors.length; j++) {
        neighborMarkers = "marker" + marker.options.neighbors[j];
        if (markerArray[i] === marker.options.neighbors[j]) {
        window[neighborMarkers].setStyle({status: "selectableselected", color: markerColorSelectableSelected, fillColor: markerFillColorSelectableSelected, fillOpacity: markerFillOpacitySelectableSelected});
        }
      }
    }

    // if a new neighbor segment was previously selected, make it 'selectableselected'

    // first, through try and catch, determine the segmentID

    for (var i = 0; i < marker.options.neighbors.length; i++) {

      // create a segmentID based on the current marker and neighbor markers, one at a time
      segmentID = "segment" + markerID + marker.options.neighbors[i];

      try {
        if (window[segmentID].segmentMarkerA === markerID) {
        }
      }

      catch(err) {
        segmentID = "segment" + marker.options.neighbors[i] + markerID;
      }

      // now compare the segmentID to all of the elements in segmentArray
      // if there's a match, change the segment to selectableselected

      for (var j = 0; j < segmentArray.length; j++) {
        if (segmentID === segmentArray[j]) {
          segmentPolyline = segmentID + "polyline";
          window[segmentPolyline].setStyle({color: segmentColorSelectableSelected, opacity: segmentOpacitySelectableSelected});
        }
      }
    }

    // make the previous marker 'previous'

    window[previousMarker].setStyle({status: "selectableselected", color: markerColorPrevious, fillColor: markerFillColorPrevious, fillOpacity: markerFillOpacityPrevious});

    // make the chosen marker the 'current' marker

    marker.setStyle({status: "current", color: markerColorCurrent, fillColor: markerFillColorCurrent, fillOpacity: markerFillOpacityCurrent});

    // center the selected marker on the map

    centerMarker();

    // add the new current marker to markerArray

    markerArray.push(markerID);

    // add the previous marker to routePlanArray

    previousMarkerName = "marker" + markerArray[markerArray.length - 2];

    routePlanArray.push(window[previousMarkerName].options.name);

    // add the new current marker to routePlanArray

    routePlanArray.push(markerName);

    // show markerArray values in the console for debugging

    console.log(markerArray);

    // show/hide info containers

    $("#infocontainer-0").addClass("display-invisible");
    $("#infocontainer-0").removeClass("display-visible");
    $("#infocontainer-1").addClass("display-invisible");
    $("#infocontainer-1").removeClass("display-visible");
    $("#infocontainer-2").addClass("display-visible");
    $("#infocontainer-2").removeClass("display-invisible");

    // update info

    previousMarker = "marker" + markerArray[markerArray.length - 2];

    $("#markerfromname").text(window[previousMarker].options.name);
    $("#markerfromelev").text(window[previousMarker].options.elev + "'");

    $("#markertoname").text(marker.options.name);
    $("#markertoelev").text(marker.options.elev + "'");

    // create a segmentID based on the previous and current markers

    segmentID = "segment" + markerArray[markerArray.length - 2] + markerArray[markerArray.length - 1];

    // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
    // then run the appropriate statements (this also defines how segment elevation gain is calculated)

    try {

      if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 2]) {
        $("#segmentname").text(window[segmentID].segmentName);

        // add the new current segment to segmentArray

        segmentArray.push(segmentID);

        // add the new current segment to routePlanArray

        routePlanArray.push(window[segmentID].segmentName);

        // change the segment to current

        segmentPolyline = segmentID + "polyline";

        window[segmentPolyline].setStyle({color: segmentColorCurrent, opacity: segmentOpacityCurrent});

        // show segmentArray values in the console for debugging

        console.log(segmentArray);

        // show segmentLength

        if (window[segmentID].segmentLength === 1) {
          $("#segmentlength").text(window[segmentID].segmentLength.toFixed(2) + " mile");
          // add the segmentlength to routePlanArray
          routePlanArray.push(window[segmentID].segmentLength.toFixed(2) + " mile");
        }
        else {
          $("#segmentlength").text(window[segmentID].segmentLength.toFixed(2) + " miles");
          // add the segmentlength to routePlanArray
          routePlanArray.push(window[segmentID].segmentLength.toFixed(2) + " miles");
        }

        // show segmentElevGainA

        $("#segmentelevgain").text(window[segmentID].segmentElevGainA.toFixed(0) + "' elev gain");

        // add segmentElevGainA to routePlanArray

        routePlanArray.push(window[segmentID].segmentElevGainA.toFixed(0) + "' elev gain");

        // update route elev gain

        routeElevGain = routeElevGain + window[segmentID].segmentElevGainA;

        $("#routeelevgain").text(routeElevGain.toFixed(0) + "' elev gain");

      }

    }

    catch(err) {
      segmentID = "segment" + markerArray[markerArray.length - 1] + markerArray[markerArray.length - 2];
      $("#segmentname").text(window[segmentID].segmentName);

      // add the new current segment to segmentArray

      segmentArray.push(segmentID);

      // add the new current segment to routePlanArray

      routePlanArray.push(window[segmentID].segmentName);

      // change the segment to current

      segmentPolyline = segmentID + "polyline";

      window[segmentPolyline].setStyle({color: segmentColorCurrent, opacity: segmentOpacityCurrent});

      // show segmentArray values in the console for debugging

      console.log(segmentArray);

      // show segmentLength

      if (window[segmentID].segmentLength === 1) {
        $("#segmentlength").text(window[segmentID].segmentLength.toFixed(2) + " mile");
        // add the segmentlength to routePlanArray
        routePlanArray.push(window[segmentID].segmentLength.toFixed(2) + " mile");
      }
      else {
        $("#segmentlength").text(window[segmentID].segmentLength.toFixed(2) + " miles");
        // add the segmentlength to routePlanArray
        routePlanArray.push(window[segmentID].segmentLength.toFixed(2) + " miles");
      }

      // show segmentElevGainB

      $("#segmentelevgain").text(window[segmentID].segmentElevGainB.toFixed(0) + "' elev gain");

      // add segmentElevGainB to routePlanArray

      routePlanArray.push(window[segmentID].segmentElevGainB.toFixed(0) + "' elev gain");

      // update route elev gain

      routeElevGain = routeElevGain + window[segmentID].segmentElevGainB;

      $("#routeelevgain").text(routeElevGain.toFixed(0) + "' elev gain");

    }

    // update route length

    routeLength = (routeLength * 10 + window[segmentID].segmentLength * 10) / 10;

    if (routeLength === 1) {
      $("#routelength").text(routeLength.toFixed(2) + " mile");
    }
    else {
      $("#routelength").text(routeLength.toFixed(2) + " miles");
    }

  }

  // case 4: if markerArray has more than one element and the user chooses the 'current' marker -----------------
  // ------------------------------------------------------------------------------------------------------------

  else if (markerArray.length > 1 && marker.options.status === "current") {

    // make the current neighbor markers 'unselectable'

    for (var i = 0; i < marker.options.neighbors.length; i++) {
      newNeighborMarkers = "marker" + marker.options.neighbors[i];
      window[newNeighborMarkers].setStyle({status: "unselectable", color: markerColorUnselectable, fillColor: markerFillColorUnselectable, fillOpacity: markerFillOpacityUnselectable});
    }

    // make the current neighbor segments 'unselected'

    for (var i = 0; i < marker.options.neighbors.length; i++) {

      // create a segmentID based on the current marker and neighbor markers, one at a time
      segmentID = "segment" + markerID + marker.options.neighbors[i];

      // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
      // then run the appropriate statements

      try {
        if (window[segmentID].segmentMarkerA === markerID) {
          // change the segment to unselected
          segmentPolyline = segmentID + "polyline";
          window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});
        }
      }

      catch(err) {
        segmentID = "segment" + marker.options.neighbors[i] + markerID;
        // change the segment to unselected
        segmentPolyline = segmentID + "polyline";
        window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});
      }
    }

    // make the 'current' marker a neighbor

    marker.setStyle({status: "selectable", color: markerColorSelectable, fillColor: markerFillColorSelectable, fillOpacity: markerFillOpacitySelectable});

    // make the previous neighbors 'selectable'

    previousMarker = "marker" + markerArray[markerArray.length - 2];
    for (var i = 0; i < window[previousMarker].options.neighbors.length; i++) {
      previousNeighborMarkers = "marker" + window[previousMarker].options.neighbors[i];
      window[previousNeighborMarkers].setStyle({status: "selectable", color: markerColorSelectable, fillColor: markerFillColorSelectable, fillOpacity: markerFillOpacitySelectable});
    }

    // make all of the markers up to the current marker 'selected'

    for (var i = 0; i < markerArray.length - 2; i++) {
      previouslySelectedMarkers = "marker" + markerArray[i];
      window[previouslySelectedMarkers].setStyle({status: "selected", color: markerColorSelected, fillColor: markerFillColorSelected, fillOpacity: markerFillOpacitySelected});
    }

    // make all of the segments up to the current segment 'selected'

    for (var i = 0; i < segmentArray.length; i++) {
      previouslySelectedSegments = segmentArray[i] + "polyline";
      window[previouslySelectedSegments].setStyle({color: segmentColorSelected, opacity: segmentOpacitySelected});
    }

    // if any neighbors were previously chosen, make them 'selectableselected'

    for (var i = 0; i < markerArray.length - 2; i++) {
      for (var j = 0; j < window[previousMarker].options.neighbors.length; j++) {
        neighborMarkers = "marker" + window[previousMarker].options.neighbors[j];
        if (markerArray[i] === window[previousMarker].options.neighbors[j]) {
        window[neighborMarkers].setStyle({status: "selectableselected", color: markerColorSelectableSelected, fillColor: markerFillColorSelectableSelected, fillOpacity: markerFillOpacitySelectableSelected});
        }
      }
    }

    // make the previous marker the 'current' marker

    previousMarker = "marker" + markerArray[markerArray.length - 2];
    window[previousMarker].setStyle({status: "current", color: markerColorCurrent, fillColor: markerFillColorCurrent, fillOpacity: markerFillOpacityCurrent});

    // center the new current marker on the map

    centerPreviousMarker();

    // make the previous previous marker 'previous'

    if (markerArray.length > 2) {
      previousPreviousMarker = "marker" + markerArray[markerArray.length - 3];
      window[previousPreviousMarker].setStyle({status: "selectableselected", color: markerColorPrevious, fillColor: markerFillColorPrevious, fillOpacity: markerFillOpacityPrevious});
    }

    // create a segmentID based on the previous and current markers

    segmentID = "segment" + markerArray[markerArray.length - 2] + markerArray[markerArray.length - 1];

    // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
    // then run the appropriate statements (this also defines how segment elevation gain is calculated)

    try {

      if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 2]) {

        // update route length

        routeLength = (routeLength * 10 - window[segmentID].segmentLength * 10) / 10;

        // update route elev gain

        routeElevGain = routeElevGain - window[segmentID].segmentElevGainA;

        $("#routeelevgain").text(routeElevGain.toFixed(0) + "' elev gain");

      }

    }

    catch(err) {
      segmentID = "segment" + markerArray[markerArray.length - 1] + markerArray[markerArray.length - 2];

      // update route length

      routeLength = (routeLength * 10 - window[segmentID].segmentLength * 10) / 10;

      // update route elev gain

      routeElevGain = routeElevGain - window[segmentID].segmentElevGainB;

      $("#routeelevgain").text(routeElevGain.toFixed(0) + "' elev gain");

    }

    // remove the current marker from markerArray

    markerArray.pop();

    // remove last five elements from routePlanArray

    routePlanArray.splice(-5);

    // show markerArray values in the console for debugging

    console.log(markerArray);

    // show/hide info containers

    if (markerArray.length > 1) {
      $("#infocontainer-0").addClass("display-invisible");
      $("#infocontainer-0").removeClass("display-visible");
      $("#infocontainer-1").addClass("display-invisible");
      $("#infocontainer-1").removeClass("display-visible");
      $("#infocontainer-2").addClass("display-visible");
      $("#infocontainer-2").removeClass("display-invisible");
      infoContainer2Visible = true;
    }
    else {
      $("#infocontainer-0").addClass("display-invisible");
      $("#infocontainer-0").removeClass("display-visible");
      $("#infocontainer-1").addClass("display-visible");
      $("#infocontainer-1").removeClass("display-invisible");
      $("#infocontainer-2").addClass("display-invisible");
      $("#infocontainer-2").removeClass("display-visible");
      infoContainer2Visible = false;
    }

    // update info

    currentMarker = "marker" + markerArray[markerArray.length - 1];
    previousMarker = "marker" + markerArray[markerArray.length - 2];

    // if markerArray.length > 1 update the visible info panel, otherwise don't

    if (markerArray.length > 1) {

      $("#markerfromname").text(window[previousMarker].options.name);
      $("#markerfromelev").text(window[previousMarker].options.elev + "'");

      $("#markertoname").text(window[currentMarker].options.name);
      $("#markertoelev").text(window[currentMarker].options.elev + "'");

      // create a segmentID based on the previous and current markers

      segmentID = "segment" + markerArray[markerArray.length - 2] + markerArray[markerArray.length - 1];

      // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
      // then run the appropriate statements (this also defines how segment elevation gain is calculated)

      try {

        if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 2]) {
          $("#segmentname").text(window[segmentID].segmentName);

          if (window[segmentID].segmentLength === 1) {
            $("#segmentlength").text(window[segmentID].segmentLength.toFixed(2) + " mile");
          }
          else {
            $("#segmentlength").text(window[segmentID].segmentLength.toFixed(2) + " miles");
          }

          // show segmentElevGainA

          $("#segmentelevgain").text(window[segmentID].segmentElevGainA.toFixed(0) + "' elev gain");

          // change the segment to unselected

          segmentPolyline = segmentArray[segmentArray.length - 1] + "polyline";

          window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});

          // if the segment was previously selected, change it back to selected

          for (var i = 0; i < segmentArray.length - 1; i++) {
            if (segmentArray[segmentArray.length - 1] === segmentArray[i]) {
              window[segmentPolyline].setStyle({color: segmentColorSelected, opacity: segmentOpacitySelected});
            }
          }

          // make the neighbor segments 'selectable' -------------------------------------------------

          for (var i = 0; i < window[currentMarker].options.neighbors.length; i++) {

            // create a segmentID based on the current marker and neighbor markers, one at a time
            segmentID = "segment" + markerArray[markerArray.length - 1] + window[currentMarker].options.neighbors[i];

            // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
            // then run the appropriate statements

            try {
              if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 1]) {
                // change the segment to selectable
                segmentPolyline = segmentID + "polyline";
                window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
              }
            }

            catch(err) {
              segmentID = "segment" + window[currentMarker].options.neighbors[i] + markerArray[markerArray.length - 1];
              // change the segment to selectable
              segmentPolyline = segmentID + "polyline";
              window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
            }
          }

          // if a new neighbor segment was previously selected, make it 'selectableselected'

          // first, through try and catch, determine the segmentID

          for (var i = 0; i < window[currentMarker].options.neighbors.length; i++) {

            // create a segmentID based on the current marker and neighbor markers, one at a time
            segmentID = "segment" + markerArray[markerArray.length - 1] + window[currentMarker].options.neighbors[i];

            try {
              if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 1]) {
              }
            }

            catch(err) {
              segmentID = "segment" + window[currentMarker].options.neighbors[i] + markerArray[markerArray.length - 1];
            }

            // now compare the segmentID to all of the elements in segmentArray
            // if there's a match, change the segment to selectableselected

            for (var j = 0; j < segmentArray.length - 2; j++) {
              if (segmentID === segmentArray[j]) {
                segmentPolyline = segmentID + "polyline";
                window[segmentPolyline].setStyle({color: segmentColorSelectableSelected, opacity: segmentOpacitySelectableSelected});
              }
            }
          }

          // remove the new current segment from segmentArray

          segmentArray.pop();

          // change the segment to current

          segmentPolyline = segmentArray[segmentArray.length - 1] + "polyline";

          window[segmentPolyline].setStyle({color: segmentColorCurrent, opacity: segmentOpacityCurrent});

          // show segmentArray values in the console for debugging

          console.log(segmentArray);

        }

      }

      catch(err) {
        segmentID = "segment" + markerArray[markerArray.length - 1] + markerArray[markerArray.length - 2];

        $("#segmentname").text(window[segmentID].segmentName);
        if (window[segmentID].segmentLength === 1) {
          $("#segmentlength").text(window[segmentID].segmentLength.toFixed(2) + " mile");
        }
        else {
          $("#segmentlength").text(window[segmentID].segmentLength.toFixed(2) + " miles");
        }

        // show segmentElevGainB

        $("#segmentelevgain").text(window[segmentID].segmentElevGainB.toFixed(0) + "' elev gain");

        // change the segment to unselected

        segmentPolyline = segmentArray[segmentArray.length - 1] + "polyline";

        window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});

        // if the segment was previously selected, change it back to selected

        for (var i = 0; i < segmentArray.length - 1; i++) {
          if (segmentArray[segmentArray.length - 1] === segmentArray[i]) {
            window[segmentPolyline].setStyle({color: segmentColorSelected, opacity: segmentOpacitySelected});
          }
        }

        // make the neighbor segments 'selectable' -------------------------------------------------

          for (var i = 0; i < window[currentMarker].options.neighbors.length; i++) {

            // create a segmentID based on the current marker and neighbor markers, one at a time
            segmentID = "segment" + markerArray[markerArray.length - 1] + window[currentMarker].options.neighbors[i];

            // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
            // then run the appropriate statements

            try {
              if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 1]) {
                // change the segment to selectable
                segmentPolyline = segmentID + "polyline";
                window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
              }
            }

            catch(err) {
              segmentID = "segment" + window[currentMarker].options.neighbors[i] + markerArray[markerArray.length - 1];
              // change the segment to selectable
              segmentPolyline = segmentID + "polyline";
              window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
            }
          }

          // if a neighbor segment was previously selected, make it 'selectableselected'

          // first, through try and catch, determine the segmentID

          for (var i = 0; i < window[currentMarker].options.neighbors.length; i++) {

            // create a segmentID based on the current marker and neighbor markers, one at a time
            segmentID = "segment" + markerArray[markerArray.length - 1] + window[currentMarker].options.neighbors[i];

            try {
              if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 1]) {
              }
            }

            catch(err) {
              segmentID = "segment" + window[currentMarker].options.neighbors[i] + markerArray[markerArray.length - 1];
            }

            // now compare the segmentID to all of the elements in segmentArray
            // if there's a match, change the segment to selectableselected

            for (var j = 0; j < segmentArray.length - 2; j++) {
              if (segmentID === segmentArray[j]) {
                segmentPolyline = segmentID + "polyline";
                window[segmentPolyline].setStyle({color: segmentColorSelectableSelected, opacity: segmentOpacitySelectableSelected});
              }
            }
          }

          // remove the new current segment from segmentArray

          segmentArray.pop();

          // change the segment to current

          segmentPolyline = segmentArray[segmentArray.length - 1] + "polyline";

          window[segmentPolyline].setStyle({color: segmentColorCurrent, opacity: segmentOpacityCurrent});

          // show segmentArray values in the console for debugging

          console.log(segmentArray);

      }

      if (routeLength === 1) {
        $("#routelength").text(routeLength.toFixed(2) + " mile");
      }
      else {
        $("#routelength").text(routeLength.toFixed(2) + " miles");
      }
    }

    else {

      // create a segmentID based on the previous and current markers

      segmentID = "segment" + markerArray[markerArray.length - 2] + markerArray[markerArray.length - 1];

      // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
      // then run the appropriate statements (this also defines how segment elevation gain is calculated)

      try {

        if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 2]) {

          // change the segment to unselected

          segmentPolyline = segmentArray[segmentArray.length - 1] + "polyline";

          window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});

          // if the segment was previously selected, change it back to selected

          for (var i = 0; i < segmentArray.length - 1; i++) {
            if (segmentArray[segmentArray.length - 1] === segmentArray[i]) {
              window[segmentPolyline].setStyle({color: segmentColorSelected, opacity: segmentOpacitySelected});
            }
          }

          // make the neighbor segments 'selectable' -------------------------------------------------

          for (var i = 0; i < window[currentMarker].options.neighbors.length; i++) {

            // create a segmentID based on the current marker and neighbor markers, one at a time
            segmentID = "segment" + markerArray[markerArray.length - 1] + window[currentMarker].options.neighbors[i];

            // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
            // then run the appropriate statements

            try {
              if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 1]) {
                // change the segment to selectable
                segmentPolyline = segmentID + "polyline";
                window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
              }
            }

            catch(err) {
              segmentID = "segment" + window[currentMarker].options.neighbors[i] + markerArray[markerArray.length - 1];
              // change the segment to selectable
              segmentPolyline = segmentID + "polyline";
              window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
            }
          }

          // if a neighbor segment was previously selected, make it 'selectableselected'

          // first, through try and catch, determine the segmentID

          for (var i = 0; i < window[currentMarker].options.neighbors.length; i++) {

            // create a segmentID based on the current marker and neighbor markers, one at a time
            segmentID = "segment" + markerArray[markerArray.length - 1] + window[currentMarker].options.neighbors[i];

            try {
              if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 1]) {
              }
            }

            catch(err) {
              segmentID = "segment" + window[currentMarker].options.neighbors[i] + markerArray[markerArray.length - 1];
            }

            // now compare the segmentID to all of the elements in segmentArray
            // if there's a match, change the segment to selectableselected

            for (var j = 0; j < segmentArray.length - 2; j++) {
              if (segmentID === segmentArray[j]) {
                segmentPolyline = segmentID + "polyline";
                window[segmentPolyline].setStyle({color: segmentColorSelectableSelected, opacity: segmentOpacitySelectableSelected});
              }
            }
          }

          // remove the new current segment from segmentArray

          segmentArray.pop();

          // show segmentArray values in the console for debugging

          console.log(segmentArray);

        }

      }

      catch(err) {

        segmentID = "segment" + markerArray[markerArray.length - 1] + markerArray[markerArray.length - 2];

        // change the segment to unselected

        segmentPolyline = segmentArray[segmentArray.length - 1] + "polyline";

        window[segmentPolyline].setStyle({color: segmentColorUnselected, opacity: segmentOpacityUnselected});

        // if the segment was previously selected, change it back to selected

        for (var i = 0; i < segmentArray.length - 1; i++) {
          if (segmentArray[segmentArray.length - 1] === segmentArray[i]) {
            window[segmentPolyline].setStyle({color: segmentColorSelected, opacity: segmentOpacitySelected});
          }
        }

        // make the neighbor segments 'selectable' -------------------------------------------------

          for (var i = 0; i < window[currentMarker].options.neighbors.length; i++) {

            // create a segmentID based on the current marker and neighbor markers, one at a time
            segmentID = "segment" + markerArray[markerArray.length - 1] + window[currentMarker].options.neighbors[i];

            // through try and catch, determine if the segmentID correctly matches its variable name or if the marker names should be flipped
            // then run the appropriate statements

            try {
              if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 1]) {
                // change the segment to selectable
                segmentPolyline = segmentID + "polyline";
                window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
              }
            }

            catch(err) {
              segmentID = "segment" + window[currentMarker].options.neighbors[i] + markerArray[markerArray.length - 1];
              // change the segment to selectable
              segmentPolyline = segmentID + "polyline";
              window[segmentPolyline].setStyle({color: segmentColorSelectable, opacity: segmentOpacitySelectable});
            }

          }

          // if a neighbor segment was previously selected, make it 'selectableselected'

          // first, through try and catch, determine the segmentID

          for (var i = 0; i < window[currentMarker].options.neighbors.length; i++) {

            // create a segmentID based on the current marker and neighbor markers, one at a time
            segmentID = "segment" + markerArray[markerArray.length - 1] + window[currentMarker].options.neighbors[i];

            try {
              if (window[segmentID].segmentMarkerA === markerArray[markerArray.length - 1]) {
              }
            }

            catch(err) {
              segmentID = "segment" + window[currentMarker].options.neighbors[i] + markerArray[markerArray.length - 1];
            }

            // now compare the segmentID to all of the elements in segmentArray
            // if there's a match, change the segment to selectableselected

            for (var j = 0; j < segmentArray.length - 2; j++) {
              if (segmentID === segmentArray[j]) {
                segmentPolyline = segmentID + "polyline";
                window[segmentPolyline].setStyle({color: segmentColorSelectableSelected, opacity: segmentOpacitySelectableSelected});
              }
            }
          }

          // remove the new current segment from segmentArray

          segmentArray.pop();

          // show segmentArray values in the console for debugging

          console.log(segmentArray);

      }
    }
  }
}
