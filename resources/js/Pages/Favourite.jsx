import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import Layout from "../Layouts/Layout";

export default function Favourite() {
    const [favorites, setFavorites] = useState([]);
    const sessionId = localStorage.getItem("session_id"); // Get stored session ID

    useEffect(() => {
        axios.post("/api/favorites", { session_id: sessionId }) // 🔹 Change to POST
            .then((response) => {
                setFavorites(response.data);
            })
            .catch((error) => console.error("Error fetching favorites:", error));
    }, []);

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Favourite Content</h1>
                {favorites.length === 0 ? (
                    <p className="text-gray-500">No favourites yet.</p>
                ) : (
                    favorites.map((content) => (
                        <div key={content.id} className="p-4 border rounded-lg shadow-md mb-2 bg-white dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                                {content.title_en}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {content.title_bm}
                            </p>
                            <Link href={`/islamic-content/${content.slug}`} className="text-blue-500 hover:underline">
                                Read More →
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
