import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onFinish }) {
    const { lesson } = usePage().props;
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "bm");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
            onFinish(); // Call function when loading completes
        }, 3000); // 3 seconds loading time

        return () => clearTimeout(timeout);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white">
            {/* ✅ Animated Character Image */}
            <motion.img
                src="/storage/assets/characters/study.png"
                alt="Loading"
                className="w-64 h-64 md:w-80 md:h-80"
                initial={{ scale: 0.8 }}
                animate={{
                    scale: [1, 1.05, 1], // Smooth pulsing effect
                    y: [0, -10, 0], // Floating up & down
                    opacity: 1,
                }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: 2,
                }}
            />

            {/* ✅ BM/EN Dynamic Text */}
            <p className="mt-4 text-lg">
                {language === "bm"
                    ? `Memasuki ${lesson.title_bm}...`
                    : `Entering ${lesson.title_en}...`}
            </p>
        </div>
    );
}
