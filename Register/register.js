"use strict"

let mainDom = document.querySelector("main");

let request = "register.php";

mainDom.innerHTML = `
<lable for "name"> Name: </lable>
<input type="username" name="name" minlength="2" required> 

<lable for "email"> Email-adress: </lable>
<input type="email" name="email" required> 

<lable for "password"> Password: </lable>
<input type="password" name="password" minlength="10" required> 

<lable for "age"> Age: </lable>
<input type="number" name="age" required>

<lable for "image"> Profile photo: </lable>
<input type="file" name="image">

<lable for "gender"> Gender: </lable>
<select name="gender"> 
<option value="none">Choose an option </option>
<option value="female"> Female </option>
<option value="male"> Male </option>
<option value="None">Dont want to say</option>
</select>
<button id="pageOne">Next page</button>
`;

let nameDom = mainDom.querySelector("input[name='name']");
let passwordDom = mainDom.querySelector("input[name='password']");
let ageDom = mainDom.querySelector("input[name='age']");
//let imageDom = mainDom.querySelector("input[name='image']");
let genderDom = mainDom.querySelector("select[name='gender']");
let emailDom = mainDom.querySelector("input[name='email']");


mainDom.querySelector("#pageOne").addEventListener("click", e => { 

   // if(nameDom.value != "" && emailDom.value != "" && passwordDom.value != "" && ageDom != null && genderDom != "none"){

    let userData = { 
        name: nameDom.value,
        email: emailDom.value,
        password: passwordDom.value,
        age: ageDom.value,
        gender: genderDom.value,
        interests: [],
        preference: [],
        // image: imageDom.value,
    };

    mainDom.innerHTML =``;
    pageTwo(userData);

    function pageTwo(userData){
        mainDom.innerHTML = `
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
                mainDom.innerHTML =``;
                pageThree(userData);

                function pageThree(userData){
                    mainDom.innerHTML =`
                    <lable for "genderOf"> I'm intrested in: </lable>
                    <select name="genderOf">
                    <option value="none">Choose an option </option>
                    <option value="female"> Female </option>
                    <option value="male"> Male </option>
                    <option value="None">Dont want to say</option>
                    </select>
                    <div id="min-max" legendnum="2">
                    <p> What age </p>
                    <lable for "min_ageOf">Min age </lable>
                    <input type="range" name="min_ageOf" step="1" min="18" max="99">
                    <lable for "max_ageOf">Max age</lable>
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
                            //mainDom.innerHTML = ``;
                            }
                        })
                    }
                }           
            })

        } //else { 
    // Här måste det läggas till antingen en fetch så att man kan nå felmeddelandena (problemet är att userData är i fel scope)
    // Eller läggas till felkoder manuellt för de olika casen.
   // } //else addUser() kansk??
});

async function addUser(userData){

    let requestPOST = await fetch( new Request(request, {
    method: "POST",
    headers: {"Content-type":"application/json; charset=UTF-8"},
    body: JSON.stringify(userData)
    }));  

    let JSONresponse = await requestPOST.json();

    let p_dom = document.createElement("p");
    document.querySelector("main").append(p_dom);

    if(requestPOST.status === 200){
        p_dom.textContent = ""; //Försök lägga p_dom i en egen funktion. 
        p_dom.textContent = `${JSONresponse}`;

       // mainDom.innerHTML = ``;

    } else {
        p_dom.textContent = "";
        p_dom.textContent = `errorcode: ${requestPOST.statusText}, ${JSONresponse}`;     
    }

}

