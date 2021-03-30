<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class AuthAPIMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if($request->bearerToken()){
            try{
                if(!JWTAuth::parseToken()->authenticate()){
                    return response()->json([
                        'data'=>[],
                        'message' => "Anda belum mendaftar/sesi Anda telah habis, silahkan Login kembali!"
                    ],401);
                }
            }catch(TokenExpiredException $e){
                return response()->json([
                    'data'=>[],
                    'message' => "Anda belum mendaftar/sesi Anda telah habis, silahkan Login kembali!"
                ],401);
            }
            catch (JWTException $e){
                return response()->json([
                    'data'=>[],
                    'message' => "Anda belum mendaftar/sesi Anda telah habis, silahkan Login kembali!"
                ],401);
            }
            catch(\Exception $e){
                return response()->json([
                    'data'=>$e->getMessage(),
                    'message' => "Terjadi kesalahan, cobalah beberapa saat lagi..."
                ],500);
            }
            return $next($request);
        }else{
            return response()->json([
                'message' => "Invalid Access!"
            ],
            403);
        }
    }
}
