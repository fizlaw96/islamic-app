import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import Layout from "../Layouts/Layout";

export default function Journey() {
    const [showModal, setShowModal] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");

    // ✅ Listen for language changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "bm");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const journeySteps = [
        { id: 1, type: "lesson", unlocked: true },
        { id: 2, type: "lesson", unlocked: true },
        { id: 3, type: "lesson", unlocked: false }, // Locked lesson
        { id: 4, type: "lesson", unlocked: false }, // Locked lesson
        { id: 5, type: "lesson", unlocked: false }, // Locked lesson
        { id: 6, type: "reward" }, // Chest for milestone
    ];

    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen py-10">
                {/* ✅ Page Title (BM/EN) */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-6 text-center w-full">
                    {language === "bm" ? "Perjalanan Pembelajaran Anda" : "Your Learning Journey"}
                </h1>

                <div className="relative flex flex-col items-center gap-6 mb-20">
                    {journeySteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* ✅ Unlocked Lessons */}
                            {step.type === "lesson" && step.unlocked ? (
                                <Link href={route("lesson.show", { id: step.id })}>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-16 h-16 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg transition-all duration-300"
                                    >
                                        <motion.span whileHover={{ scale: 1.5 }} transition={{ duration: 0.2 }}>
                                            ⭐
                                        </motion.span>
                                    </motion.button>
                                </Link>
                            ) : step.type === "lesson" && !step.unlocked ? (
                                // ✅ Locked Lessons (Show Lock)
                                <motion.button
                                    onClick={() => setShowModal(true)} // Show Modal on Click
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 flex items-center justify-center bg-gray-400 text-white rounded-full shadow-lg transition-all duration-300"
                                >
                                    <motion.span whileHover={{ scale: 1.5 }} transition={{ duration: 0.2 }}>
                                        🔒
                                    </motion.span>
                                </motion.button>
                            ) : step.type === "reward" ? (
                                // ✅ Reward Chest
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow-lg transition-all duration-300"
                                >
                                    <motion.span whileHover={{ scale: 1.5 }} transition={{ duration: 0.2 }}>
                                        🏆
                                    </motion.span>
                                </motion.button>
                            ) : null}

                            {/* Path Line (if not last step) */}
                            {index !== journeySteps.length - 1 && (
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-12 bg-gray-300 dark:bg-gray-600"></div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ✅ Modal Popup (For Locked Lessons) */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                        <p className="text-xl font-bold">
                            🔒 {language === "bm" ? "Anda perlu Log Masuk untuk menjawab soalan ini." : "You need to log in to answer this question."}
                        </p>

                        <div className="mt-4 flex flex-col gap-3">
                            <Link href="/login">
                                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full">
                                    {language === "bm" ? "Log Masuk" : "Log In"}
                                </button>
                            </Link>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 w-full border border-gray-300 px-6 py-2 rounded-lg"
                            >
                                {language === "bm" ? "Tutup" : "Close"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
