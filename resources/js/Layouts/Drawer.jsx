import React from "react";
import { motion } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import { Book, CalendarCheck, HelpCircle, MessageSquare, Heart, LogIn, UserPlus, User } from "lucide-react"; // Added User Icon

export default function Drawer({ menuOpen, setMenuOpen, translations, language }) {
    const { auth } = usePage().props; // Get user auth details from Inertia

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: menuOpen ? 0 : -270 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-16 w-64 h-screen bg-white dark:bg-green-800 shadow-md p-4 z-50"
        >
            {/* ✅ User Profile or Login/Register Section */}
            <div className="pt-3 space-y-2">
                {auth.user ? (
                    // ✅ If user is logged in, show profile
                    <div className="flex flex-col items-center text-white">
                        <img
                            src={auth.user.profile_image || "/assets/avatars/avatar.png"} // Use profile image or default
                            alt="User Avatar"
                            className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                        />
                        <p className="mt-2 font-bold text-lg">{auth.user.name}</p>
                        <p className="text-sm opacity-75">{auth.user.email}</p>
                    </div>
                ) : (
                    // ✅ If user is not logged in, show Login & Register buttons
                    <>
                        <Link
                            href="/login"
                            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-blue-700 w-full justify-center"
                        >
                            <LogIn size={20} /> {translations[language].login}
                        </Link>
                        <Link
                            href="/register"
                            className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-green-600 w-full justify-center"
                        >
                            <UserPlus size={20} /> {translations[language].register}
                        </Link>
                    </>
                )}
            </div>
            <br />

            {/* ✅ Navigation Links */}
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
        </motion.div>
    );
}
