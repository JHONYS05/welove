var Emailrepeat = false;

$("#regEmail").change(function(){

    var email = $("#regEmail").val();

    var data = new FormData();
    data.append("validEamil", email);

    $.ajax({

        url:routhidden+"ajax/user.ajax.py",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success:function(answer){
            console.log("answer", answer);
        }
    })
})

// Sign Up Code 
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--erro");
    messageElement.classList.add(`from__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEvenListener("#click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelectot("linkCreateAccount").addEvenListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
    

    // Perform your AJAX/Fetch login
    setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelector(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if(e.target.id === "singupUsername" && e.target.value.legenth > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


//New code for sign Update
const form      = document.getElementById('form');
const username  = document.getElementById('username');
const email     = document.getElementById('email');
const password  = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEvenListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    // Trim to remove the whitespace
    const usernameValue  = username.value.trim();
    const emailValue     = email.value.trim();
    const passwordValue  = password.value.trim();
    const password2Value = pasword2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username cannot be blank');
    }else{
        setSuccessError(username);
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    }else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else { 
        setSuccessFor(email);
    }

    if(passwordValue === ''){
        setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccessFor(password);
    }

    if(password2Value === '') {
        setErrorFor(password2, 'Password2 cannot be blank');
    } else if(passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
    } else{
        setSuccessFor(password2);
    }
}

function setSuccessfor(input, message) { 
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) { 
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Social Panel js 
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener("click", () => {
    social_panel_container.classList.toggle("visible")
});

close_btn.addEventListener("click", () => {
    social_panel_container.classList.remove("visible")
});