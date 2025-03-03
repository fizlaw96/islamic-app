import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Menu, Bell, User, Settings, Star, Clipboard, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function Layout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "en"
    );

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
            bookmark: "Bookmark",
            home: "Home",
            profile: "Profile",
            quiz: "Quiz",
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
            bookmark: "Penanda",
            home: "Laman Utama",
            profile: "Profil",
            quiz: "Kuiz",
            settings: "Tetapan",
            favorite: "Kegemaran",
        },
    };

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-green-900 text-white' : 'bg-green-50 text-white'}`}>
            {/* Top Navbar */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between p-4 bg-green-600 dark:bg-green-800 text-white shadow-md"
            >
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
                    <Menu size={24} />
                </button>
                <h1 className="text-lg font-semibold">{translations[language].appName}</h1>
                <button className="p-2">
                    <Bell size={24} />
                </button>
            </motion.nav>

            {/* Sidebar with Slide-in and Slide-out Animation */}
            <motion.div
                initial={{ x: -200 }}
                animate={{ x: menuOpen ? 0 : -200 }}
                transition={{ duration: 0.3 }}
                className={`absolute left-0 top-16 w-64 h-screen bg-white dark:bg-green-800 shadow-md p-4 ${menuOpen ? 'block' : 'hidden'}`}
            >
                <ul>
                    <li className="p-2 border-b"><Link href="/history">{translations[language].history}</Link></li>
                    <li className="p-2 border-b"><Link href="/video">{translations[language].video}</Link></li>
                    <li className="p-2 border-b"><Link href="/question">{translations[language].question}</Link></li>
                    <li className="p-2 border-b"><Link href="/daily-reminder">{translations[language].dailyReminder}</Link></li>
                    <li className="p-2 border-b"><Link href="/ask-question">{translations[language].askQuestion}</Link></li>
                    <li className="p-2 border-b"><Link href="/donate">{translations[language].donate}</Link></li>
                    <li className="p-2"><Link href="/bookmark">{translations[language].bookmark}</Link></li>
                </ul>
            </motion.div>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6">
                {children}
            </main>

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
                <Link href="/profile" className="flex flex-col items-center">
                    <User size={24} />
                    <span className="text-xs">{translations[language].profile}</span>
                </Link>
                <Link href="/quiz" className="flex flex-col items-center">
                    <Clipboard size={24} />
                    <span className="text-xs">{translations[language].quiz}</span>
                </Link>
                <Link href="/settings" className="flex flex-col items-center">
                    <Settings size={24} />
                    <span className="text-xs">{translations[language].settings}</span>
                </Link>
                <Link href="/favorite" className="flex flex-col items-center">
                    <Star size={24} />
                    <span className="text-xs">{translations[language].favorite}</span>
                </Link>
            </motion.nav>
        </div>
    );
}
