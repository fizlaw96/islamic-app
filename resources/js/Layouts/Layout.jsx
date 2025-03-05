import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Menu, Bell, User, Settings, Star, Clipboard, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function Layout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

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
            {/* Top Navbar */}
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
                    <img src="/assets/button/name.png" alt="App Name" className="h-8 w-auto" />
                </h1>
                <button className="p-2">
                    <Bell size={24} />
                </button>
            </motion.nav>

            {/* Sidebar Drawer (Higher z-index to prevent navbar interference) */}
            <motion.div
                initial={{ x: -250 }}
                animate={{ x: menuOpen ? 0 : -250 }}
                transition={{ duration: 0.3 }}
                className={`fixed left-0 top-16 w-64 h-screen bg-white dark:bg-green-800 shadow-md p-4 z-50`}
            >
                <ul className="space-y-2">
                    <li className="p-2 border-b"><Link href="/history">{translations[language].history}</Link></li>
                    <li className="p-2 border-b"><Link href="/video">{translations[language].video}</Link></li>
                    <li className="p-2 border-b"><Link href="/question">{translations[language].question}</Link></li>
                    <li className="p-2 border-b"><Link href="/daily-reminder">{translations[language].dailyReminder}</Link></li>
                    <li className="p-2 border-b"><Link href="/ask-question">{translations[language].askQuestion}</Link></li>
                    <li className="p-2 border-b"><Link href="/donate">{translations[language].donate}</Link></li>
                </ul>
            </motion.div>

            {/* Main Content (Adds padding to prevent navbar overlap) */}
            <main className="flex-1 pt-16 p-6">{children}</main>

            {/* Bottom Navbar */}
            <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed bottom-0 w-full bg-green-600 dark:bg-green-800 text-white shadow-md p-4 flex justify-around"
            >
                <Link href="/" className="flex flex-col items-center">
                    <Home size={24} />
                    <span className="text-xs">{translations[language].home}</span>
                </Link>
                <Link href={route("journey")} className="flex flex-col items-center">
                    <img src="/assets/button/journey.png" alt="Journey Icon" className="w-8 h-8" />
                    <span className="text-xs">{translations[language].journey}</span>
                </Link>
                <Link href="/settings" className="flex flex-col items-center">
                    <Settings size={24} />
                    <span className="text-xs">{translations[language].settings}</span>
                </Link>
                <Link href="/favourite" className="flex flex-col items-center">
                    <Star size={24} />
                    <span className="text-xs">{translations[language].favorite}</span>
                </Link>
            </motion.nav>
        </div>
    );
}
