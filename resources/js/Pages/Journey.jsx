import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import Layout from "../Layouts/Layout"; // ✅ Import Layout

export default function Journey() {
    const journeySteps = [
        { id: 1, type: "lesson" },
        { id: 2, type: "lesson" },
        { id: 3, type: "reward" }, // Chest for milestone
        { id: 4, type: "lesson" },
        { id: 5, type: "lesson" },
        { id: 6, type: "character" }, // Character encouragement
    ];

    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen py-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-6">Your Learning Journey</h1>

                <div className="relative flex flex-col items-center gap-6">
                    {journeySteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* ✅ Dynamic Lesson Link */}
                            {step.type === "lesson" ? (
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
                            ) : step.type === "reward" ? (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow-lg transition-all duration-300"
                                >
                                    <motion.span whileHover={{ scale: 1.5 }} transition={{ duration: 0.2 }}>
                                        🏆
                                    </motion.span>
                                </motion.button>
                            ) : step.type === "character" ? (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transition-all duration-300"
                                >
                                    <motion.span whileHover={{ scale: 1.5 }} transition={{ duration: 0.2 }}>
                                        👤
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
        </Layout>
    );
}
