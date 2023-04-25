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

async function loginWithAccount() {
  try {
    let response = await fetch("api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });

    let data = await response.json();

    // If we didn't manage to login we'll redirect the user to our
    // login page
    if (!response.ok) {
      renderLoginPage();
    } else {
      // Otherwise we expect to receive the user
      window.localStorage.setItem("quiz-user", JSON.stringify(data));
      // NOTE: we've stored the user globally (i.e. outside of
      // this function)
      user = data;
      // Now we're ready to start the quiz
      renderQuizPage();
    }
  } catch (err) {
    // If something went wrong, we'll redirect the user to the login
    // page
    renderLoginPage();
  }
}
