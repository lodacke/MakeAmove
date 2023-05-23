"use strict";

import { errorMessage } from "./helper.js";
import { renderDatingPage } from "./date/explore.js";
import { renderCityDropdownListReg } from "./helper.js";
import { renderFrontPage } from "./index.js";

function renderPageNavigation(previousPage){
    let pageNavDom = document.querySelector("nav");
    pageNavDom.setAttribute("id", "pageNavigation");
    pageNavDom.classList.remove("sticky-nav");
    pageNavDom.classList.remove("hide");

    pageNavDom.innerHTML = `
        <button id="previousPage">Previous Page</button>
        <button id="nextPage">Next Page</button>
    `;

    pageNavDom.querySelector("#previousPage").addEventListener("click", e => {
        previousPage();
    });
};


export function renderRegisterPage (){

    let mainDom = document.querySelector("main");

    renderBasicInfoPage();

    document.getElementById("startPageHeader").id = "registerPageHeader";
    document.getElementById("startPageMain").id = "registerPageMain";

    function renderBasicInfoPage() {

        mainDom.innerHTML = `
            <h1> Basic Info </h1>

            <div class="inputbox">
                <input type="username" name="name" class="required" required="required">
                <label for "name"> First name </label>
            </div>

            <div class="inputbox">
                <input type="email" name="email" class="required" required="required">
                <label for "email"> Email-adress </label>
            </div>

            <div class="inputbox">
                <input type="password" name="password" class="required password-input-register" required="required">
                <label for "password"> Password </label>
                <img src="../PHP/DB/image/eye.png" alt="show-password" id="show-password">
            </div>

            <div class="cityGenderAge">

                <label for "city">City:
                    <select name="city" class="required city">
                        <option value="none" > Choose a city </option>
                        ${renderCityDropdownListReg()}
                    </select>
                </label>

                <label for "gender">Gender:
                    <select name="gender" class="required">
                        <option value="none">Choose an option </option>
                        <option value="female"> Woman </option>
                        <option value="male"> Man </option>
                        <option value="both">Neither</option>
                    </select>
                </label>

                <label for "age">Age:
                    <input type="number" name="age" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="required">
                </label>

            </div>

            <div> ${renderPageNavigation(renderBasicInfoPage)} </div>
        `;

        let showPassword = mainDom.querySelector(".inputbox img");
        showPassword.addEventListener("click", togglePassword);

        function togglePassword() {
            let passwordInput = mainDom.querySelector(".password-input-register");

            if (passwordInput.type === "password") {
                passwordInput.type = "text";
            } else {
                passwordInput.type = "password";
            }
        }

        let nameDom = mainDom.querySelector("input[name='name']");
        let passwordDom = mainDom.querySelector("input[name='password']");
        let ageDom = mainDom.querySelector("input[name='age']");
        let genderDom = mainDom.querySelector("select[name='gender']");
        let emailDom = mainDom.querySelector("input[name='email']");
        let cityDom = mainDom.querySelector("select[name='city']");

        document.getElementById("nextPage").addEventListener("click", e => {
            if(
                nameDom.value != "" &&
                emailDom.value != "" &&
                passwordDom.value != ""
                && ageDom.value != null &&
                genderDom.value != "none"
                && cityDom.value != "none"
            ){
                let userData = {
                    image: {},
                    name: nameDom.value,
                    email: emailDom.value,
                    password: passwordDom.value,
                    age: ageDom.value,
                    city: cityDom.value,
                    gender: genderDom.value,
                    interests: [],
                    general: [],
                    preference: [],
                };

            imagePage(userData);
            } else {
            } errorMessage();
        })
    }

    function imagePage(userData){
        mainDom.innerHTML = `
            <h1> Upload a profile picture </h1>
            <form id="upload" action="register.php" method="POST" enctype="multipart/form-data">
                <input type="file" name="profilePicture">
                <button type="submit">Upload</button>
            </form>
            <div id="profilePicture">
                <div id="userImage"></div>
                <p id="imageMessage"></p>
            </div>

            ${renderPageNavigation(renderBasicInfoPage)}
        `;

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
                if(data.error) {
                    imageMessage.textContent = data.error;
                } else {
                    imageMessage.textContent = "Good choice!";
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
            <label for "bio">Bio:</label>
            <textarea name="bio" rows="7" id="registerBio" placeholder="Add more info about yourself..."></textarea>

            <p>Choose 5 interests</p>
            <div id="interestsList" class="required">
            </div>

            <p>How do you want people to contact you?</p>

            <div class="contact-methods">
                <input name="tel" type="tel" placeholder="Phone number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="required">
                <input name="facebook" placeholder="Facebook"></input>
                <input name="instagram" placeholder="Instagram"></input>
            </div>

            <p> Dont worry, you can change the way you wish to be contacted once you're registered your profile! </p>

            ${renderPageNavigation(imagePage)}
        `;

        const interests = [
            "Traveling", "Reading", "Yoga", "Movies", "Astrology", "Beer", "Dancing", "Fishing", "Wine", "Art", "Stand-up Comedy", "Running", "Movie Night", "Smoking", "Snus", "Poetry", "Night Out", "Fishing", "Sport", "Singing", "Photographing", "Gaming", "Hiking", "Playing Instruments", "Cooking", "Board Games", "Gym", "Sailing", "Fashion", "Backpacking", "Music Festivals"
        ];

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
        let tel = mainDom.querySelector("input[name='tel']");
        let facebook = mainDom.querySelector("input[name='facebook']");
        let instagram = mainDom.querySelector("input[name='instagram']");

        let interestsBoxes = document.querySelectorAll("input[type='checkbox']");
        let count = 0;
        let checkedIntrests = [];

        for(let i = 0; i < interestsBoxes.length; i++) {
            interestsBoxes[i].addEventListener("change", e => {
                if(interestsBoxes[i].checked === true){
                    count++;
                    checkedIntrests.push(interestsBoxes[i].name);
                } else {
                    count--;
                    let index = checkedIntrests.indexOf(interestsBoxes[i].name);
                    checkedIntrests.splice(index, 1);
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
            if(tel.value != "" && count === 5){
                let interests = checkedIntrests.map((value) => value);

                let general = {
                bio: bio.value,
                tel: tel.value,
                facebook: facebook.value,
                instagram: instagram.value,
                };

                userData.interests.push(interests);
                userData.general.push(general);

                preferencePage(userData);

            } else {
                errorMessage();
            }
        })
    };

    function preferencePage(userData){
        mainDom.innerHTML = `
            <h1> What are you looking for? </h1>
            <div id="lookingFor">
                <lable for "genderOf"> I'm intrested in: </lable>
                <select name="genderOf" class="required">
                    <option value="none"> Choose an option </option>
                    <option value="female"> Female </option>
                    <option value="male"> Male </option>
                    <option value="both">Both</option>
                </select>
                <p> What age do you prefer? </p>
                <div class="preferredAge">
                    <input name="ageOfMin" class="required" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Min-age">
                    <input name="ageOfMax" class="required" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Max-age">
                </div>
            </div>
            <div>${renderPageNavigation(QuestionPage)} </div>
        `;

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

        if(requestPOST.ok){
            window.localStorage.setItem("user", JSON.stringify(JSONresponse));
            renderDatingPage();
            } else {
                let error_message = document.createElement("p");
                mainDom.append(error_message);
                error_message.textContent = JSONresponse;
        }
    }
}
