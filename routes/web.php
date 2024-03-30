<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes(['register' => false]); // disable registration

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
