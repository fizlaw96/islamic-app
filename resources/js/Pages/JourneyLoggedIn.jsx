import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../Layouts/Layout";

export default function JourneyLoggedIn() {
    const { user, lessons, progress } = usePage().props;

    // ✅ Get language from localStorage (default: English)
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "en");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Ensure we always display 5 lessons
    const displayedLessons = lessons.slice(0, 5);

    // State to toggle description visibility
    const [openLessonId, setOpenLessonId] = useState(null);

    // Function to toggle lesson descriptions
    const toggleDescription = (lessonId) => {
        setOpenLessonId(openLessonId === lessonId ? null : lessonId);
    };

    const isLessonUnlocked = (lessonId) => {
        if (lessonId === 1) return true; // ✅ First lesson is always unlocked
        return progress?.[lessonId - 1]?.score >= 70; // ✅ Unlock next lesson if previous score ≥ 70%
    };

    return (
        <Layout>
            <div className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-2xl font-bold text-center mb-8">
                    {language === "bm" ? "Perjalanan Pembelajaran Anda" : "Your Learning Journey"}
                </h1>

                <div className="relative flex flex-col space-y-8 w-full max-w-md">
                    {/* Vertical Line Behind Buttons */}
                    <div
                        className="absolute left-8 top-0 w-1 h-full bg-gray-500 dark:bg-gray-400"
                        style={{
                            backgroundImage: "linear-gradient(135deg, transparent 25%, gray 25%, gray 50%, transparent 50%, transparent 75%, gray 75%)",
                            backgroundSize: "8px 16px",
                        }}
                    ></div>

                    {displayedLessons.map((lesson, index) => (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex items-center space-x-4"
                        >
                            {/* Lesson Circle with Proper Line Placement */}
                            <div className="relative flex items-center">
                                <div className="absolute w-1 h-full bg-gray-500 dark:bg-gray-400 left-1/2 transform -translate-x-1/2"></div>
                                {isLessonUnlocked(lesson.id) ? (
                                    <Link
                                        href={route("lesson.show", { id: lesson.id })}
                                        className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full shadow-md bg-green-400 dark:bg-green-600 text-white text-2xl font-bold"
                                    >
                                        ⭐
                                    </Link>
                                ) : (
                                    <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full shadow-md bg-gray-400 text-white text-2xl font-bold cursor-not-allowed">
                                        🔒
                                    </div>
                                )}
                            </div>

                            {/* Lesson Title & Toggleable Description */}
                            <div className="flex flex-col">
                                <button
                                    onClick={() => toggleDescription(lesson.id)}
                                    className="text-lg font-semibold focus:outline-none flex items-center gap-2"
                                >
                                    {language === "bm" ? lesson.title_bm : lesson.title_en}
                                    <motion.span
                                        animate={{ rotate: openLessonId === lesson.id ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        ▼
                                    </motion.span>
                                </button>

                                <AnimatePresence>
                                    {openLessonId === lesson.id && (
                                        <motion.p
                                            className="text-sm text-gray-500 dark:text-gray-800 mt-1"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {language === "bm" ? lesson.description_bm : lesson.description_en}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}

                    {/* Final Completion Badge (Trophy) */}
                    <div className="relative flex items-center space-x-4 mt-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full shadow-md bg-yellow-500 text-white text-2xl font-bold relative z-10">
                            🏆
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
