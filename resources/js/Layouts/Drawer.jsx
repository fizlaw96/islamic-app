import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { Book, CalendarCheck, HelpCircle, MessageSquare, Heart, LogIn, UserPlus } from "lucide-react"; // Added icons

export default function Drawer({ menuOpen, setMenuOpen, translations, language }) {
    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: menuOpen ? 0 : -270 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-16 w-64 h-screen bg-white dark:bg-green-800 shadow-md p-4 z-50"
        >
            {/* Navigation Links */}
            <ul className="space-y-2 text-white">
                <li className="p-2 border-b flex items-center gap-2">
                    <Book size={20} />
                    <Link href="/history">{translations[language].history}</Link>
                </li>
                <li className="p-2 border-b flex items-center gap-2">
                    <CalendarCheck size={20} />
                    <Link href="/daily-reminder">{translations[language].dailyReminder}</Link>
                </li>
                <li className="p-2 border-b flex items-center gap-2">
                    <HelpCircle size={20} />
                    <Link href="/question">{translations[language].question}</Link>
                </li>
                <li className="p-2 border-b flex items-center gap-2">
                    <MessageSquare size={20} />
                    <Link href="/ask-question">{translations[language].askQuestion}</Link>
                </li>
                <li className="p-2 border-b flex items-center gap-2">
                    <Heart size={20} className="text-red-500" />
                    <Link href="/donate">{translations[language].donate}</Link>
                </li>
            </ul>

            {/* Login & Register Buttons (Directly Below Donate Button) */}
            <div className="pt-3 space-y-2">
                <Link
                    href="/login"
                    className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-blue-700 w-full justify-center"
                >
                    <LogIn size={20} /> {translations[language].login} Login
                </Link>
                <Link
                    href="/register"
                    className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-green-600 w-full justify-center"
                >
                    <UserPlus size={20} /> {translations[language].register} Register
                </Link>
            </div>
        </motion.div>
    );
}
