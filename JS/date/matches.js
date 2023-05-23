"use strict";

import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { renderDatingPage } from "./explore.js";
import { getUserData } from "../helper.js";

export async function renderMatchesPage(){
  let mainDom = document.querySelector("main");
  mainDom.innerHTML = ``;
  let navBar = document.querySelector("nav");

  navBar.innerHTML = stickyNav();

  document.querySelector(".explore").addEventListener("click", renderDatingPage);
  document.querySelector(".profile").addEventListener("click", renderProfilePage);
  document.querySelector(".match").classList.add("current-page");


  let request = await fetch(`/PHP/date/showMatches.php?id=${getUserData().id}`);
  let matches = await request.json();


if(request.ok){
  mainDom.innerHTML = `
<h1> ${matches.name} </h1>`; //Bara för å se om det funkade, snälla stryk!!
} else {
  mainDom.innerHTML = `
  <h1> ${matches} </h1>`
}


}
