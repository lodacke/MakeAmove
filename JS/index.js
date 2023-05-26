"use strict";


function checkIfUserLoggedIn() {
  if (window.localStorage.getItem("user")) {
    renderDatingPage();
  }
  else {
    renderFrontPage();
  }
}

function renderFrontPage() {
  let navDom = document.querySelector("nav");
  navDom.removeAttribute("id", "pageNavigation");
  navDom.classList.add("hide");

  let headerDom = document.querySelector("header");
  headerDom.setAttribute("id", "startPageHeader");

  let frontMainDom = document.querySelector("main");
  frontMainDom.setAttribute("id", "startPageMain");

  headerDom.innerHTML = `
    <img class="logo" src="../MakeAmove/DB/image/logo.png" alt="appLogo">
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
