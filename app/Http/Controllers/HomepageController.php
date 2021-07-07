<?php

    use Illuminate\Routing\Controller as BaseController;
    use Illuminate\Support\Facades\Http;
    use Illuminate\Http\Client\Response;
    use Illuminate\Support\Facades\Session;
    use Illuminate\Http\Request;

    class HomepageController extends BaseController {
        public function homepage() {        
            return view('homepage');            
        }

        public function contacts() {
            return view('contacts');
        }

        public function privacy() {
            return view('privacy');
        }

        public function searchOnSpotify($spotify_artist_name) {
            $request = request();

            if(($request->session()->has('spotify_token')) && (time() - Session::get('last_activity') > 3540)) {
                Session::forget('spotify_token');
                Session::forget('last_activity');
            }
            
            if (!$request->session()->has('spotify_token')) {
                $spotify_token = Http::asForm()->withHeaders([
                    'Authorization' => 'Basic '.base64_encode(env('SPOTIFY_CLIENT_ID').':'.env('SPOTIFY_CLIENT_SECRET'))
                ])->post('https://accounts.spotify.com/api/token', [
                    'grant_type' => 'client_credentials'
                ]);
                if($spotify_token->failed()) 
                    abort(500);
                Session::put('spotify_token', $spotify_token['access_token']);
                Session::put('last_activity', time());       
                      
            }

            $artist_result = Http::withToken(Session::get('spotify_token'))->withHeaders([
                'Authorization' => 'Bearer '.Session::get('spotify_token')
            ])->get("https://api.spotify.com/v1/search", [
                "type" => "artist",
                "q" => $spotify_artist_name
            ]);
            if($artist_result->failed()) 
                    abort(500);

            return $artist_result->json();

        }

        public function topTracks($id) {
            $request = request();

            if(($request->session()->has('spotify_token')) && (time() - Session::get('last_activity') > 3540)) {
                Session::forget('spotify_token');
                Session::forget('last_activity');
            }
            
            if (!$request->session()->has('spotify_token')) {
                $spotify_token = Http::asForm()->withHeaders([
                    'Authorization' => 'Basic '.base64_encode(env('SPOTIFY_CLIENT_ID').':'.env('SPOTIFY_CLIENT_SECRET'))
                ])->post('https://accounts.spotify.com/api/token', [
                    'grant_type' => 'client_credentials'
                ]);
                if($spotify_token->failed()) 
                    abort(500);
                Session::put('spotify_token', $spotify_token['access_token']);
                Session::put('last_activity', time());       
                      
            }

            $tracks_result = Http::withToken(Session::get('spotify_token'))->withHeaders([
                'Authorization' => 'Bearer '.Session::get('spotify_token')
            ])->get('https://api.spotify.com/v1/artists/'.$id.'/top-tracks', [
                'market' => 'IT'                
            ]);
            if($tracks_result->failed()) 
                    abort(500);

            return $tracks_result->json();
        }

        public function searchOnFreesound(Request $request) {

            $filters = $request->filters;
            if ($filters === 'no') {
                $samples = Http::get('https://freesound.org/apiv2/search/text/', [
                    'query' => $request->search,
                    'fields' => 'url,name,duration,username,images,num_downloads,previews',
                    'group_by_pack' => '1',
                    'token' => env('FREESOUND_API_KEY'),
                    'format' => 'json'
                ]);
                if($samples->failed()) 
                    abort(500);
            }
            else {
                $samples = Http::get('https://freesound.org/apiv2/search/text/', [
                    'query' => $request->search,
                    'fields' => 'url,name,duration,username,images,num_downloads,previews',
                    'group_by_pack' => '1',
                    'sort' => $request->filter1.$request->filter2,
                    'token' => env('FREESOUND_API_KEY'),
                    'format' => 'json'
                ]);
                if($samples->failed()) 
                    abort(500);

            }
            return $samples->json();
        }
    
    }
?>