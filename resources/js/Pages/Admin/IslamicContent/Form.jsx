import React from "react";

export default function Form({ data, setData, handleSubmit, errors, processing, isEdit = false }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-8"> {/* ✅ More spacing */}
            <div>
                <label className="block font-semibold mb-1">Topic (BM)</label>
                <input
                    type="text"
                    value={data.topic_bm}
                    onChange={(e) => setData("topic_bm", e.target.value)}
                    className="w-full p-3 border rounded"
                />
                {errors.topic_bm && <p className="text-red-500">{errors.topic_bm}</p>}
            </div>

            <div>
                <label className="block font-semibold mb-1">Topic (EN)</label>
                <input
                    type="text"
                    value={data.topic_en}
                    onChange={(e) => setData("topic_en", e.target.value)}
                    className="w-full p-3 border rounded"
                />
                {errors.topic_en && <p className="text-red-500">{errors.topic_en}</p>}
            </div>

            <div>
                <label className="block font-semibold mb-1">Category (BM)</label>
                <input
                    type="text"
                    value={data.category_bm}
                    onChange={(e) => setData("category_bm", e.target.value)}
                    className="w-full p-3 border rounded"
                />
                {errors.category_bm && <p className="text-red-500">{errors.category_bm}</p>}
            </div>

            <div>
                <label className="block font-semibold mb-1">Category (EN)</label>
                <input
                    type="text"
                    value={data.category_en}
                    onChange={(e) => setData("category_en", e.target.value)}
                    className="w-full p-3 border rounded"
                />
                {errors.category_en && <p className="text-red-500">{errors.category_en}</p>}
            </div>

            <div>
                <label className="block font-semibold mb-1">Content (BM)</label>
                <textarea
                    value={data.content_bm}
                    onChange={(e) => setData("content_bm", e.target.value)}
                    className="w-full p-3 border rounded"
                    rows="5"
                ></textarea>
                {errors.content_bm && <p className="text-red-500">{errors.content_bm}</p>}
            </div>

            <div>
                <label className="block font-semibold mb-1">Content (EN)</label>
                <textarea
                    value={data.content_en}
                    onChange={(e) => setData("content_en", e.target.value)}
                    className="w-full p-3 border rounded"
                    rows="5"
                ></textarea>
                {errors.content_en && <p className="text-red-500">{errors.content_en}</p>}
            </div>

            <div>
                <label className="block font-semibold mb-1">Slug</label>
                <input
                    type="text"
                    value={data.slug}
                    onChange={(e) => setData("slug", e.target.value)}
                    className="w-full p-3 border rounded"
                />
                {errors.slug && <p className="text-red-500">{errors.slug}</p>}
            </div>

            {/* ✅ Submit Button */}
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 transition"
                disabled={processing}
            >
                {processing ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Content" : "Create Content"}
            </button>
        </form>
    );
}
