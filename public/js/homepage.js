function showDetails(event) {
    const details_button = event.currentTarget;
    const details = details_button.parentNode.parentNode.querySelector('.details');
    if(details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        details_button.src = "images/hide_details.png";
    }
    
    else {
        details.classList.add('hidden');
        details_button.src = "images/details.png"
    }
}

function onFreesoundJson(json) {
    const results_container = document.querySelector("#container");
    const loading_icon = document.querySelector("#loading_icon");
    results_container.innerHTML = '';

    const results = json.results;
    let results_number = results.length;
    if (results_number > 15)
        results_number = 15;

    for (let i = 0; i < results_number; i++) {
        const sample = results[i];
        const sample_download_link = sample.previews['preview-hq-mp3'];
        const url = sample.url;
        const sample_name =  sample.name;
        const spectogram = sample.images.waveform_m;
        const username = sample.username;
        const seconds = sample.duration;
        const downloads = sample.num_downloads;
        const sample_box = document.createElement('div');
        const details_button = document.createElement('img');
        const icons_box = document.createElement('div');
        const download_link = document.createElement('a');
        const freesound_sample_link = document.createElement('a');
        const download_icon = document.createElement('img');
        const freesound_icon = document.createElement('img');
        const image = document.createElement('img');
        const title = document.createElement('p');
        const details_box = document.createElement('div');
        const author = document.createElement('p');
        const duration = document.createElement('p');
        const downloads_number = document.createElement('p');
        sample_box.classList.add('sample_box');
        icons_box.classList.add('icons_box');
        image.classList.add('sample_spectogram');
        title.classList.add('sample_title');
        details_button.classList.add('details_button');
        details_box.classList.add('details');
        details_box.classList.add('hidden');
        details_button.src = "images/details.png";
        download_link.href = sample_download_link;
        download_link.target = "_blank";
        freesound_sample_link.target = "_blank";
        freesound_sample_link.href = url;
        download_icon.src = "images/download.png";
        freesound_icon.src = "images/freesound_logo.png";
        image.src = spectogram;
        title.textContent = sample_name;
        author.textContent = "Autore: " + username;
        duration.textContent = "Durata: " + seconds + " secondi";
        downloads_number.textContent = downloads + " downloads";
        icons_box.appendChild(details_button);
        download_link.appendChild(download_icon);
        freesound_sample_link.appendChild(freesound_icon);
        icons_box.appendChild(download_link);
        icons_box.appendChild(freesound_sample_link);
        sample_box.appendChild(icons_box);
        sample_box.appendChild(image);
        sample_box.appendChild(title);
        details_box.appendChild(author);
        details_box.appendChild(duration);
        details_box.appendChild(downloads_number);
        sample_box.appendChild(details_box);
        results_container.appendChild(sample_box);
    }

    const button_list = document.querySelectorAll('.details_button');
    for(let item of button_list) {
        item.addEventListener("click", showDetails);
    }

    loading_icon.classList.add("hidden");
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

function findIndex1(event) {
    const select_filter = event.currentTarget;
    const index = select_filter.selectedIndex;
    const option_value = select_filter.options[index].value;
    value_select_option1 = option_value;
}

function findIndex2(event) {
    const select_filter = event.currentTarget;
    const index = select_filter.selectedIndex;
    const option_value = select_filter.options[index].value;
    value_select_option2 = option_value;
}

let value_select_option1 = '';
let value_select_option2 = '';

const selected_option1 = document.querySelector('#sort');
const selected_option2 = document.querySelector('#options');
selected_option1.addEventListener("change", findIndex1);
selected_option2.addEventListener("change", findIndex2);

function searchOnFreesound(event) {
    event.preventDefault();
    const loading_icon = document.querySelector("#loading_icon");
    loading_icon.classList.remove("hidden");
    const alert_exist = document.querySelector('.alert_message');
    const results_container = document.querySelector("#container");
    const sample_input = document.querySelector('#search_bar');
    let input_value = encodeURIComponent(sample_input.value);
    const form_box = document.querySelector("form");

    if(alert_exist) {
        alert_exist.remove();
    }
    if (input_value === '') {
        results_container.innerHTML = '';
    }
    else {
        const token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const sample_search = {'search':input_value};
        if (value_select_option1 === '' && value_select_option2 === '') {
            sample_search['filters'] = 'no';
            formData = JSON.stringify(sample_search);
            fetch("homepage/freesound", {
                method: 'post', 
                body: formData,
                headers: {
                    'Content-type':'application/json',
                    'X-CSRF-TOKEN':token
                }}).then(onResponse, onError).then(onFreesoundJson);
        }
        else if ((value_select_option1 !== '' && value_select_option2 === '') || (value_select_option1 === '' && value_select_option2 !== '')) {
            const loading_icon = document.querySelector("#loading_icon");
            loading_icon.classList.add("hidden");
            const alert_message = document.createElement('p');
            alert_message.classList.add('alert_message');
            alert_message.textContent = "Impossibile effettuare la ricerca. Seleziona entrambi i valori.";
            form_box.appendChild(alert_message);
            input_value = '';
        }
        else {
            sample_search['filters'] = 'yes';
            sample_search['filter1'] = value_select_option1;
            sample_search['filter2'] = value_select_option2;
            formData = JSON.stringify(sample_search);
            fetch("homepage/freesound", {
                method: 'post', 
                body: formData,
                headers: {
                    'Content-type':'application/json',
                    'X-CSRF-TOKEN':token
                }}).then(onResponse, onError).then(onFreesoundJson);           
        }
        
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', searchOnFreesound);

function showFilters() {
    const filter_button = document.querySelector('#filter');
    const filters = document.querySelector('form div');
    if(filters.classList.contains('hidden')) {
        filters.classList.remove('hidden');
        filter_button.textContent = "Nascondi";
    }
    
    else {
        filters.classList.add('hidden');
        filter_button.textContent = "Filtra";
    }

}

const filter_button = document.querySelector('#filter');
filter_button.addEventListener("click", showFilters);

function showSearch() {
    const start_search_button = document.querySelector('#show_search .button');
    const freesound_container = document.querySelector('#freesound_api');
    if(freesound_container.classList.contains('hidden')) {
        freesound_container.classList.remove('hidden');
        start_search_button.textContent = "Termina";
    }
    
    else {
        freesound_container.classList.add('hidden');
        start_search_button.textContent = "Riprendi";
    }
}

const start_button = document.querySelector('#show_search .button');
start_button.addEventListener("click", showSearch);

function onTopTracksJson(json) {
    let artist_container = null;
    const artist_containers = document.querySelectorAll('.artist_box');
    for (let item of artist_containers) {
        artist_container = item;
        const name_content = item.querySelector('.artist_name');
        if(name_content.textContent === spotify_artist_name) {
            break;
        }
    }

    const tracks_container1 = artist_container.querySelector('#first_page');
    const tracks_container2 = artist_container.querySelector('#second_page');
    const top_track_list = json.tracks;
    let top_tracks_number = top_track_list.length;
    if (top_tracks_number > 8)
        top_tracks_number = 8;
    for (let i = 0; i < top_tracks_number; i++) {
        const track = top_track_list[i];
        const explicit = track.explicit;
        const track_name = track.name;
        const album_image = track.album.images[0].url;
        const spotify_track_link = track.external_urls.spotify;
        const track_box = document.createElement('div');
        const track_url = document.createElement('a');
        const play_button = document.createElement('img');
        const cover = document.createElement('img');
        const spotify_track_name = document.createElement('p');
        track_box.classList.add('track_box');
        track_url.classList.add('track_url');
        play_button.classList.add('play_button');
        cover.classList.add('cover');
        track_url.href = spotify_track_link;
        track_url.target = "_blank";
        play_button.src = "images/play.png";
        cover.src = album_image;
        spotify_track_name.textContent = track_name;    
        track_url.appendChild(play_button);
        track_box.appendChild(track_url);
        track_box.appendChild(cover);
        track_box.appendChild(spotify_track_name);    
        if(explicit) {
            const explicit_icon = document.createElement('img');
            explicit_icon.classList.add('explicit_icon');
            explicit_icon.src = "images/explicit.png";
            track_box.appendChild(explicit_icon);
        }
        if(i < 5)
            tracks_container1.appendChild(track_box); 
        else 
            tracks_container2.appendChild(track_box); 
    }

    const loading_icon = artist_container.querySelector(".spotify_loading");
    loading_icon.classList.add("hidden");
    const artist_button_list = document.querySelectorAll('.spotify_box');
    for(let artist_button of artist_button_list){
        artist_button.addEventListener("click", searchOnSpotify);
}
}

function onArtistJson(json) {
    let id = '';
    const artist_list = json.artists.items;
    
    let artists_number = artist_list.length;
    if (artists_number > 3)
        artists_number = 3;
    for(let i = 0; i < artists_number; i++) {
        const item = artist_list[i];
        const item_name = item.name;
        const item_id = item.id;
        if(item_name === spotify_artist_name) {
            id = item_id;
            break;
        }        
    }

    fetch("homepage/tracks/" + id).then(onResponse, onError).then(onTopTracksJson);
}

function onX(event) {
    const x_button = event.currentTarget;
    const artist_box = x_button.parentNode;
    const search_button = artist_box.querySelector('.spotify_box');
    const tracks_container1 = artist_box.querySelector('#first_page');
    const tracks_container2 = artist_box.querySelector('#second_page');
    const more_tracks_button = artist_box.querySelector('.button');
    x_button.classList.add('hidden');
    search_button.classList.remove('hidden');
    more_tracks_button.classList.add('hidden');
    tracks_container2.classList.add('hidden');
    more_tracks_button.textContent = "Visualizza altro";
    tracks_container1.innerHTML = '';   
    tracks_container2.innerHTML = '';   
}

function showMoreTracks(event) {
    const more_tracks_button = event.currentTarget;
    const tracks_container2 = more_tracks_button.parentNode.querySelector('#second_page');
    if(tracks_container2.classList.contains('hidden')) {
        tracks_container2.classList.remove('hidden');
        more_tracks_button.textContent = "Mostra meno";
    }
    
    else {
        tracks_container2.classList.add('hidden');
        more_tracks_button.textContent = "Visualizza altro";
    }
}

function searchOnSpotify(event) {  
    event.preventDefault();
    const artist_button_list = document.querySelectorAll('.spotify_box');
    for(let artist_button of artist_button_list){
        artist_button.removeEventListener("click", searchOnSpotify);
}
    const loading_icon = event.currentTarget.parentNode.querySelector(".spotify_loading");
    loading_icon.classList.remove("hidden");
    const artist_button = event.currentTarget;
    const x = artist_button.parentNode.querySelector('.spotify_box_x');
    const more_tracks_button = artist_button.parentNode.querySelector('.button');
    x.classList.remove('hidden');
    artist_button.classList.add('hidden');
    more_tracks_button.classList.remove('hidden');
    spotify_artist_name = artist_button.parentNode.querySelector('.artist_name').textContent; 
    artist_name = spotify_artist_name.replace('/', ' '); 
    x.addEventListener("click", onX);
    more_tracks_button.addEventListener("click", showMoreTracks);
    
    fetch("homepage/spotify/" + artist_name).then(onResponse, onError).then(onArtistJson);
}

const artist_button_list = document.querySelectorAll('.spotify_box');
for(let artist_button of artist_button_list){
    artist_button.addEventListener("click", searchOnSpotify);
}
let spotify_artist_name;
