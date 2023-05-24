"use strict";

import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { renderDatingPage } from "./explore.js";
import { getUserData } from "../helper.js";

export async function renderMatchesPage(){
  let mainDom = document.querySelector("main");
  mainDom.innerHTML = ``;
  mainDom.setAttribute("id", "matchesMain");
  let navBar = document.querySelector("nav");

  navBar.innerHTML = stickyNav();

  document.querySelector(".explore").addEventListener("click", renderDatingPage);
  document.querySelector(".profile").addEventListener("click", renderProfilePage);

  let response = await fetch(`/PHP/date/showMatches.php?id=${getUserData().id}`);
  let matches = await response.json();


  if(response.ok){
    console.log(matches);
    console.log(matches[0].name);

    mainDom.innerHTML = `
    <h1> Matches </h1>
    <div id="containerForMatches">
      <div id="allMatches"> 
      </div>
    </div>`;

    createDivForMatch(matches);

  } else {
    mainDom.innerHTML = `
    <h1 id="noMatchesFound"> Sorry, you have no matches yet... </h1> `;
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
          let popupBackground = document.createElement("div");
          popupBackground.classList.add("popupBackgroundMatch");
          console.log("nu");
    
          let popupInfo = document.createElement("div");
          popupInfo.classList.add("popupInfoMatch");

          let main = document.getElementById("matchesMain");
          main.append(popupBackground);
          popupBackground.append(popupInfo);
          console.log();

          popupInfo.innerHTML = `
            <h2> ${matches[i].name}</h2>
            <div class="infoMatch">
              <div class="showContact"
              <div class="bioOfMatch"> ${matches[i].general.bio} </div>
            </div
            `;

        });

      }

  }
/*
  function showMatchInfo() {
      let popupBackground = document.createElement("div");
      popupBackground.classList.add("popupBackgroundMatch");
      console.log("nu");
    
      let popupInfo = document.createElement("div");
      popupInfo.classList.add("popupInfoMatch");

      let main = document.getElementById("matchesMain");
      main.append(popupBackground);
      popupBackground.append(popupInfo);

      popupInfo.innerHTML = `
      <h2> ${matches[i].imageSource}</h2>`;


  }
*/

}


