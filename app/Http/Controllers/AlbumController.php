<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;
    use Illuminate\Http\Request;
    use App\Models\Album;

    class AlbumController extends BaseController {
        public function album() {
            $user = User::find(session('user_id'));
            if(!isset($user)) {
                return redirect('login');
            }

            return view('album');        
        }

        public function uploadAlbum(Request $request) {
            $request->validate([
                'album_cover' => 'required|mimes:jpeg,jpg,gif|max:2048',
                'album_title' => 'required'
            ], [
                'album_cover.required' => "Inserisci un'immagine di copertina.",
                'album_cover.mimes' => 'Carica un file .jpeg, .jpg o .gif.',
                'album_cover.max' => "La dimensione dell'immagine non deve superare 2 MB.",
                'album_title.required' => 'Inserisci un titolo.'
            ]);

            $cover = $request->file('album_cover');
            if ($cover != null) {
                $cover_name = uniqid('', true) . "_album.". $cover->getClientOriginalExtension();
                $images_path = 'covers/';
                $cover_url = $images_path . $cover_name;
                $upload_image = $cover->move($images_path, $cover_name);
            }

            $unique = false;
            do{
                $upc = random_int(100000000000, 999999999999);
                $exists = Album::where('upc', $upc)->exists();
                if (!$exists) {
                    $unique = true;
                } 
            } while(!$unique);  

            $album = Album::create([
                'upc' => $upc,
                'title' => $request->album_title,
                'user_id' => session('user_id'),
                'album_cover' => $cover_url
            ]);

            if($album) {
                return redirect('discography');
            }
            else {
                return redirect('album');
            }
            
        }
    }
?>