import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layouts/Layout";

export default function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get("/api/history").then((response) => {
            setHistory(response.data);
        });
    }, []);

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Reading History</h1>
                {history.length === 0 ? (
                    <p className="text-gray-500">No history found.</p>
                ) : (
                    history.map((entry) => (
                        <div key={entry.id} className="p-4 border rounded-lg shadow-md mb-2 bg-white dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-green-600 dark:text-green-400">
                                Islamic Content ID: {entry.islamic_content_id}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Last Read: {new Date(entry.viewed_at).toLocaleString()}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
