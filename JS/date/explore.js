import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { getUserData } from "../helper.js";
import { renderFrontPage } from "../index.js";

export async function renderDatingPage() {

  let userPreference = getUserData().preference;
  let userAge = getUserData().age;
  let userGender = getUserData().gender;
  let userEmail = getUserData().email;

  let request = await fetch(`/PHP/date/explore.php?email=${getUserData().email}`);
  
    let userDATA = await request.json();

    console.log(userDATA);


  let navDom = document.querySelector("#pageNavigation");
  navDom.innerHTML = `
   ${stickyNav()}
  `;

  let mainDom = document.querySelector("main");

  mainDom.innerHTML = `
    <h2>${userDATA.name}</h2>
    <img src="${userDATA.source}"></img>
    <h3> bio: </h3>
    <p id="bio"> ${userDATA.interests.bio} </p>
    <div id="interestsBox"></div>
    <button id="logout">Loutout</button>`;

    let interests = [userDATA.interests.interestsOne, userDATA.interests.interestsTwo, userDATA.interests.interestsThree, userDATA.interests.interestsFour, userDATA.interests.interestsFive];
    let interestsBox = document.getElementById("interestsBox");

    interests.forEach(intrest => {
      const div = document.createElement("div"); 
      div.textContent = intrest;
      interestsBox.append(div);

    });

   document.querySelector(".profile").addEventListener("click", renderProfilePage);
   document.querySelector(".match").addEventListener("click", renderProfilePage);
   document.querySelector("#logout").addEventListener("click", onclickLogout)

}


    function onclickLogout() {

            window.localStorage.clear();
            renderFrontPage()
        }

