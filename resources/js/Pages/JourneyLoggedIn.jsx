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

    // ✅ Group lessons by level
    const groupedLessons = lessons.reduce((acc, lesson) => {
        acc[lesson.level] = acc[lesson.level] || [];
        acc[lesson.level].push(lesson);
        return acc;
    }, {});

    // ✅ Get all available levels
    const availableLevels = Object.keys(groupedLessons).sort((a, b) => a - b);

    // ✅ State to control level selection
    const [selectedLevel, setSelectedLevel] = useState(availableLevels[0] || 1);
    const [showLevelModal, setShowLevelModal] = useState(false);
    const [openLessonId, setOpenLessonId] = useState(null);

    // ✅ Check if all Level 1 lessons are completed
    const isLevel1Completed = groupedLessons[1]?.every(
        (lesson) => progress[lesson.id]?.score >= 70
    );

    // ✅ Function to toggle lesson descriptions
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
                {/* ✅ Title */}
                <h1 className="text-2xl font-bold text-center mb-4">
                    {language === "bm" ? "Perjalanan Pembelajaran Anda" : "Your Learning Journey"}
                </h1>

                {/* ✅ Show Level Selection Button ONLY if Level 1 is fully completed */}
                {isLevel1Completed && (
                    <button
                        onClick={() => setShowLevelModal(true)}
                        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        {language === "bm" ? "Pilih Tahap" : "Select Level"}
                    </button>
                )}

                {/* ✅ Lessons Display */}
                <div className="relative flex flex-col space-y-8 w-full max-w-md">
                    {/* Vertical Line Behind Buttons */}
                    <div className="absolute left-8 top-0 w-1 h-full bg-gray-500 dark:bg-gray-400 z-0"></div>

                    {groupedLessons[selectedLevel]?.map((lesson, index) => (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex items-center space-x-4 z-0" // ✅ Set z-0 to push behind layout
                        >
                            {/* Lesson Circle (Behind the layout) */}
                            <div className="relative flex items-center z-0"> {/* ✅ Pushed behind using z-0 */}
                                <div className="absolute w-1 h-full bg-gray-500 dark:bg-gray-400 left-1/2 transform -translate-x-1/2 z-0"></div>
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

                    {/* ✅ Trophy for Level Completion */}
                    <div className="relative flex items-center space-x-4 mt-4 z-0"> {/* ✅ Push behind layout */}
                        <div className="w-16 h-16 flex items-center justify-center rounded-full shadow-md bg-yellow-500 text-white text-2xl font-bold relative z-0">
                            🏆
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Level Selection Modal */}
            <AnimatePresence>
                {showLevelModal && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <h2 className="text-xl font-bold mb-4">
                                {language === "bm" ? "Pilih Tahap" : "Select Level"}
                            </h2>
                            <div className="space-y-3">
                                {availableLevels.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => {
                                            setSelectedLevel(level);
                                            setShowLevelModal(false);
                                        }}
                                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                                    >
                                        {language === "bm" ? `Tahap ${level}` : `Level ${level}`}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
}
