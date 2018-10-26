<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VoteOption extends Model
{
    public function vote()
    {
        return $this->belongsTo('App\Vote', 'vote_id');
    }
}
