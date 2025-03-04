<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContentInteractionController extends Controller
{
    // 📌 Toggle Favorite
    public function toggleFavorite(Request $request)
    {
        $request->validate(['session_id' => 'required', 'islamic_content_id' => 'required|exists:islamic_contents,id']);
        $sessionId = $request->session_id;

        $existing = DB::table('favorites')
            ->where('session_id', $sessionId)
            ->where('islamic_content_id', $request->islamic_content_id)
            ->first();

        if ($existing) {
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

    // 📌 Get Favorites with Content Details
    public function getFavorites(Request $request)
    {
        $sessionId = $request->session_id;

        $favorites = DB::table('favorites')
            ->join('islamic_contents', 'favorites.islamic_content_id', '=', 'islamic_contents.id')
            ->where('favorites.session_id', $sessionId)
            ->select('islamic_contents.id', 'islamic_contents.title_en', 'islamic_contents.title_bm', 'islamic_contents.slug')
            ->get();

        return response()->json($favorites);
    }

    // 📌 Save Reading History
    public function addToHistory(Request $request)
    {
        $request->validate(['islamic_content_id' => 'required|exists:islamic_contents,id']);
        $sessionId = $request->input('session_id');

        DB::table('history')->updateOrInsert(
            ['session_id' => $sessionId, 'islamic_content_id' => $request->islamic_content_id],
            ['viewed_at' => now()]
        );

        return response()->json(['message' => 'History updated']);
    }

    // 📌 Get Reading History
    public function getHistory(Request $request)
    {
        $request->validate(['session_id' => 'required']); // Ensure session_id is provided

        $sessionId = $request->input('session_id');

        $history = DB::table('history')
            ->join('islamic_contents', 'history.islamic_content_id', '=', 'islamic_contents.id')
            ->where('history.session_id', $sessionId)
            ->select('history.id', 'islamic_contents.title_en', 'islamic_contents.title_bm', 'islamic_contents.slug', 'history.viewed_at', 'islamic_contents.id as islamic_content_id')
            ->orderBy('history.viewed_at', 'desc')
            ->get();

        return response()->json($history);
    }
}
