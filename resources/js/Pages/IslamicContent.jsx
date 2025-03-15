import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "../Layouts/Layout";
import axios from "axios";

export default function IslamicContent() {
    const { props } = usePage(); // Get data from Inertia
    const { content } = props; // Destructure props

    // State Variables
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
    const [favorites, setFavorites] = useState([]);
    const [readHistory, setReadHistory] = useState([]);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const [sessionId, setSessionId] = useState(localStorage.getItem("session_id") || "");

    // ✅ Fetch session ID if not available
    useEffect(() => {
        if (!sessionId) {
            axios.get("/api/session-id").then((response) => {
                const newSessionId = response.data.session_id;
                localStorage.setItem("session_id", newSessionId);
                setSessionId(newSessionId);
            });
        }
    }, [sessionId]);

    // ✅ Listen for language & dark mode changes
    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "en");
            setDarkMode(localStorage.getItem("darkMode") === "true");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // ✅ Fetch favorites & read history & save history when visiting the page
    useEffect(() => {
        if (sessionId && content) {
            // Fetch favorites
            axios.post("/api/favorites", { session_id: sessionId }).then((response) =>
                setFavorites(response.data.map((fav) => fav.id))
            );

            // Fetch history
            axios.post("/api/history/list", { session_id: sessionId }).then((response) =>
                setReadHistory(response.data)
            ).catch((error) => console.error("Error fetching history:", error));

            // ✅ Save to history automatically
            axios.post("/api/history", { islamic_content_id: content.id, session_id: sessionId })
                .catch((error) => console.error("Error saving history:", error));
        }
    }, [sessionId, content]);

    // ✅ Toggle Favorite Function
    const toggleFavorite = (id) => {
        axios
            .post("/api/favorite", { islamic_content_id: id, session_id: sessionId })
            .then(() => {
                setFavorites((prevFavorites) =>
                    prevFavorites.includes(id)
                        ? prevFavorites.filter((favId) => favId !== id) // Remove from state if exists
                        : [...prevFavorites, id] // Add to state if not exists
                );
            })
            .catch((error) => console.error("Error toggling favorite:", error));
    };

    // ✅ If Content Not Found
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
            {/* Fixed Navbar BELOW Layout Navbar */}
            <nav className={`fixed top-16 left-0 w-full p-4 shadow-md z-40 flex justify-between items-center
                ${darkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"}`}>

                {/* Back to Topics Button (Left Side) */}
                <Link href={`/topic/${content.id}`}>
                    <button className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded">
                        ← Back to Topics
                    </button>
                </Link>

                {/* Favorite & Read History (Right Side) */}
                <div className="flex items-center gap-3">
                    {/* Favorite Button */}
                    <button
                        onClick={() => toggleFavorite(content.id)}
                        className={`p-2 rounded ${favorites.includes(content.id) ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"}`}
                    >
                        {favorites.includes(content.id) ? "★ Favorited" : "☆ Favorite"}
                    </button>

                    {/* Read History Badge ✅ */}
                    {/* {readHistory.some((item) => item.islamic_content_id === content.id) && (
                        <span className="text-sm text-gray-500 dark:text-gray-300">✔ Read</span>
                    )} */}
                </div>
            </nav>

            {/* ✅ Show Banner If Available */}
            {content.banner ? (
                <div className="relative w-full h-64">
                    {/* ✅ Banner Image */}
                    <img
                        src={content.banner.startsWith("storage") ? `/storage/${content.banner.replace("storage/", "")}` : content.banner}
                        alt="Banner"
                        className="w-full h-full object-cover rounded-lg"
                    />

                    {/* ✅ Dark Overlay */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    {/* ✅ Title at Bottom Center of Banner */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            {language === "bm" ? content.title_bm : content.title_en}
                        </h1>
                    </div>
                </div>
            ) : (
                // ✅ Show Title Normally If No Banner
                <div className={`pt-28 p-4 ${darkMode ? "text-white" : "text-black"}`}>
                    <h1 className="text-2xl font-bold mb-4">
                        {language === "bm" ? content.title_bm : content.title_en}
                    </h1>
                </div>
            )}

            {/* ✅ Content Section (Less Margin If Banner Exists) */}
            <div className={`w-full p-6 ${content.banner ? "mt-4" : "pt-4"} ${darkMode ? "text-white" : "text-black"} mb-20`}>
                <div className="text-lg mb-4 max-w-7xl"
                    dangerouslySetInnerHTML={{ __html: language === "bm" ? content.content_bm : content.content_en }}>
                </div>
            </div>
        </Layout>
    );
}
