import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { getUserData } from "../helper.js";
import { renderFrontPage } from "../index.js";

export async function renderDatingPage() {

  let request = await fetch(`/PHP/date/explore.php?email=${getUserData().email}`);
  
    let userDATA = await request.json();

    console.log(userDATA);

  let navDom = document.querySelector("#pageNavigation");
  navDom.innerHTML = `
   ${stickyNav()}
  `;

  let mainDom = document.querySelector("main");

  mainDom.innerHTML = `
    <h2>${userDATA.name}</h2>
    <img src="${userDATA.source}"></img>
    <h3> bio: </h3>
    <div id="MatchButtons">
      <button id="match"> Yes! </button>
      <button id="noMatch"> No </button>
    </div>
    <p id="bio"> ${userDATA.interests.bio} </p>
    <div id="interestsBox"></div>
    `;

    let interests = 
    [userDATA.interests.interestsOne, 
    userDATA.interests.interestsTwo, 
    userDATA.interests.interestsThree, 
    userDATA.interests.interestsFour, 
    userDATA.interests.interestsFive
    ];

    let interestsBox = document.getElementById("interestsBox");

    interests.forEach(intrest => {
      const div = document.createElement("div"); 
      div.textContent = intrest;
      interestsBox.append(div);

    });

    mainDom.querySelector("#match").addEventListener("click", matches);
    mainDom.querySelector("#noMatch").addEventListener("click", noMatch);


   //mainDom.querySelector(".profile").addEventListener("click", renderProfilePage);
   //mainDom.querySelector(".match").addEventListener("click", renderProfilePage);

  let match = {
    "loggedInUser": getUserData().email,
    "matchedUser": userDATA.email,
  };

  async function matches(){

    let requestPOST = await fetch( new Request("/PHP/date/matches.php", {
      method: "POST",
      headers: {"Content-type":"application/json; charset=UTF-8"},
      body: JSON.stringify(match),
      }));


    let response = await requestPOST.json();

    renderDatingPage();
    
  }

async function noMatch(){

  let requestPOST = await fetch( new Request("/PHP/date/nomatch.php", {
    method: "POST",
    headers: {"Content-type":"application/json; charset=UTF-8"},
    body: JSON.stringify(match),
  }));

  renderDatingPage();
}

}



