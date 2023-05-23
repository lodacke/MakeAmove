"use strict";

import { cities } from "./date/cities.js";

export function getUserData() {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData);
}

export function renderCityDropdownListReg(){
  const options = cities.map(city => `
    <option value="${city}">${city}</option>
  `).join('');
  return options;

}

export function renderCityDropdownList(userData) {
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

export function errorMessage(){

    let RequiredInputs = document.querySelectorAll(".required");
    RequiredInputs.forEach(required => {
        if (required.value == "" || required.value == "none" || required.checked === false){
            required.setAttribute("id", "notAnswered");

         switch(required.attributes.name.value){
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
                required.placeholder = "You need to be at least 18 years old to use this app";
                break;
            case "tel":
                required.placeholder = "Phone number is needed";
                break;
            case "ageOfMax":
                required.placeholder = "Enter the preferred max age of your date";
                break;
            case "ageOfMin":
                required.placeholder = "Enter the preferred min age of your date"
            }
    }  else {
            required.classList.remove("notAnswered");
        }
    })
};

export function formDataToJson(formData) {
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
