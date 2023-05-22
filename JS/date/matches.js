"use strict";

import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { renderDatingPage } from "./explore.js";
import { getUserData } from "../helper.js";

export async function renderMatchesPage(){
  let mainDom = document.querySelector("main");
  mainDom.innerHTML = ``;
  let navBar = document.querySelector(".sticky-nav");

  navBar.innerHTML = stickyNav();

  document.querySelector(".explore").addEventListener("click", renderDatingPage);
  document.querySelector(".profile").addEventListener("click", renderProfilePage);

  let request = await fetch(`/PHP/date/showMatches.php?id=${getUserData().id}`);
  let matches = await request.json();

mainDom.innerHTML = `
<h1> ${matches.name} </h1>`; //Bara för å se om det funkade, snälla stryk!!

}
