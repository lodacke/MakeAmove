"use strict";

import { renderDatingPage } from "../date/date.js";

async function submitLogin(event) {
  event.preventDefault();

  let message = document.querySelector("main .message");

  try {
    let response = await fetch("login/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.elements.email.value,
        password: this.elements.password.value,
      }),
    });

    let data = await response.json();
    console.log(data)
    if (!response.ok) {
      message.innerHTML = `Oops! Something went wrong, we got this from the server <span>${data.message}</span>.`;
    } else {
      delete data.password;

      window.localStorage.setItem("user", JSON.stringify(data));
      console.log(data);
      renderDatingPage();
    }
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
}

function renderLoginPage() {
  let bodyDom = document.querySelector("body");

  bodyDom.innerHTML = `
    <header>
      <img class="logo" src="image/logo.png" alt="appLogo">
      <h1>Make A Move</h1>
    </header>
    <main>
      <h2>Login</h2>
      <form class="login-form" action="login.php" method="POST">
        <input type="text" class="email" name="email" placeholder="Email">
        <input type="password" class="password" name="password" placeholder="Password">
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

export { renderLoginPage };
