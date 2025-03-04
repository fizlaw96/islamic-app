import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import Layout from "@/Layouts/Layout";

export default function Show() {
    const { content } = usePage().props;

    // ✅ States for handling preview & upload
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [previewBanner, setPreviewBanner] = useState(content.banner ? `/${content.banner}` : null);
    const [previewMedia, setPreviewMedia] = useState(content.media ? `/${content.media}` : null);
    const [uploading, setUploading] = useState(false);

    // ✅ Handle Banner Selection
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedBanner(file);
        setPreviewBanner(URL.createObjectURL(file)); // Show preview
    };

    // ✅ Handle Media Selection
    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedMedia(file);
        setPreviewMedia(URL.createObjectURL(file)); // Show preview
    };

    // ✅ Handle File Upload
    const handleUpload = async () => {
        if (!selectedBanner && !selectedMedia) return;

        setUploading(true);
        const formData = new FormData();
        if (selectedBanner) formData.append("banner", selectedBanner);
        if (selectedMedia) formData.append("media", selectedMedia);

        try {
            const response = await axios.post(`/api/islamic-contents/${content.id}/update-media`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert(response.data.message || "Media updated successfully!");
            window.location.reload(); // ✅ Refresh to update new media
        } catch (error) {
            console.error("Error uploading files:", error);
            alert(error.response?.data?.message || "Failed to upload files.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Layout>
            <div className="mt-10 mb-16 p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                {/* ✅ File Upload Form */}
                <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* ✅ Banner Upload */}
                        <div>
                            <label className="block font-semibold mb-1">Update Banner</label>
                            <input type="file" accept="image/*" onChange={handleBannerChange} className="w-full p-3 border rounded" />
                        </div>

                        {/* ✅ Media Upload */}
                        <div>
                            <label className="block font-semibold mb-1">Update Media</label>
                            <input type="file" accept="image/*,video/*" onChange={handleMediaChange} className="w-full p-3 border rounded" />
                        </div>
                    </div>

                    {/* ✅ Upload Button */}
                    {selectedBanner || selectedMedia ? (
                        <button
                            onClick={handleUpload}
                            className="mt-4 bg-green-600 text-white px-6 py-3 rounded font-bold hover:bg-green-700 transition"
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Update Media"}
                        </button>
                    ) : null}
                </div>

                {/* ✅ Display Banner */}
                {previewBanner ? (
                    <img src={previewBanner} alt="Banner" className="w-full h-48 object-cover rounded mb-4" />
                ) : (
                    <p className="text-gray-500 italic mb-4">No banner uploaded</p>
                )}

                {/* ✅ Display Media */}
                {previewMedia ? (
                    previewMedia.match(/\.(mp4|mov|avi)$/) ? (
                        <video controls className="w-full h-48 rounded mb-4">
                            <source src={previewMedia} type="video/mp4" />
                        </video>
                    ) : (
                        <img src={previewMedia} alt="Media" className="w-full h-48 object-cover rounded mb-4" />
                    )
                ) : (
                    <p className="text-gray-500 italic mb-4">No media uploaded</p>
                )}

                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {content.topic_en} | {content.topic_bm}
                </h1>

                <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Category (BM):</strong> {content.category_bm}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Category (EN):</strong> {content.category_en}
                    </p>
                </div>

                <hr className="my-4 border-gray-300 dark:border-gray-600" />

                <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Title (BM):</strong> {content.title_bm}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Title (EN):</strong> {content.title_en}
                    </p>
                </div>

                {/* Content Sections */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Content (BM)</h2>
                    <p className="text-gray-700 dark:text-gray-300">{content.content_bm}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Content (EN)</h2>
                    <p className="text-gray-700 dark:text-gray-300">{content.content_en}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                    <Link
                        href={route("admin.islamic-contents.edit", content.id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                        ✏️ Edit
                    </Link>

                    <Link
                        href={route("admin.islamic-contents.index")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        ← Back to List
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
