@extends('layouts.menu')

@section('title', 'Services')

@section('style')
    <link rel="stylesheet" href='{{ asset("css/services.css") }}'>
@endsection

@section('script')
    <script src='{{ asset("js/services.js") }}' defer></script>
@endsection

@section('mobile_search_bar')
    <div class="search_bar" id="mobile_search_bar">
        <img src="{{asset('images/search.png')}}">
        <input type="text" placeholder="Cerca">
    </div> 
@endsection

@section('links')
    <a href='{{ url("home") }}'><img src="{{asset('images/home.png')}}" alt="Home">Home</a>
    <a href='{{ url("discography") }}'><img src="{{asset('images/album.png')}}" alt="Discografia">Discografia</a>
    <a href='{{ url("distribution") }}'><img src="{{asset('images/distribution.png')}}" alt="Distribuzione">Distribuzione</a>
    <a id="current_page"><img src="{{asset('images/share.png')}}" alt="Servizi">Servizi</a>
    <a href='{{ url("jarvis") }}'><img src="{{asset('images/iron_man.png')}}" alt="Jarvis">Jarvis</a>
    <a href='{{ url("logout") }}'><img src="{{asset('images/logout.png')}}" alt="logout">Esci</a>
    <p>Francesco Castiglione<br/>O46002055</p>   
@endsection

@section('header')
    <header>
        <h1>Servizi</h1>
            
        <p class="info">
            <img src="{{asset('images/new.png')}}"> Ultimo aggiornamento: adesso è disponibile la funzione "Condivisione automatica". Aggiungi un servizio 
            ai preferiti e i tuoi brani verranno automaticamente inviati a quest'ultimo, automatizzando così il processo di distribuzione. Provala subito.
        </p>

        <p class="info" id="description">
            Soundeal connette i propri utenti con i fan di tutto il mondo in maniera rapida ed efficace.<br/>
            Siamo costantemente alla ricerca di nuovi partner, in maniera tale da garantire una totale libertà dai limiti geografici.<br/> 
            La distribuzione verso tutti i servizi di download e streaming elencati qui di seguito è inclusa nei nostri pacchetti
            Standard e/o Premium.
        </p>

        <div class="search_bar" id="desktop_search_bar">
            <img src="{{asset('images/search.png')}}">
            <input type="text" placeholder="Cerca">
        </div> 
    </header>
@endsection

@section('main')
    <h1 id="favorites_title" class="hidden">I tuoi preferiti:</h1>
    <article id="favorites" class="hidden">
    </article>
        
    <article id="catalog">   
    </article> 
@endsection