<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;
    use App\Models\TracK;
    use Illuminate\Support\Str;
    use Illuminate\Http\Request;    

    class TrackController extends BaseController {
        public function track() {
            $user = User::find(session('user_id'));
            if(!isset($user)) {
                return redirect('login');
            }

            return view('track');
        }

        public function uploadTrack(Request $request) {
            $request->validate([
                'song_file' => 'required|mimes:mp3|max:40960',
                'song_title' => 'required',
                'author_name' => 'required',
                'song_genre' => 'required',
                'song_type' => 'required',
                'languages' => 'required',
                'song_album' => 'required'
            ], [
                'song_file.required' => 'Hai dimenticato di caricare il tuo brano.',
                'song_file.mimes' => 'Per favore, carica un brano .mp3.',
                'song_file.max' => 'Il file caricato supera la dimensione massima di 40 MB.',
                'song_title.required' => 'Inserisci un titolo per il tuo brano.',
                'author_name.required' => "Puoi inserire il tuo nome oppure quello dell'autore originale se il tuo brano è una cover.",
                'song_genre.required' => 'Non hai selezionato un genere per il tuo brano.',
                'song_type.required' => 'Seleziona il tipo di brano che stai caricando.',
                'languages.required' => "Seleziona una lingua o l'opzione strumentale.",
                'song_album.required' => "Seleziona l'album in cui vuoi caricare il brano."
            ]);

            $song = $request->file('song_file');
            if ($song != null) {
                $song_name = uniqid('', true) . "_track.". $song->getClientOriginalExtension();
                $songs_path = 'tracks/';
                $song_url = $songs_path . $song_name;
                $upload_track = $song->move($songs_path, $song_name);
            }

            $unique = false;
            do{
                $isrc = 'IT' . Str::random(10);
                $exists = Track::where('isrc', $isrc)->exists();
                if (!$exists) {
                    $unique = true;
                } 
            } while(!$unique);          
            
            $track = Track::create([
                'isrc' => $isrc,
                'title' => $request->song_title,
                'album_id' => $request->song_album,
                'author' => $request->author_name,
                'type' => $request->song_type,
                'genre' => $request->song_genre,
                'language' => $request->languages,
                'audio_file' => $song_url
            ]);

            if($track) {
                return redirect('discography');
            }
            else {
                return redirect('track');
            }
        }
    }
?>