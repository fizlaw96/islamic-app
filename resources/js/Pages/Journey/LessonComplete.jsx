import React, { useEffect, useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import axios from "axios";

// ✅ Function to get query parameters from URL
const getQueryParam = (param) => {
    return new URLSearchParams(window.location.search).get(param);
};

export default function LessonComplete() {
    // ✅ Extracting Data from URL
    const lesson_id = getQueryParam("lesson_id");
    const rawScore = parseInt(getQueryParam("score"), 10);
    const total = parseInt(getQueryParam("total"), 10);

    // ✅ Getting user data from Inertia
    const { auth } = usePage().props;
    const user_id = auth?.user?.id; // ✅ Get authenticated user ID

    // ✅ Calculate percentage (convert raw score into percentage)
    const percentage = total ? Math.round((rawScore / total) * 100) : 0;

    // ✅ Language state (BM/EN)
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "bm");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // ✅ BM/EN Translations
    const translations = {
        bm: {
            amazing: "🎉 Anda Hebat! 🎉",
            keepGoing: "💪 Teruskan Usaha! 💪",
            tryAgain: "😢 Cuba Lagi!",
            scored: "Anda mendapat",
            backToJourney: "Kembali ke Perjalanan",
        },
        en: {
            amazing: "🎉 You're Amazing! 🎉",
            keepGoing: "💪 Keep Going! 💪",
            tryAgain: "😢 Try Again!",
            scored: "You scored",
            backToJourney: "Back to Journey",
        },
    };

    // ✅ Send Score to Backend (Send percentage instead of raw score)
    const sendScoreToBackend = async () => {
        try {
            console.log("🚀 Sending data to backend:", { user_id, lesson_id, score: percentage });

            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const response = await axios.post(
                "/api/lesson/complete",
                { user_id, lesson_id, score: percentage }, // ✅ Send percentage instead of raw score
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

    // ✅ Determine Image Based on Score
    let imageSrc = "/assets/characters/congratz.png";
    if (percentage < 50) imageSrc = "/assets/characters/sad.png";
    else if (percentage < 80) imageSrc = "/assets/characters/spirit.png";

    return (
        <Layout>
            <div className="mt-20 flex items-center justify-center text-white dark:text-black">
                <div className="text-center">
                    <div className="flex justify-center">
                        <img
                            src={imageSrc}
                            alt="Score Feedback"
                            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
                        />
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-center mt-4">
                        {percentage >= 80
                            ? translations[language].amazing
                            : percentage >= 50
                            ? translations[language].keepGoing
                            : translations[language].tryAgain}
                    </h1>

                    <p className="text-lg sm:text-xl mt-2">
                        {translations[language].scored} <span className="font-bold">{percentage}%</span>.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/journey-user"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 text-lg w-full sm:w-auto"
                        >
                            {translations[language].backToJourney}
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
