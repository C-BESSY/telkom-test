<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function responseJson(mixed $data, ?string $message = null)
    {
        return response()->json([
            'message' => $message,
            'data' => $data
        ]);
    }
}
