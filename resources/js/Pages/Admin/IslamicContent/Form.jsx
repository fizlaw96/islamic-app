import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite";

const topics = [
    { bm: "Asas Islam dan Gaya Hidup", en: "Islamic Fundamentals and Lifestyle" },
    { bm: "Kaifiat Solat dan Doa", en: "Prayer and Supplication Guide" },
    { bm: "Sirah Nabi dan Sahabat", en: "Prophet’s Biography and Companions" },
    { bm: "Sebalik Nama Surah", en: "Meanings Behind Surah Names" },
    { bm: "FAQ Islam", en: "Islamic FAQs" },
    { bm: "Perasaan Anda Sekarang", en: "Your Feeling Now" },
];

export default function Form({ data, setData, handleSubmit, errors, processing, categories, isEdit = false }) {
    const [loadingTranslate, setLoadingTranslate] = useState(false);

    // ✅ Format categories for React-Select
    const categoryOptions = categories
        ? categories.map(cat => ({
            value: cat.category_bm,
            label: `${cat.category_bm} | ${cat.category_en}`
        }))
        : [];

    useEffect(() => {
        // ✅ Initialize Summernote for content_bm
        $("#content_bm").summernote({
            height: 200,
            callbacks: {
                onChange: function(contents) {
                    setData("content_bm", contents);
                }
            }
        }).summernote("code", data.content_bm);

        // ✅ Initialize Summernote for content_en
        $("#content_en").summernote({
            height: 200,
            callbacks: {
                onChange: function(contents) {
                    setData("content_en", contents);
                }
            }
        }).summernote("code", data.content_en);

    }, []); // Runs only once on component mount

    // ✅ Handle Category Selection
    const handleCategoryChange = (selectedOption) => {
        if (selectedOption) {
            const [bm, en] = selectedOption.label.split(" | ");
            setData("category_bm", bm);
            setData("category_en", en);
        }
    };

    // ✅ Handle New Category Creation with Auto-Translation
    const handleCreateCategory = async (inputValue) => {
        setData("category_bm", inputValue);
        setData("category_en", ""); // Clear previous translation
        setLoadingTranslate(true);

        try {
            const response = await axios.get(`https://api.mymemory.translated.net/get?q=${inputValue}&langpair=ms|en`);
            const translatedText = response.data.responseData.translatedText;
            setData("category_en", translatedText);
        } catch (error) {
            console.error("Translation error:", error);
            setData("category_en", ""); // Allow manual input if translation fails
        } finally {
            setLoadingTranslate(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* ✅ Dropdown for Topic (BM and EN) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold mb-1">Topic (BM)</label>
                    <select
                        value={data.topic_bm}
                        onChange={(e) => {
                            const selectedTopic = topics.find(topic => topic.bm === e.target.value);
                            setData("topic_bm", selectedTopic?.bm || "");
                            setData("topic_en", selectedTopic?.en || "");
                        }}
                        className="w-full p-3 border rounded"
                    >
                        <option value="">Select a Topic</option>
                        {topics.map((topic, index) => (
                            <option key={index} value={topic.bm}>
                                {topic.bm}
                            </option>
                        ))}
                    </select>
                    {errors.topic_bm && <p className="text-red-500">{errors.topic_bm}</p>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Topic (EN)</label>
                    <input
                        type="text"
                        value={data.topic_en}
                        readOnly
                        className="w-full p-3 border rounded bg-gray-100"
                    />
                    {errors.topic_en && <p className="text-red-500">{errors.topic_en}</p>}
                </div>
            </div>

            {/* ✅ Two-column layout for Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold mb-1">Category (BM)</label>
                    <CreatableSelect
                        isClearable
                        options={categoryOptions}
                        onChange={handleCategoryChange}
                        onCreateOption={handleCreateCategory}
                        value={
                            data.category_bm
                                ? { value: data.category_bm, label: `${data.category_bm} | ${data.category_en}` }
                                : null
                        }
                        className="w-full"
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
                        placeholder={loadingTranslate ? "Translating..." : "Enter category in English"}
                        disabled={loadingTranslate}
                    />
                    {errors.category_en && <p className="text-red-500">{errors.category_en}</p>}
                </div>
            </div>

            {/* ✅ Two-column layout for Title and Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold mb-1">Title (BM)</label>
                    <input type="text" value={data.title_bm} onChange={(e) => setData("title_bm", e.target.value)} className="w-full p-3 border rounded" />
                    {errors.title_bm && <p className="text-red-500">{errors.title_bm}</p>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Title (EN)</label>
                    <input
                        type="text"
                        value={data.title_en}
                        onChange={(e) => {
                            setData("title_en", e.target.value);
                            setData("slug", e.target.value.toLowerCase().replace(/\s+/g, "-")); // ✅ Auto-update slug
                        }}
                        className="w-full p-3 border rounded"
                    />
                    {errors.title_en && <p className="text-red-500">{errors.title_en}</p>}
                </div>
            </div>

            {/* ✅ Two-column layout for Content with Summernote */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold mb-1">Content (BM)</label>
                    <textarea
                        id="content_bm"
                        defaultValue={data.content_bm}
                        className="w-full p-3 border rounded hidden"
                    ></textarea>
                    {errors.content_bm && <p className="text-red-500">{errors.content_bm}</p>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Content (EN)</label>
                    <textarea
                        id="content_en"
                        defaultValue={data.content_en}
                        className="w-full p-3 border rounded hidden"
                    ></textarea>
                    {errors.content_en && <p className="text-red-500">{errors.content_en}</p>}
                </div>
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
