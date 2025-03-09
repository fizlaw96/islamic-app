import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Menu, Bell, Settings, Star, Home } from "lucide-react";
import { motion } from "framer-motion";
import moment from "moment-hijri";
import Drawer from "./Drawer";

import SpecialButton from "../UserComponents/SpecialButton";

export default function Layout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
    const [isSpecial, setIsSpecial] = useState(false); // Track if the special button should be shown

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    useEffect(() => {
        // Check if the SpecialButton should be displayed
        const todayHijri = moment().iMonth() + 1; // Get Hijri month
        if ([9, 10, 12].includes(todayHijri)) {
            setIsSpecial(true);
        }
    }, []);

    const translations = {
        en: {
            appName: "Islamic App",
            history: "History",
            video: "Video",
            question: "Question",
            dailyReminder: "Daily Reminder",
            askQuestion: "Ask Question",
            donate: "Donate",
            home: "Home",
            journey: "Journey",
            settings: "Settings",
            favorite: "Favorite",
        },
        bm: {
            appName: "Aplikasi Islam",
            history: "Sejarah",
            video: "Video",
            question: "Soalan",
            dailyReminder: "Peringatan Harian",
            askQuestion: "Tanya Soalan",
            donate: "Derma",
            home: "Laman Utama",
            journey: "Pengembaraan",
            settings: "Tetapan",
            favorite: "Kegemaran",
        },
    };

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? "bg-green-900 text-white" : "bg-green-50 text-black"}`}>
            {/* ✅ Top Navbar */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between p-4 bg-green-600 dark:bg-green-800 text-white shadow-md fixed top-0 left-0 w-full z-50"
            >
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
                    <Menu size={24} />
                </button>
                <h1 className="flex justify-center items-center">
                    <img src="/assets/button/name.svg" alt="App Name" className="h-8 w-auto filter invert" />
                </h1>
                <button className="p-2">
                    <Bell size={24} />
                </button>
            </motion.nav>

            {/* ✅ Sidebar Drawer */}
            <Drawer menuOpen={menuOpen} setMenuOpen={setMenuOpen} translations={translations} language={language} />

            {/* ✅ Main Content (Adds padding to prevent navbar overlap) */}
            <main className="flex-1 pt-16 p-6">{children}</main>

            {/* ✅ Bottom Navbar */}
            <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sticky bottom-0 w-full bg-green-600 dark:bg-green-800 text-white shadow-md p-4 flex items-center justify-between relative"
            >
                {/* ✅ Home Button */}
                <Link href="/" className="flex flex-col items-center">
                    <Home size={24} />
                </Link>

                {/* ✅ Journey Button (Adds Right Margin if SpecialButton Exists) */}
                <Link
                    href={route("journey")}
                    className={`flex flex-col items-center ${isSpecial ? "mr-6 sm:mr-10" : ""}`}
                >
                    <img src="/assets/button/journey.png" alt="Journey Icon" className="w-8 h-8" />
                </Link>

                {/* ✅ SpecialButton - Centered & Overflowing (Only Renders If Exists) */}
                {isSpecial && (
                    <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 animate-shine">
                        <SpecialButton />
                    </div>
                )}

                {/* ✅ Settings Button (Adds Left Margin if SpecialButton Exists) */}
                <Link
                    href="/settings"
                    className={`flex flex-col items-center ${isSpecial ? "ml-6 sm:ml-10" : ""}`}
                >
                    <Settings size={24} />
                </Link>

                {/* ✅ Favourite Button */}
                <Link href="/favourite" className="flex flex-col items-center">
                    <Star size={24} />
                </Link>
            </motion.nav>
        </div>
    );
}
