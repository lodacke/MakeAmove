"use strict";

const genders = ["female", "male", "both"];
const interests = [
  "Art", "Photographing", "Fashion", "Writing", "Poetry", "Reading", "Movies & TV shows", "Music Festivals", "Stand-up Comedy", "Board Games", "Gaming", "Cooking", "Beer", "Wine", "Night Out", "Dancing", "Singing", "Playing Instruments", "Sport", "Running", "Hiking", "Yoga", "Gym", "Backpacking", "Traveling", "Sailing", "Gardening", "Fishing", "Smoking", "Snus", "Astrology",
];

async function renderProfilePage() {
  let response = await fetch(`MakeAmove/../PHP/date/getProfile.php?id=${getUserData().id}`);

  let mainDom = document.querySelector("main");
    mainDom.innerHTML = `
      <img id="loadingSpinner" src="MakeAmove/../PHP/DB/image/spinner.svg" alt="spinningLogo">
  `;

  const userData = await response.json();

  mainDom.innerHTML = `
    <form class="profile-page-container">

      <div class="profile-top">
        <img class="user-picture" src="${userData.imageSource}" alt="user-picture">
        <h2 class="user-name">${userData.name}</h2>
      </div>

      <div class="profile-main">
        <div class="category about-me">
          <h3>About me</h3>

          <div class="title">Bio</div>
          <textarea class="profileBio" name="bio" placeholder="Write something about yourself">${
            userData.general.bio || ""}</textarea>

          <div class="contactMethods"> My contact details
            <div class="telephone-number">
              <img class="telephone-icon" src="MakeAmove/../PHP/DB/image/telephone.png" alt="telephone-icon">
              <input type="text" name="tel" placeholder="Your phone number" value="${userData.general.tel}">
            </div>

            <div class="facebook">
              <img class="facebook-icon" src="MakeAmove/../PHP/DB/image/facebook.png" alt="facebook-icon">
              <input type="text" name="facebook" placeholder="Your Facebook username" value="${userData.general.facebook}">
            </div>

            <div class="instagram">
              <img class="instagram-icon" src="MakeAmove/../PHP/DB/image/instagram.png" alt="instagram-icon">
              <input type="text" name="instagram" placeholder="Your Instagram username" value="${userData.general.instagram}">
            </div>
          </div>

          <div class="interest">
            <div class="interest-title-limit">
              <div class="title">Interest</div>
              <div class="five-options">(list 5 options)</div>
            </div>
            <div class="interest-list-my required"></div>
          </div>
          <div class="location">
            <img class="locationIconProfile" src="MakeAmove/../PHP/DB/image/location-icon.png" alt="location-icon">
            ${renderCityDropdownList(userData)}
          </div>
          <div class="age">
            <div class="title">Age</div>
            <input type="number" name="age-my" min="18" value="${userData.age}">
          </div>

        </div>

        <div class="category preference">
          <h3>Preference</h3>

          <div class="preferred-age">
            <div class="age-min">
              <div class="title">Minimum age</div>
              <input type="number" name="age-min" min="18" value="${userData.preference.ageOfMin}">
            </div>
            <div class="age-max">
              <div class="title">Maximum age</div>
              <input type="number" name="age-max" value="${userData.preference.ageOfMax}">
            </div>
          </div>
          <div class="title">I am looking for</div>
          <div class="gender-buttons">${createPreferGenderButton(genders)}</div>
        </div>

        <div class="category user-setting">
          <div class="user-setting-top">
            <h3>User Setting</h3>
            <button class="logout-button">Logout</button>
          </div>

          <div id="email">
            <div class="title">Email:</div>
            <div class="emailaddress">${userData.email}</div>
          </div>

          <div class="user-setting-button">
            <button class="change-password">Change password</button>
            <button class="delete-account">Delete account</button>
          </div>
        </div>

      </div>

      <div class="profile-sumbit">
        <p class="profile-message"></p>
        <button class="save-profile-button" type="submit">save</button>
      </div>

    </form>
  `;

  colorThePreferredGender(userData.preference.genderOf);
  renderInterestBoxes(userData.interests);

  // Logout
  const logoutButton = document.querySelector(".logout-button");
  logoutButton.addEventListener("click", logoutFromAccount);

  // Change password
  const changePasswordButton = document.querySelector(".change-password");
  changePasswordButton.addEventListener("click", renderChangePasswordBox);

  // Delete account
  const deleteAccountButton = document.querySelector(".delete-account");
  deleteAccountButton.addEventListener("click", renderConfirmDeleteAccountBox);

  // Save the form
  const form = mainDom.querySelector('.profile-page-container');
  form.addEventListener("submit", saveProfile);

  document.querySelector(".explore").addEventListener("click", renderDatingPage);
  document.querySelector(".match").addEventListener("click", renderMatchesPage);
  document.querySelector(".profile").classList.add("current-page");
  document.querySelector(".explore").classList.remove("current-page");
  document.querySelector(".match").classList.remove("current-page");
}

function logoutFromAccount() {
  window.localStorage.removeItem("user");
  renderFrontPage();
  let navBar = document.querySelector("nav");
  navBar.classList.add("hide");
}

function checkMyChosenInterestAtRegister(myChosenInterestAtRegister) {
  const interestsArray = Object.values(myChosenInterestAtRegister);
  const myInterestLabels = document.querySelectorAll(".my-interest");

  myInterestLabels.forEach(function (label) {
    const myInterestValues = label.textContent.trim();
    const interestsWithLowercaseNoSpace = myInterestValues.toLowerCase().replace(/\s/g, '');

    if (interestsArray.includes(interestsWithLowercaseNoSpace)) {
      const checkbox = label.previousElementSibling;
      checkbox.checked = true;
    }
  });
}

function renderInterestBox(interest) {
  const interestListMy = document.querySelector(".interest-list-my");
  const anInterest = document.createElement("div");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = "interests";
  input.id = interest.toLowerCase().replace(" ", "");
  input.value = interest.toLowerCase().replace(" ", "");
  input.classList.add("interest-checkbox");
  const label = document.createElement("label");
  label.htmlFor = input.id;
  label.textContent = interest;
  anInterest.append(input);
  anInterest.append(label);

  anInterest.classList.add("checkbox-wrapper");
  anInterest.querySelector("label").classList.add("my-interest");

  interestListMy.append(anInterest);
}

function renderInterestBoxes(myChosenInterestAtRegister) {
  interests.forEach(interest => renderInterestBox(interest));

  checkMyChosenInterestAtRegister(myChosenInterestAtRegister);

  let boxes = document.querySelectorAll(".interest-list-my input[type='checkbox']");
  let checkedInterests = [];

  disableInterestBoxes();

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("change", e => {
      if (boxes[i].checked === true) {
        checkedInterests.push(boxes[i].name);
      } else {
        let index = checkedInterests.indexOf(boxes[i].name);
        checkedInterests.splice(index, 1);
      }
      disableInterestBoxes();
    })
  }
}

function disableInterestBoxes() {
  let checkedBoxes = document.querySelectorAll(".interest-list-my input[type='checkbox']:checked");
  let boxes = document.querySelectorAll(".interest-list-my input[type='checkbox']");
  let count = checkedBoxes.length;

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
}

function renderChangePasswordBox(event) {
  event.preventDefault();

  renderPopUpBox();

  const popupContent = document.querySelector(".popup-content");

  popupContent.innerHTML = `
    <img class="white-cross" src="MakeAmove/../PHP/DB/image/white-cross.svg" alt="white-cross">

    <div class="password-row">
      <label>Old password:</label>
      <div class="password-field">
        <input type="password" class="password-input" name="passwordOld" autocomplete="off">
        <img src="MakeAmove/../PHP/DB/image/eye.png" alt="show-password" id="show-password">
      </div>
    </div>

    <div class="password-row">
      <label>New password:</label>
      <div class="password-field">
        <input type="password" class="password-input" name="passwordNew" autocomplete="off">
        <img src="MakeAmove/../PHP/DB/image/eye.png" alt="show-password" id="show-password">
      </div>
    </div>

    <div class="password-row">
      <label>Repeated new password:</label>
      <div class="password-field">
        <input type="password" class="password-input" name="passwordRepeat" autocomplete="off">
        <img src="MakeAmove/../PHP/DB/image/eye.png" alt="show-password" id="show-password">
      </div>
    </div>

    <p class="password-message"></p>
    <button class="save-password">Save</button>
  `;

  const allShowPasswordIcons = popupContent.querySelectorAll("#show-password");
  const whiteCross = popupContent.querySelector(".white-cross");

  allShowPasswordIcons.forEach(icon => {
    icon.addEventListener("click", () => togglePassword(icon));
  });

  whiteCross.addEventListener("click", closePopUpBox);
  
  popupContent.addEventListener("submit", saveNewPassword);
}

async function saveNewPassword(event) {
  event.preventDefault();

  let message = document.querySelector(".password-message");

  try {
    let response = await fetch("MakeAmove/../PHP/date/changePassword.php", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: getUserData().id,
        passwordOld: this.elements.passwordOld.value,
        passwordNew: this.elements.passwordNew.value,
        passwordRepeat: this.elements.passwordRepeat.value,
      }),
    });

    let data = await response.json();

    if (!response.ok) {
      message.textContent = data.message;
    } else {
      message.innerHTML = `${data}'s password has been changed successfully! ≧◡≦`;
    }
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
}

function closePopUpBox() {
  const popup = document.querySelector(".popup");
  const profileMain = document.querySelector(".profile-main");
  popup.remove();

  if(profileMain) {
    profileMain.classList.remove("makeContentLighter");
  }
}

function togglePassword(checkbox) {
  let passwordOutlook = checkbox.parentNode.querySelector(".password-input");
  if (passwordOutlook.type === "password") {
    passwordOutlook.type = "text";
  } else {
    passwordOutlook.type = "password";
  }
}

function renderPopUpBox() {
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
  popupBackground.classList.add("popup-background");
}

function renderConfirmDeleteAccountBox(event) {
  event.preventDefault();

  renderPopUpBox();

  const popupContent = document.querySelector(".popup-content");

  popupContent.innerHTML = `
    <img class="white-cross" src="MakeAmove/../PHP/DB/image/white-cross.svg" alt="white-cross">
    <div class="delete-content">
      <p class="confirm-question">Are you sure that you want to delete your account?</p>
      <button class="confirm-delete-yes">Yes</button>
      <button class="confirm-delete-no">No</button>
    </div>
  `;

  const whiteCross = popupContent.querySelector(".white-cross");
  const confirmDeleteNo = popupContent.querySelector(".confirm-delete-no");
  whiteCross.addEventListener("click", closePopUpBox);
  confirmDeleteNo.addEventListener("click", closePopUpBox);
  popupContent.addEventListener("submit", deleteUserAccount);
}

async function deleteUserAccount(event) {
  event.preventDefault();

  let message = document.querySelector(".delete-content");

  try {
    const response = await fetch("MakeAmove/../PHP/date/deleteAccount.php", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: getUserData().id,
      }),
    });

    let data = await response.json();

    if (!response.ok) {
      message.textContent = data.message;
    } else {
      message.textContent = data.message;
      renderFrontPage();
    }
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
}

function createPreferGenderButton(genders) {
  let html = "";

  for (let gender of genders) {
    html += `
      <div class="radio-wrapper">
        <input type="radio" name="genderOf" value="${gender}" id="${gender}">
        <label class="${gender}" for="${gender}">
          ${gender}
        </label>
      </div>
    `;
  }
  return html;
}

function colorThePreferredGender(preferredGender) {
  genders.forEach(function (gender) {
    if (gender === preferredGender) {
      const preferredGenderButton = document.querySelector(`#${gender}`);
      preferredGenderButton.checked = true;
    }
  });

  let allGenders = document.querySelectorAll(".info-button");
  let counter = 0;

  allGenders.forEach(gender => {
    if (gender.checked === true) {
      counter++;
    } else {
      gender.disabled = true;
    }
    gender.addEventListener("change", e => {
      if (gender.checked === true) {
        counter++;
      } else {
        counter--;
      }

      if (counter === 1) {
        allGenders.forEach(gender => {
          if (!gender.checked) {
            gender.disabled = true;
          }
        });
      } else {
        allGenders.forEach(gender => {
          gender.disabled = false;
        });
      }
    });
  });
}

async function saveProfile(event) {
  event.preventDefault();

  let message = document.querySelector(".profile-message");

  const formData = new FormData(event.target);
  formData.append("id", getUserData().id);
  const jsonData = formDataToJson(formData);

  try {
    let response = await fetch("MakeAmove/../PHP/date/updateProfile.php", {
      method: "PATCH",
      body: jsonData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    message.textContent = "The profile is updated successfully!";

    setTimeout(() => {
      message.textContent = "";
    }, 1500);

  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
}
