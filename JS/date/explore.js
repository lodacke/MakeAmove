import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { getUserData } from "../helper.js";

export async function renderDatingPage() {

  let userPreference = getUserData().preference;
  let userAge = getUserData().age;
  let userGender = getUserData().gender;
  let userEmail = getUserData().email;

  let requestPOST = await fetch( new Request("PHP/date/explore.php", {
    method: "POST",
    headers: {"Content-type":"application/json; charset=UTF-8"},
    body: JSON.stringify( {
      preference: userPreference, 
      age: userAge,
      gender: userGender,
      email: userEmail,
      })
    }));

    let response = await requestPOST.json();

    console.log(response);



  

  let bodyDom = document.querySelector("body");
  bodyDom.innerHTML = `
    ${stickyNav()}

    <h2 class="dateTitle">Explore</h2>
  `;

   document.querySelector(".profile").addEventListener("click", renderProfilePage);

}


