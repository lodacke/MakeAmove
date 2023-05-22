"use strict";

import { renderDatingPage } from "./date/explore.js";
import { renderRegisterPage } from "./register.js";

async function submitLogin(event) {
  event.preventDefault();
  // renderDatingPage();

  let message = document.querySelector("main .message");

  try {
    let response = await fetch("../PHP/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.elements.email.value,
        password: this.elements.password.value,
      }),
    });

    let data = await response.json();
    if (!response.ok) {
      message.innerHTML = `Oops! Something went wrong, it looks like <span>${data.message}</span>.`;
      // errorMessage();
    } else {
      window.localStorage.setItem("user", JSON.stringify(data));
      renderDatingPage();
    }
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
}

export function renderLoginPage() {
  let bodyDom = document.querySelector("body");
  let headerDom = document.querySelector("header");
  headerDom.setAttribute("id", "loginPageHeader");
  let mainDom = document.querySelector("main");
  mainDom.setAttribute("id", "loginPageMain");

  headerDom.innerHTML = `
    <img class="logo" src="/PHP/DB/image/logo.png" alt="appLogo">
  `;

  mainDom.innerHTML = `
    <h2>Login</h2>
    <form class="login-form" action="PHP/login.php" method="POST">
      <div class="inputbox">
        <input type="text" name="email" class="required" required="required">
        <label for "email"> Email-address </label>
      </div>
      <div class="inputbox">
        <input type="password" name="password" class="required" required="required">
        <label for "password"> Password </label>
      </div>
      <button class="loginButton" type="submit">Login</button>
      <p class="message"></p>` +
      // TODO: <img class="loading" src="image/spinner.svg" alt="loading">
    `</form>
    <p class="loginKindWords">You're not alone! Many like-minded people are looking for their love from Make A Move. <br> Let us help you!</p>
    <button class="goToRegister">Register here</button>
  `;

  const goToRegister = document.querySelector(".goToRegister");
  goToRegister.addEventListener("click", renderRegisterPage);

  let loginMain = document.querySelector("main");
  let loginForm = loginMain.querySelector("form");
  loginForm.addEventListener("submit", submitLogin);
}
