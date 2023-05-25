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
    <img id="explore-logo" src="/PHP/DB/image/logo.png" alt="appLogo">
    <button class="logout">Logout</button>
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
      <img id="potentialMatchPic" src="${userDATA.imageSource}"></img>
      <div id="potentialMatchInfo">
        <div>${userDATA.name}</div>
        <div>${userDATA.age} </div>
      </div>
      <div id="matchButtons">
        <button id="match">Yes</button>
        <button id="noMatch">No</button>
      </div>
    </div>
  `;

    mainDom.querySelector("#match").addEventListener("click", matches);
    mainDom.querySelector("#noMatch").addEventListener("click", e => {
      renderDatingPage();
    });
    mainDom
      .querySelector("#potentialMatchPic")
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
        popup.classList.add("popup");
        mainDom.classList.add("makeContentLighter");
        popup.append(popupBackground);
        popupBackground.append(popupContent);
        popupContent.classList.add("popup-content");

        let facebookDom;
        let instagramDom;

        if(response.facebook === "" || response.instagram === ""){
          facebookDom = "Not available";
          instagramDom = "Not available";
        } else {
          facebookDom = response.facebook;
          instagramDom = response.instagram;
        }

        popupContent.innerHTML = `
          <img class="white-cross" src="../PHP/DB/image/white-cross.svg" alt="white-cross"></img>
          <h1>It's a match!</h1>
          <h3>Time to Make a Move...</h3>
          <p>You can reach your match via:</p>
          <div id="exploreMatchBoxContact">
            phone: ${response.phone}
            <br>
            facebook: ${facebookDom}
            <br>
            instagram: ${instagramDom}</p>
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
  let profilePopup = document.createElement("div");
  mainDom.appendChild(profilePopup);
  profilePopup.classList.add("profile-pop");

  profilePopup.innerHTML = `
    <img class="white-cross" src="../PHP/DB/image/white-cross.svg" alt="white-cross">
    <div class="explore-profile">
      <h3>${userDATA.name}, ${userDATA.age}y/o (${userDATA.city})</h3>
      <img class="explore-profile-image" src="${userDATA.imageSource}"></img>
      <h3>Bio:</h3>
      <div class="explore-bio">${userDATA.general.bio}</div>
      <h3>Interests:</h3>
      <ul class="explore-interests-boxes">
        <li>${userDATA.interests[0]}</li>
        <li>${userDATA.interests[1]}</li>
        <li>${userDATA.interests[2]}</li>
        <li>${userDATA.interests[3]}</li>
        <li>${userDATA.interests[4]}</li>
      </ul>
    </div>
  `;

  profilePopup
    .querySelector(".white-cross")
    .addEventListener("click", closeExploreProfilePopup);
}

function closeExploreProfilePopup() {
  let profilePopup = document.querySelector(".profile-pop");
  profilePopup.classList.add("hide");
}
