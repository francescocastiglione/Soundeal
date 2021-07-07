@extends('layouts.menu')

@section('title', 'Home')

@section('style')
    <link rel="stylesheet" href='{{ asset("css/home.css") }}'>
@endsection

@section('links')
    <a id="current_page"><img src="{{asset('images/home.png')}}" alt="Home">Home</a>
    <a href='{{ url("discography") }}'><img src="{{asset('images/album.png')}}" alt="Discografia">Discografia</a>
    <a href='{{ url("distribution") }}'><img src="{{asset('images/distribution.png')}}" alt="Distribuzione">Distribuzione</a>
    <a href='{{ url("services") }}'><img src="{{asset('images/share.png')}}" alt="Servizi">Servizi</a>
    <a href='{{ url("jarvis") }}'><img src="{{asset('images/iron_man.png')}}" alt="Jarvis">Jarvis</a>
    <a href='{{ url("logout") }}'><img src="{{asset('images/logout.png')}}" alt="logout">Esci</a>
    <p>Francesco Castiglione<br/>O46002055</p>   
@endsection

@section('header')
    <header>
        <h1>Home - {{ $user['username'] }}</h1>

        <p class="info">
            Missione completata, Soundeal ti aspettava. Scopri il mondo della distribuzione digitale, ottieni visibilità e soddisfa
            le insaziabili orecchie dei tuoi fan. 
        </p>

        <p class="info" id="description">
            La disponibilità dell'assistenza viene offerta 24/7.<br/>
            Puoi ottenerla inviando un'email a <i>soundealmusic@gmail.com</i> o rivolgendoti a <a href='{{ url("jarvis") }}'>Jarvis</a>.
        </p>
    </header>
@endsection

@section('main')
    <article>
        <section id="user_container">
            <img src="{{ $user['artist_image'] }}" alt="{{ $user['username'] }}">
            <div>
                <p>Nome: {{ ucfirst($user['first_name'])}}</p>
                <p>Cognome: {{ ucfirst($user['last_name'])}}</p>
                <p>Nome artista: {{ ucfirst($user['username'])}}</p>
                <p>Email: {{ $user['email'] }}</p>
            </div>
        </section>
    </article>

    <div id="home_links">
        <a href='{{ url("discography") }}'><img src="{{asset('images/album.png')}}" alt="Discografia"></a>
        <a href='{{ url("distribution") }}'><img src="{{asset('images/distribution.png')}}" alt="Distribuzione"></a>
        <a href='{{ url("services") }}'><img src="{{asset('images/share.png')}}" alt="Servizi"></a>
        <a href='{{ url("jarvis") }}'><img src="{{asset('images/iron_man.png')}}" alt="Jarvis"></a>
        <a href='{{ url("logout") }}'><img src="{{asset('images/logout.png')}}" alt="Logout"></a>   
    </div>
@endsection