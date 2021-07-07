<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Session;
    use Illuminate\Support\Facades\Auth;


    class LoginController extends BaseController {
        public function login(Request $request) {
            if(session('user_id') != null) {
                return redirect('home');
            }
            else {
                $old_email = $request->old('email');
                return view('login')->with('old_email', $old_email);
            }
        }

        public function checkLogin(Request $request) {
            $credentials = $request->validate([
                'email' => 'required',
                'password' => 'required'
            ], [
                'email.required' => 'Non ha inserito nessuna email.',
                'password.required' => 'Non hai inserito nessuna password.'
            ]);
            
            if (Auth::attempt($credentials)) {
                $user = User::where('email', request('email'))->first();
                Session::put('user_id', $user->id);
                return redirect('home');
            }
            else {
                return redirect('login')->withInput();
            }               
        }

        public function logout() {
            Session::flush();
            return redirect('login');
        }
    }



?>
