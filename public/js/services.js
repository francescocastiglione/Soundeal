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

function showDetails(event) {
    const det_button = event.currentTarget;
    const det_description = det_button.parentNode.querySelector('.details');
    if(det_description.classList.contains('hidden')) {
        det_description.classList.remove('hidden');
        det_button.textContent = "Nascondi dettagli";
    }
    
    else {
        det_description.classList.add('hidden');
        det_button.textContent = "Mostra dettagli";
    }
}


function getServicesJson(json) {
    const container = document.querySelector('#catalog');
    container.innerHTML = "";
    for (let item of json) {
        const service = document.createElement('section');
        const favorites_bar = document.createElement('div');
        const subscription = document.createElement('img');
        const logo = document.createElement('img');
        const name = document.createElement('h1');
        const details_button = document.createElement('button');
        const details = document.createElement('p');

        subscription.src = "images/services_left_icon.png";

        logo.src = item.logo;
        name.textContent = item.name;
        details_button.textContent = "Mostra dettagli";
        details.textContent = item.details;

        service.classList.add('service_box');
        favorites_bar.classList.add('favorites_box');
        subscription.classList.add('sub');
        logo.classList.add('logo');
        details_button.classList.add('details_button');
        details.classList.add('details');
        details.classList.add('hidden');

        container.appendChild(service);
        service.appendChild(favorites_bar);
        favorites_bar.appendChild(subscription);

        service.appendChild(logo);
        service.appendChild(name);
        service.appendChild(details_button);
        service.appendChild(details);

        details_button.addEventListener("click", showDetails);
    }
    fetch("services/servicesiffavorite").then(onResponse, onError).then(ifFavoriteJson);
}

function deleteFromFavorite(event) {
    const service = event.currentTarget.parentNode.parentNode.querySelector("h1").textContent;
    fetch("services/removefromfavorites/"+service).then(reloadFavorites);
}

function getFavoritesJson(json) {
    const title = document.querySelector('#favorites_title');
    title.classList.remove('hidden');
    const favorites_container = document.querySelector('#favorites');
    favorites_container.innerHTML = "";
    favorites_container.classList.remove('hidden');

    for(let item of json) {
        const service = document.createElement('section');
        const delete_bar = document.createElement('div');
        const delete_button = document.createElement('img');
        const favorites_logo = document.createElement('img');
        const favorites_name = document.createElement('h1');
        delete_button.src = "images/heart_remove.png";
        favorites_logo.src = item.logo;
        favorites_name.textContent = item.name;
        service.classList.add('service_box');
        service.classList.add('favorite_element');
        delete_bar.classList.add('delete_bar');
        delete_button.classList.add('delete_button');
        favorites_logo.classList.add('logo');
        favorites_container.appendChild(service); 
        service.appendChild(delete_bar);
        delete_bar.appendChild(delete_button);   
        service.appendChild(favorites_logo);
        service.appendChild(favorites_name);
        delete_button.addEventListener("click", deleteFromFavorite);
    }
    const favorite_list = favorites_container.querySelectorAll('.favorite_element');
    if ((favorite_list.length) === 0) {
        title.classList.add('hidden');
        favorites_container.classList.add('hidden');
    }
}

function getFavorites() {
    fetch("services/servicesiffavorite").then(onResponse, onError).then(getFavoritesJson);
}

function reloadFavorites() {
    getServices();
    getFavorites();
}

function addToFavorites(event) {
    const token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const name = event.currentTarget.parentNode.parentNode.querySelector("h1").textContent;
    const form_data = {"service": name};
    const service_name = JSON.stringify(form_data);
    fetch("services/addtofavorites", {
        method: 'post', 
        body: service_name,
        headers: {
            'Content-type':'application/json',
            'X-CSRF-TOKEN':token
        }
    }).then(reloadFavorites)
    
    event.preventDefault();
}

function ifFavoriteJson(json) {
    const favorites_box_list = document.querySelectorAll(".favorites_box");

    for(let item of json) {
        for (let favorites_box of favorites_box_list) {
            const service_name = favorites_box.parentNode.querySelector("h1");
            if (item.name === service_name.textContent) {
                const favorites_button = document.createElement('img');
                favorites_button.src = "images/heart_added.png";
                favorites_button.classList.add('favorites_button');
                favorites_button.classList.add('no_pointer');
                favorites_box.appendChild(favorites_button);
            }
        }
    }

    for(let favorites_box of favorites_box_list) {
        const button = favorites_box.querySelector(".favorites_button");
        if (!button) {
            const favorites_button = document.createElement('img');
            favorites_button.src = "images/heart.png";
            favorites_button.classList.add('favorites_button');
            favorites_box.appendChild(favorites_button);
            favorites_button.addEventListener("click", addToFavorites);
        }
    }
    
}

function getServices() {
    fetch("services/getservices").then(onResponse, onError).then(getServicesJson);
}

function search(event) {
    const search_content = event.currentTarget;
    const service_box_list = document.querySelectorAll('#catalog .service_box');

    if (search_content !== "") {
        for (let service_box of service_box_list) {
            const name = service_box.querySelector('.service_box h1').textContent.toLowerCase();

            if (name.indexOf(search_content.value.toLowerCase()) === -1) {
                service_box.classList.add('hidden');
            }

            else {
                service_box.classList.remove('hidden');
            }
        }
    }

    else {
        for(let service_box of service_box_list) {
            service_box.classList.remove('hidden');
        }
    }
}

const search_bars = document.querySelectorAll('input');
for (let search_bar of search_bars) {
    search_bar.addEventListener("keyup", search);
}

getServices();
getFavorites();