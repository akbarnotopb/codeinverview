<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FeedsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::namespace("API")->group(function(){
    Route::post("/register",[AuthController::class, "register"]);
    Route::post("/login",[AuthController::class, "login"]);

    Route::middleware("jwt-api")->group(function(){
        Route::get("/feeds", [FeedsController::class,"index"]);
        Route::post("/feeds/store",[FeedsController::class,"store"]);

        Route::post("/feeds/like",[FeedsController::class,"like"]);
        Route::post("/feeds/comment",[FeedsController::class,"comment"]);
    });
});