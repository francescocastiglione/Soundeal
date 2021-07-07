function check() {
    const submit_button = document.querySelector('#submit');
    submit_button.disabled = Object.keys(upload_values).length !== 2 || Object.values(upload_values).includes(false);
}


function checkTitle(event) {
    const title_input = event.currentTarget;
    const error_message = title_input.parentNode.querySelector('p');
    if (title_input.value.length === 0) {
        error_message.classList.remove("hidden");
        upload_values[title_input.name] = false;
    }
    else {
        error_message.classList.add("hidden");
        upload_values[title_input.name] = true;
    }

    check();
}

function deleteImage(event) {
    const delete_button = event.currentTarget;
    const input = document.querySelector("#album_cover_file");
    const upload_label = document.querySelector(".upload_file label");
    const add = upload_label.querySelector("img");
    const error_message = input.parentNode.querySelector("p");
    const label_text = upload_label.querySelector("span");
    error_message.classList.add("hidden");
    delete_button.remove();
    add.src = "images/upload.png";
    label_text.textContent = "Inserisci la copertina dell'album";
    input.value = "";  
    upload_values[input.name] = false; 
    check();
}

function uploadImage() {
    const exist_delete_button = document.querySelector(".delete_button");
    if (exist_delete_button) {
        exist_delete_button.remove();
    }
    const upload = document.querySelector("#album_cover_file");
    const upload_label = document.querySelector(".upload_file label");
    const label_text = upload_label.querySelector("span");
    const add = upload_label.querySelector("img");
    const error_message = upload.parentNode.querySelector("p");
    label_text.textContent = upload.files[0].name;
    const img_size = upload.files[0].size;
    const extension = upload.files[0].name.split('.').pop();

    const box = document.querySelector(".upload_file");
    const delete_button = document.createElement('img');
    delete_button.classList.add("delete_button");
    delete_button.src = "images/x.png";
    box.appendChild(delete_button);
    delete_button.addEventListener("click", deleteImage);


    if (img_size > 2000000) {
        add.src = "images/warning.png";
        error_message.classList.remove("hidden");
        error_message.textContent = "La dimensione dell'immagine non deve superare 2 MB."
        upload_values[upload.name] = false;
    } 
    else if (!['jpeg', 'jpg', 'gif'].includes(extension))  {
        add.src = "images/warning.png";
        error_message.classList.remove("hidden");
        error_message.textContent = "Carica un file .jpeg, .jpg o .gif."
        upload_values[upload.name] = false;
    } 
    else {
        add.src = "images/green_v.png";
        error_message.classList.add("hidden");
        upload_values[upload.name] = true;
    }
    check();
}

function checkUpload() {
    const upload = document.querySelector("#album_cover_file");
    const image = upload.files[0];
    if(image) {
        uploadImage();
    }
    else {
        const upload_label = document.querySelector(".upload_file label");
        const add = upload_label.querySelector("img");
        const delete_button = document.querySelector(".delete_button");
        const label_text = upload_label.querySelector("span");
        if (delete_button) {
            delete_button.remove();
        }
        add.src = "images/upload.png";
        label_text.textContent = "Inserisci la copertina dell'album";
        upload_values[upload.name] = false;         
    }
}


const upload_values = {'album_cover': false};
const title = document.querySelector("#album_title");
title.addEventListener("keyup", checkTitle);
const file_input = document.querySelector("#album_cover_file");
file_input.addEventListener("change", checkUpload);