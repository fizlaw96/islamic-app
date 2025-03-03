<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContentInteractionController extends Controller
{
    // 📌 Toggle Favorite
    public function toggleFavorite(Request $request)
    {
        $request->validate(['islamic_content_id' => 'required|exists:islamic_contents,id']);
        $sessionId = session()->getId();

        // Check if content is already favorited
        $favorite = DB::table('favorites')
            ->where('session_id', $sessionId)
            ->where('islamic_content_id', $request->islamic_content_id)
            ->first();

        if ($favorite) {
            DB::table('favorites')
                ->where('session_id', $sessionId)
                ->where('islamic_content_id', $request->islamic_content_id)
                ->delete();

            return response()->json(['message' => 'Removed from favorites']);
        } else {
            DB::table('favorites')->insert([
                'session_id' => $sessionId,
                'islamic_content_id' => $request->islamic_content_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json(['message' => 'Added to favorites']);
        }
    }

    // 📌 Save Reading History
    public function addToHistory(Request $request)
    {
        $request->validate(['islamic_content_id' => 'required|exists:islamic_contents,id']);
        $sessionId = session()->getId();

        DB::table('history')->updateOrInsert(
            ['session_id' => $sessionId, 'islamic_content_id' => $request->islamic_content_id],
            ['viewed_at' => now()]
        );

        return response()->json(['message' => 'History updated']);
    }

    // 📌 Get Favorites
    public function getFavorites()
    {
        $sessionId = session()->getId();
        $favorites = DB::table('favorites')->where('session_id', $sessionId)->pluck('islamic_content_id');

        return response()->json($favorites);
    }

    // 📌 Get Reading History
    public function getHistory()
    {
        $sessionId = session()->getId();
        $history = DB::table('history')->where('session_id', $sessionId)->orderBy('viewed_at', 'desc')->get();

        return response()->json($history);
    }
}
