<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GuideController;
use App\Http\Controllers\Api\PackageController;
use Illuminate\Support\Facades\Auth;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json(Auth::user());
});
Route::group(['middleware' => ['auth:api']], function () {

    Route::get('/user', function (Request $request) {
        return response()->json(Auth::user());
    });
});
Route::apiResource(name:'guides', controller:GuideController::class);
Route::apiResource(name:'packages', controller:PackageController::class);

