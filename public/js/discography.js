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

function showTracks(event) {
    const button = event.currentTarget;
    const tracks_box = button.parentNode.querySelector(".album_tracks");

    if(tracks_box.classList.contains('hidden')) {
        tracks_box.classList.remove('hidden');
    }
    
    else {
        tracks_box.classList.add('hidden');
    }
}

function deleteAlbum(event) {
    const album_id = event.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.id;
    event.stopPropagation();
    fetch("discography/deletealbum/" + album_id).then(onReloadAlbums);
}

function deleteTrack(event) {
    const isrc = event.currentTarget.parentNode.dataset.id;    
    fetch("discography/deletetrack/" + isrc).then(onReloadTracks);
}

function deleteAlbumClick(event) {
    const delete_box = event.currentTarget.parentNode.parentNode.querySelector(".delete_confirm");
    delete_box.classList.remove("hidden");
    event.currentTarget.classList.add("hidden");
    event.stopPropagation();
}

function cancelDelete(event) {
    const delete_box = event.currentTarget.parentNode.parentNode;
    const top_bar = delete_box.parentNode.querySelector(".top_bar");
    const delete_button = top_bar.querySelector("img");
    delete_button.classList.remove("hidden");
    delete_box.classList.add("hidden");
    event.stopPropagation();
}

function getAlbumsJson(json) {
    const albums_container = document.querySelector("#albums");
    albums_container.innerHTML = "";

    for(let album_item of json) {
        const title = album_item.title;
        const cover = album_item.album_cover;

        const general_box = document.createElement("section");
        const album_box = document.createElement("div");
        
        const overlay = document.createElement("div");
        const top_bar = document.createElement("div");
        const delete_confirm = document.createElement("div");
        const delete_confirm_text = document.createElement("p");
        const delete_confirm_choice = document.createElement("div");
        const delete_yes = document.createElement("p");
        const delete_no = document.createElement("p");
        const delete_icon = document.createElement("img");
        const album_title = document.createElement("h1");

        general_box.dataset.id = album_item.upc;

        delete_icon.src = "images/exit.png";
        album_title.textContent = title;
        delete_confirm_text.textContent = "Vuoi procedere con la cancellazione?"
        delete_yes.textContent = "Si";
        delete_no.textContent = "No";

        general_box.classList.add("general_box");
        album_box.classList.add("album_box");
        delete_confirm.classList.add("delete_confirm");
        delete_confirm.classList.add("hidden");
        delete_yes.classList.add("yes");
        delete_no.classList.add("no");
        overlay.classList.add("overlay");
        top_bar.classList.add("top_bar");
        album_box.style.backgroundImage = "url"+"("+cover+")";

        albums_container.appendChild(general_box);
        general_box.appendChild(album_box);
        
        album_box.appendChild(overlay);
        album_box.appendChild(top_bar);
        album_box.appendChild(delete_confirm);
        delete_confirm.appendChild(delete_confirm_text);
        delete_confirm.appendChild(delete_confirm_choice);
        delete_confirm_choice.appendChild(delete_yes);
        delete_confirm_choice.appendChild(delete_no);
        top_bar.appendChild(delete_icon);
        album_box.appendChild(album_title);

        album_box.addEventListener("click", showTracks);
        delete_icon.addEventListener("click", deleteAlbumClick);
        delete_yes.addEventListener("click", deleteAlbum);
        delete_no.addEventListener("click", cancelDelete);
        const discography = document.createElement("div");
        discography.classList.add("album_tracks");
        discography.classList.add("hidden");
        general_box.appendChild(discography);
    }

    getTracks();
}

function pauseSong(event) {
    const button = event.currentTarget;
    const song = button.parentNode.parentNode.querySelector(".song_file");
    song.pause();
    song.currentTime = 0;
    button.src = "images/linear_play.png";
    button.removeEventListener("click", pauseSong);
    button.addEventListener("click", playSong);
}

function playSong(event) {
    const button = event.currentTarget;
    button.src = "images/pause.png";
    const song = button.parentNode.parentNode.querySelector(".song_file");
    song.play(); 
    button.removeEventListener("click", playSong);   
    button.addEventListener("click", pauseSong);
}

function updatePlayBar(event) {
    const player_bar = event.currentTarget.parentNode.querySelector(".player_bar");
    const progress = player_bar.querySelector(".play_bar");
    const position = event.currentTarget.currentTime / event.currentTarget.duration;
    progress.style.width = position * 100 + "%";
}


function getTracksJson(json) {    
    const album_list = document.querySelectorAll(".general_box"); 
    const all_tracks_box = document.querySelectorAll(".album_tracks");  
    for (let item of all_tracks_box)
        item.innerHTML="";
    

    for(let track_item of json) {
        
        for(let item of album_list) {
            if (track_item.album_id == item.dataset.id) {
                const all_tracks_box = item.querySelector(".album_tracks");
                const title = track_item.title;
                const author = track_item.author;
                const song_file = track_item.audio_file;

                const track_box = document.createElement("div");
                const player = document.createElement("div");
                const play = document.createElement("img");
                const song_title = document.createElement("p");
                const player_bar = document.createElement("div");
                const play_bar = document.createElement("div");
                const pointer = document.createElement("div");
                const delete_button = document.createElement("img");
                const song = new Audio();

                track_box.dataset.id = track_item.isrc;
                play.src = "images/linear_play.png";
                song_title.textContent = title + " - " + author;
                song.src = song_file;
                delete_button.src="images/delete.png";
                
                track_box.classList.add("track_box");
                player.classList.add("player");
                player_bar.classList.add("player_bar");
                play_bar.classList.add("play_bar");
                pointer.classList.add("pointer");
                song.classList.add("song_file");
                delete_button.classList.add("delete_track_button");

                all_tracks_box.appendChild(track_box);
                track_box.appendChild(player);
                player.appendChild(play);
                player.appendChild(song_title);
                track_box.appendChild(player_bar);
                player_bar.appendChild(play_bar);
                player_bar.appendChild(pointer);
                track_box.appendChild(delete_button);
                track_box.appendChild(song);

                song.addEventListener("timeupdate", updatePlayBar);
                play.addEventListener("click", playSong);
                delete_button.addEventListener("click", deleteTrack);
            }
        } 
    }
    
    
}


function getAlbums() {
    fetch("discography/albums").then(onResponse, onError).then(getAlbumsJson);
}

function getTracks() {
    fetch("discography/tracks").then(onResponse, onError).then(getTracksJson);   
}




function onReloadAlbums() {
    getAlbums();
}

function onReloadTracks() {
    getTracks();
}

getAlbums();