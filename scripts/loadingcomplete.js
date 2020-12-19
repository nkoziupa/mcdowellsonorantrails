/* check cookie status */

checkCookie();

/* check url for shared route and create route if available */

var m = [];
var sharedMarkers = [];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
sharedMarkers = urlParams.getAll('m');

// console.log(urlParams.getAll('m'));

console.log(sharedMarkers);










/* replace loading button with lets go button */

$("#splash-button").prop("disabled", false).html(
  "<span role='status' aria-hidden='false'></span>Let's Go!");
