import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import Layout from "../Layouts/Layout"; // ✅ Import Layout

export default function Journey() {
    const journeySteps = [
        { id: 1, type: "lesson", link: "/lesson/1" },
        { id: 2, type: "lesson", link: "/lesson/2" },
        { id: 3, type: "reward", link: "/reward" }, // Chest for milestone
        { id: 4, type: "lesson", link: "/lesson/4" },
        { id: 5, type: "lesson", link: "/lesson/5" },
        { id: 6, type: "character", link: "/encouragement" }, // Character encouragement
    ];

    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen bg-white dark:bg-gray-900 py-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Learning Journey</h1>

                <div className="relative flex flex-col items-center gap-6">
                    {journeySteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            <Link href={step.link}>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-16 h-16 flex items-center justify-center text-white rounded-full shadow-lg relative transition-all duration-300 ${
                                        step.type === "lesson" ? "bg-green-500" :
                                        step.type === "reward" ? "bg-yellow-500" :
                                        "bg-blue-500"
                                    }`}
                                >
                                    {/* ✅ Emoji or Character with Hover Effect */}
                                    <motion.span
                                        whileHover={{ scale: 1.5 }} // ✅ Make emoji bigger when hovering
                                        transition={{ duration: 0.2 }}
                                    >
                                        {step.type === "lesson" && "⭐"}
                                        {step.type === "reward" && "🏆"}
                                    </motion.span>
                                </motion.button>
                            </Link>

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
