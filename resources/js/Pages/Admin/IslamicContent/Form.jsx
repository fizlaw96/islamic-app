import React from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const topics = [
    { bm: "Asas Islam dan Gaya Hidup", en: "Islamic Fundamentals and Lifestyle" },
    { bm: "Kaifiat Solat dan Doa", en: "Prayer and Supplication Guide" },
    { bm: "Sirah Nabi dan Sahabat", en: "Prophet’s Biography and Companions" },
    { bm: "Sebalik Nama Surah", en: "Meanings Behind Surah Names" },
    { bm: "FAQ Islam", en: "Islamic FAQs" },
    { bm: "Perasaan Anda Sekarang", en: "Your Feeling Now" },
];

export default function Form({ data, setData, handleSubmit, errors, processing, categories, isEdit = false }) {
    // ✅ Format categories for React-Select
    const categoryOptions = categories
        ? categories.map(cat => ({
            value: cat.category_bm,
            label: `${cat.category_bm} | ${cat.category_en}`
        }))
        : [];

    // ✅ Handle Category Selection
    const handleCategoryChange = (selectedOption) => {
        if (selectedOption) {
            const [bm, en] = selectedOption.label.split(" | ");
            setData("category_bm", bm);
            setData("category_en", en);
        }
    };

    // ✅ Handle New Category Creation
    const handleCreateCategory = async (inputValue) => {
        setData("category_bm", inputValue);

        // Auto-translate category_bm to category_en
        try {
            const response = await axios.get(`https://api.mymemory.translated.net/get?q=${inputValue}&langpair=ms|en`);
            const translatedText = response.data.responseData.translatedText;
            setData("category_en", translatedText);
        } catch (error) {
            console.error("Translation error:", error);
            setData("category_en", ""); // Let user manually input category_en
        }
    };

    // ✅ Clear Category Inputs
    const clearCategory = () => {
        setData("category_bm", "");
        setData("category_en", "");
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
                            setData("topic_bm", selectedTopic.bm);
                            setData("topic_en", selectedTopic.en);
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

            {/* ✅ Two-column layout for Category with Search & Add */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
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
                    <button
                        type="button"
                        onClick={clearCategory}
                        className="absolute right-3 top-10 text-red-500 hover:text-red-700"
                    >
                        ❌
                    </button>
                    {errors.category_bm && <p className="text-red-500">{errors.category_bm}</p>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Category (EN)</label>
                    <input
                        type="text"
                        value={data.category_en}
                        onChange={(e) => setData("category_en", e.target.value)}
                        className="w-full p-3 border rounded"
                        placeholder="Enter category in English"
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

            {/* ✅ Two-column layout for Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* ✅ Submit Button */}
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 transition">
                {processing ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Content" : "Create Content"}
            </button>
        </form>
    );
}
