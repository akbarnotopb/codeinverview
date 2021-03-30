<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Likes extends Model
{
    use HasFactory;

    protected $table="likes";

    protected $fillable = [
        'author_id',
        'feed_id'
    ];

    public function author(){
        return $this->belongsTo(User::class,"author_id","id");
    }

    public function feed(){
        return $this->belongsTo(Feeds::class,"feed_id","id");
    }
}
