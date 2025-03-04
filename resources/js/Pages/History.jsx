import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import Layout from "../Layouts/Layout";

export default function History() {
    const [history, setHistory] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
    const sessionId = localStorage.getItem("session_id"); // Ensure session_id is fetched like in Favourite.jsx

    useEffect(() => {
        if (sessionId) {
            axios.post("/api/history/list", { session_id: sessionId }) // 🔹 Use POST like Favourite.jsx
                .then((response) => {
                    setHistory(response.data);
                })
                .catch((error) => console.error("Error fetching history:", error));
        }
    }, [sessionId]);

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    {language === "bm" ? "Sejarah Bacaan" : "Reading History"}
                </h1>
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
