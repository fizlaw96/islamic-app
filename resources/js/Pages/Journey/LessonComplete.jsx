import React, { useEffect, useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import Layout from "../../Layouts/Layout";
import axios from "axios";

// ✅ Function to get query parameters from URL
const getQueryParam = (param) => {
    return new URLSearchParams(window.location.search).get(param);
};

export default function LessonComplete() {
    // ✅ Extracting Data from URL
    const timeTaken = parseInt(getQueryParam("time"), 10);
    const lesson_id = getQueryParam("lesson_id");
    const rawScore = parseInt(getQueryParam("score"), 10);
    const total = parseInt(getQueryParam("total"), 10);

    // ✅ Getting user data from Inertia
    const { auth } = usePage().props;
    const user_id = auth?.user?.id;

    // ✅ Calculate percentage
    const percentage = total ? Math.round((rawScore / total) * 100) : 0;

    // ✅ Convert time into minutes & seconds
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // ✅ Language state (BM/EN)
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");
    const [animatedScore, setAnimatedScore] = useState(0);
    const [showTime, setShowTime] = useState(false);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "bm");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // ✅ Send Score to Backend
    const sendScoreToBackend = async () => {
        try {
            console.log("🚀 Sending data to backend:", { user_id, lesson_id, score: percentage });

            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const response = await axios.post(
                "/api/lesson/complete",
                { user_id, lesson_id, score: percentage },
                { withCredentials: true }
            );

            console.log("✅ Score saved successfully:", response.data);
        } catch (error) {
            console.error("❌ Error saving score:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (user_id && lesson_id && rawScore !== null) {
            sendScoreToBackend();
        } else {
            console.error("❌ Missing required data:", { user_id, lesson_id, rawScore });
        }
    }, [user_id, lesson_id, rawScore]);

    // ✅ Count-up animation for score
    useEffect(() => {
        let interval;
        if (animatedScore < percentage) {
            interval = setInterval(() => {
                setAnimatedScore((prev) => (prev + 1 > percentage ? percentage : prev + 1));
            }, 15);
        } else {
            clearInterval(interval);
        }

        setTimeout(() => setShowTime(true), 800); // ✅ Show time after score animation
        setTimeout(() => setShowImage(true), 1500); // ✅ Show image after time

        return () => clearInterval(interval);
    }, [percentage]);

    // ✅ BM/EN Translations
    const translations = {
        bm: {
            amazing: "🎉 Anda Hebat! 🎉",
            keepGoing: "💪 Teruskan Usaha! 💪",
            tryAgain: "😢 Cuba Lagi!",
            scored: "Anda mendapat",
            backToJourney: "Kembali ke Perjalanan",
            good: "BAIK",
            committed: "KOMITED",
        },
        en: {
            amazing: "🎉 You're Amazing! 🎉",
            keepGoing: "💪 Keep Going! 💪",
            tryAgain: "😢 Try Again!",
            scored: "You scored",
            backToJourney: "Back to Journey",
            good: "GOOD",
            committed: "COMMITTED",
        },
    };

    // ✅ Determine Image Based on Score
    let imageSrc = "/storage/assets/characters/congratz.png";
    if (percentage < 50) imageSrc = "/storage/assets/characters/sad.png";
    else if (percentage < 80) imageSrc = "/storage/assets/characters/spirit.png";

    return (
        <Layout>
            <div className="mt-20 flex flex-col items-center justify-center text-white dark:text-black space-y-6">
                {/* ✅ Score Feedback Image (Fixed Margin) */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={showImage ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-6" // ✅ Ensures spacing below image
                >
                    <img
                        src={imageSrc}
                        alt="Score Feedback"
                        className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
                    />
                </motion.div>

                {/* ✅ Score & Time Display (Always Positioned Under Image) */}
                <div className="flex space-x-4">
                    {/* ✅ Score Box */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg"
                    >
                        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-2">
                            {translations[language].good}
                        </h2>
                        <div className="flex items-center space-x-2 mt-2">
                            <span className="text-3xl">🎯</span>
                            <span className="text-3xl font-bold">{animatedScore}%</span>
                        </div>
                    </motion.div>

                    {/* ✅ Time Box (Appears After Score) */}
                    {showTime && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg"
                        >
                            <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-2">
                                {translations[language].committed}
                            </h2>
                            <div className="flex items-center pt-2">
                                <span className="text-3xl">⏳</span>
                                <span className="text-3xl font-bold">{formattedTime}</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* ✅ Message Based on Score */}
                <h1 className="text-3xl sm:text-4xl font-bold text-center mt-4">
                    {percentage >= 80
                        ? translations[language].amazing
                        : percentage >= 50
                        ? translations[language].keepGoing
                        : translations[language].tryAgain}
                </h1>

                {/* ✅ Back to Journey Button */}
                <div className="mt-8">
                    <Link
                        href="/journey-user"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 text-lg w-full sm:w-auto"
                    >
                        {translations[language].backToJourney}
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
