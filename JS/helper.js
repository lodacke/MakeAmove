"use strict";

function getUserData() {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData);
}

function renderCityDropdownListReg(){
  const options = cities.map(city => `
    <option value="${city}">${city}</option>
  `).join('');

  return options;
}

function renderCityDropdownList(userData) {
  const options = cities.map(city => `
    <option value="${city}">${city}</option>
  `).join('');

  return `
    <select class="form-select" id="city" name="city">
      <option>${userData.city || "select city"}</option>
      ${options}
    </select>
  `;
}

function errorMessage() {
  let requiredInputs = document.querySelectorAll(".required");

  requiredInputs.forEach(required => {
    required.removeAttribute("notAnswered");

    if (required.value === "" || required.value === "none" || required.checked === false){
      required.setAttribute("id", "notAnswered");

      switch(required.attributes.name.value) {
        case "name":
          required.placeholder = "Please enter your name";
          break;
        case "email":
          required.placeholder = "This does not look like an email";
          break;
        case "password":
          required.placeholder = "The password must be at least 8 characters";
          break;
        case "age":
          required.placeholder = "You need to be at least 18 years old";
          break;
        case "tel":
          required.placeholder = "Phone number is needed";
          break;
        case "ageOfMax":
          required.placeholder = "Your preferred max age";
          break;
        case "ageOfMin":
          required.placeholder = "Your preferred min age";
          break;
        }
      } else {
        required.removeAttribute("notAnswered");
      }
    })
};

function formDataToJson(formData) {
  const jsonData = {};

  for (const [key, value] of formData.entries()) {
    if (jsonData.hasOwnProperty(key)) {
      if (!Array.isArray(jsonData[key])) {
        jsonData[key] = [jsonData[key]];
      }
      jsonData[key].push(value);
    } else {
      jsonData[key] = value;
    }
  }

  return JSON.stringify(jsonData);
}
