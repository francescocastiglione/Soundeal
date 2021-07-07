<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Relations\Pivot;

    class Distribution extends Pivot{
        protected $table = 'distributions';
    }
?>