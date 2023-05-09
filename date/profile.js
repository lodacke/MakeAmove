import { stickyNav } from "../stickyNav/stickyNav.js";
import { getUserData, renderCountryDropdownList } from "../helper.js";

const genders = ["girls", "boys", "both"];

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
        <div class="category about-me">
          <h3>About me</h3>

          <div class="title">Bio</div>
          <input type="text" name="bio" value="${userData.bio}">

          <div class="interest">
            <div class="title">Interest</div>
            <div class="five-options">list up to 5 options</div>
          </div>

          <div class="title">Location</div>
          ${renderCountryDropdownList()}

          <div class="age">
            <div class="title">Age</div>
            <input type="text" name="age" value="${userData.age}">
          </div>

        </div>

        <div class="category preference">
          <h3>Preference</h3>

          <div class="prefer-age">
            <div class="title">Age</div>
            <input type="text" name="ageOf" value="${userData.preference.ageOfMin}">
            <input type="text" name="ageOf" value="${userData.preference.ageOfMax}">
          </div>

          <div class="interest">
            <div class="title">Interest</div>
            <div class="five-options">list up to 5 options</div>
          </div>

          <div class="title">I am looking for</div>

          ${createPreferGenderButton(genders)}


        </div>

        <div class="category user-setting">
          <h3>User Setting</h3>
          <div id="email">
            <div class="title">Email:</div>
            <div class="emailaddress">${userData.email}</div>
          </div>

          <div class="user-setting-button">
            <button class="change-password">Change password</button>
            <button class="delete-password">Delete account</button>
          </div>

        </div>

      </div>

      <div class="profile-sumbit">
        <button class="save-profile-button" type="submit">save</button>
      </div>

    </form>
    ${stickyNav()}
  `;

  // Save the form
  const form = document.querySelector('.profile-page-container');
  const submitButton = form.querySelector('.save-profile-button');
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

  const changePasswordButton = document.querySelector(".change-password");
  changePasswordButton.addEventListener("click", renderChangePasswordBox)
}

function renderChangePasswordBox(event) {
  event.preventDefault();

  let overlay = document.createElement("div");
  let overlayContent = document.createElement("div");
  let overlayBackground = document.createElement("div");
  let profileMain = document.querySelector(".profile-main");
  let profileContainer = document.querySelector(".profile-page-container");
  profileContainer.appendChild(overlay);
  overlay.classList.add("overlay");
  profileMain.classList.add("makeContentLighter");

  overlay.appendChild(overlayBackground);
  overlayBackground.appendChild(overlayContent);

  overlayContent.classList.add("overlay-content");

  overlayContent.innerHTML = `
    <img class="white-cross" src="image/white-cross.svg" alt="white-cross">

    <div class="password-row">
      <div>Old password:</div>
      <div class="password-field">
        <input type="password" class="password-input" autocomplete="off">
        <img src="image/eye.png" alt="show-password" id="show-password">
      </div>
    </div>

    <div class="password-row">
      <div>New password:</div>
      <div class="password-field">
        <input type="password" class="password-input" autocomplete="off">
        <img src="image/eye.png" alt="show-password" id="show-password">
      </div>
    </div>

    <div class="password-row">
      <div>Repeat new password:</div>
      <div class="password-field">
        <input type="password" class="password-input" autocomplete="off">
        <img src="image/eye.png" alt="show-password" id="show-password">
      </div>
    </div>

    <button class="save-password">Save</button>
  `;

  overlayBackground.classList.add("overlay-background");

  const allShowPasswordIcons = overlayContent.querySelectorAll("#show-password");
  const whiteCross = overlayContent.querySelector(".white-cross");
  console.log(whiteCross);

  allShowPasswordIcons.forEach(icon => {
    icon.addEventListener("click", () => showPassword(icon));
  });
  whiteCross.addEventListener("click", closeChangePasswordBox);
}

function closeChangePasswordBox() {
  const overlay = document.querySelector(".overlay");
  const profileMain = document.querySelector(".profile-main");
  overlay.remove();
  profileMain.classList.remove("makeContentLighter");
}

function showPassword(checkbox) {
  let passwordOutlook = checkbox.parentNode.querySelector(".password-input");
  if (passwordOutlook.type === "password") {
    passwordOutlook.type = "text";
  } else {
    passwordOutlook.type = "password";
  }
}

function createPreferGenderButton(genders) {
  let html = '<div class="profile-button prefer-gender-button">';

  for (let gender of genders) {
    html += `
        <input type="checkbox" name="genderOf" value="${gender}" id="${gender}" class="info-button">
      `;
    html += `
        <label for="${gender}">
          ${gender}
        </label>
      `;
  }

  html += '</div>';
  return html;
}
