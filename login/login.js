"use strict";

function renderloginPage(event) {
  bodyDom.innerHTML = `
    <header>
      <img class="logo" src="image/logo.png" alt="appLogo">
      <h1>Make A Move</h1>
    </header>
    <main>
      <h2>Login</h2>
      <form class="login-form">
        <input type="text" class="email" placeholder="Email">
        <input type="password" class="password" placeholder="Password">
        <button class="login-button" type="submit">Login</button>
        <img class="loading" src="image/spinner.svg" alt="loading">
      </form>
      <p class="login-kind-words">You're not alone! Many like-minded people are looking for their love from Make A Move. Let us help you! 🫰🏼</p>
      <button class="go-to-register">Register</button>
    </main>
  `;

  const goToRegister = document.querySelector(".go-to-register");
  goToRegister.addEventListener("click", renderRegisterPage);
}
