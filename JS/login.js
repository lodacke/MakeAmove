"use strict";

import { renderDatingPage } from "./date/explore.js";
import { renderRegisterPage } from "./register.js";

async function submitLogin(event) {
  event.preventDefault();

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
      erroMessage();
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

  bodyDom.innerHTML = `
    <header>
      <img class="logo" src="/PHP/DB/image/logo.png" alt="appLogo">
      <h1>Make A Move</h1>
    </header>
    <main>
      <h2>Login</h2>
      <form class="login-form" action="PHP/login.php" method="POST">
        <input type="text" name="email" placeholder="Email" class="required">
        <input type="password" name="password" placeholder="Password" class="required">
        <button class="login-button" type="submit">Login</button>
        <p class="message"></p>` +
        // TODO: <img class="loading" src="image/spinner.svg" alt="loading">
    `</form>
      <p class="login-kind-words">You're not alone! Many like-minded people are looking for their love from Make A Move. Let us help you! 🫰🏼</p>
      <button class="go-to-register">Register</button>
    </main>
  `;

  const goToRegister = document.querySelector(".go-to-register");
  goToRegister.addEventListener("click", renderRegisterPage);

  let loginMain = document.querySelector("main");
  let loginForm = loginMain.querySelector("form");
  loginForm.addEventListener("submit", submitLogin);
}

