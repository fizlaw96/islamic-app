import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import axios from "axios";

export default function TopicButtons() {
    const [topics, setTopics] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");

    useEffect(() => {
        axios.get("/api/islamic-contents")
            .then((response) => {
                // ✅ Remove duplicate topics based on topic_bm
                const uniqueTopics = response.data.reduce((acc, item) => {
                    if (!acc.some((t) => t.topic_bm === item.topic_bm)) {
                        acc.push(item);
                    }
                    return acc;
                }, []);
                setTopics(uniqueTopics);
            })
            .catch((error) => console.error("Error fetching topics:", error));

        // ✅ Handle language change from localStorage
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "en");
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // ✅ Topic Image Mapping
    const topicImages = {
        "Asas Islam dan Gaya Hidup": "/storage/assets/button/asas.jpg",
        "Islamic Fundamentals and Lifestyle": "/storage/assets/button/asas.jpg",
        "Kaifiat Solat dan Doa": "/storage/assets/button/solat.jpg",
        "Prayer and Supplication Guide": "/storage/assets/button/solat.jpg",
        "Sirah Nabi dan Sahabat": "/storage/assets/button/sirah.jpg",
        "Prophet's Biography and Companions": "/storage/assets/button/sirah.jpg",
        "Sebalik Nama Surah": "/storage/assets/button/surah.jpg",
        "Meanings Behind Surah Names": "/storage/assets/button/surah.jpg",
        "FAQ Islam": "/storage/assets/button/faq.jpg",
        "Islamic FAQs": "/storage/assets/button/faq.jpg",
        "Perasaan Anda Sekarang": "/storage/assets/button/ruqyah.jpg",
        "Your Feeling Now": "/storage/assets/button/ruqyah.jpg",
    };

    return (
        <div className="flex justify-center items-center w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 gap-4 w-full max-w-md"
            >
                {topics.map((item) => {
                    const topicTitle = language === "bm" ? item.topic_bm : item.topic_en;
                    const topicImage = topicImages[topicTitle] || "/storage/assets/button/default.jpg";

                    return (
                        <Link key={item.id} href={`/topic/${item.id}`} className="w-full">
                            <motion.button
                                whileHover={{ scale: 1.05, opacity: 0.9 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-6 w-full h-32 flex justify-center items-center bg-green-500 text-white rounded-lg shadow-md dark:bg-green-700 dark:text-white dark:hover:bg-green-600 overflow-hidden"
                                style={{
                                    backgroundImage: `url(${topicImage})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            >
                                {/* ✅ Overlay for better text contrast */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

                                {/* ✅ Topic Text with Shadow for Readability */}
                                <span
                                    className="relative z-10 text-1xl md:text-2xl font-bold text-white text-center"
                                    style={{
                                        textShadow: "4px 4px 10px rgba(0, 0, 0, 1)",
                                    }}
                                >
                                    {topicTitle}
                                </span>
                            </motion.button>
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
}
