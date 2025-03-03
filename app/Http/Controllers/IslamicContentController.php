<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IslamicContent;

class IslamicContentController extends Controller
{
    /**
     * Get all Islamic content topics (API).
     */
    public function index()
    {
        $contents = IslamicContent::select('slug', 'topic_bm', 'topic_en')->get();
        return response()->json($contents);
    }

    /**
     * Get a single Islamic content by slug.
     */
    public function show($slug)
    {
        $content = IslamicContent::where('slug', $slug)->firstOrFail();
        return response()->json($content);
    }
}
