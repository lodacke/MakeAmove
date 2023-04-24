"use strict";

const bodyDom = document.querySelector("body");
const headerDom = document.createElement("header");
const mainDom = document.querySelector("main");

bodyDom.insertBefore(headerDom, mainDom);

headerDom.innerHTML = `
  <img class=logo src="image/logo.png" alt="appLogo">
  <h1>Make A Move</h1>
`;

mainDom.innerHTML = `
  <button>Sign In</button>
  <button>Sign Up</button>
`;
