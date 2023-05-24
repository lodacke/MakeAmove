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
  document.querySelector(".match").classList.add("current-page");


  let response = await fetch(`/PHP/date/showMatches.php?id=${getUserData().id}`);
  let matches = await response.json();


  if(response.ok){
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
          let mainPopup = document.getElementById("matchesMain");
          mainPopup.classList.add("makeContentLighter");

          let bodyDom = document.querySelector("body");
          let popupInfo = document.createElement("div");
          popupInfo.classList.add("popupInfoMatch");
          bodyDom.append(popupInfo);

          popupInfo.innerHTML = `
            <h2> ${matches[i].name}</h2>
            <div class="infoMatch">
              <div class="boxForImageMatch">
                <img class="imageOfMatch" src="../${matches[i].imageSource}" alt="image-of-match">
              </div>
              <img class="blackCross" src="../PHP/DB/image/xmark-solid.svg" alt="black-cross">
              <div class="showContact"> 
                <p> This is how you can contact me </p>
                <div class="contactPhonenumber"> Phonenumber: ${matches[i].general.contact} </div>
              </div>
              <div class="bioOfMatch"> ${matches[i].general.bio} </div>
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
                <img class="locationIcon" src="../PHP/DB/image/location-icon.png" alt="location-icon">
                <div class="showCity"> ${matches[i].city} </div>
              </div>
            </div>
            `;
             
            let blackCross = document.querySelector(".blackCross");
            blackCross.addEventListener("click", e => {
                const popup = document.querySelector(".popupInfoMatch");
                const profileMain = document.getElementById("matchesMain");
                popup.remove();
                profileMain.classList.remove("makeContentLighter");
            });
        });
      }
  }
}


