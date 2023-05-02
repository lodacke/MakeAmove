"use strict"

function renderRegisterPage (){ 

    let mainDom = document.querySelector("main");

    mainDom.innerHTML = `
    <h1> Basic Info </h1>
    <lable for "name"> First name: </lable>
    <input type="username" name="name" class="required"> 

    <lable for "email"> Email-adress: </lable>
    <input type="email" name="email" class="required"> 

    <lable for "password"> Password: </lable>
    <input type="password" name="password" minlength="10" class="required"> 

    <lable for "age"> Age: </lable>
    <input type="number" name="age" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="required">

    <lable for "gender"> Gender: </lable>
    <select name="gender" class="required"> 
    <option value="none">Choose an option </option>
    <option value="female"> Girl </option>  
    <option value="male"> Boy </option>
    <option value="neither">Neither</option>
    </select>
    <button id="pageOne">Next page</button>

    <div id="minMax">
        <h3 span class="rangeMinDom"> </h3>
        <div id="tracker"></div>
            <input type="range" class="rangeMin" name="min_ageOf" step="1" min="18" max="99">
            <input type="range"class="rangeMax" name="max_ageOf" step="1" min="18" max="99"> 
        <h3 span class="rangeMaxDom"> </h3>  
    </div>
    `;

    let nameDom = mainDom.querySelector("input[name='name']");
    let passwordDom = mainDom.querySelector("input[name='password']");
    let ageDom = mainDom.querySelector("input[name='age']");
    let genderDom = mainDom.querySelector("select[name='gender']");
    let emailDom = mainDom.querySelector("input[name='email']");


    mainDom.querySelector("#pageOne").addEventListener("click", e => { 

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
                <button id="QuestionPage">Next Page </button>
                `;

                const form = document.getElementById("upload");
                const imageMessage = document.getElementById("imageMessage");
                const userImage = document.getElementById("userImage");
                
                form.addEventListener("submit", function(event) {
                    event.preventDefault();
                    userImage.innerHTML = "";
                    const formData = new FormData(form);
                    const request = new Request("Register/register.php", {
                        method: "POST",
                        body: formData,
                    })
                
                    fetch(request)
                        .then(response => response.json())
                        .then(data => {
                            //form.reset();
                            if(data.error) {
                                imageMessage.textContent = data.error;
                            } else {
                                imageMessage.textContent = "Success!";
                
                                const img = document.createElement("img");
                                img.src = data.image;
                                console.log(data.image);
                                userImage.appendChild(img);

                                userData.image = data.image;
                            }
                        });
                    })
                

                mainDom.querySelector("#QuestionPage").addEventListener( "click", e => { 
                   // let imageDom = mainDom.querySelector("input[name='image']");
                   // userData.image = imageDom.value;

                    console.log(userData.image);
                    QuestionPage(userData);


                function QuestionPage(userData){
                    mainDom.innerHTML = `
                    <h1> Tell people more about you </h1>
                    <lable for "userQuestionOne"> Sweet or salty snacks</lable>
                    <input name="userQuestionOne">

                    <lable for "userQuestionTwo"> Do you have siblings?:</lable>
                    <input name="userQuestionTwo">

                    <lable for "userQuestionThree"> How old were you when you lost you're first tooth:</lable>
                    <input name="userQuestionThree">

                    <lable for "userInfo"> Anything else you'd like to add:</lable>
                    <input name="userInfo">

                    <p> Dont worry, you can change the way you wish to be contacted once you're registered your profile </p>

                    <lable for "contact">How do you want people to contact you?</lable> 
                    <input name="contact" type="tel" placeholder="phonenumber" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="required">

                    <button id=pageTwo>Next Page</button>
                    `;

                    let userInfo = mainDom.querySelector("input[name='userInfo']");
                    let contact = mainDom.querySelector("input[name='contact']");
                    let userQuestionOne = mainDom.querySelector("input[name='userQuestionOne']");
                    let userQuestionTwo = mainDom.querySelector("input[name='userQuestionTwo']");
                    let userQuestionThree = mainDom.querySelector("input[name='userQuestionThree']");


                    mainDom.querySelector("#pageTwo").addEventListener("click", e => {
                        console.log(contact.value.length);
                    
                        if(contact.value != ""){
                        
                            let interests = {
                                 userQuestionOne: userQuestionOne.value,
                                 userQuestionTwo: userQuestionTwo.value,
                                 userQuestionThree: userQuestionThree.value,
                                 userInfo: userInfo.value,
                                 contact: contact.value
                                };

                            userData.interests.push(interests);

                            console.log(userData);
                            preferencePage(userData);

                            function preferencePage(userData){
                                mainDom.innerHTML =`
                                <h1> What are you looking for? </h1>
                                <lable for "genderOf"> I'm intrested in: </lable>
                                <select name="genderOf" class="required">
                                <option value="none"> Choose an option> </option>
                                <option value="Girls"> Female </option>
                                <option value="Boys"> Male </option>
                                <option value="Both">Both</option>
                                </select>
                                <p> What age </p>
                                <input name="ageOfMin" class="required" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Min-age">
                                <input name="ageOfMax" class="required" onkeypress="return event.charCode >= 48 && event.charCode <= 57" placeholder="Max-age">

                                <button type=submit id="submitUser">Start dating!</button>         
                                `;

                                let genderOf = mainDom.querySelector("select[name='genderOf']");
                                let ageOfMin = mainDom.querySelector("input[name='ageOfMin']");
                                let ageOfMax = mainDom.querySelector("input[name='ageOfMax']");

                                mainDom.querySelector("#submitUser").addEventListener("click", e => { 
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
                                            erroMessage();
                                        }
                                    })
                                }
                            } else {
                                erroMessage();
                        }          
                    })    
                }   
            })
        }
} else { erroMessage();
    }

})
    
}

   

async function addUser(userData){

    let requestPOST = await fetch( new Request("Register/register.php", {
    method: "POST",
    headers: {"Content-type":"application/json; charset=UTF-8"},
    body: JSON.stringify(userData)
    }));  

    let JSONresponse = await requestPOST.json();
}

function erroMessage(){ 

    let RequiredInputs = document.querySelectorAll(".required");
    RequiredInputs.forEach(required => { 
        if (required.value == "" || required.value == "none"){
            required.classList.add("notAnswered");

         switch(required.attributes.name.value){
            case "name": 
                required.placeholder = "You need to write you're name.";
                break;
            case "email": 
                required.placeholder ="This does not look like an emailadress?";
                break;
            case "password": 
                required.placeholder = "The password needs to be atleast 8 characters.";
                break;
            case "age":
                required.placeholder = "You need to be atleast 18 years old to use this app.";
                break;
            case "contact": 
                required.placeholder = "This does not look like a phone number?";
                break;
            case "ageOf":
                required.placeholder = "What age?";
                break;
            }
    }  else {
            required.classList.remove("notAnswered");
        }   
    })
};

function AgeRange (){
    let minRange = document.querySelector(".rangeMin");
    let maxRange = document.querySelector("rangeMax");
    let minRangeDom = document.querySelector(".rangeMinDom");
    let maxRangeDom = document.querySelector("rangeMaxDom");

    minRangeDom.textContent = minRange;
    maxRangeDom.textContent = maxRange;
}



