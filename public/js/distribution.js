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

function distribute(event) {
    const album_box_list = document.querySelectorAll(".album_box");
    for(let item of album_box_list) {
        item.removeEventListener("click", showDistributionButton);
    }
    const distribution_button = event.currentTarget;
    const distribution_text = distribution_button.querySelector("p");
    const loading_icon = distribution_button.querySelector("img");
    const album_box = event.currentTarget.parentNode.querySelector(".album_box");

    distribution_button.removeEventListener("click", distribute);

    distribution_text.textContent= "";
    loading_icon.classList.remove("hidden");

    fetch("distribution/distribute/" + album_box.dataset.id).then(function() {
        setTimeout(function() {
            distribution_text.textContent = "Distribuisci";
            loading_icon.classList.add("hidden");
            distribution_button.addEventListener("click", distribute);
            for(let item of album_box_list) {
                item.addEventListener("click", showDistributionButton);
            }
        }, 3500);
    });    
}

function showDistributionButton(event) {
    const album_box = event.currentTarget;
    const distribution_button = album_box.parentNode.querySelector(".distribution_button");
    const distrubution_button_list = document.querySelectorAll(".distribution_button");

    if(distribution_button.classList.contains('hidden')) {
        for(let item of distrubution_button_list){
            item.classList.add("hidden");
        }
        distribution_button.classList.remove('hidden');
    }
    
    else {
        distribution_button.classList.add('hidden');
    }
}

function ifEmptyJson(json, upc) {
    const exists = json.exists;
    const album_box_list = document.querySelectorAll(".album_box");

}

function ifEmpty(upc) {
    fetch("distribution/ifempty/" + upc).then(onResponse, onError).then(function(json) {
        const exists = json.exists;
        const album_box_list = document.querySelectorAll(".album_box");

        for(let item of album_box_list) {
            if (item.dataset.id == upc) {
                if(!exists) {
                    const distribution_button= item.parentNode.querySelector(".distribution_button");
                    const distribution_button_text = distribution_button.querySelector("p");
                    distribution_button.removeEventListener("click", distribute);
                    distribution_button_text.textContent = "Nessun brano trovato";
                }
            }
        }
    });
}

function getAlbumsJson(json) {
    const albums_container = document.querySelector("#albums");
    albums_container.innerHTML = "";
    const empty_message = document.querySelector(".no_albums");
    empty_message.classList.add("hidden");

    for(let album_item of json) {
        const title = album_item.title;
        const cover = album_item.album_cover;

        const general_box = document.createElement("section");
        const album_box = document.createElement("div");
        const overlay = document.createElement("div");
        const album_title = document.createElement("h1");
        const distribution_button = document.createElement("div");
        const distribution_text = document.createElement("p");
        const loading_icon = document.createElement("img");

        album_box.dataset.id = album_item.upc;

        album_title.textContent = title;
        distribution_text.textContent = "Distribuisci";
        loading_icon.src= "images/loading.gif";

        general_box.classList.add("general_box");
        album_box.classList.add("album_box");
        overlay.classList.add("overlay");
        album_box.style.backgroundImage = "url"+"("+cover+")";
        distribution_button.classList.add("distribution_button");
        distribution_button.classList.add("hidden");
        loading_icon.classList.add("hidden");

        albums_container.appendChild(general_box);
        general_box.appendChild(album_box);
        album_box.appendChild(overlay);
        album_box.appendChild(album_title);
        distribution_button.appendChild(distribution_text);
        distribution_button.appendChild(loading_icon);
        general_box.appendChild(distribution_button);

        album_box.addEventListener("click", showDistributionButton);
        distribution_button.addEventListener("click", distribute);
        ifEmpty(album_box.dataset.id);
    }

    const album_list = document.querySelectorAll(".album_box");
    if((album_list.length) === 0) {
        empty_message.classList.remove("hidden");
    }
}

function getAlbums() {
    fetch("discography/albums").then(onResponse, onError).then(getAlbumsJson);
}

getAlbums()