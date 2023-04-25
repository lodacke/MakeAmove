"use strict";

const bodyDom = document.querySelector("body");
const headerDom = document.createElement("header");
const frontMainDom = document.querySelector("main");

bodyDom.insertBefore(headerDom, frontMainDom);

headerDom.innerHTML = `
  <img class=logo src="image/logo.png" alt="appLogo">
  <h1>Make A Move</h1>
`;

frontMainDom.innerHTML = `
  <button class="front-page-button login-button">Login</button>
  <button class="front-page-button register-button">Register</button>
`;

const loginButton = document.querySelector(".login-button");
loginButton.addEventListener("click", renderloginPage);

const registerButton = document.querySelector(".register-button");
registerButton.addEventListener("click", renderRegisterPage);
