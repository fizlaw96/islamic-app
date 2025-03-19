import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ Import axios
import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProfileImage from "@/UserComponents/ProfileImage"; // Import ProfileImage component
import { Flame, BookOpen, ChevronRight, Globe } from "lucide-react";

export default function Dashboard() {
    const {
        user,
        completedLessons = 0,
        latestLessons = [],
        nextLesson = null,
        totalLessons = 1 // Avoid division by zero
    } = usePage().props;

    const [streak, setStreak] = useState(0);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");

    useEffect(() => {
        const fetchStreak = async () => {
            try {
                console.log("🚀 Fetching streak for user:", user.id);

                const response = await axios.get(`/api/streak`, {
                    params: { user_id: user.id },
                });

                setStreak(response.data.streak);
            } catch (error) {
                console.error("❌ Error fetching streak:", error.response?.data || error.message);
                setStreak(0); // ✅ Default to 0 if error
            }
        };

        fetchStreak();
    }, [user.id]);

    const handleLessonCompletion = () => {
        if (!nextLesson) {
            console.warn("⚠️ No next lesson available to complete.");
            return; // Prevent function execution
        }

        // ✅ Redirect to the next lesson
        console.log("📚 Redirecting to next lesson:", nextLesson.id);
        window.location.href = `/lesson/${nextLesson.id}`;
    };

    const handleLanguageChange = () => {
        const newLanguage = language === "bm" ? "en" : "bm";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    // ✅ Calculate lesson completion percentage safely
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

    // ✅ Translations (BM / EN)
    const translations = {
        bm: {
            dashboard: "Papan Pemuka",
            streak: "🔥 Terusan Berapi: ",
            streakDesc: "Kekal konsisten! Jangan putuskan rentetan anda.",
            lessonProgress: "📚 Kemajuan Pelajaran",
            completed: "daripada",
            nextLesson: "🎯 Pelajaran Seterusnya",
            completeLesson: "Selesaikan Pelajaran",
            switchLanguage: "Tukar Bahasa",
        },
        en: {
            dashboard: "Dashboard",
            streak: "🔥 Streak: ",
            streakDesc: "Stay consistent! Don't break your streak.",
            lessonProgress: "📚 Lesson Progress",
            completed: "out of",
            nextLesson: "🎯 Next Lesson",
            completeLesson: "Complete Lesson",
            switchLanguage: "Switch Language",
        },
    };

    const t = translations[language];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        {t.dashboard}
                    </h2>
                    {/* 🌍 Language Switcher */}
                    <button
                        onClick={handleLanguageChange}
                        className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600"
                    >
                        <Globe size={18} />
                        {t.switchLanguage}
                    </button>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 text-gray-900 dark:text-gray-100">

                        {/* ✅ User Profile Section */}
                        <ProfileImage user={user} />

                        {/* ✅ Streak Section */}
                        <div className="mt-8 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center gap-4">
                            <Flame size={32} className="text-red-500" />
                            <div>
                                <h3 className="text-lg font-semibold">{t.streak} {streak} hari</h3>
                                <p className="text-gray-500 text-sm">{t.streakDesc}</p>
                            </div>
                        </div>

                        {/* ✅ Progress Section */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold">{t.lessonProgress}</h3>
                            <p className="text-gray-500 text-sm">
                                {completedLessons} {t.completed} {totalLessons} pelajaran selesai
                            </p>

                            {/* ✅ Progress Bar */}
                            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                                <div
                                    className="h-4 rounded-full bg-green-500 transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* ✅ Continue Learning Section */}
                        {nextLesson && (
                            <div className="mt-8 bg-green-100 dark:bg-green-700 p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">{t.nextLesson}</h3>
                                    <p className="text-gray-500">{nextLesson.title}</p>
                                </div>
                                <button
                                    onClick={handleLessonCompletion}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 flex items-center gap-2"
                                >
                                    {t.completeLesson} <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
