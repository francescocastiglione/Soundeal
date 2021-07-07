<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Soundeal - @yield('title')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @yield('style')
        <link rel="stylesheet" href='{{ asset("css/menu.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Karla:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet">
        @yield('script')
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script src='{{ asset("js/mobile_nav.js") }}' defer></script>
        <link rel="icon" href="{{asset('images/soundeal.png')}}">
    </head>

    <body>   
        <nav>
            <div id="mobile_menu">
                <div></div>
                <div></div>
                <div></div>
            </div>
        
            <div id="soundeal">
                <img src="{{asset('images/soundeal.png')}}" alt="Soundeal">
            </div>

            @yield('mobile_search_bar')
            @yield('links')
        </nav>

        <div class="mobile_nav hidden"> 
            @yield('links')
        </div>
        
        @yield('header')

        @yield('main')
    </body>
</html>