@extends('layouts.distribution_test')

@section('title', 'Spotify')

@section('icon')
    <link rel="icon" href="{{asset('images/spotify.png')}}">
@endsection


@section('service_title')
    <img src="{{asset('images/spotify.png')}}" alt="Spotify">
    <p>Spotify</p>
@endsection