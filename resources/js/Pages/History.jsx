import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import Layout from "../Layouts/Layout";

export default function History() {
    const [history, setHistory] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const sessionId = localStorage.getItem("session_id"); // Ensure session_id is fetched

    useEffect(() => {
        if (sessionId) {
            axios.post("/api/history/list", { session_id: sessionId }) // 🔹 Use POST like Favourite.jsx
                .then((response) => {
                    setHistory(response.data);
                })
                .catch((error) => console.error("Error fetching history:", error));
        }
    }, [sessionId]);

    // ✅ Clear History Function
    const clearHistory = () => {
        axios.post("/api/history/clear", { session_id: sessionId })
            .then(() => {
                setHistory([]); // Clear frontend history state
            })
            .catch((error) => console.error("Error clearing history:", error));
    };

    return (
        <Layout>
            <div className="p-4">
                {/* Title & Clear Button (Same Line) */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">
                        {language === "bm" ? "Sejarah Bacaan" : "Reading History"}
                    </h1>
                    {history.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="p-2 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                        >
                            {language === "bm" ? "Padam Sejarah" : "Clear History"}
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                    <p className="text-gray-500">
                        {language === "bm" ? "Tiada sejarah bacaan." : "No history found."}
                    </p>
                ) : (
                    history.map((entry) => (
                        <div key={entry.id} className="p-4 border rounded-lg shadow-md mb-2 bg-white dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-green-600 dark:text-green-400">
                                {language === "bm" ? entry.title_bm : entry.title_en}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                {language === "bm" ? "Terakhir Dibaca:" : "Last Read:"}{" "}
                                {new Date(entry.viewed_at).toLocaleString()}
                            </p>
                            <Link href={`/islamic-content/${entry.slug}`} className="text-blue-500 hover:underline">
                                {language === "bm" ? "Teruskan Bacaan →" : "Continue Reading →"}
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
