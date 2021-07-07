<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;
    use Illuminate\Http\Request;

    class JarvisController extends BaseController {
        public function jarvis() {
            $user = User::find(session('user_id'));
            if(!isset($user)) {
                return redirect('login');
            }
            return view('jarvis');
        }

        public function checkPassword(Request $request) {
            $user_password = $request->pwd;
            $user_email = User::find(session('user_id'))->email;
            $credentials = [
                'email' => $user_email,
                'password' => $user_password
            ];

            $password_result = Auth::attempt($credentials);
            return ['password_result' => $password_result];            
        }

        public function changePassword(Request $request) {
            $user = User::find(session('user_id'));
            
            $request->validate([
                'new_password' => 
                    array(
                        'required',
                        'regex:/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/'
                    ),
                'confirm_password' => 'required|same:new_password'
            ]);

            $user->password = Hash::make($request->new_password);
            $user->save();    
        }

        public function changeUsername(Request $request) {
            $user = User::find(session('user_id'));

            $request->validate([
                'new_username' => 
                    array(
                        'required',
                        'regex:/^[a-zA-Zà-úÀ-Ú0-9_%&@ ]{3,40}$/'
                    )
            ]);

            $user->username = $request->new_username;
            $user->save();
        }
    }

?>