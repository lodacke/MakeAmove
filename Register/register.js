"use strict"

let mainDom = document.querySelector("main");

let request = "register/register.php";

mainDom.innerHTML = `
<h1> Basic Info </h1>
<lable for "name"> Name: </lable>
<input type="username" name="name" minlength="2" required> 

<lable for "email"> Email-adress: </lable>
<input type="email" name="email" required> 

<lable for "password"> Password: </lable>
<input type="password" name="password" minlength="10" required> 

<lable for "age"> Age: </lable>
<input type="number" name="age" required>

<lable for "gender"> Gender: </lable>
<select name="gender"> 
<option value="none">Choose an option </option>
<option value="female"> Girl </option>
<option value="male"> Boy </option>
<option value="neither">Neither</option>
</select>
<button id="pageOne">Next page</button>
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

        function imagePage(userData){     //Lägga till Sofies form här
            mainDom.innerHTML = `
            <h1> Chose profile Photo</h1>
            <lable for "image"> Profile photo: </lable>
            <input type="file" name="image">
            <button id="QuestionPage"> Next page </button>
            `;

            mainDom.querySelector("#QuestionPage").addEventListener( "click", e => { 
                let imageDom = mainDom.querySelector("input[name='image']");
                userData.image = imageDom.value;

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
                <input name="contact" type="tel" placeholder="phonenumber" minlength="8" required>

                <button id=pageTwo>Next Page</button>
                `;

                let userInfo = mainDom.querySelector("input[name='userInfo']");
                let contact = mainDom.querySelector("input[name='contact']");
                let userQuestionOne = mainDom.querySelector("input[name='userQuestionOne']");
                let userQuestionTwo = mainDom.querySelector("input[name='userQuestionTwo']");
                let userQuestionThree = mainDom.querySelector("input[name='userQuestionThree']");


                mainDom.querySelector("#pageTwo").addEventListener("click", e => {
                
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
                            <select name="genderOf">
                            <option value="none">Choose an option </option>
                            <option value="Girls"> Female </option>
                            <option value="Boys"> Male </option>
                            <option value="Both">Both</option>
                            </select>
                            <p> What age </p>
                            <div id="minMax">
                            <div id=sliderValue> 
                             <h2 id="titleMin" class="sliderValueTitle">18</h2>
                             <h2 id="titleMax" class="sliderValueTitle">99</h2>
                             </div>
                            <input type="range" name="min_ageOf" step="1" min="18" max="99">
                            <input type="range" name="max_ageOf" step="1" min="18" max="99">    
                            </div>
                            <button type=submit id="submitUser">Start dating!</button>         
                            `;

                            let genderOf = mainDom.querySelector("select[name='genderOf']");
                            let ageOf = mainDom.querySelector("input[name='ageOf']");

                            mainDom.querySelector("#submitUser").addEventListener("click", e => { 
                               if(genderOf.value != "none" && ageOf.value != null){

                                    let preference = {
                                        genderOf: genderOf.value,
                                        ageOf: ageOf.value
                                    };
                                    userData.preference.push(preference);
                                    addUser(userData);
                                    // Länk till funktion för att starta dejtandet()
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
} else {
    let message = "";
    switch ("") {
        case nameDom: message = "You need till fill out you're name"
    }
    erroMessage(message)
    }

})
   

async function addUser(userData){

    let requestPOST = await fetch( new Request(request, {
    method: "POST",
    headers: {"Content-type":"application/json; charset=UTF-8"},
    body: JSON.stringify(userData)
    }));  

    let JSONresponse = await requestPOST.json();

    //let p_dom = document.createElement("p");
    //document.querySelector("main").append(p_dom);
//
    //if(requestPOST.status === 200){
    //    p_dom.textContent = ""; //Försök lägga p_dom i en egen funktion. 
    //    p_dom.textContent = `${JSONresponse}`;
//
    //} else {
    //    p_dom.textContent = `errorcode: ${requestPOST.statusText}, ${JSONresponse}`;     
    //}
}

function erroMessage(message){ 
    let error_message = document.createElement("p");
    console.log(message);
    error_message.textContent = "You havent fild in all the required fields" + `${message}`;
    mainDom.append(error_message);
};
