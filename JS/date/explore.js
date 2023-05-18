import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { getUserData } from "../helper.js";
import { renderMatchesPage } from "./matches.js";

export async function renderDatingPage() {
  let request = await fetch(`/PHP/date/explore.php?email=${getUserData().email}`);

  let userDATA = await request.json();

  // console.log(userDATA);
  let bodyDom = document.querySelector("body");

  let headerDom = document.querySelector("header");
  headerDom.classList.add("header-logo");
  headerDom.innerHTML =
    `<img class="explore-logo" src="../PHP/DB/image/logo.png" alt="logo">
  `;
  let mainDom = document.querySelector("main");
  mainDom.setAttribute("id", "explore-main")

  mainDom.innerHTML = `
     <div id="potentialMatch">
      <div id="potentialMatchPicIndo">
        <img id="potentialMatchPic" src="${userDATA.imageSource}"></img>
        <div id="potentialMatchInfo">
          <div>${userDATA.name}</div>
          <button>Info</button>
          <div>${userDATA.age}</div>
        </div>
      </div>
       <p> ${userDATA.general.bio}</p>
       <div id="interestsBox"></div>
     </div>
     <div id="matchButtons">
       <button id="match">Yes</button>
       <button id="noMatch">No</button>
     </div>
   `;

  let navBar = document.querySelector(".sticky-nav");
  navBar.classList.remove("hide");
  navBar.innerHTML = stickyNav();

  document.querySelector(".profile").addEventListener("click", renderProfilePage);
  document.querySelector(".match").addEventListener("click", renderMatchesPage);

  // let interests =
  //   [userDATA.interests.interestsOne,
  //   userDATA.interests.interestsTwo,
  //   userDATA.interests.interestsThree,
  //   userDATA.interests.interestsFour,
  //   userDATA.interests.interestsFive
  // ];

  // let interestsBox = document.getElementById("interestsBox");

  // interests.forEach(intrest => {
  //   const div = document.createElement("div");
  //   div.textContent = intrest;
  //   interestsBox.append(div);
  // });

  mainDom.querySelector("#match").addEventListener("click", matches);
  mainDom.querySelector("#noMatch").addEventListener("click", noMatch);

  let match = {
    "loggedInUser": getUserData().email,
    "matchedUser": userDATA.email,
  };

  async function matches(){
    let requestPOST = await fetch( new Request("/PHP/date/matches.php", {
      method: "POST",
      headers: {"Content-type":"application/json; charset=UTF-8"},
      body: JSON.stringify(match),
      }));

    let response = await requestPOST.json();

    renderDatingPage();
  }

  async function noMatch(){
    let requestPOST = await fetch( new Request("/PHP/date/nomatch.php", {
      method: "POST",
      headers: {"Content-type":"application/json; charset=UTF-8"},
      body: JSON.stringify(match),
    }));



    renderDatingPage();
  }

  document.querySelector(".profile").addEventListener("click", renderProfilePage);
  document.querySelector(".match").addEventListener("click", renderMatchesPage);
}


 //----- HÄR FINNS FÖRSÖKET TILL NAV-DOM FUNKTIONEN --------
//   let navDom = document.querySelector("#pageNavigation");
//   navDom.innerHTML = `
//    ${stickyNav()}
//   `;

// }



