<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Soundeal - Upload</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href='{{ asset("css/discography.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet">
        <script src='{{ asset("js/upload_album.js") }}' defer></script>
        <link rel="icon" href="{{asset('images/soundeal.png')}}">
    </head>
    <body>
        <a class="exit_button" href='{{ url("discography") }}'><img src="{{asset('images/exit.png')}}"></a>
        <h1 class="new_album_track">Nuovo album</h1>
        <form name="create_album" method="post" enctype="multipart/form-data" autocomplete="off">
            @csrf
            <div class="upload_file">
                <input type="file" name="album_cover" id="album_cover_file" class="hidden" accept='.jpg, .jpeg, image/png, image/gif'>
                <label for="album_cover_file">
                    <img src="{{asset('images/upload.png')}}">
                    <span>Inserisci la copertina dell'album</span>
                </label>
                <p class="hidden err"></p>
                <p class="server_error">@error('album_cover') {{ $message }} @enderror</p> 
            </div>
            <div class="music_title">
                <label for="album_title"></label>
                <input type="text" name="album_title" id="album_title" placeholder="Inserisci un titolo">
                <p class="hidden err">Hai dimenticato di inserire il titolo.</p>
                <p class="server_error">@error('album_title') {{ $message }} @enderror</p> 
            </div>

            <div>
                <input id ="submit" type="submit" value="Crea album" class="create" disabled>
            </div>
        </form>

    </body>
</html>