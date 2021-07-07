<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;
    use App\Models\Service;
    use App\Models\FavoriteService;
    use Illuminate\Http\Request;

    class ServicesController extends BaseController {
        public function services() {
            $user = User::find(session('user_id'));
            if(!isset($user)) {
                return redirect('login');
            }

            return view('services');            
        }

        public function getServices() {
            $services = Service::all();
            return $services;
        }

        public function servicesIfFavorite() {
            $user = User::find(session('user_id'));
            $user_fav_services = $user->services;
            return $user_fav_services;
        }

        public function addToFavorites(Request $request) {
            $favorite_service = new FavoriteService;
            $favorite_service->user_id = session('user_id');
            $favorite_service->service_name = request('service');
            $favorite_service->save();          
            
        }

        public function removeFromFavorites($service) {
            $user_id = session('user_id');
            FavoriteService::where('user_id', $user_id)
                           ->where('service_name', $service)
                           ->delete();
        }
    }
?>