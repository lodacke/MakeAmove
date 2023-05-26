"use strict";

async function renderMatchesPage() {
  let mainDom = document.querySelector("main");

  mainDom.innerHTML = `
    <img id="loadingSpinner" src="MakeAmove/../PHP/DB/image/spinner.svg" alt="spinningLogo">
  `;

  mainDom.setAttribute("id", "matchesMain");
  let navBar = document.querySelector("nav");

  navBar.innerHTML = stickyNav();

  document.querySelector(".explore").addEventListener("click", renderDatingPage);
  document.querySelector(".profile").addEventListener("click", renderProfilePage);
  document.querySelector(".match").classList.add("current-page");

  let response = await fetch(`MakeAmove/..//PHP/date/showMatches.php?id=${getUserData().id}`);
  let matches = await response.json();

  if(response.status === 200){
    mainDom.innerHTML = `
      <h1> Matches </h1>
      <div id="containerForMatches">
        <div id="allMatches">
        </div>
      </div>
    `;

    createDivForMatch(matches);
  } else {
    mainDom.innerHTML = `
    <h2 id="noPotentialMatch"> Sorry, you have no matches yet... </h2> `;
  }

  function createDivForMatch(matches) {
    for(let i = 0; i < matches.length; i++) {
      let divForMatch = document.createElement("div");
      divForMatch.classList.add("userOfMatch");
      divForMatch.classList.add(`match${i}`);
      document.getElementById("allMatches").append(divForMatch);
      divForMatch.style.backgroundImage = `url("${matches[i].imageSource}")`;

      let pForMatch = document.createElement("p");
      pForMatch.classList.add("nameOfMatch");
      pForMatch.textContent = `${matches[i].name}`;
      divForMatch.append(pForMatch);

      divForMatch.addEventListener("click", e => {
        let mainPopup = document.getElementById("matchesMain");
        mainPopup.classList.add("makeContentLighter");

        let popup = document.createElement("div");
        popup.classList.add("popup");
        let popupBackground = document.createElement("div");
        popupBackground.classList.add("popup-background");
        let popupInfo = document.createElement("div");
        popupInfo.classList.add("popupInfoMatch");

        let bodyDom = document.querySelector("body");
        bodyDom.append(popup);
        popup.append(popupBackground);
        popupBackground.append(popupInfo);

        let facebookDom;
        let instagramDom;
        let bioDom;

        if(matches[i].general.facebook !== "") {
          facebookDom = matches[i].general.facebook;
        } else {
          facebookDom = "Not available";
        }

        if(matches[i].general.instagram !== "") {
          instagramDom =  matches[i].general.instagram;
        } else {
          instagramDom = "Not available";
        }

        if(matches[i].general.bio === "") {
          bioDom = "Your match hasn't added a bio.";
        } else {
          bioDom = matches[i].general.bio;
        }

        popupInfo.innerHTML = `
          <h2>${matches[i].name}, ${matches[i].age}</h2>
          <div class="infoMatch">
            <div class="boxForImageMatch">
              <img class="imageOfMatch" src="MakeAmove/../${matches[i].imageSource}" alt="image-of-match">
            </div>

            <img class="blackCross" src="MakeAmove/../PHP/DB/image/xmark-solid.svg" alt="black-cross">

            <div class="contactOfMatch">
              <p>This is how you can contact me</p>
              <div class="showContact">
                <div class="contactPhonenumber">
                  <img class="telephoneIcon" src="MakeAmove/../PHP/DB/image/telephone.png" alt="telephone-icon">
                    ${matches[i].general.tel}
                </div>

                <div class="contactFacebook">
                  <img class="facebookIcon" src="MakeAmove/../PHP/DB/image/facebook.png" alt="facebook-icon">
                  <p>${facebookDom}</p>
                </div>

                <div class="contactInstagram">
                  <img class="instagramIcon" src="MakeAmove/../PHP/DB/image/instagram.png" alt="instagram-icon">
                  <p> ${instagramDom} </p>
                </div>
              </div>
            </div>

            <div class="bioOfMatch"> ${bioDom} </div>
            <div class="interestsOfMatch">
              <p> This is my interestes </p>
              <div class="showAllInterests">
                <div class="eachInterests"> ${matches[i].interests[0]} </div>
                <div class="eachInterests"> ${matches[i].interests[1]} </div>
                <div class="eachInterests"> ${matches[i].interests[2]} </div>
                <div class="eachInterests"> ${matches[i].interests[3]} </div>
                <div class="eachInterests"> ${matches[i].interests[4]} </div>
              </div>
            </div>

            <div class="cityOfMatch">
              <img class="locationIcon" src="MakeAmove/../PHP/DB/image/location-icon.png" alt="location-icon">
              <div class="showCity"> ${matches[i].city} </div>
            </div>
          </div>
        `;

        let blackCross = document.querySelector(".blackCross");

        blackCross.addEventListener("click", e => {
            popup.remove();
            mainPopup.classList.remove("makeContentLighter");
        });
      });
    }
  }
}
