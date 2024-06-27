<?php

use Ferdiunal\NovaMediaField\Http\Controllers\MediaFieldDestroyController;
use Ferdiunal\NovaMediaField\Http\Controllers\MediaFieldShowController;
use Ferdiunal\NovaMediaField\Http\Controllers\MediaFieldUpdateController;
use Ferdiunal\NovaMediaField\Http\Controllers\MediaLibraryController;
use Illuminate\Support\Facades\Route;

Route::get('/', MediaLibraryController::class);
Route::get('/{resource}/{resourceId}/media/{field}/{mediaId}', MediaFieldShowController::class);
Route::patch('/{resource}/{resourceId}/media/{field}/{mediaId}', MediaFieldUpdateController::class);
Route::delete('/{resource}/{resourceId}/field/{field}/{mediaId}', MediaFieldDestroyController::class);
