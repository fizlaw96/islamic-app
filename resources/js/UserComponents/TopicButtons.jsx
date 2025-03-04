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

    return (
        <div className="flex justify-center items-center w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 gap-4 w-full max-w-md"
            >
                {topics.map((item, index) => (
                    <Link key={index} href={`/topic/${item.id}`} className="w-full">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#1E3A8A", color: "#fff" }}
                            whileTap={{ scale: 0.95 }}
                            className="p-6 w-full h-20 flex justify-center items-center bg-green-500 text-white rounded-lg shadow-md dark:bg-green-700 dark:text-white dark:hover:bg-green-600 text-center"
                        >
                            {language === "bm" ? item.topic_bm : item.topic_en}
                        </motion.button>
                    </Link>
                ))}
            </motion.div>
        </div>
    );
}
