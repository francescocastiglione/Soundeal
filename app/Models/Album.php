<?php

    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;

    class Album extends Model {
        protected $primaryKey = 'upc';
        protected $autoIncrement = false;
        
        protected $fillable = [
            'upc', 'title', 'user_id', 'album_cover'
        ];

        public function user() {
            return $this->belongsTo('App\Models\User');
        }

        public function tracks() {
            return $this->hasMany('App\Models\Track', null, 'isrc');
        }

        public function services() {
            return $this->belongsToMany('App\Models\Service', 'distributions')->using('App\Models\Distribution');
        }
    }

?>