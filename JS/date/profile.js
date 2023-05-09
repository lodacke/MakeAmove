import { stickyNav } from "./stickyNav.js";
import { getUserData, renderCountryDropdownList } from "../helper.js";

export function renderProfilePage(event) {
  const userData = getUserData();

  let bodyDom = document.querySelector("body");
  // event.preventDefault();
  bodyDom.innerHTML = `
    <form class="profile-page-container">

      <div class="profile-top">
        <img class="user-picture" src="image/profile.png" alt="user-picture">
        <h2 class="user-name">[${userData.name}]</h2>
      </div>

      <div class="profile-main">
        <div class="category basic-info">
          <h3>Basic Info</h3>
          <p class="title">Bio</p>
          <input type="text" name="bio" value="${userData.bio}">
          <p class="title">Age</p>
          <input type="text" name="age" value="${userData.age}">
          <p class="title">Gender</p>

          <div class="profile-button gender-button">
            <input type="radio" value="female" id="female" name="gender" class="info-button">
            <label for="female">female</label>

            <input type="radio" value="male" id="male" name="gender" class="info-button">
            <label for="male">male</label>

            <input type="radio" value="other" id="other" name="gender" class="info-button">
            <label for="other">other</label>
          </div>

          <p class="title">Location</p>
          ${renderCountryDropdownList()}
          <p class="title">Email</p>
          <p class="email">${userData.email}</p>
          <p class="title">More About Me</p>
          <div class="profile-button about-me-button">
            <input type="checkbox" name="haveChildren" value="yes" id="children" class="info-button">
            <label for="children">
              have children
            </label>

            <input type="checkbox" name="smoke" value="yes" id="smoke" class="info-button">
            <label for="smoke">
              smoke
            </label>

            <input type="checkbox" name="drink" value="yes" id="drink" class="info-button">
            <label for="drink">
              drink
            </label>

            <input type="checkbox" name="exercise" value="yes" id="exercise" class="info-button">
            <label for="exercise">
              exercise
            </label>

            <input type="checkbox" name="haveReligion" value="yes" id="religion" class="info-button">
            <label for="religion">
              have religion
            </label>
          </div>

          <p class="title">Profile Questions</p>
        </div>

        <div class="category preference">
          <h3>Preference</h3>
          <p class="looking-for">I am looking for...</p>
          <p class="title">Age</p>
          <input type="text" name="ageOf" value="${userData.preference.ageOf}">

          <p class="title">Gender</p>
          <div class="profile-button prefer-gender-button">
            <input type="checkbox" name="genderOf" value="girls" id="girls" class="info-button">
            <label for="girls">
              girls
            </label>

            <input type="checkbox" name="genderOf" value="boys" id="boys" class="info-button">
            <label for="boys">
              boys
            </label>

            <input type="checkbox" name="genderOf" value="neither" id="neither" class="info-button">
            <label for="neither">
              neither
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
        <button class="bottom-button save" type="submit">save</button>
      </div>

    </form>
    ${stickyNav()}
  `;

  // Check the user's gender button
  const genderOfUser = userData.gender;
  document.getElementById(genderOfUser).checked = true;

  // Save the form
  const form = document.querySelector('.profile-page-container');
  const submitButton = form.querySelector('.save');
  submitButton.addEventListener('click', submitForm);

  function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(form);

    // formData.append("name", getUserData().name);
    formData.append("email", getUserData().email);

    for(const pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    fetch("date/profile.php", {
      method: "POST",
      body: formData
    })
    .then(response => {
      console.log("response", response);

      // if (!response.ok) {
      //   console.log("Failed to update user data");
      // }
      return response.json();
    })
    .then(data => {
      localStorage.setItem("user", JSON.stringify(data));
    })
    .catch(error => {
      console.error(error);
    });
  }

}
