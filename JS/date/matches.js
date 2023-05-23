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
      
      //divForMatch.addEventListener(showMatchInfo);
    }

    
  
}
/*
function showMatchInfo() {
    let popup = document.createElement("div");
    popup.classList.add("infoAboutUser");
    console.log("nu");
    mainDom.append(popup);
  
}
*/

}


