<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IslamicContent;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            'title_bm' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'category_bm' => 'required|string|max:255',
            'category_en' => 'required|string|max:255',
            'content_bm' => 'required|string',
            'content_en' => 'required|string',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'media' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:10000',
        ]);

        $content = new IslamicContent($request->all());
        $content->slug = Str::slug($request->title_en); // Auto-generate slug

        // ✅ Handle Banner Upload
        if ($request->hasFile('banner')) {
            $bannerPath = $request->file('banner')->store("public/{$request->topic_bm}/{$content->slug}-banner");
            $content->banner = str_replace('public/', 'storage/', $bannerPath);
        }

        // ✅ Handle Media Upload
        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store("public/{$request->topic_bm}/{$content->slug}-media");
            $content->media = str_replace('public/', 'storage/', $mediaPath);
        }

        $content->save();

        return redirect()->route('admin.islamic-contents.index')->with('success', 'Islamic Content created successfully!');
    }

    // ✅ Show edit form
    public function edit($id)
    {
        $content = IslamicContent::findOrFail($id);
        return Inertia::render('Admin/IslamicContent/Edit', ['content' => $content]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'topic_bm' => 'required|string|max:255',
            'topic_en' => 'required|string|max:255',
            'title_bm' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'category_bm' => 'required|string|max:255',
            'category_en' => 'required|string|max:255',
            'content_bm' => 'required|string',
            'content_en' => 'required|string',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'media' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:10000',
        ]);

        $content = IslamicContent::findOrFail($id);
        $oldSlug = $content->slug;

        // ✅ Update fields safely without overwriting existing values with null
        $content->update([
            'topic_bm' => $request->topic_bm,
            'topic_en' => $request->topic_en,
            'title_bm' => $request->title_bm,
            'title_en' => $request->title_en,
            'category_bm' => $request->category_bm,
            'category_en' => $request->category_en,
            'content_bm' => $request->content_bm,
            'content_en' => $request->content_en,
        ]);

        // ✅ Update slug if title_en changes
        if ($oldSlug !== Str::slug($request->title_en)) {
            $newSlug = Str::slug($request->title_en);
            Storage::move("public/{$request->topic_bm}/{$oldSlug}-banner", "public/{$request->topic_bm}/{$newSlug}-banner");
            Storage::move("public/{$request->topic_bm}/{$oldSlug}-media", "public/{$request->topic_bm}/{$newSlug}-media");

            $content->slug = $newSlug;
            $content->save();
        }

        // ✅ Handle Banner Update
        if ($request->hasFile('banner')) {
            Storage::delete($content->banner);
            $bannerPath = $request->file('banner')->store("public/{$request->topic_bm}/{$content->slug}-banner");
            $content->banner = str_replace('public/', 'storage/', $bannerPath);
        }

        // ✅ Handle Media Update
        if ($request->hasFile('media')) {
            Storage::delete($content->media);
            $mediaPath = $request->file('media')->store("public/{$request->topic_bm}/{$content->slug}-media");
            $content->media = str_replace('public/', 'storage/', $mediaPath);
        }

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
        $content = IslamicContent::findOrFail($id);

        // ✅ Delete Files (Banner & Media)
        if ($content->banner) {
            Storage::delete(str_replace('storage/', 'public/', $content->banner));
        }
        if ($content->media) {
            Storage::delete(str_replace('storage/', 'public/', $content->media));
        }

        $content->delete();
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
