import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { getUserData } from "../helper.js";
import { renderFrontPage } from "../index.js";

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
  
    let user = await requestPOST.json();

    console.log(user);


  let navDom = document.querySelector("#pageNavigation");
  navDom.innerHTML = `
   ${stickyNav()}
  `;

  let mainDom = document.querySelector("main");

  mainDom.innerHTML = `
    <h2>${user.name}</h2>
    <img src="${user.source}"></img>
    <h3> bio: </h3>
    <p id="bio"> ${user.interests.bio} </p>
    <div id="interestsBox"></div>
    <button id="logout">Loutout</button>`;

    let interests = [user.interests.interestsOne, user.interests.interestsTwo, user.interests.interestsThree, user.interests.interestsFour, user.interests.interestsFive];
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

