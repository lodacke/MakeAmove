import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";

export function renderDatingPage() {
  let bodyDom = document.querySelector("body");
  bodyDom.innerHTML = `
    ${stickyNav()}
    <h2 class="dateTitle">Explore</h2>
  `;

   document.querySelector(".profile").addEventListener("click", renderProfilePage);

}


