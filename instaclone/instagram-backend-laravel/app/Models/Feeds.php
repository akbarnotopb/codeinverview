<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feeds extends Model
{
    use HasFactory;

    protected $table="feeds";

    protected $fillable = [
        'author_id',
        'place',
        'description',
        'image',
        'hashtag',
    ];

    public function like(){
        return $this->hasMany(Likes::class,"feed_id","id");
    }

    public function comment(){
        return$this->hasMany(Comments::class,"feed_id","id");
    }

    public function author(){
        return $this->belongsTo(User::class,"author_id","id");
    }
}
