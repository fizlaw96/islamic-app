import React from "react";
import { motion } from "framer-motion";

export default function TopicButtons() {
    const topics = [
        "Asas Islam dan Gaya Hidup",
        "Kaifiat Solat dan Doa",
        "Sirah Nabi dan Sahabat",
        "Sebalik Nama Surah",
        "FAQ Islam",
        "Ruqyah"
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4 w-full max-w-md"
        >
            {topics.map((label, index) => (
                <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, backgroundColor: "#1E3A8A", color: "#fff" }}
                    whileTap={{ scale: 0.9 }}
                    className="p-6 bg-green-500 text-white rounded-lg shadow-md dark:bg-green-700 dark:text-white dark:hover:bg-green-600"
                >
                    {label}
                </motion.button>
            ))}
        </motion.div>
    );
}
