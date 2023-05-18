"use strict";

import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { renderDatingPage } from "./explore.js";

export function renderMatchesPage(){
  let mainDom = document.querySelector("main");
  mainDom.innerHTML = ``;
  let navBar = document.querySelector(".sticky-nav");

  navBar.innerHTML = stickyNav();

  document.querySelector(".explore").addEventListener("click", renderDatingPage);
  document.querySelector(".profile").addEventListener("click", renderProfilePage);

  console.log("matches");
}
