<?php

use Illuminate\Support\Facades\Route;


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

    Route::get('/', 'HomepageController@homepage');
    Route::get('/homepage', 'HomepageController@homepage');
    Route::get('/homepage/spotify/{spotify_artist_name}', 'HomepageController@searchOnSpotify');
    Route::get('/homepage/tracks/{id}', 'HomepageController@topTracks');
    Route::post('/homepage/freesound', 'HomepageController@searchOnFreesound');
    Route::get('/homepage/artist', 'HomepageController@getArtists');
    Route::get('/contacts', 'HomepageController@contacts');
    Route::get('/privacy', 'HomepageController@privacy');

    Route::get('/login', 'LoginController@login');
    Route::post('/login', 'LoginController@checkLogin');
    Route::get('/logout', 'LoginController@logout');

    Route::get('/signup', 'SignupController@signup');
    Route::post('/signup', 'SignupController@newUser');
    Route::get('/signup/email/{q}', 'SignupController@checkEmail');

    Route::get('/home', 'HomeController@home');
    Route::get('/home/content/', 'HomeController@homeUser');

    Route::get('/discography', 'DiscographyController@discography');
    Route::get('/discography/albums', 'DiscographyController@getAlbums');
    Route::get('/discography/tracks', 'DiscographyController@getTracks');
    Route::get('/discography/deletetrack/{isrc}', 'DiscographyController@deleteTrack');
    Route::get('/discography/deletealbum/{album_id}', 'DiscographyController@deleteAlbum');

    Route::get('/distribution', 'DistributionController@distribution');
    Route::get('/distribution/distribute/{upc}', 'DistributionController@distributeAlbum');
    Route::get('/distribution/ifempty/{upc}', 'DistributionController@ifEmpty');

    Route::get('/album', 'AlbumController@album');
    Route::post('/album', 'AlbumController@uploadAlbum');

    Route::get('/track', 'TrackController@track');
    Route::post('/track', 'TrackController@uploadTrack');

    Route::get('/services', 'ServicesController@services');
    Route::get('/services/getservices', 'ServicesController@getServices');
    Route::get('/services/servicesiffavorite', 'ServicesController@servicesIfFavorite');
    Route::post('/services/addtofavorites', 'ServicesController@addToFavorites');
    Route::get('/services/removefromfavorites/{service}', 'ServicesController@removeFromFavorites');

    Route::get('/jarvis', 'JarvisController@jarvis');
    Route::post('/jarvis/checkpassword', 'JarvisController@checkPassword');
    Route::post('/jarvis/changepassword', 'JarvisController@changePassword');
    Route::post('/jarvis/changeusername', 'JarvisController@changeUsername');

    Route::get('/streaming/{name}', 'StreamingController@index');
    Route::get('/streaming/albums/{name}', 'StreamingController@getContent');

?>
