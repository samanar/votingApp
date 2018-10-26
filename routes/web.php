<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/votes', 'VoteController@index')->name('votes.index');
Route::get('/users/{user_id}/votes', 'VoteController@user_votes')->name('votes.user');
Route::get('/votes/create', 'VoteController@create')->name('votes.create');
Route::post('/votes/store', 'VoteController@store')->name('votes.store');