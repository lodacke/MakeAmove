import { errorMessage } from "./helper.js";

"use strict"

 let mainDom = document.querySelector("main");

function renderPageNavigation(previousFunction){
    let pageNavDom = document.getElementById("pageNavigation");

    pageNavDom.innerHTML = `
        <button id="previousPage"> Previous Page </button>
        <button id="nextPage"> Next Page </button>`;

        pageNavDom.querySelector("#previousPage").addEventListener("click", e => {

     })
}

export function renderRegisterPage (){

    mainDom.innerHTML = `
    <h1> Basic Info </h1>
    <label for "name"> First name: </label>
    <input type="username" name="name" class="required">

    <label for "email"> Email-adress: </label>
    <input type="email" name="email" class="required">

    <label for "password"> Password: </label>
    <input type="password" name="password" minlength="10" class="required">

    <label for "age"> Age: </label>
    <input type="number" name="age" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="required">

    <label for "gender"> Gender: </label>
    <select name="gender" class="required">
        <option value="none">Choose an option </option>
        <option value="female"> Woman </option>
        <option value="male"> Man </option>
        <option value="neither">Neither</option>
    </select>
    ${renderPageNavigation()}
    `;

    let nameDom = mainDom.querySelector("input[name='name']");
    let passwordDom = mainDom.querySelector("input[name='password']");
    let ageDom = mainDom.querySelector("input[name='age']");
    let genderDom = mainDom.querySelector("select[name='gender']");
    let emailDom = mainDom.querySelector("input[name='email']");


    document.getElementById("nextPage").addEventListener("click", e => {

        if(nameDom.value != "" && emailDom.value != "" && passwordDom.value != "" && ageDom.value != null && genderDom.value != "none"){

            let userData = {
                image: {},
                name: nameDom.value,
                email: emailDom.value,
                password: passwordDom.value,
                age: ageDom.value,
                gender: genderDom.value,
                interests: [],
                preference: [],
            };

        imagePage(userData);

        } else {
        } errorMessage();
    })
}


function imagePage(userData){
    mainDom.innerHTML = `
    <form id="upload" action="register.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="profilePicture">
        <button type="submit">Upload</button>
    </form>
     <div id="profilePicture">
         <div id="userImage"></div>
         <p id="imageMessage"></p>
     </div>
   
    ${renderPageNavigation()}`;

    const form = document.getElementById("upload");
    const imageMessage = document.getElementById("imageMessage");
    const userImage = document.getElementById("userImage");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        userImage.innerHTML = "";
        const formData = new FormData(form);
        const request = new Request("PHP/register.php", {
            method: "POST",
            body: formData,
        });

        fetch(request)
        .then(response => response.json())
        .then(data => {
            //form.reset();
            if(data.error) {
                imageMessage.textContent = data.error;
            } else {
                imageMessage.textContent = "Success!";
                const img = document.createElement("img");
                img.src = data.source;
                userImage.appendChild(img);
            }
        })
    });

    document.getElementById("nextPage").addEventListener( "click", e => {

        QuestionPage(userData);

    });
}

function QuestionPage(userData){

    mainDom.innerHTML = `
    <h1>Interests</h1>
    <label for "bio"> Bio:</label>
    <textarea name="bio" rows="7" id="bio" placeholder="Add more info about yourself..."></textarea>
    <p>Choose 5 interests</p>
    <div id="interestsList" class="required">
    </div>

    <p>How do you want people to contact you?</p>

    <input name="contact" type="tel" placeholder="phonenumber" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="required">

    <p> Dont worry, you can change the way you wish to be contacted once you're registered your profile </p>

     ${renderPageNavigation()} 
     `;

     const interests = [
      "Traveling", "Reading", "Yoga", "Movies", "Astrology", "Beer", "Dancing",
      "Fishing", "Wine", "Art", "Stand-up Comedy", "Running", "Movie Night",
      "Smoking", "Snus", "Poetry", "Night Out", "Fishing", "Sport", "Singing",
      "Photographing", "Gaming", "Hiking", "Playing Instruments", "Cooking",
      "Board Games", "Gym", "Sailing", "Fashion", "Backpacking", "Music Festivals"];

    const interestsList = document.getElementById("interestsList");

    interests.forEach(interest => {
      const div = document.createElement("div"); 
      const input = document.createElement("input");
      input.type = "checkbox";
      input.classList.add("required");
      input.name = interest.toLowerCase().replace(" ", "");
      const label = document.createElement("label");
      label.htmlFor = input.name;
      label.textContent = interest;
      div.append(input);
      div.append(label);
      interestsList.append(div);
    });

    let bio = mainDom.querySelector("textarea[name='bio']");
    let contact = mainDom.querySelector("input[name='contact']");

    let interestsBoxes = document.querySelectorAll("input[type='checkbox']");
    let count = 0; 
    let checkedIntrests = [];

    for(let i = 0; i < interestsBoxes.length; i++){
        interestsBoxes[i].addEventListener("change", e => {
            if(interestsBoxes[i].checked === true){
                count++;
                checkedIntrests.push(interestsBoxes[i].name);
                console.log(checkedIntrests);
            } else {
                count--;
                let index = checkedIntrests.indexOf(interestsBoxes[i].name);
                checkedIntrests.splice(index, 1);
                console.log(checkedIntrests);
            }          
            if(count === 5){
                interestsBoxes.forEach(box => {
                    if(!box.checked){
                         box.disabled = true;
                    }                   
                })
            } else {
                interestsBoxes.forEach( box => {
                    box.disabled = false;
                })
            }
        })
    }

    document.getElementById("nextPage").addEventListener("click", e => {
        console.log(checkedIntrests);
        console.log(contact.value.length); //Funkar för att mäta längden, ska användas i en kontroll senare för det är ett telefo

        if(contact.value != "" && count === 5){

            let interests = {
                 interestsOne: checkedIntrests[0],
                 interestsTwo: checkedIntrests[1],
                 interestsThree: checkedIntrests[2],
                 interestsFour: checkedIntrests[3],
                 interestsFive: checkedIntrests[4],
                 bio: bio.value,
                 contact: contact.value
            }

            userData.interests.push(interests);

            preferencePage(userData);

        } else {
             errorMessage();
        }
    })
};

function preferencePage(userData){
    mainDom.innerHTML =`
    <h1> What are you looking for? </h1>
    <lable for "genderOf"> I'm intrested in: </lable>
    <select name="genderOf" class="required">
    <option value="none"> Choose an option </option>
    <option value="Girls"> Female </option>
    <option value="Boys"> Male </option>
    <option value="Both">Both</option>
    </select>
    <p> What age </p>
    <input name="ageOfMin" class="required" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Min-age">
    <input name="ageOfMax" class="required" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Max-age">
     <div>${renderPageNavigation()} </div>`;

    let genderOf = mainDom.querySelector("select[name='genderOf']");
    let ageOfMin = mainDom.querySelector("input[name='ageOfMin']");
    let ageOfMax = mainDom.querySelector("input[name='ageOfMax']");

    document.getElementById("nextPage").innerText = "Start Dating!";
    document.getElementById("nextPage").addEventListener("click", e => {

       if(genderOf.value != "none" && ageOfMin.value != null && ageOfMax.value != null){
            let preference = {
                genderOf: genderOf.value,
                ageOfMin: ageOfMin.value,
                ageOfMax: ageOfMax.value
            };

        userData.preference.push(preference);
        addUser(userData);
        // Länk till funktion för att starta dejtandet()
            } else {
             errorMessage();
        }
    })
};



async function addUser(userData){

    let requestPOST = await fetch( new Request("PHP/register.php", {
    method: "POST",
    headers: {"Content-type":"application/json; charset=UTF-8"},
    body: JSON.stringify(userData)
    }));

    let JSONresponse = await requestPOST.json();

    let error_message = document.createElement("p");
    mainDom.append(error_message);

    error_message.textContent = JSONresponse;
}





