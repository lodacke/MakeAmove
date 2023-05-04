import { stickyNav } from "../stickyNav/stickyNav.js";

export function renderProfilePage() {
  let bodyDom = document.querySelector("body");
  bodyDom.innerHTML = `
    <h2 class="profileTitle">Profile</h2>
    ${stickyNav()}
  `;
}
