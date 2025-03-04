import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import Layout from "../Layouts/Layout";

export default function Favourite() {
    const [favorites, setFavorites] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
    const sessionId = localStorage.getItem("session_id"); // Get stored session ID

    useEffect(() => {
        axios.post("/api/favorites", { session_id: sessionId }) // 🔹 Use POST
            .then((response) => {
                setFavorites(response.data);
            })
            .catch((error) => console.error("Error fetching favorites:", error));
    }, [sessionId]);

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    {language === "bm" ? "Kandungan Kegemaran" : "Favourite Content"}
                </h1>
                {favorites.length === 0 ? (
                    <p className="text-gray-500">
                        {language === "bm" ? "Tiada kandungan kegemaran." : "No favourites yet."}
                    </p>
                ) : (
                    favorites.map((content) => (
                        <div key={content.id} className="p-4 border rounded-lg shadow-md mb-2 bg-white dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                                {language === "bm" ? content.title_bm : content.title_en}
                            </h2>
                            <Link href={`/islamic-content/${content.slug}`} className="text-blue-500 hover:underline">
                                {language === "bm" ? "Baca Lebih Lanjut →" : "Read More →"}
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
