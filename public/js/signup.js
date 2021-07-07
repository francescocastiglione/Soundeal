function checkName(event) {
    const name_input = event.currentTarget;
    const error_message = name_input.parentNode.querySelector('p');
    if (name_input.value.length === 0) {
        name_input.classList.add("error");
        error_message.classList.remove("hidden");
        error_message.textContent = "Questo campo non può essere vuoto.";
        signup_values[name_input.name] = false;
    }
    else {
        name_input.classList.remove("error");
        error_message.classList.add("hidden");
        signup_values[name_input.name] = true;
    }

    checkSignup();
}

function onResponse(response) {
    if(!response.ok) {
        console.log("Risposta non valida.");
        return null;
    }
    else {
        return response.json();
    }
}

function onError(error) {
    console.log('Error: ' + error);
}

function checkUsername(event) {
    const username_input = event.currentTarget;
    const error_message = username_input.parentNode.querySelector('p');
    if(!/^[a-zA-Zà-úÀ-Ú0-9_%&@ ]{3,40}$/.test(username_input.value)) {
        username_input.classList.add("error");
        error_message.classList.remove("hidden");
        error_message.textContent = "Inserisci almeno 3 caratteri. È ammesso l'utilizzo di lettere, numeri, % & _ @. Max: 40.";
        signup_values[username_input.name] = false;
    } 
    else {
        username_input.classList.remove("error");
        error_message.classList.add("hidden");
        signup_values[username_input.name] = true;
    }    

    checkSignup();
}

function checkEmailUser(json) {
    const email_input = document.querySelector('#email');
    const error_message = email_input.parentNode.querySelector('p');
    const exists = json.exists;
    if (exists) {
        email_input.classList.add("error");
        error_message.classList.remove("hidden");
        error_message.textContent = "È già presente un utente con questa email.";
        signup_values[email_input.name] = false;
    }
    else {
        email_input.classList.remove("error");
        error_message.classList.add("hidden");
        signup_values[email_input.name] = true;
    }
}

function checkEmail(event) {
    const email_input = event.currentTarget;
    const error_message = email_input.parentNode.querySelector('p');
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email_input.value).toLowerCase())) {
        email_input.classList.add("error");
        error_message.classList.remove("hidden");
        error_message.textContent = "Email non valida.";
        signup_values[email_input.name] = false;
    }    
    else {
        email_input.classList.remove("error");
        error_message.classList.add("hidden");
        fetch("/soundeal/public/signup/email/"+encodeURIComponent(String(email_input.value).toLowerCase())).then(onResponse, onError).then(checkEmailUser);
    }
}

function checkPassword(event) {
    const password_input = event.currentTarget;
    const error_message = password_input.parentNode.querySelector('p');
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/.test(String(password_input.value))) {        
        password_input.classList.add("error");
        error_message.classList.remove("hidden");
        error_message.textContent = "Password non valida. Deve contenere almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale. Min: 8 caratteri.";
        signup_values[password_input.name] = false;
    }
    else {
        password_input.classList.remove("error");
        error_message.classList.add("hidden");
        signup_values[password_input.name] = true;
    }

    checkSignup();
}

function checkConfirmPassword(event) {
    const password_input = event.currentTarget;
    const error_message = password_input.parentNode.querySelector('p');
    const password = document.querySelector('#user_pwd');

    if(password_input.value !== password.value) {
        password_input.classList.add("error");
        error_message.classList.remove("hidden");
        error_message.textContent = "La password non corrisponde."
        signup_values[password_input.name] = false;
    }
    else {
        password_input.classList.remove("error");
        error_message.classList.add("hidden");
        signup_values[password_input.name] = true;
    }
    checkSignup();
}

function checkAgree(event) {
    const agree = event.currentTarget;
    if (!agree.checked) {
        signup_values[agree.name] = false;
    }
    else {
        signup_values[agree.name] = true;
    }
    checkSignup();
}   

function checkSignup() {
    const submit_button = document.querySelector('#signup');
    submit_button.disabled = Object.keys(signup_values).length !== 8 || Object.values(signup_values).includes(false);
}

function deleteImage(event) {
    const delete_button = event.currentTarget;
    const input = document.querySelector("#file_input");
    const upload_label = document.querySelector("#input_box label");
    const add = upload_label.querySelector("img");
    const error_message = input.parentNode.querySelector("p");
    const label_text = upload_label.querySelector("span");
    error_message.classList.add("hidden");
    delete_button.remove();
    add.src = "images/add.png";
    label_text.textContent = "Scegli l'immagine da artista";
    input.value = "";
    signup_values[input.name] = true; 
    checkSignup();
}

function uploadImage() {
    const exist_delete_button = document.querySelector(".delete_button");
    if (exist_delete_button) {
        exist_delete_button.remove();
    }
    const upload = document.querySelector("#file_input");
    const upload_label = document.querySelector("#input_box label");
    const label_text = upload_label.querySelector("span");
    const add = upload_label.querySelector("img");
    const error_message = upload.parentNode.querySelector("p");
    label_text.textContent =upload.files[0].name;
    const img_size = upload.files[0].size;
    const extension = upload.files[0].name.split('.').pop();

    const box = document.querySelector("#input_box");
    const delete_button = document.createElement('img');
    delete_button.classList.add("delete_button");
    delete_button.src = "images/x.png";
    box.appendChild(delete_button);
    delete_button.addEventListener("click", deleteImage);


    if (img_size > 2000000) {
        add.src = "images/warning.png";
        error_message.classList.remove("hidden");
        error_message.textContent = "La dimensione dell'immagine non deve superare 2 MB."
        signup_values[upload.name] = false;
    } 
    else if (!['jpeg', 'jpg', 'png'].includes(extension))  {
        add.src = "images/warning.png";
        error_message.classList.remove("hidden");
        error_message.textContent = "Carica un file .jpeg, .jpg o .png."
        signup_values[upload.name] = false;
    } 
    else {
        add.src = "images/v.png";
        error_message.classList.add("hidden");
        signup_values[upload.name] = true;
    }
    checkSignup();
}

function checkUpload() {
    const upload = document.querySelector("#file_input");
    const image = upload.files[0];
    if(image) {
        uploadImage();
    }
    else {
        const upload_label = document.querySelector("#input_box label");
        const add = upload_label.querySelector("img");
        const delete_button = document.querySelector(".delete_button");
        const label_text = upload_label.querySelector("span");
        if (delete_button) {
            delete_button.remove();
        }
        add.src = "images/add.png";
        label_text.textContent = "Scegli l'immagine da artista";
        signup_values[upload.name] = true;         
    }
}

const signup_values = {'artist_img': true};
const first_name = document.querySelector("#first_name");
first_name.addEventListener("blur", checkName);
const last_name = document.querySelector("#last_name");
last_name.addEventListener("blur", checkName);
const username = document.querySelector("#username");
username.addEventListener("blur", checkUsername);
const email = document.querySelector("#email");
email.addEventListener("blur", checkEmail);
const password = document.querySelector("#user_pwd");
password.addEventListener("blur", checkPassword);
const confirm_password = document.querySelector("#user_confirm_pwd");
confirm_password.addEventListener("blur", checkConfirmPassword);
const agree = document.querySelector("#agree");
agree.addEventListener("change", checkAgree);
const file_input = document.querySelector("#file_input");
file_input.addEventListener("change", checkUpload);