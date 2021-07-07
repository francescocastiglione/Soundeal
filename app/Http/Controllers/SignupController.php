<?php

    use Illuminate\Routing\Controller as BaseController;
    use App\Models\User;
    use App\Notifications\UserRegistered;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Session;

    class SignupController extends BaseController {
        protected function newUser(Request $request) {
            $request->validate([
                'user_first_name' => 'required',
                'user_last_name' => 'required',
                'artist_name' => 
                    array(
                        'required',
                        'regex:/^[a-zA-Zà-úÀ-Ú0-9_%&@ ]{3,40}$/'
                    ),
                'user_email' => 'required|email',
                'user_password' =>
                    array(
                        'required',
                        'regex:/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/'
                    ),
                'user_confirm_password' => 'required|same:user_password',
                'artist_img' => 'mimes:jpeg,jpg,png|max:2048'
            ], [
                'user_first_name.required' => 'Inserisci un nome valido.',
                'user_last_name.required' => 'Inserisci un cognome valido.',
                'artist_name.required' => "Inserisci un nome artista.",
                'artist_name.regex' => "Inserisci almeno 3 caratteri. È ammesso l'utilizzo di lettere, numeri, % & _ @. Max: 40.",
                'user_email.required' => "Inserisci un indirizzo email.",
                'user_email.email' => "Email non valida.",
                'user_password.required' => "Inserisci una password.",
                'user_password.regex' => "Password non valida. Deve contenere almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale. Min: 8 caratteri.",
                'user_confirm_password.required' => "Conferma la password.",
                'user_confirm_password.same' => "La password non corrisponde.",
                'artist_img.mimes' => "Carica un file .jpeg, .jpg o .png.",
                'artist_img.max' => "La dimensione dell'immagine non deve superare 2 MB."
            ]);

            $artist_image = $request->file('artist_img');
            if ($artist_image != null) {
                $artist_image_name = uniqid('', true) . "_profile.". $artist_image->getClientOriginalExtension();
                $images_path = 'user_images/';
                $artist_image_url = $images_path . $artist_image_name;
                $upload_image = $artist_image->move($images_path, $artist_image_name);
            }
            else {
                $artist_image_url = 'images/default_avatar.png';
            }

            $user = User::create([
                'first_name' => $request->user_first_name,
                'last_name' => $request->user_last_name,
                'username' => $request->artist_name,
                'password' => Hash::make($request->user_password),
                'email' => $request->user_email,
                'artist_image' => $artist_image_url
            ]);

            if($user) {
                Session::put('user_id', $user->id);

                $user->notify(new \App\Notifications\UserRegistered($user));
                return redirect('home');
            }
            else {
                return redirect('signup')->withInput();
            }
        }

        public function checkEmail($query) {
            $exist = User::where('email', $query)->exists();
            return ['exists' => $exist];
        }

        public function signup(Request $request) {
            if(session('user_id') != null) {
                return redirect('home');
            }
            else {
                $old_first_name = $request->old('user_first_name');
                $old_last_name = $request->old('user_last_name');
                $old_username = $request->old('artist_name');
                $old_email = $request->old('user_email');
                return view('signup')
                    ->with('old_first_name', $old_first_name)
                    ->with('old_last_name', $old_last_name)
                    ->with('old_username', $old_username)
                    ->with('old_email', $old_email);
            }
        }
    }
?>