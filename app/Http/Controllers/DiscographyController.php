<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;
    use App\Models\Album;
    use App\Models\Track;

    class DiscographyController extends BaseController {
        public function discography() {
            $user = User::find(session('user_id'));
            if(!isset($user)) {
                return redirect('login');
            }

            return view('discography');            
        }

        public function getAlbums() {
            $user_id = session('user_id');
            $albums = Album::where('user_id', $user_id)->orderBy('title')->get();
            return $albums;
        }

        public function getTracks() {
            $tracks = Track::addSelect(['album_id' => Album::select('upc')
                      ->whereColumn('albums.upc', 'tracks.album_id')
                      ->where('user_id', session('user_id'))
            ])->get();
            return $tracks;
        }

        public function deleteTrack($isrc) {
            Track::find($isrc)->delete();
        }

        public function deleteAlbum($album_id) {
            Album::find($album_id)->delete();
        }
    }
?>