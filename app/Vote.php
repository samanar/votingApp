<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function options()
    {
        return $this->hasMany('App\VoteOptions');
    }

    public function attachments()
    {
        return $this->hasMany('App\Attachment');
    }
}
