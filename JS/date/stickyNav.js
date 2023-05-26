"use strict";

export function stickyNav() {
  return `
    <ul>
      <li class="profile page">
        <img class="icon" src="../PHP/DB/image/profile.png" alt="profile">
        <p class="icon-name">Profile</p>
      </li>
      <li class="explore page">
        <img class="icon" src="../PHP/DB/image/explore.png" alt="explore">
        <p class="icon-name">Explore</p>
      </li>
      <li class="match page">
        <img class="icon" src="../PHP/DB/image/heart.png" alt="heart">
        <p class="icon-name">Match</p>
      </li>
    </ul>
  `;
}
