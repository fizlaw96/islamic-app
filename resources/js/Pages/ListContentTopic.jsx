import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import Layout from "../Layouts/Layout"; // Import Layout Component

export default function ListContentTopic({ topic, contents }) {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "en");
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    {language === "bm" ? topic.topic_bm : topic.topic_en}
                </h1>

                <div className="grid gap-4">
                    {contents.length > 0 ? (
                        contents.map((content) => (
                            <Link key={content.slug} href={route("islamic-content.show", { slug: content.slug })}>
                                <button className="p-4 bg-green-500 text-white rounded-lg shadow-md w-full">
                                    {language === "bm" ? content.title_bm : content.title_en}
                                </button>
                            </Link>
                        ))
                    ) : (
                        <p>No content available for this topic.</p>
                    )}
                </div>

                {/* Back button to Topic List */}
                <Link href="/">
                    <button className="mt-4 p-2 bg-gray-600 text-white rounded">Back to Topics</button>
                </Link>
            </div>
        </Layout>
    );
}
