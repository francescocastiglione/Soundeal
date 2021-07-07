<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\Distribution;
    use App\Models\Album;
    use App\Models\User;

    class StreamingController extends BaseController {
        public function index($service_name) {
            return view($service_name);
        }

        public function getContent($service_name) {
            $albums = Distribution::where('service_name', $service_name)->get();
            $content = array();

            foreach($albums as $item) {
                $album = Album::find($item->album_id);
                $user = User::find($album->user_id);
                $array = array(
                    'title' => $album->title,
                    'author' => $user->username,
                    'cover' => $album->album_cover,
                    'tracks_number' => $album->tracks_number
                );
                $content[] = $array;
            }
            return $content;
        }
    }

?>