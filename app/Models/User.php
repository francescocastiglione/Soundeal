<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Foundation\Auth\User as Authenticatable;
    use Illuminate\Notifications\Notifiable;

    class User extends Authenticatable {

        use HasFactory, Notifiable;

        protected $fillable = [
            'first_name', 'last_name', 'username', 'password', 'email', 'artist_image'
        ];

        protected $hidden = ['password'];

        public function albums() {
            return $this->hasMany('App\Models\Album');
        }
        
        public function services() {
            return $this->belongsToMany('App\Models\Service', 'favorite_services')->using('App\Models\FavoriteService');
        }
    }

?>