import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import Layout from "../Layouts/Layout"; // Import Layout Component

export default function ListContentTopic({ topic, contents }) {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
    const [fontSize, setFontSize] = useState(parseInt(localStorage.getItem("fontSize")) || 16);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const [searchTerm, setSearchTerm] = useState(""); // ✅ Search state

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "en");
            setFontSize(parseInt(localStorage.getItem("fontSize")) || 16);
            setDarkMode(localStorage.getItem("darkMode") === "true");
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // ✅ Filter content based on search term
    const filteredContents = contents.filter((content) =>
        (language === "bm" ? content.title_bm : content.title_en)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            {/* Fixed Navbar BELOW Layout Navbar */}
            <nav className={`fixed top-16 left-0 w-full p-4 shadow-md flex items-center z-40
                ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}>
                <Link href="/">
                    <button className={`p-2 rounded ${darkMode ? "bg-gray-500 text-white" : "bg-gray-400 text-black"}`}>
                        ← Home
                    </button>
                </Link>
                <h1 className="ml-4 text-lg font-bold">{language === "bm" ? topic.topic_bm : topic.topic_en}</h1>
            </nav>

            {/* Search Bar */}
            <div className="pt-28 px-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={language === "bm" ? "Cari kandungan..." : "Search content..."}
                    className={`w-full p-2 mb-4 rounded-lg border shadow-sm outline-none transition-all duration-200
                        ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                />
            </div>

            {/* Content Section */}
            <div className={`p-4 ${darkMode ? "text-white" : "text-black"}`} style={{ fontSize: `${fontSize}px` }}>
                <div className="grid gap-4">
                    {filteredContents.length > 0 ? (
                        filteredContents.map((content) => (
                            <Link key={content.slug} href={route("islamic-content.show", { slug: content.slug })}>
                                <button
                                    className={`p-4 rounded-lg shadow-md w-full transition-all duration-200
                                        ${darkMode ? "bg-green-500 text-white" : "bg-green-200 text-black hover:bg-green-300"}`}
                                >
                                    {language === "bm" ? content.title_bm : content.title_en}
                                </button>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            {language === "bm" ? "Tiada kandungan dijumpai." : "No content found."}
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
