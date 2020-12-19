/* check cookie status */

checkCookie();

/* check url for shared route and create route if available */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams.getAll('m')) // returns array of all markers;

console.log(m);










/* replace loading button with lets go button */

$("#splash-button").prop("disabled", false).html(
  "<span role='status' aria-hidden='false'></span>Let's Go!");
