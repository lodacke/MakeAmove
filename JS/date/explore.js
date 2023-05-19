import { stickyNav } from "./stickyNav.js";
import { renderProfilePage } from "./profile.js";
import { getUserData } from "../helper.js";
import { renderMatchesPage } from "./matches.js";
import { renderFrontPage } from "../index.js";

export async function renderDatingPage() {
  let mainDom = document.querySelector("main");
  mainDom.innerHTML = ``;

  let request = await fetch(`/PHP/date/explore.php?id=${getUserData().id}`);
  let userDATA = await request.json();
  
  renderCurrentDate();

  function renderCurrentDate (){

    let navDom = document.querySelector("#pageNavigation");
    navDom.innerHTML = stickyNav();

    let headerDOM = document.querySelector("header");
    headerDOM.innerHTML = `
    <div id="exploreHeader"> 
      <img id="exploreLogo" src="/PHP/DB/image/logo.png" alt="appLogo">
      <button class="logout"> Logout </button>
    </div>`;

    let logout = document.querySelector(".logout")
    logout.addEventListener("click", logoutFromAccount);
  
    function logoutFromAccount() {
  window.localStorage.removeItem("user");
  renderFrontPage();

  let navBar = document.querySelector(".sticky-nav");
  navBar.classList.add("hide");
}
    
  
    document.querySelector(".profile").addEventListener("click", renderProfilePage);
    document.querySelector(".match").addEventListener("click", renderMatchesPage);

    if(request.status == 200){
      mainDom.innerHTML = `
      <div id="potentialMatch">
        <img id="potentialMatchPic" src="${userDATA.imageSource}"></img>  
        <div id="potentialMatchInfo">
          <div>${userDATA.name}</div>
          <div>${userDATA.age} </div>
        </div>
         <div id="matchButtons">
        <button id="match">Yes</button>
        <button id="noMatch">No</button>
      </div>
    `;

  // let interestsBox = document.getElementById("interestsBox");

  // interests.forEach(intrest => {
  //   const div = document.createElement("div");
  //   div.textContent = intrest;
  //   interestsBox.append(div);
  // });

  mainDom.querySelector("#match").addEventListener("click", matches);
  mainDom.querySelector("#noMatch").addEventListener("click", noMatch);

    mainDom.querySelector("#potentialMatchPic").addEventListener("click", showUser);

    let match = {
      "loggedInUser": getUserData().id,
      "matchedUser": userDATA.id,
    };

    async function matches(){
      let requestPOST = await fetch( new Request("/PHP/date/matches.php", {
        method: "POST",
        headers: {"Content-type":"application/json; charset=UTF-8"},
        body: JSON.stringify(match),
      }));

      let response = await requestPOST.json();

      if(response != "no match"){
        alert(`its a match! ${response}`);
        };

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

    function showUser(){

      mainDom.innerHTML = `
      <div id="exploreProfile"> 
        <h3> ${userDATA.name}, ${userDATA.age} y/o</h3> 
        <img id="exploreProfileImage" src="${userDATA.imageSource}"></img> 
        <h3> bio: </h3>
        <div id="exploreBio">
          ${userDATA.general.bio}
        </div>
       <div id="exploreInterestsBox"></div>
      </div>`;

      let interests =
        [userDATA.interests.interestsOne,
        userDATA.interests.interestsTwo,
        userDATA.interests.interestsThree,
        userDATA.interests.interestsFour,
        userDATA.interests.interestsFive
       ];

      let interestsBox = mainDom.querySelector("#exploreInterestsBox");

      interests.forEach(intrest => {
        const div = document.createElement("div");
        div.textContent = intrest;
        interestsBox.append(div);
      });

      mainDom.querySelector("#exploreProfileImage").addEventListener("click", e => {
        renderCurrentDate();
      });

    }
  } else { 
    mainDom.innerHTML = `
    <div id="noPotentialMatch">
      <p> No potential matches are found right now :(</p>
    </div>
    `
    } 
  }

  document.querySelector(".profile").addEventListener("click", renderProfilePage);
  document.querySelector(".match").addEventListener("click", renderMatchesPage);
}





