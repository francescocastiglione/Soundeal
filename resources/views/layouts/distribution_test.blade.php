<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>@yield('title')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href='{{ asset("css/streaming.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Karla:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script src='{{ asset("js/streaming.js") }}' defer></script>
        @yield('icon')
    </head>

    <body>
        <header>
            <div class="service_title">
                @yield('service_title')
            </div>

            <div class="search_bar">
                <img src="{{asset('images/search.png')}}">
                <input type="text" placeholder="Cerca">
            </div> 
        </header>

        <h1 class="no_albums hidden">Nessun album trovato.</h1>
        <article>
        </article>
    </body>
</html>