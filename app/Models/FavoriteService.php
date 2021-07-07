<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Relations\Pivot;

    class FavoriteService extends Pivot{
        protected $table = 'favorite_services';
    }
?>