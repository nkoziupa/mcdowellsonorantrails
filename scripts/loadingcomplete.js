/* check cookie status */

checkCookie();

/* replace loading button with lets go button */

$("#splash-button").prop("disabled", false).html(
  "<span role='status' aria-hidden='false'></span>Let's Go!");
