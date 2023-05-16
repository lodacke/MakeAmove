"use strict";

import { renderDatingPage } from "./date/explore.js";
import { renderLoginPage } from "../JS/login.js";
import { renderRegisterPage } from "../JS/register.js";

function checkIfUserLoggedIn() {
  if(window.localStorage.getItem("user")) {
    renderDatingPage();
  }
  else {
    renderFrontPage();
  }
}

export function renderFrontPage() {
  let bodyDom = document.querySelector("body");
  let headerDom = document.createElement("header");
  let frontMainDom = document.querySelector("main");

  bodyDom.insertBefore(headerDom, frontMainDom);

  headerDom.innerHTML = `
    <img class=logo src="/PHP/DB/image/logo.png" alt="appLogo">
    <h1>Make A Move</h1>
  `;

  frontMainDom.innerHTML = `
    <button class="front-page-button login-button">Login</button>
    <button class="front-page-button register-button">Register</button>
  `;

  const loginButton = document.querySelector(".login-button");
  loginButton.addEventListener("click", renderLoginPage);

  const registerButton = document.querySelector(".register-button");
  registerButton.addEventListener("click", renderRegisterPage);
}

checkIfUserLoggedIn();
