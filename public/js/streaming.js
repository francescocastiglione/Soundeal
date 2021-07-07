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

function getContentJson(json) {
    const container = document.querySelector("article");
    container.innerHTML = "";
    const empty_message = document.querySelector(".no_albums");
    empty_message.classList.add("hidden");

    for(let item of json) {
        const album_box = document.createElement("section");
        const cover = document.createElement("img");
        const info = document.createElement("div");
        const title = document.createElement("h1");
        const author = document.createElement("p");
        const tracks_number = document.createElement("p");

        cover.src = "../"+item.cover;
        title.textContent = item.title;
        author.textContent = item.author;
        tracks_number.textContent = "Numero tracce: "+ item.tracks_number;

        album_box.classList.add("album_box");
        info.classList.add("album_info");

        container.appendChild(album_box);
        album_box.appendChild(cover);
        album_box.appendChild(info);
        info.appendChild(title);
        info.appendChild(author);
        info.appendChild(tracks_number);
    }

    const album_list = document.querySelectorAll(".album_box");
    if((album_list.length) === 0) {
        empty_message.classList.remove("hidden");
    }
}

function getContent() {
    const pathname = window.location.pathname.split('/');
    const service_name = pathname[pathname.length - 1];   
    fetch("/soundeal/public/streaming/albums/" + service_name).then(onResponse, onError).then(getContentJson);      
}

function search() {
    const search_content = document.querySelector("input");
    const album_list = document.querySelectorAll('.album_box');

    if (search_content !== "") {
        for (let item of album_list) {
            const name = item.querySelector('.album_box .album_info h1').textContent.toLowerCase();

            if (name.indexOf(search_content.value.toLowerCase()) === -1) {
                item.classList.add('hidden');
            }

            else {
                item.classList.remove('hidden');
            }
        }
    }

    else {
        for(let item of album_list) {
            item.classList.remove('hidden');
        }
    }
}

const search_bar = document.querySelector("input");
search_bar.addEventListener("keyup", search);

getContent();