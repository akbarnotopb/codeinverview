<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comments;
use App\Models\Feeds;
use App\Models\Likes;
use App\Traits\UploadFile;
use Illuminate\Http\Request;

class FeedsController extends Controller
{
    use UploadFile;
    public function index(){
        $feeds = Feeds::with(['like','comment.author','author'])->get();
        
        $response = [];
        foreach($feeds as $feed){
            $comments = [];
            foreach($feed->comment as $comment){
                array_push($comments, [
                    'comment' => $comment->comment,
                    'author'  => $comment->author->name,
                ]);
            }

            $liked = false;
            foreach($feed->like as $like){
                if($like->author_id == auth()->id()){
                    $liked = true;
                    break;
                }
            }

            $holder = [
                '_id'           => $feed->id,
                'image'         => asset($feed->image),
                'description'   => $feed->description,
                'place'         => $feed->place,
                'author'        => $feed->author->name,
                'likes'         => count($feed->like),
                'liked'         => $liked,
                'comments'      => $comments
            ];
            array_push($response, $holder);
        }

        return response()->json([
            'data' => $response
        ],200);
    }

    public function store(Request $request){
        try{

            $img = $this->uploadImage($request->image,"public");

            if($img->status){

                $feed = new Feeds();
                $feed->author_id    = auth()->id();
                $feed->place        = $request->place;
                $feed->description  = $request->description;
                $feed->hashtag      = $request->hashtags;
                $feed->image        = $img->path;
                $feed->save();
            }else{
                return response()->json([
                    'message'   => $img->message,
                ],500);
            }

            return response()->json([
                'message'   => "Berhasil menambahkan post!"
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'message'   => $e->getMessage()
            ],500);
        }
    }

    public function like(Request $request){
        try{
            $like = new Likes();
            $like->feed_id   = $request->feed_id;
            $like->author_id = auth()->id();
            $like->save();

            return response()->json([
                'message'   => "Berhasil menyukai post!"
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'message'   => $e->getMessage()
            ],500);
        }
    }

    public function comment(Request $request){
        try{
            $comment = new Comments();
            $comment->feed_id   = $request->feed_id;
            $comment->author_id = auth()->id();
            $comment->comment   = $request->comment;
            $comment->save();

            return response()->json([
                'message'   => "Berhasil menambahkan komentar!"
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'message'   => $e->getMessage()
            ],500);
        }
    }
}
