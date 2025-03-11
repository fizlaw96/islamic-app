import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import Layout from "../Layouts/Layout";

export default function JourneyLoggedIn() {
    const { user, lessons, progress } = usePage().props;

    const isLessonUnlocked = (lessonId) => {
        if (lessonId === 1) return true; // ✅ First lesson is always unlocked
        return progress?.[lessonId - 1]?.score >= 70; // ✅ Unlock next lesson if previous score ≥ 70%
    };

    return (
        <Layout>
            <div className="p-6 min-h-screen">
                <h1 className="text-3xl font-bold text-center">
                    📚 {user.name}'s Learning Journey
                </h1>

                {/* <h1 className="text-3xl font-bold text-center">📚 Your Learning Journey</h1> */}

                {lessons.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-300 mt-4">No lessons available yet.</p>
                ) : (
                    <div className="mt-6 space-y-4">
                        {lessons.map((lesson, index) => (
                            <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md flex items-center justify-between"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold">{lesson.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{lesson.description}</p>
                                </div>

                                {isLessonUnlocked(lesson.id) ? (
                                    <Link
                                        href={route("lesson.show", { id: lesson.id })} // ✅ Pass only lesson_id
                                        className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                                    >
                                        Start Lesson
                                    </Link>
                                ) : (
                                    <button className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
                                        🔒 Locked
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
