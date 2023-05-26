"use strict";


async function submitLogin(event) {
  event.preventDefault();
  let message = document.querySelector(".message");

  try {
    let response = await fetch("../MakeAmove/PHP/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.elements.email.value,
        password: this.elements.password.value,
      }),
    });

    let data = await response.json();
    if (!response.ok) {
      message.textContent = data.message;
    } else {
      window.localStorage.setItem("user", JSON.stringify(data));
      renderDatingPage();
    }
  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
}

function renderLoginPage() {
  let headerDom = document.querySelector("header");
  headerDom.setAttribute("id", "loginPageHeader");
  let mainDom = document.querySelector("main");
  mainDom.setAttribute("id", "loginPageMain");

  headerDom.innerHTML = `
    <img class="logo" src="../MakeAmove/PHP/DB/image/logo.png" alt="appLogo">
  `;

  mainDom.innerHTML = `
    <h2>Login</h2>
    <form class="login-form" action="PHP/login.php" method="POST">
      <div class="inputbox">
        <input type="text" name="email" class="required" required="required">
        <label for "email"> Email address </label>
      </div>
      <div class="inputbox">
        <input type="password" name="password" class="required" required="required">
        <label for "password"> Password </label>
      </div>
      <button class="loginButton" type="submit">Login</button>
      <p class="message"></p>
    </form>
    <p class="loginKindWords">You're not alone! Many like-minded people are looking for their love from Make A Move. <br> Let us help you!</p>
    <button class="goToRegister">Register here</button>
  `;

  const goToRegister = document.querySelector(".goToRegister");
  goToRegister.addEventListener("click", renderRegisterPage);

  let loginMain = document.querySelector("main");
  let loginForm = loginMain.querySelector("form");
  loginForm.addEventListener("submit", submitLogin);
}
