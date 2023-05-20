import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { getUserData } from "../helper.js";
import { renderMatchesPage } from "./matches.js";
import { renderFrontPage } from "../index.js";

let mainDom = document.querySelector("main");

export async function renderDatingPage() {
  mainDom.innerHTML = ``;
  mainDom.setAttribute("id", "date-main");

  let request = await fetch(`/PHP/date/explore.php?id=${getUserData().id}`);
  let userDATA = await request.json();

  renderCurrentDate(request, userDATA);

  document.querySelector(".profile").addEventListener("click", renderProfilePage);
  document.querySelector(".match").addEventListener("click", renderMatchesPage);
}

function renderCurrentDate(request, userDATA) {
  let navDom = document.querySelector(".sticky-nav");
  navDom.classList.remove("hide");
  navDom.innerHTML = stickyNav();

  let headerDOM = document.querySelector("header");
  headerDOM.innerHTML = `
  <div id="date-header">
    <img id="explore-logo" src="/PHP/DB/image/logo.png" alt="appLogo">
    <button class="logout">Logout</button>
  </div>`;

  let logout = document.querySelector(".logout");
  logout.addEventListener("click", logoutFromAccount);

  document
    .querySelector(".profile")
    .addEventListener("click", renderProfilePage);
  document
    .querySelector(".match")
    .addEventListener("click", renderMatchesPage);

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
    mainDom.querySelector("#noMatch").addEventListener("click", noMatch);
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
        alert(`its a match! ${response}`);
      }

      renderDatingPage();
    }

    async function noMatch() {
      let requestPOST = await fetch(
        new Request("/PHP/date/nomatch.php", {
          method: "POST",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(match),
        })
      );

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
