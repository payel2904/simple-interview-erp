<?php

use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('dashboard', [DashboardController::class, 'index']);
Route::resource('category', CategoryController::class)->only(['index', 'store', 'show', 'update', 'destroy']);
Route::resource('products', ProductController::class)->only(['index', 'store', 'show', 'update', 'destroy']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('authenticated', [AuthController::class, 'checkUserStatus']);
    Route::post('logout', [AuthController::class, 'logout']);
});


