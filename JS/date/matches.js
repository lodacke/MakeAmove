"use strict";

import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { renderDatingPage } from "./explore.js";

export function renderMatchesPage(){
  let bodyDom = document.querySelector("body");

  bodyDom.innerHTML = `
    ${stickyNav()}
  `;

  document.querySelector(".explore").addEventListener("click", renderDatingPage);
  document.querySelector(".profile").addEventListener("click", renderProfilePage);

  console.log("matches");
}
