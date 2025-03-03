import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layouts/Layout";

export default function IslamicContent({ content }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get("/api/favorites").then((response) => {
            setFavorites(response.data);
        });
    }, []);

    const toggleFavorite = () => {
        axios.post("/api/favorite", { islamic_content_id: content.id }).then(() => {
            setFavorites((prevFavorites) =>
                prevFavorites.includes(content.id)
                    ? prevFavorites.filter((id) => id !== content.id)
                    : [...prevFavorites, content.id]
            );
        });
    };

    useEffect(() => {
        axios.post("/api/history", { islamic_content_id: content.id });
    }, [content.id]);

    return (
        <Layout>
            <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                <h2 className="text-xl font-bold text-green-700 dark:text-green-300">{content.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{content.content}</p>

                <button
                    onClick={toggleFavorite}
                    className={`mt-2 px-4 py-2 rounded-lg ${
                        favorites.includes(content.id)
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                    }`}
                >
                    {favorites.includes(content.id) ? "★ Unfavorite" : "☆ Favorite"}
                </button>
            </div>
        </Layout>
    );
}
