<?php

use App\Http\Controllers\ConversationController;
use Illuminate\Support\Facades\Route;

Route::apiResource('api', ConversationController::class)->except(['update', 'destroy']);
