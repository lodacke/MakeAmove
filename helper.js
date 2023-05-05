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
