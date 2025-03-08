import React, { useEffect, useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import Layout from "../../Layouts/Layout"; // ✅ Import Layout

export default function LessonComplete() {
    const { score, total } = usePage().props;
    const percentage = Math.round((score / total) * 100);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "bm");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // ✅ Determine Image Based on Score
    let imageSrc = "/assets/characters/congratz.png"; // Default: Good Score
    if (percentage < 50) {
        imageSrc = "/assets/characters/sad.png"; // Fail
    } else if (percentage < 80) {
        imageSrc = "/assets/characters/spirit.png"; // Average
    }

    // ✅ BM/EN Messages
    const messages = {
        bm: {
            title_good: "🎉 Anda Memang Hebat! 🎉",
            title_avg: "💪 Teruskan Usaha! 💪",
            title_fail: "😢 Cuba Lagi!",
            score_text: "Anda mendapat",
            back: "Kembali ke Perjalanan",
        },
        en: {
            title_good: "🎉 You're Amazing! 🎉",
            title_avg: "💪 Keep Going! 💪",
            title_fail: "😢 Try Again!",
            score_text: "You scored",
            back: "Back to Journey",
        },
    };

    return (
        <Layout>
            {/* ✅ Full-page Centered Container (No Scroll) */}
            <div className="h-screen flex items-center justify-center text-white dark:text-black">
                <div className="text-center p-6 max-w-lg">

                    {/* ✅ Dynamic Score Image (Ensuring Same Size) */}
                    <div className="flex justify-center">
                        <img
                            src={imageSrc}
                            alt="Score Feedback"
                            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
                        />
                    </div>

                    {/* ✅ Responsive Heading */}
                    <h1 className="text-3xl sm:text-4xl font-bold whitespace-nowrap overflow-hidden text-center mt-4">
                        {percentage >= 80
                            ? messages[language].title_good
                            : percentage >= 50
                            ? messages[language].title_avg
                            : messages[language].title_fail}
                    </h1>

                    {/* ✅ Score Percentage */}
                    <p className="text-lg sm:text-xl mt-2">
                        {messages[language].score_text} <span className="font-bold">{percentage}%</span>.
                    </p>

                    {/* ✅ Space Below the Text */}
                    <div className="mt-8">
                        {/* ✅ Button - Lowered for better spacing */}
                        <Link href="/journey" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md
                            hover:bg-blue-600 transition-all duration-200 text-lg w-full sm:w-auto">
                            {messages[language].back}
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
