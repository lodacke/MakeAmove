"use strict"

let mainDom = document.querySelector("main");

let request = "PHP/register.php";

mainDom.innerHTML = `
<lable for "name"> Username: </lable>
<input type="username" name="username"> 

<lable for "password"> Password: </lable>
<input type="password" name="password"> 

<lable for "age"> Age: </lable>
<input type="number" name="age">

<lable for "image"> Profile photo: </lable>
<input type="file" name="image">

<lable for "gender"> Gender: </lable>
<select name="gender"> 
<option value="none">Choose an option </option>
<option value="female"> Female </option>
<option value="male"> Male </option>
<option value="None">Dont want to say</option>
</select>
<button id="pageOne">Next page</button>`;

let usernameDom = mainDom.querySelector("input[name='username']");
let passwordDom = mainDom.querySelector("input[name='password']");
let ageDom = mainDom.querySelector("input[name='age']");
//let imageDom = mainDom.querySelector("input[name='image']");
let genderDom = mainDom.querySelector("select[name='gender']");

mainDom.querySelector("#pageOne").addEventListener("click", e => { 

    if(usernameDom.value != "" && passwordDom.value != "" && ageDom != null && genderDom != "none"){

    let userData = { 
        username: usernameDom.value,
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
        <lable for "userInfo">Tell people about yourself:</lable>
        <input name="userInfo">

        <lable for "contact">How do you want people to contact you?</lable>
        <input name="contact" placeholder="email or phonenumber">

        <button id=pageTwo>Next Page</button>
        `;

        let userInfo = mainDom.querySelector("input[name='userInfo']");
        let contact = mainDom.querySelector("input[name='contact']");

        mainDom.querySelector("#pageTwo").addEventListener("click", e => {
        
            if(userInfo.value != "" && contact.value != ""){
            
                let preference = {
                     userInfo: userInfo.value,
                     contact: contact.value
                    };

                userData.interests.push(preference);

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

                    <lable for "ageOf"> What age: </lable>
                    <input type="number" name="ageOf">    

                    <button id="submitUser">Start dating!</button>           
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
    } //else addUser() kansk??
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

