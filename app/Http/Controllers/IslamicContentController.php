<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IslamicContent;
use Inertia\Inertia;

class IslamicContentController extends Controller
{
    // ✅ Display all content in Admin Panel
    public function index()
    {
        $contents = IslamicContent::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/IslamicContent/Index', ['contents' => $contents]);
    }

    // ✅ Show create form
    public function create()
    {
        return Inertia::render('Admin/IslamicContent/Create');
    }

    // ✅ Store new Islamic content
    public function store(Request $request)
    {
        $request->validate([
            'topic_bm' => 'required|string|max:255',
            'topic_en' => 'required|string|max:255',
            'category_bm' => 'required|string|max:255',
            'category_en' => 'required|string|max:255',
            'content_bm' => 'required|string',
            'content_en' => 'required|string',
            'slug' => 'required|unique:islamic_contents,slug',
        ]);

        IslamicContent::create($request->all());

        return redirect()->route('admin.islamic-contents.index')->with('success', 'Islamic Content created successfully!');
    }

    // ✅ Show edit form
    public function edit($id)
    {
        $content = IslamicContent::findOrFail($id);
        return Inertia::render('Admin/IslamicContent/Edit', ['content' => $content]);
    }

    // ✅ Update Islamic content
    public function update(Request $request, $id)
    {
        $request->validate([
            'topic_bm' => 'required|string|max:255',
            'topic_en' => 'required|string|max:255',
            'category_bm' => 'required|string|max:255',
            'category_en' => 'required|string|max:255',
            'content_bm' => 'required|string',
            'content_en' => 'required|string',
            'slug' => 'required|unique:islamic_contents,slug,' . $id,
        ]);

        $content = IslamicContent::findOrFail($id);
        $content->update($request->all());

        return redirect()->route('admin.islamic-contents.index')->with('success', 'Islamic Content updated successfully!');
    }

    // ✅ Show a single content
    public function show($id)
    {
        $content = IslamicContent::findOrFail($id);
        return Inertia::render('Admin/IslamicContent/Show', ['content' => $content]);
    }

    // ✅ Delete content
    public function destroy($id)
    {
        IslamicContent::findOrFail($id)->delete();
        return redirect()->route('admin.islamic-contents.index')->with('success', 'Islamic Content deleted successfully!');
    }

    //<--                              User Interface                                           -->//
    /**
     * Get all Islamic content topics (API).
     */
    public function indexUser()
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
            ->orderBy('category_en') // Sort contents by category_en for consistency
            ->get();

        return Inertia::render('ListContentTopic', [
            'topic' => $topic,
            'contents' => $contents
        ]);
    }

    /**
     * Fetch a single content by slug.
     */
    public function showUser($slug)
    {
        $content = IslamicContent::where('slug', $slug)->firstOrFail();

        return Inertia::render('IslamicContent', [
            'content' => $content
        ]);
    }
}
