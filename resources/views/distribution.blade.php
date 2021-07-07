@extends('layouts.menu')

@section('title', 'Distribution')

@section('style')
    <link rel="stylesheet" href='{{ asset("css/distribution.css") }}'>
@endsection

@section('script')
    <script src='{{ asset("js/distribution.js") }}' defer></script>
@endsection

@section('links')
    <a href='{{ url("home") }}'><img src="{{asset('images/home.png')}}" alt="Home">Home</a>
    <a href='{{ url("discography") }}'><img src="{{asset('images/album.png')}}" alt="Discografia">Discografia</a>
    <a id="current_page"><img src="{{asset('images/distribution.png')}}" alt="Distribuzione">Distribuzione</a>
    <a href='{{ url("services") }}'><img src="{{asset('images/share.png')}}" alt="Servizi">Servizi</a>
    <a href='{{ url("jarvis") }}'><img src="{{asset('images/iron_man.png')}}" alt="Jarvis">Jarvis</a>
    <a href='{{ url("logout") }}'><img src="{{asset('images/logout.png')}}" alt="logout">Esci</a>
    <p>Francesco Castiglione<br/>O46002055</p>   
@endsection

@section('header')
    <header>
        <h1>Distribuzione</h1>

        <p class="info">
            Inizia subito a distribuire i tuoi album. Soundeal renderà la tua esperienza semplice e intuitiva.
        </p>

        <p class="info" id="description">
            Soundeal mette a tua disposizione il meccanismo migliore in termini di efficacia ed efficienza.<br/>
            È sufficiente effettuare un click sulla copertina dell'album e sul pulsante "Distribuisci" e, in maniera totalmente automatizzata, i tuoi album verranno
            resi pubblici sui tuoi servizi di streaming preferiti.
        </p>
    </header>
@endsection

@section('main')
    <h1 class="no_albums hidden">Non hai ancora caricato nessun album.</h1>
    <article id="albums">
    </article>
@endsection