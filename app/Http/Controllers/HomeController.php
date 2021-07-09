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
    }
?>