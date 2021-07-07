@extends('layouts.distribution_test')

@section('title', 'Amazon')

@section('icon')
    <link rel="icon" href="{{asset('images/amazon_music.png')}}">
@endsection


@section('service_title')
    <img src="{{asset('images/amazon_music.png')}}" alt="Amazon">
    <p>Amazon</p>
@endsection