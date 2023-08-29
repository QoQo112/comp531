window.onload = function () {
    let wrapper = document.querySelector(".wrapper"), 
    registerHeader = document.querySelector(".register header"), 
    loginHeader = document.querySelector(".login header"),
    birthday = document.querySelector("#date"), 
    registerButton = document.querySelector("#registerButton"), 
    password = document.querySelector("#password"),
    confirmPassword = document.querySelector("#confirm"), 
    timestamp = document.querySelector("#timestamp"), 
    phone = document.querySelector("#phone"), 
    account = document.querySelector("#account"), 
    display = document.querySelector("#display"), 
    email = document.querySelector("#email"), 
    zip = document.querySelector("#zip"),
    clear = document.querySelector("#clearButton"), 
    form = document.querySelector("#form"), 
    login = document.querySelector("#login"), 
    loginEmail = document.querySelector("#loginEmail"),
    loginPassword = document.querySelector("#loginPassword"); 
    
    timestamp.value = Date.now(); 

    loginHeader.addEventListener("click", () => {
        wrapper.classList.add("active");
    });

    registerHeader.addEventListener("click", () => {
        wrapper.classList.remove("active");
    });

    clear.addEventListener("click", () => {
        clearErrorMessage();
    })

    registerButton.addEventListener("click", (event) => {
        if (!hasValue(account)) {
            text = "Please enter your account name. "
            // sendNotification("error", text);
            account.classList.add("input-error");
            addErrorMessage(account, text); 
        }

        if (!hasValue(display)) {
            text = "Please enter your display name."
            // sendNotification("error", "Display:" + text);
            display.classList.add("input-error");
            addErrorMessage(display, text); 
        }
        
        if (!isValidEmail(email)) {
            text = "Please enter valid email: Eg. xxx@gmail.com"
            // sendNotification("error", "Email:" + text);
            email.classList.add("input-error");
            event.preventDefault();
            addErrorMessage(email, text);
        }
        
        if (!isValidPhoneNumber(phone)) {
            text = "Please enter your phone: xxx-xxx-xxxx."
            phone.classList.add("input-error");
            // sendNotification("error", "Phone: " + text);
            event.preventDefault();
            addErrorMessage(phone, text);  
        }
        
        if (isInvalidAge(birthday)) {
            text = "You must be 18 years old or above."
            // sendNotification("error", "Age: " + text);
            event.preventDefault();
            addErrorMessage(birthday, text);  
        } 
        
        if (!isValidZip(zip)) {
            text = "Please enter your zip code."
            // sendNotification("error", "Zip:" + text);
            zip.classList.add("input-error");
            addErrorMessage(zip, text); 
            
        }

        if (!isPasswordMatched(password, confirmPassword)) {
            let text; 
            event.preventDefault(); 
            password.classList.add("input-error");
            if (!hasValue(password)) {
                text = "Please enter your password! "
                password.classList.add("input-error");
                addErrorMessage(password, text);   
            }
            
            if (!hasValue(confirmPassword)) {
                text = "Please confirm your password."
                confirmPassword.classList.add("input-error");
                addErrorMessage(confirmPassword, text); 
            } else {
                text = "Password not matched.";
                password.classList.add("input-error"); 
                confirmPassword.classList.add("input-error");
                addErrorMessage(password, text); 
                addErrorMessage(confirmPassword, text); 
            }
            // sendNotification("error", text);             
        }

        //Check all elements is validated.
        let isValidated = document.getElementsByClassName("input-error").length <= 0;

        if (isValidated && !isInvalidAge(birthday)) {
            event.preventDefault();
            localStorage.setItem('email', email.value);
            localStorage.setItem('password', password.value); 
            setTimeout(() => {
                document.querySelector('#form').submit();
            }, 2000);
            sendNotification("success", "Sign Up Successfully! ");
        }
    })

    login.addEventListener("click", (event) => {
        if (loginEmail.value === localStorage.getItem("email") && 
            loginPassword.value === localStorage.getItem("password")) {
                sendNotification("success", "Log in Successfully! ")
        } else {
            event.preventDefault();
            sendNotification("error", "Log in failed, please try again!")
        }
    });

    //Effect after validating
    account.addEventListener("input", () => {
        account.setCustomValidity("");
        account.classList.remove("input-error");
        removeErrorMessage("accountError");
    })
    
    display.addEventListener("input", () => {
        display.setCustomValidity("");
        display.classList.remove("input-error"); 
        removeErrorMessage("displayError");
    })
    
    email.addEventListener("input", () => {
        if (isValidEmail(email)) {
            email.setCustomValidity("");
            email.classList.remove("input-error");
            removeErrorMessage("emailError");
        }
    })
    
    phone.addEventListener("input", function() {
        if (phone.value.replace("/\D/g", "").length === 10) {
            formatPhoneNumber(phone); 
        }
        
        if (hasValue(phone)) {
            phone.classList.remove("input-error");
            removeErrorMessage("phoneError");
        }
    })
    
    birthday.addEventListener("input", function() {
        if (!isInvalidAge(birthday)) {
            birthday.classList.remove("input-error");
            removeErrorMessage("dateError"); 
        }
    })

    zip.addEventListener("input", function() {
        if (isValidZip(zip)) {
            zip.classList.remove("input-error");
            removeErrorMessage("zipError"); 
        }
    })

    password.addEventListener("input", function() {
        if(hasValue(password)) {
            password.classList.remove("input-error");
            removeErrorMessage("passwordError"); 
        }

        if (isPasswordMatched(password, confirmPassword)) {
            password.classList.remove("input-error");
            confirmPassword.classList.remove("input-error");
            removeErrorMessage("passwordError"); 
            removeErrorMessage("confirmError"); 
        }
    })

    confirmPassword.addEventListener("input", function() {
        if(hasValue(confirmPassword)) {
            password.classList.remove("input-error");
            removeErrorMessage("confirmError"); 
        }

        if (isPasswordMatched(password, confirmPassword)) {
            confirmPassword.classList.remove("input-error");
            password.classList.remove("input-error");
            removeErrorMessage("passwordError"); 
            removeErrorMessage("confirmError"); 
        }
    })


    //Validated Function
    function hasValue(item) {
        if(item.value.trim() != "") return true; 
    }
    
    function isValidPhoneNumber(phone) {
        return /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone.value);
    }

    function isValidEmail(email) {
        const emailTester = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;
        return emailTester.test(email.value); 
    }

    function isValidZip(zip) {
        if (zip.value.length == 5) return true; 
    }
    
    function isInvalidAge(birthday) {
        age = (new Date() - new Date(birthday.value)) / (1000 * 3600 * 24 * 365);
        if (age < 18 || isNaN(age)) {
            return true; 
        }
    }

    function isPasswordMatched(password, confirmPassword) { 
        if (password.value === confirmPassword.value && hasValue(password) && hasValue(confirmPassword)) {
            return true;
        } else{
            return false; 
        } 
    }

    
    //Other functions
    function formatPhoneNumber(phone) {
        let cleaned = ('' + phone.value).replace(/\D/g, '');  
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            phone.value = match[1] + '-' + match[2] + '-' + match[3];
        }
    }
    
    function addErrorMessage(element, text) {
        let errorMessage = document.getElementById(element.id + "Error"); 
        if (errorMessage != null) return; 

        let err = document.createElement("div");
        err.innerHTML = text; 
        err.classList.add("errorMessage");
        err.id = element.id + "Error";   
        element.after(err);
    }

    function removeErrorMessage(id) {
        let errorElem = document.getElementById(id);
        if (errorElem != null) errorElem.remove(); 
    }

    function clearErrorMessage() {
        for (let i = 0; i < 8; i++) {
            let child = form.children[i]; 
            removeErrorMessage(child.id + "Error");
            child.classList.remove("input-error"); 
        }
    }

    
    

    // Sending notification:
    function sendNotification(type, text) {
        let notificationBox = document.querySelector(".notification-box");
        notificationBox.classList.add("animate-notification");
        const alerts = {
            error: {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`,
            color: "#EF4444"
            },
            success: {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`,
            color: "#00fa9a"
            }
        };
        let alertComponent = document.createElement("div");
        let space = document.createElement("div"); 
        alertComponent.classList.add("alert-box");
        space.classList.add("space"); 
        alertComponent.style.backgroundColor = `${alerts[type].color}`; 
        alertComponent.innerHTML = `${alerts[type].icon}<p>${text}</p>`;
        notificationBox.appendChild(alertComponent);
        notificationBox.appendChild(space)
        setTimeout(() => {
            notificationBox.removeChild(alertComponent);
            notificationBox.removeChild(space)
        }, 1500);
    }
    
}