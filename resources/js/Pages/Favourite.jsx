import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layouts/Layout";

export default function Favourite() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get("/api/favorites").then((response) => {
            setFavorites(response.data);
        });
    }, []);

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Favourite Content</h1>
                {favorites.length === 0 ? (
                    <p className="text-gray-500">No favourites yet.</p>
                ) : (
                    favorites.map((contentId) => (
                        <div key={contentId} className="p-4 border rounded-lg shadow-md mb-2 bg-white dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                                Islamic Content ID: {contentId}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                This content is marked as your favourite.
                            </p>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
