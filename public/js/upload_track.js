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

function getAlbumsJson(json) {  
    const select_album = document.querySelector("select[name = 'song_album']");  
    for(let album_item of json) {
        const album_title = album_item.title;
        const album_upc = album_item.upc;
        
        const album_option = document.createElement("option");
        album_option.value = album_upc;
        album_option.textContent = album_title;

        select_album.appendChild(album_option);
    }
}

function getAlbums() {
    fetch("discography/albums").then(onResponse, onError).then(getAlbumsJson);
}

function check() {
    const submit_button = document.querySelector('#submit');
    submit_button.disabled = Object.keys(upload_values).length !== 7 || Object.values(upload_values).includes(false);
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

function deleteSong(event) {
    const delete_button = event.currentTarget;
    const input = document.querySelector("#song_file");
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

function uploadSong() {
    const exist_delete_button = document.querySelector(".delete_button");
    if (exist_delete_button) {
        exist_delete_button.remove();
    }
    const upload = document.querySelector("#song_file");
    const upload_label = document.querySelector(".upload_file label");
    const label_text = upload_label.querySelector("span");
    const add = upload_label.querySelector("img");
    const error_message = upload.parentNode.querySelector("p");
    label_text.textContent = upload.files[0].name;
    const song_size = upload.files[0].size;
    const extension = upload.files[0].name.split('.').pop();

    const box = document.querySelector(".upload_file");
    const delete_button = document.createElement('img');
    delete_button.classList.add("delete_button");
    delete_button.src = "images/x.png";
    box.appendChild(delete_button);
    delete_button.addEventListener("click", deleteSong);


    if (song_size > 40000000) {
        add.src = "images/warning.png";
        error_message.classList.remove("hidden");
        error_message.textContent = "Hai a disposizione solo 40 MB."
        upload_values[upload.name] = false;
    } 
    else if (!['mp3'].includes(extension))  {
        add.src = "images/warning.png";
        error_message.classList.remove("hidden");
        error_message.textContent = "Per favore, carica un brano .mp3."
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
    const upload = document.querySelector("#song_file");
    const song = upload.files[0];
    if(song) {
        uploadSong();
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
        label_text.textContent = "Carica il tuo brano";
        upload_values[upload.name] = false;         
    }
}

function checkSelect(event) {
    const select = event.currentTarget;
    const error_message = select.parentNode.querySelector(".err");
    if (select.value === "") {
        error_message.classList.remove("hidden");
        upload_values[select.name] = false;
    }
    else {
        error_message.classList.add("hidden");
        upload_values[select.name] = true;
    }
    check();
}

getAlbums();
const upload_values = {'song_file': false};
const title = document.querySelector("#song_title");
title.addEventListener("blur", checkTitle);
const author = document.querySelector("#author_name");
author.addEventListener("blur", checkTitle);
const file_input = document.querySelector("#song_file");
file_input.addEventListener("change", checkUpload);
const select_list = document.querySelectorAll("select");
for (let item of select_list) {
    item.addEventListener("change", checkSelect);
}