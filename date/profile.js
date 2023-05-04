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
            <input type="radio" id="female" name="button-gender" checked>
            <label for="female">female</label>

            <input type="radio" id="male" name="button-gender">
            <label for="male">male</label>

            <input type="radio" id="other" name="button-gender">
            <label for="other">other</label>
          </div>

          <p class="title">Location</p>
          ${renderCountryDropdownList()}
          <p class="title">More About Me</p>
          <div class="profile-button about-me-button">
            <label class="button-about-me">
              <input type="checkbox" name="button" value="children">
              <span>have children</span>
            </label>

            <label class="button-about-me">
              <input type="checkbox" name="button" value="smoke">
              <span>smoke</span>
            </label>

            <label class="button-about-me">
              <input type="checkbox" name="button" value="drink">
              <span>drink</span>
            </label>

            <label class="button-about-me">
              <input type="checkbox" name="button" value="exercise">
              <span>exercise</span>
            </label>

            <label class="button-about-me">
              <input type="checkbox" name="button" value="religion">
              <span>have religion</span>
            </label>
          </div>

          <p class="title">Profile Questions</p>
        </div>

        <div class="category preference">
          <h3>Preference</h3>
          <p class="title looking-for">I am looking for...</p>
          <p class="title">Age</p>
          <input type="text" name="bio" value="${getUserData().preference.ageOf}">

          <p class="title">Gender</p>
          <div class="profile-button prefer-gender-button">
            <label class="button-prefer-gender">
              <input type="checkbox" name="button" value="girls">
              <span>girls</span>
            </label>
            <label class="button-prefer-gender">
              <input type="checkbox" name="button" value="boys">
              <span>boys</span>
            </label>
            <label class="button-prefer-gender">
              <input type="checkbox" name="button" value="other">
              <span>other</span>
            </label>
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

  const profileButtons = document.querySelectorAll(".gender-button label");
  const genderOfUser = getUserData().gender;

  document.getElementById(genderOfUser).checked = true;

}
