import { stickyNav } from "../stickyNav/stickyNav.js";

export function renderDatingPage() {
  let bodyDom = document.querySelector("body");
  bodyDom.innerHTML = `
    <h2 class="dateTitle">Explore</h2>
    ${stickyNav()}
  `;
}
