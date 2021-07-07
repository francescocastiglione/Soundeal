@extends('layouts.menu')

@section('title', 'Jarvis')

@section('style')
    <link rel="stylesheet" href='{{ asset("css/jarvis.css") }}'>
@endsection

@section('script')
    <script src='{{ asset("js/jarvis.js") }}' defer></script>
@endsection

@section('links')
    <a href='{{ url("home") }}'><img src="{{asset('images/home.png')}}" alt="Home">Home</a>
    <a href='{{ url("discography") }}'><img src="{{asset('images/album.png')}}" alt="Discografia">Discografia</a>
    <a href='{{ url("distribution") }}'><img src="{{asset('images/distribution.png')}}" alt="Distribuzione">Distribuzione</a>
    <a href='{{ url("services") }}'><img src="{{asset('images/share.png')}}" alt="Servizi">Servizi</a>
    <a id="current_page"><img src="{{asset('images/iron_man.png')}}" alt="Jarvis">Jarvis</a>
    <a href='{{ url("logout") }}'><img src="{{asset('images/logout.png')}}" alt="logout">Esci</a>
    <p>Francesco Castiglione<br/>O46002055</p>   
@endsection

@section('header')
    <header>
        <h1>Jarvis</h1>

        <p class="info">
            <img src="{{asset('images/warning.png')}}" alt="Attenzione"> Avvertenza: Jarvis non sostituisce in alcun modo l'interazione umana. È dunque importante farne un uso responsabile.
        </p>

        <p class="info" id="description">
            Ecco Jarvis, il bot virtuale di Soundeal.<br/>
            In seguito all'emergenza Covid, i tempi di attesa necessari per l'assistenza via email potrebbero rivelarsi più lunghi del previsto.<br/> 
            Soundeal non si lascia cogliere impreparato e prova ad assisterti sfruttando l'avanzata tecnologia proposta da Jarvis.
        </p>
        <div id="hello">
            <img src="{{asset('images/robot.gif')}}" alt="Jarvis">    
            <p>Ciao, io sono Jarvis. Clicca su di me per iniziare.</p>
        </div>
    </header>
@endsection

@section('main')
    <section class="hidden" id="jarvis">
        <img id="exit" src="{{asset('images/exit.png')}}">
        <div id="header_chat">
            <div id="jarvis_status">
                <h1>Jarvis</h1>
                <img src="{{asset('images/online.png')}}">
            </div>
            <p>Online</p>
        </div>

        <div id="jarvis_box">
            <img src="{{asset('images/robot.gif')}}" alt="Jarvis">
        </div>
        <div id="container">
            <div id="chat_box"></div>
        </div>

        <div id="user_box">
            <img src="{{asset('images/default_avatar.png')}}" alt="User">
        </div>    
            
        <div id="chat">
            <div id="chat_input">
                <input type="text" placeholder="Chiedi a Jarvis...">
                <img src="{{asset('images/send.png')}}" alt="Invio">
            </div>
        </div>
    </section>
@endsection