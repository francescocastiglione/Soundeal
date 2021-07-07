<?php
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;

    class Service extends Model {
        protected $primaryKey = "name";
        protected $autoIncrement = false;
        protected $keyType = "string";
        
        protected $fillable = [
            'name', 'logo', 'details'
        ];

        public function users() {
            return $this->belongsToMany('App\Models\User', 'favorite_services')->using('App\Models\FavoriteService');
        }

        public function albums() {
            return $this->belongsToMany('App\Models\Album', 'distributions')->using('App\Models\Distribution');
        }
        
    }

?>