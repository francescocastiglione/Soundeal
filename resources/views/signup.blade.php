<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Soundeal - Signup</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href='{{ asset("css/signup.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet">
        <script src='{{ asset("js/signup.js") }}' defer></script>
        <link rel="icon" href="{{asset('images/soundeal.png')}}">
    </head>

    <body>
        <div class="overlay"></div>
        <a href='{{ url("homepage") }}'>
            <img src="{{asset('images/logo_soundeal.png')}}" id="soundeal_logo">
        </a>

        <div class="main">
            <h1>Benvenuto!</h1>
            <form name="form" method="post" enctype="multipart/form-data" autocomplete="off">
                @csrf
                <div class="container">
                    <div class="box">
                        <label for="first_name" class="input_name">Nome</label>
                        <input class="@error('user_first_name') error @enderror" type="text" name="user_first_name" id="first_name" placeholder="Inserisci il nome" value = '{{ $old_first_name }}'>
                        <p class="hidden">Inserisci un nome valido.</p>
                        <p class="server_error">@error('user_first_name') {{ $message }} @enderror</p> 
                    </div>
                    <div class="box">
                        <label for="last_name" class="input_name">Cognome</label>
                        <input class="@error('user_last_name') error @enderror" type="text" name="user_last_name" id="last_name" placeholder="Inserisci il cognome" value = '{{ $old_last_name }}'>
                        <p class="hidden">Inserisci un cognome valido.</p>
                        <p class="server_error">@error('user_last_name') {{ $message }} @enderror</p> 
                    </div>
                </div>
                <div class="container">
                    <div class="box">
                        <label for="username" class="input_name">Nome artista</label>
                        <input class="@error('artist_name') error @enderror" type="text" name="artist_name" id="username" placeholder="Inserisci il nome pubblico" value = '{{ $old_username }}'>
                        <p class="hidden">Inserisci almeno 3 caratteri. È ammesso l'utilizzo di lettere, numeri, % & _ @. Max: 40.</p>
                        <p class="server_error">@error('artist_name') {{ $message }} @enderror</p> 
                    </div>
                    <div class="box">
                        <label for="email" class="input_name">Email</label>
                        <input class="@error('user_email') error @enderror" type="text" name="user_email" id="email" placeholder="Inserisci l'email" value = '{{ $old_email }}'>
                        <p class="hidden"></p>
                        <p class="server_error">@error('user_email') {{ $message }} @enderror</p> 
                    </div>
                    </div>
                <div class="container">
                    <div class="box">
                        <label for="user_pwd" class="input_name">Password</label>
                        <input class="@error('user_password') error @enderror" type="password" name="user_password" id="user_pwd" placeholder="Inserisci la password">
                        <p class="hidden">Password non valida. Deve contenere almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale. Min: 8 caratteri. Non sono ammessi spazi.</p>
                        <p class="server_error">@error('user_password') {{ $message }} @enderror</p> 
                    </div>
                    <div class="box">
                        <label for="user_confirm_pwd" class="input_name">Conferma password</label>
                        <input class="@error('user_confirm_password') error @enderror" type="password" name="user_confirm_password" id="user_confirm_pwd" placeholder="Conferma la password">
                        <p class="hidden">La password non corrisponde.</p>
                        <p class="server_error">@error('user_confirm_password') {{ $message }} @enderror</p> 
                    </div>
                </div>

                <div id="input_box">
                    <input class="@error('artist_img') error @enderror" type="file" name="artist_img" id="file_input" accept='.jpg, .jpeg, image/png'>
                    <label for="file_input">
                        <img src="{{asset('images/add.png')}}">
                        <span>Scegli l'immagine da artista</span>
                    </label>
                    <p class="hidden"></p>
                    <p class="server_error">@error('artist_img') {{ $message }} @enderror</p> 
                </div>
                
                <div class="agree">
                    <input type='checkbox' name="data_agree" id="agree">
                    <label for="agree">Acconsento al trattamento dei dati personali e alle <a href='{{ url("privacy") }}' target="_blank">privacy policy</a></label>
                </div>

                <div class="box">
                    <input type="submit" value="Registrati" id="signup" disabled>
                </div>

                <div class="new_user">
                    <span>Hai già un account?</span>
                    <a href='{{ url("login") }}'>Accedi.</a>
                </div>
             </form>
        </div>
    </body>
</html>