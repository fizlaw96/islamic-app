import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

export default function JourneyLoggedIn({ user, lessons }) {
    const [progress, setProgress] = useState({});

    useEffect(() => {
        // Fetch user progress from backend
        fetch("/api/user-progress")
            .then((res) => res.json())
            .then((data) => setProgress(data));
    }, []);

    const isLessonUnlocked = (lessonId) => {
        if (lessonId === 1) return true; // First lesson always unlocked
        return progress[lessonId - 1]?.score >= 70; // Unlock next if score ≥ 70%
    };

    return (
        <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-center">📚 Your Learning Journey</h1>
            <p className="text-center text-gray-600 dark:text-gray-300">Unlock lessons one by one by scoring at least 70%.</p>

            <div className="mt-6 space-y-4">
                {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">{lesson.title}</h2>
                            <p className="text-gray-600 dark:text-gray-300">{lesson.description}</p>
                        </div>

                        {isLessonUnlocked(lesson.id) ? (
                            <Link
                                href={`/lesson/${lesson.id}`}
                                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                            >
                                Start Lesson
                            </Link>
                        ) : (
                            <button className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
                                🔒 Locked
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
