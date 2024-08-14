<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index()
    {
        return $this->responseJson(
            data: Conversation::all(),
            message: 'Conversations retrieved successfully'
        );
    }

    public function store(Request $request)
    {
        $conversation = Conversation::findOrCreate($request->input('conversation_id'));
        $userMessage = $request->input('message');

        if (strtolower($userMessage) === 'hello') {
            $botReply = 'Hi! How can I help you?';
        } else {
            $botReply = 'Tidak bisa respon, api GPT Bayar!';
        }

        $conversation->messages()->createMany([
            ['content' => $userMessage, 'is_user_message' => true],
            ['content' => $botReply, 'is_user_message' => false],
        ]);

        return $this->responseJson(
            data: ['reply' => $botReply, 'conversation_id' => $conversation->id],
        );
    }

    public function show(string $id)
    {
        return $this->responseJson(
            data: Conversation::with('messages')->find($id),
            message: 'Conversation retrieved successfully'
        );
    }
}
