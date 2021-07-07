function validateLogin(event) {
    const username_error = document.querySelector("#email_error");
    const password_error = document.querySelector("#pwd_error");
    if(event.currentTarget.email.value.length === 0) {
        if(username_error.classList.contains('hidden')) {
            username_error.classList.remove('hidden');
        }
        event.preventDefault();
    }

    else {
        if(!username_error.classList.contains('hidden'))
            username_error.classList.add('hidden');
    }

    if(event.currentTarget.password.value.length === 0) {
        if(password_error.classList.contains('hidden')) {
            password_error.classList.remove('hidden');
        }
        event.preventDefault();
    }
            
    else {
        if(!username_error.classList.contains('hidden'))
            password_error.classList.add('hidden');
    }
}

const login_form = document.forms['login'];
login_form.addEventListener('submit', validateLogin);

function showPassword() {
    const password_box = document.querySelector('#password_box');
    const password_input = password_box.querySelector('input');

    if(password_input.classList.contains('visible_password')) {
        password_input.classList.remove('visible_password');
        password_input.type = 'password';
    }
    
    else {
        password_input.classList.add('visible_password');
        password_input.type = 'text';
    }
}

const show_password = document.querySelector('.show_password');
show_password.addEventListener("click", showPassword);