"use strict";

let mainDom = document.querySelector("main");

async function renderDatingPage() {
  mainDom.innerHTML = ``;
  mainDom.setAttribute("id", "date-main");

  let navDom = document.querySelector("nav");
  navDom.classList.remove("hide");
  navDom.removeAttribute("id", "pageNavigation");
  navDom.classList.add("sticky-nav");
  navDom.innerHTML = stickyNav();

  let headerDOM = document.querySelector("header");
  headerDOM.setAttribute("id", "date-header");
  headerDOM.innerHTML = `
    <img id="date-logo" src="MakeAmove/../PHP/DB/image/logo.png" alt="appLogo">
  `;

  mainDom.innerHTML = `
      <img id="loadingSpinner" src="MakeAmove/..//PHP/DB/image/spinner.svg" alt="spinningLogo">
  `;

  let request = await fetch(`MakeAmove/../PHP/date/explore.php?id=${getUserData().id}`);
  let userDATA = await request.json();

  renderCurrentDate(request, userDATA);

  document.querySelector(".profile").addEventListener("click", renderProfilePage);
  document.querySelector(".match").addEventListener("click", renderMatchesPage);
  document.querySelector(".explore").classList.add("current-page");
}

function renderCurrentDate(request, userDATA) {
  if (request.status === 200) {
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
    mainDom.querySelector("#noMatch").addEventListener("click", (e) => {
      renderDatingPage();
    });

    mainDom.querySelector(".potentialMatchPic").addEventListener("click", () => showUser(userDATA));

    let match = {
      loggedInUser: getUserData().id,
      matchedUser: userDATA.id,
    };

    async function matches() {
      let requestPOST = await fetch(
        new Request("MakeAmove/../PHP/date/matches.php", {
          method: "POST",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(match),
        })
      );

      let response = await requestPOST.json();

      if (response !== "no match") {
        let popup = document.createElement("div");
        let popupContent = document.createElement("div");
        let popupBackground = document.createElement("div");
        let bodyDom = document.querySelector("body");
        bodyDom.append(popup);
        popup.classList.add("popup");
        mainDom.classList.add("makeContentLighter");
        popup.append(popupBackground);
        popupContent.classList.add("popup-content");
        popupBackground.append(popupContent);
        popupBackground.classList.add("popup-background");

        let facebookDom;
        let instagramDom;

        if (response.facebook !== "") {
          facebookDom = response.facebook;
        } else {
          facebookDom = "Not available";
        }
        if (response.instagram !== "") {
          instagramDom = response.instagram;
        } else {
          instagramDom = "Not available";
        }

        popupContent.innerHTML = `
          <img class="white-cross" src=".MakeAmove/../PHP/DB/image/white-cross.svg" alt="white-cross"></img>
          <h1>It's a match!</h1>
          <h3>Time to Make a Move...</h3>
          <p>You can reach your match via:</p>
          <div id="exploreMatchBoxContact">
            <div class="matchInfoBoxes">
              <img class="telephoneIconMatch" src="MakeAmove/../PHP/DB/image/telephone.png" alt="telephone-icon">
                ${response.phone}
            </div>

            <div class="matchInfoBoxes">
              <img class="facebookIconMatch" src="MakeAmove/../PHP/DB/image/facebook.png" alt="facebook-icon">
              ${facebookDom}
            </div>

            <div class="matchInfoBoxes">
              <img class="instagramIconMatch" src="MakeAmove/../PHP/DB/image/instagram.png" alt="instagram-icon">
              ${instagramDom}
            </div>
          </div>

          <p>(You can find your match later under "match")</p>
        `;

        let whiteCross = document.querySelector(".white-cross");
        whiteCross.addEventListener("click", (e) => {
          const popup = document.querySelector(".popup");
          popup.remove();
          mainDom.classList.remove("makeContentLighter");
        });
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
    <img class="white-cross-explore" src="MakeAmove/../PHP/DB/image/white-cross.svg" alt="white-cross-explore">
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
        <img class="locationIcon" src="MakeAmove/../PHP/DB/image/location-icon.png" alt="location-icon">
      <div class="showCity"> ${userDATA.city} </div>
      </div>
    </div>
  `;

  popupContent.querySelector(".white-cross-explore").addEventListener("click", closeExploreProfilePopup);
}

function closeExploreProfilePopup() {
  let popupContent = document.querySelector(".profile-pop");
  let popupBackground = document.querySelector(".popup-background");
  popupContent.classList.add("hide");
  popupBackground.classList.add("hide");
}
