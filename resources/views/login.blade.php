<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Soundeal - Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href='{{ asset("css/login.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet">
        <script src='{{ asset("js/login.js") }}' defer></script>
        <link rel="icon" href="{{asset('images/soundeal.png')}}"> 
    </head>

    <body>
        <div class="overlay"></div>
        <a href='{{ url("homepage") }}'>
            <img src="{{asset('images/logo_soundeal.png')}}" id="soundeal_logo">
        </a>
        <div class="main">
            <h1>Bentornato!</h1>
            
            @if(isset($old_email))
                <h3>Non esiste nessun utente con queste credenziali.</h3>
            @endif

            <h3>@error('email') {{ $message }} @enderror @error('user_pwd') {{ $message }} @enderror</h3>
    
            <form name="login" method="post">
                @csrf
                <div class="box">
                    <img src='{{ url("images/login_icon.png") }}' alt="Email">
                    <label for="email"></label>
                    <input type="text" name="email" id="email" placeholder="Email" value='{{ $old_email }}'>
                </div>
                <p class="hidden" id="email_error">Questo campo non può essere vuoto.</p>
                <div class="box" id="password_box">
                    <img src='{{ url("images/password_icon.png") }}' alt="Password">
                    <label for="pwd"></label>
                    <input id="pwd" type="password" name="password" placeholder="Password">
                    <img class="show_password" src="images/eye_icon.png">
                </div>
                <p class="hidden" id="pwd_error">Questo campo non può essere vuoto.</p>

                <div class="box">
                    <input type="submit" value="Accedi" id="login">
                </div>

                <div class="new_user">
                    <span>Non hai un account?</span>
                    <a href='{{ url("signup") }}'>Registrati.</a>
                </div>
            </form>
        </div>
    </body>
</html>