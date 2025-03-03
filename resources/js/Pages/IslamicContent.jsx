import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "../Layouts/Layout";
import axios from "axios";

export default function IslamicContent() {
    const { props } = usePage(); // Get data from Inertia
    const { content } = props; // Destructure props
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
    const [favorites, setFavorites] = useState([]);
    const [readHistory, setReadHistory] = useState([]);

    useEffect(() => {
        // Listen for language changes
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "en");
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        // Fetch favorites & read history
        axios.get("/api/favorites").then((response) => setFavorites(response.data));
        axios.get("/api/history").then((response) => setReadHistory(response.data));
    }, []);

    const toggleFavorite = (id) => {
        axios.post("/api/favorite", { islamic_content_id: id }).then(() => {
            setFavorites((prevFavorites) =>
                prevFavorites.includes(id)
                    ? prevFavorites.filter((favId) => favId !== id)
                    : [...prevFavorites, id]
            );
        });
    };

    const saveHistory = (id) => {
        axios.post("/api/history", { islamic_content_id: id });
    };

    if (!content) {
        return (
            <Layout>
                <div className="p-4">
                    <h1 className="text-xl font-bold text-red-500">Error: Content Not Found</h1>
                    <Link href="/islamic-topics">
                        <button className="mt-4 p-2 bg-gray-600 text-white rounded">
                            ← Back to Topics
                        </button>
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-4">
                {/* Back to Topics Button */}
                <div className="mb-4">
                    <Link href={`/topic/${content.id}`}>
                        <button className="p-2 bg-gray-600 text-white rounded">← Back to Topics</button>
                    </Link>
                </div>

                {/* Content Title & Details */}
                <h1 className="text-2xl font-bold mb-4">
                    {language === "bm" ? content.title_bm : content.title_en}
                </h1>
                <p className="text-lg mb-4">
                    {language === "bm" ? content.content_bm : content.content_en}
                </p>

                {/* Favorite & Read History */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => toggleFavorite(content.id)}
                        className={`p-2 rounded ${
                            favorites.includes(content.id) ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                        }`}
                    >
                        {favorites.includes(content.id) ? "★ Favorited" : "☆ Favorite"}
                    </button>

                    {readHistory.includes(content.id) && (
                        <span className="text-sm text-gray-500">✔ Read</span>
                    )}
                </div>
            </div>
        </Layout>
    );
}
