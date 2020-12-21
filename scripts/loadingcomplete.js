/* check cookie status */

checkCookie();




// TEST

markerUR4.fire('click');
markerCN5.fire('click');
markerCN3.fire('click');
markerUR5.fire('click');
markerUR7.fire('click');
markerBT6.fire('click');
markerUR8.fire('click');
markerCL1.fire('click');
markerBR6.fire('click');

// zoom in to show the route

var sharedMarkerGroup = new L.featureGroup();

for (var i = 0; i < markerArray.length; i++) {
  sharedMarker = "marker" + markerArray[i];
  window[sharedMarker].addTo(sharedMarkerGroup);
}

map.fitBounds(sharedMarkerGroup.getBounds());







/* replace loading button with lets go button */

$("#splash-button").prop("disabled", false).html(
  "<span role='status' aria-hidden='false'></span>Let's Go!");
