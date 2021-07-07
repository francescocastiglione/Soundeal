<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;
    use App\Models\Distribution;
    use App\Models\Track;
    
    class DistributionController extends BaseController {
        public function distribution() {
            $user = User::find(session('user_id'));
            if(!isset($user)) {
                return redirect('login');
            }

            return view('distribution');            
        }

        public function distributeAlbum($upc) {
            $user = User::find(session('user_id'));
            $user_fav_services = $user->services;

            foreach($user_fav_services as $fav_service) {
                $exist = Distribution::where('album_id', $upc)
                                     ->where('service_name', $fav_service->name)
                                     ->exists();
                if(!$exist) {
                    $distribution = new Distribution;
                    $distribution->album_id = $upc;
                    $distribution->service_name = $fav_service->name;
                    $distribution->save();
                }             
            }           
        }

        public function ifEmpty($upc) {
            $exist = Track::where('album_id', $upc)->exists();
            return ['exists' => $exist];
        }
    }

?>