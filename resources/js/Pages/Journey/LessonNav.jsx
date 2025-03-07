import React from "react";
import { motion } from "framer-motion";

export default function LessonNav({ currentQuestion, totalQuestions, lives }) {
    const progress = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

    return (
        <div className="fixed top-0 left-0 w-full p-4 bg-white shadow-md flex items-center justify-between">
            {/* ✅ Progress Bar */}
            <div className="relative flex-1 mx-4">
                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                    <motion.div
                        className="h-4 bg-blue-500 rounded-full"
                        initial={{ width: "0%" }} // Start at 0
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* ✅ Indicator (Animated Circle) */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 bg-blue-500 w-6 h-6 rounded-full"
                    initial={{ left: "0%" }} // Start at 0
                    animate={{ left: `${Math.max(progress, 0)}%` }} // Move based on progress
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* ✅ Heart with Number of Lives */}
            <div className="flex items-center text-lg font-bold">
                <div className="relative w-10 h-10 flex items-center justify-center text-white text-xl font-bold">
                    <span className="absolute w-full h-full text-red-500 text-5xl">❤️</span>
                    <span className="relative z-10 ml-2">{lives}</span>
                </div>
            </div>
        </div>
    );
}
