"use strict";

import { countries } from "./countries.js";

export function getUserData() {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData);
}

export function renderCountryDropdownList() {
  const options = countries.map(country => `
    <option value="${country.value}">${country.name}</option>
  `).join('');

  return `
    <select class="form-select" id="country" name="country">
      <option>select country</option>
      ${options}
    </select>
  `;
} 

export function errorMessage(){

    let RequiredInputs = document.querySelectorAll(".required");
    RequiredInputs.forEach(required => {
        if (required.value == "" || required.value == "none"){
            required.classList.add("notAnswered");

         switch(required.attributes.name.value){
            case "name":
                required.placeholder = "You need to write you're name.";
                break;
            case "email":
                required.placeholder ="This does not look like an emailadress?";
                break;
            case "password":
                required.placeholder = "The password needs to be atleast 8 characters.";
                break;
            case "age":
                required.placeholder = "You need to be atleast 18 years old to use this app.";
                break;
            case "contact":
                required.placeholder = "This does not look like a phone number?";
                break;
            case "ageOf":
                required.placeholder = "What age?";
                break;
            }
    }  else {
            required.classList.remove("notAnswered");
        }
    })
};
