import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import Layout from "../Layouts/Layout";

export default function JourneyLoggedIn() {
    const { user, lessons, progress } = usePage().props;

    // Ensure we always display 5 lessons
    const displayedLessons = lessons.slice(0, 5);

    const isLessonUnlocked = (lessonId) => {
        if (lessonId === 1) return true; // ✅ First lesson is always unlocked
        return progress?.[lessonId - 1]?.score >= 70; // ✅ Unlock next lesson if previous score ≥ 70%
    };

    return (
        <Layout>
            <div className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-2xl font-bold text-center mb-8">
                    Perjalanan Pembelajaran Anda
                </h1>

                <div className="relative flex flex-col items-center space-y-6">
                    {/* Vertical Line Behind Buttons */}
                    <div className="absolute w-1 h-full bg-gray-600 dark:bg-gray-400 top-0"></div>

                    {displayedLessons.map((lesson, index) => (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex flex-col items-center"
                        >
                            {/* Lesson Circle */}
                            {isLessonUnlocked(lesson.id) ? (
                                <Link
                                    href={route("lesson.show", { id: lesson.id })}
                                    className="w-16 h-16 flex items-center justify-center rounded-full shadow-md bg-green-400 dark:bg-green-600 text-white text-2xl font-bold relative z-10"
                                >
                                    ⭐
                                </Link>
                            ) : (
                                <div className="w-16 h-16 flex items-center justify-center rounded-full shadow-md bg-gray-400 text-white text-2xl font-bold cursor-not-allowed relative z-10">
                                    🔒
                                </div>
                            )}

                            {/* Lesson Title */}
                            <div className="mt-2 text-center">
                                <h2 className="text-lg font-semibold">{lesson.title}</h2>
                            </div>
                        </motion.div>
                    ))}

                    {/* Final Completion Badge (Trophy) */}
                    <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full shadow-md bg-yellow-500 text-white text-2xl font-bold relative z-10">
                            🏆
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
