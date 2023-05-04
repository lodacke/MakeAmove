import { stickyNav } from "../stickyNav/stickyNav.js";
import { getUserData, renderCountryDropdownList } from "../helper.js";

export function renderProfilePage(event) {
  let bodyDom = document.querySelector("body");
  // event.preventDefault();
  bodyDom.innerHTML = `
    <form class="profile-page-container">

      <div class="profile-top">
        <img class="user-picture" src="image/profile.png" alt="user-picture">
        <h2 class="user-name">[${getUserData().name}]</h2>
      </div>


      <div class="profile-main">
        <div class="category basic-info">
          <h3>Basic Info</h3>
          <p class="title">Bio</p>
          <input type="text" name="bio">
          <p class="title">Age</p>
          <input type="text" name="bio" value="${getUserData().age}">
          <p class="title">Gender</p>
          <div class="profile-button gender-button">
            <button>female</button>
            <button>male</button>
            <button>other</button>
          </div>
          <p class="title">Location</p>
          ${renderCountryDropdownList()}
          <p class="title">More About Me</p>
          <div class="profile-button about-me-button">
            <button>have children</button>
            <button>smoke</button>
            <button>drink</button>
            <button>exercise</button>
            <button>have religion</button>
          </div>
          <p class="title">Profile Questions</p>
        </div>

        <div class="category preference">
          <h3>Preference</h3>
          <p class="title looking-for">I am looking for...</p>
          <p class="title">Age</p>
          <input type="text" name="bio" value="${getUserData().preference.ageOf}">
          <p class="title">Gender</p>
          <div class="profile-button gender-button">
            <button>Girls</button>
            <button>Boys</button>
            <button>Other</button>
          </div>
          <div class="interest">
            <p class="title">Interest</p>
            <p class="five-options">list up to 5 options</p>
          </div>
        </div>
      </div>

      <div class="password-sumbit">
        <button class="bottom-button change-password">Change password</button>
        <input class="bottom-button save" type="submit" value="save">
      </div>

    </form>
    ${stickyNav()}
  `;
}
