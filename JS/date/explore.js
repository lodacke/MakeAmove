import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { getUserData } from "../helper.js";
import { renderMatchesPage } from "./matches.js";
import { renderFrontPage } from "../index.js";

let mainDom = document.querySelector("main");

export async function renderDatingPage() {
  mainDom.innerHTML = ``;
  mainDom.setAttribute("id", "date-main");

  let navDom = document.querySelector("nav");
  navDom.classList.remove("hide");
  navDom.removeAttribute("id", "pageNavigation");
  navDom.classList.add("sticky-nav");
  navDom.innerHTML = stickyNav();

  let headerDOM = document.querySelector("header");
  headerDOM.setAttribute("id", "date-header")
  headerDOM.innerHTML = `
    <img id="date-logo" src="/PHP/DB/image/logo.png" alt="appLogo">
    <button class="logout">Logout</button>
  `;

  mainDom.innerHTML = `
      <img id="loadingSpinner" src="/PHP/DB/image/spinner.svg" alt="spinningLogo">
  `;

  let request = await fetch(`/PHP/date/explore.php?id=${getUserData().id}`);
  let userDATA = await request.json();

  renderCurrentDate(request, userDATA);

  document.querySelector(".profile").addEventListener("click", renderProfilePage);
  document.querySelector(".match").addEventListener("click", renderMatchesPage);
  document.querySelector(".explore").classList.add("current-page");

  let logout = document.querySelector(".logout");
  logout.addEventListener("click", logoutFromAccount);
}

function renderCurrentDate(request, userDATA) {

  if (request.status == 200) {
    mainDom.innerHTML = `
    <div id="explore-main">
      <div id="containerPotentialMatch">
        <img class="potentialMatchPic" src="${userDATA.imageSource}"></img>
        <div class="potentialMatchInfo">
          <div>${userDATA.name},</div>
          <div>${userDATA.age} </div>
        </div>
      </div>
      <div id="matchButtons">
        <button id="noMatch">No</button>
        <button id="match">Yes</button>
      </div>
    </div>
  `;

    mainDom.querySelector("#match").addEventListener("click", matches);
    mainDom.querySelector("#noMatch").addEventListener("click", e => {
      renderDatingPage();
    });
    mainDom
      .querySelector(".potentialMatchPic")
      .addEventListener("click", () => showUser(userDATA));


    let match = {
      loggedInUser: getUserData().id,
      matchedUser: userDATA.id,
    };

    async function matches() {
      let requestPOST = await fetch(
        new Request("/PHP/date/matches.php", {
          method: "POST",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(match),
        })
      );

      let response = await requestPOST.json();

      if (response != "no match") {

        let popup = document.createElement("div");
        let popupContent = document.createElement("div");
        let popupBackground = document.createElement("div");
        let bodyDom = document.querySelector("body");
        bodyDom.append(popup);
        popup.classList.add(".popup");
        mainDom.classList.add("makeContentLighter");
        popup.append(popupBackground);
        popupContent.classList.add("popup-content");
        popupBackground.append(popupContent);
        popupBackground.classList.add("popup-background");

        let facebookDom;
        let instagramDom;

         if(response.facebook !== ""){
            facebookDom = response.facebook;
         } else {
            facebookDom = "Not available";
         } 
         if(response.instagram !== "") {  
          instagramDom =  response.instagram;
        } else {
          instagramDom = "Not available";
        }

        popupContent.innerHTML = `
          <img class="white-cross" src="../PHP/DB/image/white-cross.svg" alt="white-cross"></img>
          <h1>It's a match!</h1>
          <h3>Time to Make a Move...</h3>
          <p>You can reach your match via:</p>
          <div id="exploreMatchBoxContact">
          <div class="matchInfoBoxes">
            <img class="telephoneIconMatch" src="../PHP/DB/image/telephone.png" alt="telephone-icon">
              ${response.phone}
            </div>
            <div class="matchInfoBoxes">
          <img class="facebookIconMatch" src="../PHP/DB/image/facebook.png" alt="facebook-icon"> 
            ${facebookDom}
            </div>
            <div class="matchInfoBoxes">
          <img class="instagramIconMatch" src="../PHP/DB/image/instagram.png" alt="instagram-icon"> 
            ${instagramDom}</p>
            </div>
          </div>

            <p> (You can find your match later under "matches" in the navigation-bar.)
          </p>
        `;

        let whiteCross = document.querySelector(".white-cross");
          whiteCross.addEventListener("click", e => {
          const popup = document.querySelector(".popup");
          popup.remove();
          mainDom.classList.remove("makeContentLighter");
        })
      }

      renderDatingPage();
    }

  } else {
    mainDom.innerHTML = `
  <div id="noPotentialMatch">
    <p> No potential matches are found right now :(</p>
  </div>
  `;
  }
}

function logoutFromAccount() {
  window.localStorage.removeItem("user");
  renderFrontPage();

  let navBar = document.querySelector(".sticky-nav");
  navBar.classList.add("hide");
}

function showUser(userDATA) {
  let container = document.getElementById("container");
  let popup = document.createElement("div");
  let popupBackground = document.createElement("div");
  popupBackground.classList.add("popup-background");
  let popupContent = document.createElement("div");
  container.insertAdjacentElement("afterend", popup);
  popup.appendChild(popupBackground);
  popupBackground.appendChild(popupContent);

  popup.classList.add("popup");
  popupContent.classList.add("profile-pop");

  popupContent.innerHTML = `
    <img class="white-cross-explore" src="../PHP/DB/image/white-cross.svg" alt="white-cross-explore">
    <div class="explore-profile">
      <h2>${userDATA.name}, ${userDATA.age}</h2>
      <div class="boxForImageMatch">
        <img class="imageOfMatch" src="${userDATA.imageSource}"></img>
      </div>
      <div class="explore-bio">${userDATA.general.bio}</div>
      <p>Interests </p>
      <ul class="explore-interests-boxes">
        <li>${userDATA.interests[0]}</li>
        <li>${userDATA.interests[1]}</li>
        <li>${userDATA.interests[2]}</li>
        <li>${userDATA.interests[3]}</li>
        <li>${userDATA.interests[4]}</li>
      </ul>
      <div class="cityOfMatch"> 
        <img class="locationIcon" src="../PHP/DB/image/location-icon.png" alt="location-icon">
      <div class="showCity"> ${userDATA.city} </div>
      </div>
    </div>
  `;

  popupContent
    .querySelector(".white-cross-explore")
    .addEventListener("click", closeExploreProfilePopup);
}

function closeExploreProfilePopup() {
  let popupContent = document.querySelector(".profile-pop");
  let popupBackground = document.querySelector(".popup-background");
  popupContent.classList.add("hide");
  popupBackground.classList.add("hide");
}
