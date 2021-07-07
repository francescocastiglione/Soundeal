@extends('layouts.menu')

@section('title', 'Discography')

@section('style')
    <link rel="stylesheet" href='{{ asset("css/discography.css") }}'>
@endsection

@section('script')
    <script src='{{ asset("js/discography.js") }}' defer></script>
@endsection

@section('links')
    <a href='{{ url("home") }}'><img src="{{asset('images/home.png')}}" alt="Home">Home</a>
    <a id="current_page"><img src="{{asset('images/album.png')}}" alt="Discografia">Discografia</a>
    <a href='{{ url("distribution") }}'><img src="{{asset('images/distribution.png')}}" alt="Distribuzione">Distribuzione</a>
    <a href='{{ url("services") }}'><img src="{{asset('images/share.png')}}" alt="Servizi">Servizi</a>
    <a href='{{ url("jarvis") }}'><img src="{{asset('images/iron_man.png')}}" alt="Jarvis">Jarvis</a>
    <a href='{{ url("logout") }}'><img src="{{asset('images/logout.png')}}" alt="logout">Esci</a>
    <p>Francesco Castiglione<br/>O46002055</p>   
@endsection

@section('header')
    <header>
        <h1>Discografia</h1>

        <p class="info">
            <img src="{{asset('images/new.png')}}"> Ultimo aggiornamento: adesso è disponibile la funzione "Condivisione automatica". Accedi alla pagina "Servizi" per maggiori informazioni.
        </p>

        <p class="info" id="description">
            Inizia subito a caricare le tue produzioni. Clicca sulla copertina dell'album per visualizzare i brani pubblicati. Ricordati che è essenziale creare un album (anche in caso di un singolo), prima di poter
            aggiungere una traccia musicale.
        </p>
    </header>
@endsection

@section('main')
    <article id="albums">
    </article>
    <article id=upload>
        <section>
            <div id="upload_album">
                <a href='{{ url("album") }}'><img src="{{asset('images/upload_album.gif')}}"></a>
                <h2>Crea un nuovo album</h2>
            </div>
        </section>
        <section>
            <div id="upload_album">
                <a href='{{ url("track") }}'><img src="{{asset('images/upload_album.gif')}}"></a>
                <h2>Carica un nuovo brano</h2>
            </div>
        </section>
    </article>
@endsection