<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Message extends Model
{
    protected $fillable = ['conversation_id', 'content', 'is_user_message'];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}
