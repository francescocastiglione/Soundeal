<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Soundeal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href='{{ asset("css/homepage.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Karla:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script src='{{ asset("js/homepage.js") }}' defer></script>
        <link rel="icon" href="{{asset('images/soundeal.png')}}">
    </head>

    <body>
        <header>
            <div class="overlay"></div>

            <nav>                
                <a class="logo">
                    <img src="{{asset('images/logo_soundeal.png')}}" alt="Home">
                </a>
                
                <div id="nav_links">
                    <a href="#main">Distribuzione</a>
                    <a href="#reverse_div">Licenze</a>
                    <a href="#promotions">Promozioni</a>
                    <a href='{{ url("contacts") }}' target="_blank">Contatti</a>
                    <a href='{{ url("login") }}' target="_blank" class="login">Accedi</a> 
                </div>

                <div id="menu_login">
                    <a class="login">Accedi</a>
                </div>
            </nav>

            <h1>
                <strong id="titolo">Soundeal</strong>
                <div id="slogan">
                    Rivoluziona l'idea di distribuzione musicale<br/>
                    La soluzione ideale per artisti emergenti<br/>
                    Il potere al tuo fianco<br/>
                    Pubblica le tue opere in maniera indipendente
                </div>                
                <a href='{{ url("signup") }}' target="_blank" id="register">Registrati subito</a>       
            </h1>  
        </header>

        <section id="description">
            <div id="stores">
                <div>
                    <img src="{{asset('images/logospotify.png')}}" alt="Spotify">
                    <img src="{{asset('images/logoamazon.png')}}" alt="Amazon Music">
                    <img src="{{asset('images/logoapplemusic.png')}}" alt="Apple Music">
                </div>
                <div>
                    <img src="{{asset('images/logoyoutube.png')}}" alt="Youtube Music">
                    <img src="{{asset('images/logopandora.png')}}" alt="Pandora">
                    <img src="{{asset('images/logotencent.png')}}" alt="Tencent">
                </div>
                <div>
                    <img src="{{asset('images/logoinstagram.png')}}" alt="Instagram Stories">
                    <img src="{{asset('images/logotiktok.png')}}" alt="TikTok">
                    <a href='{{ url("signup") }}' target="_blank" id ="more_stores" class="button">+</a>
                </div>
                
            </div>   
            <a href='{{ url("signup") }}' target="_blank" id="view_more" class="button">Entra e scopri di più </a>
        
            
            <div id="main">
                <div class="overlay"></div>

                <div class="info">
                    <img src="{{asset('images/mondo.png')}}">
                    <p>
                        Soundeal ti consente di rilasciare la tua musica sulle principali piattaforme musicali mondiali disponibili.<br/>
                        Raggiungi i fan più facilmente e diventa virale sui social network del momento: TikTok e Instagram.
                    </p> 
                </div>

                <div id="reverse_div" class="info">
                    <p>
                        Mantieni il 100% dei diritti e delle royalties che guadagni dalla tua musica.<br/>
                        La nostra priorità è l'indipendenza degli artisti. Quest'ultima viene garantita rimuovendo qualsiasi vincolo contrattuale e
                        affidando ad essi il pieno controllo della loro carriera.
                    </p>   
                    <img src="{{asset('images/royalty.png')}}">         
                </div>
        
          
                <div class="info">
                    <img src="{{asset('images/band.png')}}">
                    <p> 
                        Pubblica le tue cover senza nessuna preoccupazione.
                        Ci occuperemo noi di tutte le autorizzazioni.
                    </p>
                </div>

                <div class="info">
                    <p>
                        Se sei nuovo effettua subito la registrazione gratuita e inizia a rilasciare i tuoi album.
                    </p>
                    <img src="{{asset('images/chitarra.png')}}">
                    <p class="links">
                        Tutto sarà più semplice grazie ai meccanismi automatizzati di Soundeal e a Jarvis.
                    </p>                
                </div>
            </div>
        </section>

        <section id="samples">
            <h1>Se sei alle prime armi, Soundeal ti è accanto anche durante la fase di produzione.</h1>
            <div id="production_images">
                <img src="{{asset('images/production1.jpg')}}">
                <img src="{{asset('images/production2.jpg')}}">
            </div>
            <p id="freesound_description">
                Utilizzando le funzionalità offerte da <a href="https://freesound.org/" target = "_blank">Freesound</a>, Soundeal ti consente di cercare e trovare samples e suoni, 
                scaricabili in maniera totalmente gratuita e utilizzabili nei tuoi progetti musicali.
            </p> 
            <div id="show_search">
                <span>Immergiti nel mondo della produzione musicale e inizia a comporre con la tua DAW preferita.</span>
                <span class="button">Inizia</span>
            </div>
            <div id="freesound_api" class="hidden">
                <form>
                    <img src="{{asset('images/search.png')}}">
                    <input type="text" id="search_bar" placeholder="Cerca">
                    <p id="filter">Filtra</p>
                    <img class="hidden" id="loading_icon" src="{{asset('images/loading.gif')}}">
                    <div class="hidden">
                        <p>Ordina per: </p>
                        <select id="sort">
                            <option value="" selected></option>
                            <option value="duration_">Durata</option>
                            <option value="created_">Data caricamento</option>
                            <option value="downloads_">Numero downloads</option>
                            <option value="rating_">Valutazione</option>
                        </select>
                        <select id="options">
                            <option value="" selected></option>
                            <option value="asc">Crescente</option>
                            <option value="desc">Decrescente</option>
                        </select>
                        <input id="submit_button" type="submit" value="Cerca">
                    </div>
                </form> 

                <div id="container">
                </div>
            </div>
        </section>

        <section id="promotions">
            <h1>Promozioni</h1>
            <div id="artist_container">
                <div class="artist_box">
                    <img class="artist_img" src="{{asset('images/billie_eilish.png')}}">
                    <p class="artist_name">Billie Eilish</p>
                    <div class="spotify_box">
                        <p>Cerca su Spotify</p>
                        <img src="{{asset('images/spotify.png')}}">
                    </div>
                    <p class="spotify_box_x hidden">X</p>
                    <img class="spotify_loading hidden" src="{{asset('images/loading.gif')}}">
                    <div class="search_results" id="first_page">
                    </div>
                    <div class="search_results hidden" id="second_page">
                    </div>
                    <p class="button hidden">Visualizza altro</p>
                </div>
                <div class="artist_box">
                    <img class="artist_img" src="{{asset('images/eminem.png')}}">
                    <p class="artist_name">Eminem</p>
                    <div class="spotify_box">
                        <p>Cerca su Spotify</p>
                        <img src="{{asset('images/spotify.png')}}">
                    </div>
                    <p class="spotify_box_x hidden">X</p>
                    <img class="spotify_loading hidden" src="{{asset('images/loading.gif')}}">
                    <div class="search_results" id="first_page">
                    </div>
                    <div class="search_results hidden" id="second_page">
                    </div>
                    <p class="button hidden">Visualizza altro</p>
                </div>
                <div class="artist_box">
                    <img class="artist_img" src="{{asset('images/guns_n_roses.png')}}">
                    <p class="artist_name">Guns N' Roses</p>
                    <div class="spotify_box">
                        <p>Cerca su Spotify</p>
                        <img src="{{asset('images/spotify.png')}}">
                    </div>
                    <p class="spotify_box_x hidden">X</p>
                    <img class="spotify_loading hidden" src="{{asset('images/loading.gif')}}">
                    <div class="search_results" id="first_page">
                    </div>
                    <div class="search_results hidden" id="second_page">
                    </div>
                    <p class="button hidden">Visualizza altro</p>
                </div>
                <div class="artist_box">
                    <img class="artist_img" src="{{asset('images/acdc.png')}}">
                    <p class="artist_name">AC/DC</p>
                    <div class="spotify_box">
                        <p>Cerca su Spotify</p>
                        <img src="{{asset('images/spotify.png')}}">
                    </div>
                    <p class="spotify_box_x hidden">X</p>
                    <img class="spotify_loading hidden" src="{{asset('images/loading.gif')}}">
                    <div class="search_results" id="first_page">
                    </div>
                    <div class="search_results hidden" id="second_page">
                    </div>
                    <p class="button hidden">Visualizza altro</p>
                </div>
                <div class="artist_box">
                    <img class="artist_img" src="{{asset('images/green_day.png')}}">
                    <p class="artist_name">Green Day</p>
                    <div class="spotify_box">
                        <p>Cerca su Spotify</p>
                        <img src="{{asset('images/spotify.png')}}">
                    </div>
                    <p class="spotify_box_x hidden">X</p>
                    <img class="spotify_loading hidden" src="{{asset('images/loading.gif')}}">
                    <div class="search_results" id="first_page">
                    </div>
                    <div class="search_results hidden" id="second_page">
                    </div>
                    <p class="button hidden">Visualizza altro</p>
                </div>
                <div class="artist_box">
                    <img class="artist_img" src="{{asset('images/gorillaz.png')}}">
                    <p class="artist_name">Gorillaz</p>
                    <div class="spotify_box">
                        <p>Cerca su Spotify</p>
                        <img src="{{asset('images/spotify.png')}}">
                    </div>
                    <p class="spotify_box_x hidden">X</p>
                    <img class="spotify_loading hidden" src="{{asset('images/loading.gif')}}">
                    <div class="search_results" id="first_page">
                    </div>
                    <div class="search_results hidden" id="second_page">
                    </div>
                    <p class="button hidden">Visualizza altro</p>
                </div>
            </div>
            
        </section>
            
        <div id="youtube_video">
            <iframe src="https://www.youtube.com/embed/cxaaoohb2OY" title="Soundeal - Presentazione" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <footer>
            <div class="footer_links">
                <a href='{{ url("contacts") }}' target="_blank">Contatti</a><br/>
                <a href='{{ url("privacy") }}' target="_blank">Privacy Policy</a>
            </div>

            <a href= '{{ url("login") }}' class="logo">
                <img src="{{asset('images/logo_soundeal.png')}}" alt="Soundeal">
            </a>

            <div>
                Francesco Castiglione<br/>O46002055
            </div>
        </footer>
    </body>
</html>