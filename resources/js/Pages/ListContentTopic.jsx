import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import Layout from "../Layouts/Layout"; // Import Layout Component

export default function ListContentTopic({ topic, contents }) {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
    const [fontSize, setFontSize] = useState(parseInt(localStorage.getItem("fontSize")) || 16);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

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

            {/* Content Section */}
            <div className={`pt-28 p-4 ${darkMode ? "text-white" : "text-black"}`} style={{ fontSize: `${fontSize}px` }}>
                <div className="grid gap-4">
                    {contents.length > 0 ? (
                        contents.map((content) => (
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
                        <p>No content available for this topic.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
