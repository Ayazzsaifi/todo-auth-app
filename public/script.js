//-----------signUp---------//


const signupUsername = document.getElementById("signup-username");
const signupPassword = document.getElementById("signup-password");
const signupBtn = document.getElementById("signUp-btn");

signupBtn.addEventListener("click", async function () {
    const username = signupUsername.value;
    const password = signupPassword.value;
    console.log(username, password);

    try {
        const response = await axios.post("http://localhost:3000/signup", {
            username: username,
            password: password
        })
        console.log(response.data)

    }
    catch (err) {
        console.log(err)
    }


})

//-----------signIn---------//

const signinUsername = document.getElementById("signin-username");
const signinPassword = document.getElementById("signin-password");
const signinBtn = document.getElementById("signin-btn");


signinBtn.addEventListener("click", async function () {
    const username = signinUsername.value;
    const password = signinPassword.value;

    console.log(username, password);

    try {
        const response = await axios.post("http://localhost:3000/signin", {
            username: username,
            password: password
        })
        console.log(response.data)
        if (response.data.token) {
            localStorage.setItem("token", response.data.token)

            //--------------- get todos------------------//
            window.location.href = "todo.html";
            
        }


    }
    catch (err) {
        console.log(err)
    }


})

