<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Conversation extends Model
{
    protected $appends = ['context'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function context(): Attribute
    {
        return Attribute::make(
            get: fn() => 'user: ' . ($this->messages()->first()?->content ?? ''),
        );
    }

    public static function findOrCreate(?int $conversationId = null)
    {
        return self::find($conversationId) ?? self::create();
    }
}
