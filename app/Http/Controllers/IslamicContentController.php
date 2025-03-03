<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IslamicContent;
use Inertia\Inertia;

class IslamicContentController extends Controller
{
    /**
     * Get all Islamic content topics (API).
     */
    public function index()
    {
        $contents = IslamicContent::select('id', 'topic_bm', 'topic_en')
            ->distinct()
            ->groupBy('topic_bm', 'topic_en', 'id') // Ensure unique topics
            ->get();

        return response()->json($contents);
    }

    /**
     * Fetch content by topic slug.
     */
    public function listByTopic($id)
    {
        $topic = IslamicContent::where('id', $id)->firstOrFail();
        $contents = IslamicContent::where('topic_bm', $topic->topic_bm)
            ->orWhere('topic_en', $topic->topic_en)
            ->get();

        return Inertia::render('ListContentTopic', [
            'topic' => $topic,
            'contents' => $contents
        ]);
    }

    /**
     * Fetch a single content by slug.
     */
    public function show($slug)
    {
        $content = IslamicContent::where('slug', $slug)->firstOrFail();

        return Inertia::render('IslamicContent', [
            'content' => $content
        ]);
    }
}
