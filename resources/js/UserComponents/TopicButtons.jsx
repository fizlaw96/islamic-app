import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react"; // Use Inertia Link
import axios from "axios";

export default function TopicButtons() {
    const [topics, setTopics] = useState([]);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() => {
        axios.get("/api/islamic-contents")
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => console.error("Error fetching topics:", error));

        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "en");
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // ✅ Updated Mapping for Laravel Storage
    const topicImages = {
        "Asas Islam dan Gaya Hidup": "/storage/assets/button/asas.jpg",
        "Islamic Fundamentals and Lifestyle": "/storage/assets/button/asas.jpg",
        "Kaifiat Solat dan Doa": "/storage/assets/button/solat.jpg",
        "Prayer and Supplication Guide": "/storage/assets/button/solat.jpg",
        "Sirah Nabi dan Sahabat": "/storage/assets/button/sirah.jpg",
        "Prophet’s Biography and Companions": "/storage/assets/button/sirah.jpg",
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
                {topics.map((item, index) => {
                    const topicTitle = language === "bm" ? item.topic_bm : item.topic_en;
                    const topicImage = topicImages[topicTitle] || "/storage/button/default.jpg"; // ✅ Use Laravel Storage

                    return (
                        <Link key={index} href={`/topic/${item.id}`} className="w-full">
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
                                    className="relative z-10 text-lg font-bold text-white text-center"
                                    style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.8)" }} // ✅ Custom Text Shadow
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
