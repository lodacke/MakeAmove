"use strict";

import { stickyNav } from "./stickyNav.js";
import { getUserData, renderCountryDropdownList } from "../helper.js";

const genders = ["Girls", "Boys", "Both"];
const interests = [
  "Traveling", "Reading", "Yoga", "Movies", "Astrology", "Beer", "Dancing",
  "Fishing", "Wine", "Art", "Stand-up Comedy", "Running", "Movie Night",
  "Smoking", "Snus", "Poetry", "Night Out", "Fishing", "Sport", "Singing",
  "Photographing", "Gaming", "Hiking", "Playing Instruments", "Cooking",
  "Board Games", "Gym", "Sailing", "Fashion", "Backpacking", "Music Festivals"];

export function renderProfilePage(event) {
  const userData = getUserData();
  const preferredGender = userData.preference.genderOf;

  let bodyDom = document.querySelector("body");
  // event.preventDefault();
  bodyDom.innerHTML = `
    <form class="profile-page-container">

      <div class="profile-top">
        <img class="user-picture" src="../PHP/DB/image/profile.png" alt="user-picture">
        <h2 class="user-name">[${userData.name}]</h2>
      </div>

      <div class="profile-main">
        <div class="category about-me">
          <h3>About me</h3>

          <div class="title">Bio</div>
          <textarea class="bio" name="bio" >${userData.bio}</textarea>

          <div class="interest">
            <div class="interest-title-limit">
              <div class="title">Interest</div>
              <div class="five-options">list up to 5 options</div>
            </div>
            <div class="interest-list-my required"></div>
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

          <div class="preferred-age">
            <div class="age-min">
              <div class="title">Minimum age</div>
              <input type="text" name="age" value="${userData.preference.ageOfMin}">
            </div>
            <div class="age-max">
              <div class="title">Maximum age</div>
              <input type="text" name="age" value="${userData.preference.ageOfMax}">
            </div>

          </div>

          <div class="interest">
            <div class="interest-title-limit">
              <div class="title">Interest</div>
              <div class="five-options">list up to 5 options</div>
            </div>
            <div class="interest-list-prefer required"></div>
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
        <p class="profile-message"></p>
        <button class="save-profile-button" type="submit">save</button>
      </div>

    </form>
    ${stickyNav()}
  `;

  colorThePreferredGender(preferredGender);
  renderInterestBoxes();

  // Change password
  const changePasswordButton = document.querySelector(".change-password");
  changePasswordButton.addEventListener("click", renderChangePasswordBox);

  // Save the form
  const form = bodyDom.querySelector('.profile-page-container');
  const submitButton = form.querySelector('.save-profile-button');
  submitButton.addEventListener("click", () => saveProfile(form));

  // submitButton.addEventListener("submit", (event) => {
  //   event.preventDefault();
  //   saveProfile(event, form);
  // });
}

function renderInterestBoxes() {
  const interestListMy = document.querySelector(".interest-list-my");
  const interestListPrefer = document.querySelector(".interest-list-prefer");

  interests.forEach(interest => {
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("required");
    const label = document.createElement("label");
    label.htmlFor = input.name;
    label.textContent = interest;
    div.append(input);
    div.append(label);

    const divDuplicate = div.cloneNode(true);

    div
    .querySelector('input')
    .name = 'my-' + interest.toLowerCase().replace(" ", "");

    divDuplicate
    .querySelector('input')
    .name = 'prefer-' + interest.toLowerCase().replace(" ", "");

    interestListMy.append(div);
    interestListPrefer.append(divDuplicate);
  });

  // Limit 5 options for each interest list
  let myInterestBoxes = document.querySelectorAll(".interest-list-my input[type='checkbox']");
  let myPreferredBoxes = document.querySelectorAll(".interest-list-prefer input[type='checkbox']");

  limitInterestBoxOptions(myInterestBoxes);
  limitInterestBoxOptions(myPreferredBoxes);
}

function limitInterestBoxOptions(boxes) {
  let count = 0;
  let checkedInterests = [];

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("change", e => {
      if (boxes[i].checked === true) {
        count++;
        checkedInterests.push(boxes[i].name);
        console.log(checkedInterests);
      } else {
        count--;
        let index = checkedInterests.indexOf(boxes[i].name);
        checkedInterests.splice(index, 1);
        console.log(checkedInterests);
      }
      if (count === 5) {
        boxes.forEach(box => {
          if (!box.checked) {
            box.disabled = true;
          }
        })
      } else {
        boxes.forEach(box => {
          box.disabled = false;
        })
      }
    })
  }
}

function renderChangePasswordBox(event) {
  event.preventDefault();

  let popup = document.createElement("div");
  let popupContent = document.createElement("form");
  let popupBackground = document.createElement("div");
  let profileMain = document.querySelector(".profile-main");
  let bodyDom = document.querySelector("body");
  bodyDom.appendChild(popup);
  popup.classList.add("popup");
  profileMain.classList.add("makeContentLighter");

  popup.appendChild(popupBackground);
  popupBackground.appendChild(popupContent);

  popupContent.classList.add("popup-content");

  popupContent.innerHTML = `
    <img class="white-cross" src="../PHP/DB/image/white-cross.svg" alt="white-cross">

    <div class="password-row">
      <label>Old password:</label>
      <div class="password-field">
        <input type="password" class="password-input" name="passwordOld" autocomplete="off">
        <img src="../PHP/DB/image/eye.png" alt="show-password" id="show-password">
      </div>
    </div>

    <div class="password-row">
      <label>New password:</label>
      <div class="password-field">
        <input type="password" class="password-input" name="passwordNew" autocomplete="off">
        <img src="../PHP/DB/image/eye.png" alt="show-password" id="show-password">
      </div>
    </div>

    <div class="password-row">
      <label>Repeated new password:</label>
      <div class="password-field">
        <input type="password" class="password-input" name="passwordRepeat" autocomplete="off">
        <img src="../PHP/DB/image/eye.png" alt="show-password" id="show-password">
      </div>
    </div>

    <p class="password-message"></p>
    <button class="save-password">Save</button>

  `;

  popupBackground.classList.add("popup-background");

  const allShowPasswordIcons = popupContent.querySelectorAll("#show-password");
  const whiteCross = popupContent.querySelector(".white-cross");

  allShowPasswordIcons.forEach(icon => {
    icon.addEventListener("click", () => showPassword(icon));
  });
  whiteCross.addEventListener("click", closeChangePasswordBox);
  popupContent.addEventListener("submit", saveNewPassword);
}

async function saveNewPassword(event) {
  event.preventDefault();

  let message = document.querySelector(".password-message");

  try {
    let response = await fetch("../PHP/date/changePassword.php", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: getUserData().email,
        passwordOld: this.elements.passwordOld.value,
        passwordNew: this.elements.passwordNew.value,
        passwordRepeat: this.elements.passwordRepeat.value,
      }),
    });

    let data = await response.json();

    if (!response.ok) {
      message.innerHTML = `<span>${data.message}</span>`;
    } else {
      message.innerHTML = `<span>Password has been changed successfully! ≧◡≦</span>`;

      // const userData = JSON.parse(localStorage.getItem("user"));
      // userData.password = data.password;
      // localStorage.setItem("user", JSON.stringify(userData));
    }
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }

}

function closeChangePasswordBox() {
  const popup = document.querySelector(".popup");
  const profileMain = document.querySelector(".profile-main");
  popup.remove();
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
        <label class="${gender}" for="${gender}">
          ${gender}
        </label>
      `;
  }

  html += '</div>';
  return html;
}

function colorThePreferredGender(preferredGender) {
  genders.forEach(function (gender) {
    if (gender === preferredGender) {
      const preferredGenderButton = document.querySelector(`#${gender}`);
      preferredGenderButton.checked = true;
    }
  });
}

async function saveProfile(form) {
  event.preventDefault();
  let message = document.querySelector(".profile-message");
  const formData = new FormData(form);
  console.log(formData);

  formData.append("email", getUserData().email);

  // for (const pair of formData.entries()) {
  //   // console.log(pair[0] + ': ' + pair[1]);
  // }

  try {
    let response = await fetch("../PHP/date/profile.php", {
      method: "PATCH",
      body: formData
    });
    console.log(response);

    let result = await response.json();
    console.log(result);

  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }

  // let result = await response.json();
  // console.log(result);
    // .then(response => {
    //   console.log("response", response);

    //   if (!response.ok) {
    //     console.log("Failed to update user data");
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   localStorage.setItem("user", JSON.stringify(data));
    // })
    // .catch(error => {
    //   console.error(error);
    // });
}
