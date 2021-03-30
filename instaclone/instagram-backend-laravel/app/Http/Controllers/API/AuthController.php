<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request){
        
        $user = User::where("email",$request->email)->first();
        if(!is_null($user)){
            return response()->json(
                [
                    'message' => "Email telah terdaftar!"
                ],
                403
            );
        }

        $user   = new User();
        $user->email    = $request->email;
        $user->name     = $request->name;
        $user->password = Hash::make($request->password);
        $user->save();

        $token = JWTAuth::fromUser($user);
        if($token){
            return response()->json([
                'data' => [
                    'token' => $token,
                    'user'  => $user,
                ]
            ],200);
        }else{
            return response()->json(
                [
                    'message' => "Email / Password salah!"
                ],
                403
            );
        }
    }

    public function login(Request $request){
        $creds = $request->only(["email",'password']);
        $token = JWTAuth::attempt($creds);
        if($token){
            return response()->json([
                'data' => [
                    'token' => $token,
                    'user'  => auth()->user(),
                ]
            ],200);
        }else{
            return response()->json(
                [
                    'message' => "Email / Password salah!"
                ],
                403
            );
        }
    }
}
