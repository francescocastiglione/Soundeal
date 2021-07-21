<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;

    class HomeController extends BaseController {
        public function home() {
            $user = User::find(session('user_id'));
            if(!isset($user)) {
                return redirect('login');
            }
            return view('home')->with("user", $user);
        }

        public function homeUser() {
            $user = User::where('id', session('user_id'))->first();
            return ['first_name' => $user->first_name, 'last_name' => $user->last_name, 'username' => $user->username, 'email' => $user->email, 'image' => $user->artist_image];
        }
    }
?>
