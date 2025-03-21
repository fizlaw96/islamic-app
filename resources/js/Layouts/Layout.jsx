import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, HelpCircle, Settings, Star, User, FileText } from "lucide-react";
import { motion } from "framer-motion";
import moment from "moment-hijri";
import Drawer from "./Drawer";
import SpecialButton from "../UserComponents/SpecialButton";

export default function Layout({ children }) {
    const { url } = usePage();
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
    const [language, setLanguage] = useState("bm"); // Default to EN
    const [isSpecial, setIsSpecial] = useState(false); // Track if SpecialButton should be shown

    const isActive = (path) => url === new URL(path, window.location.origin).pathname;

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) setLanguage(storedLanguage);

        // Check for Hijri month for special button
        const todayHijri = moment().iMonth() + 1; // Get Hijri month
        if ([9, 10, 12].includes(todayHijri)) {
            setIsSpecial(true);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const translations = {
        en: {
            appName: "Islamic App",
            adminSection: "Admin",
            adminIslamicContent: "Islamic Content",
            dashboard: "Go to Dashboard",
            login: "Login",
            register: "Register",
            history: "History",
            dailyReminder: "Daily Reminder",
            question: "Question",
            askQuestion: "Ask Question",
            about: "About Us",
            logout: "Log Out",
            home: "Home",
            journey: "Journey",
            settings: "Settings",
            favorite: "Favorite",
            profile: "Profile",
            article: "Article",
        },
        bm: {
            appName: "Aplikasi Islam",
            adminSection: "Pentadbir",
            adminIslamicContent: "Kandungan Islam",
            dashboard: "Pergi ke Papan Pemuka",
            login: "Log Masuk",
            register: "Daftar",
            history: "Sejarah",
            dailyReminder: "Peringatan Harian",
            question: "Soalan",
            askQuestion: "Tanya Soalan",
            about: "Tentang Kami",
            logout: "Log Keluar",
            home: "Laman Utama",
            journey: "Modul",
            settings: "Tetapan",
            favorite: "Kegemaran",
            profile: "Profil",
            article: "Artikel",
        },
    };

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? "bg-green-900 text-white" : "bg-green-50 text-black"}`}>
            {/* ✅ Top Navbar */}
            <motion.nav
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between p-4 bg-green-600 dark:bg-green-800 text-white shadow-md fixed top-0 left-0 w-full z-50"
            >
                {/* Menu Button */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
                    <Menu size={24} />
                </button>

                {/* App Name */}
                <h1 className="flex justify-center items-center">
                    <img
                        src="/storage/assets/button/name.svg"
                        alt="App Name"
                        className="h-8 w-auto filter invert"
                    />
                </h1>

                {/* Settings Button */}
                <Link
                    href="/settings"
                    className={`flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-110 ${isSpecial ? "ml-10 sm:ml-10" : ""}`}
                >
                    <Settings size={24} />
                </Link>
            </motion.nav>

            {/* ✅ Sidebar Drawer */}
            <Drawer menuOpen={menuOpen} setMenuOpen={setMenuOpen} translations={translations} language={language} />

            {/* ✅ Overlay to close drawer when clicking outside */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm"
                ></div>
            )}

            {/* ✅ Main Content (Adds padding to prevent navbar overlap) */}
            <main className="flex-1 pt-16 p-6">{children}</main>

            {/* ✅ Bottom Navbar */}
            <motion.nav
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sticky bottom-0 w-full bg-green-600 dark:bg-green-800 text-white shadow-md p-3 flex items-center justify-between relative"
            >
                {/* ✅ Home (Article) */}
                <Link
                    href="/"
                    className={`flex flex-col items-center ml-4 sm:ml-10 transition-transform duration-200 ease-in-out hover:scale-110 ${
                        url === "/" ? "text-yellow-400" : "text-white"
                    }`}
                >
                    <FileText size={24} />
                    <span className="text-sm leading-tight">{translations[language]?.article || "Article"}</span>
                </Link>

                {/* ✅ Journey (Login Redirect) */}
                <Link
                    href={auth?.user ? route("journey.loggedin") : route("journey")}
                    className={`flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-110
                        mr-6 sm:mr-12 ${
                            isActive(route("journey")) || isActive(route("journey.loggedin")) ? "text-yellow-400" : "text-white"
                        }`}
                >
                    <img
                        src="/storage/assets/button/journey.svg"
                        alt="Journey Icon"
                        className={`w-8 h-8 transition-all duration-200 filter ${
                            isActive(route("journey")) || isActive(route("journey.loggedin"))
                                ? "invert-[75%] sepia-[90%] saturate-[500%] hue-rotate-[30deg] brightness-110 contrast-125"
                                : "invert brightness-90 opacity-75"
                        }`}
                    />
                    <span className="text-sm leading-tight">{translations[language]?.journey || "Journey"}</span>
                </Link>

                {/* ✅ Special Button (Only Renders If Exists) */}
                {isSpecial && (
                    <div className="absolute -top-4 sm:-top-4 left-1/2 transform -translate-x-1/2 animate-shine">
                        <SpecialButton />
                    </div>
                )}

                {/* ✅ Question */}
                <Link
                    href={route("question.index")}
                    className={`flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-110 ${
                        isActive(route("question.index")) ? "text-yellow-400" : "text-white"
                    }`}
                >
                    <HelpCircle size={24} />
                    <span className="text-sm leading-tight">{translations[language]?.question || "Question"}</span>
                </Link>

                {/* ✅ Profile (Dashboard/Login) */}
                <Link
                    href={auth?.user ? route("dashboard") : route("login")}
                    className={`flex flex-col items-center mr-4 sm:mr-10 transition-transform duration-200 ease-in-out hover:scale-110 ${
                        isActive(route("dashboard")) || isActive(route("login")) ? "text-yellow-400" : "text-white"
                    }`}
                >
                    <User size={24} />
                    <span className="text-sm leading-tight">{translations[language]?.profile || "Profile"}</span>
                </Link>
            </motion.nav>
        </div>
    );
}
