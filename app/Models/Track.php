<?php

    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;

    class Track extends Model {
        protected $primaryKey = "isrc";
        protected $autoIncrement = false;
        protected $keyType = "string";

        protected $fillable = [
            'isrc', 'title', 'album_id', 'author', 'type', 'genre', 'language', 'audio_file'
        ];

        public function album() {
            return $this->belongsTo('App\Models\Album');
        }
        
    }

?>