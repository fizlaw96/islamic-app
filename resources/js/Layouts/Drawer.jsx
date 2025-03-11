import React from "react";
import { motion } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import {
    Book, CalendarCheck, HelpCircle, MessageSquare, Heart, LogIn, UserPlus, User, LogOut, FileText
} from "lucide-react";

export default function Drawer({ menuOpen, setMenuOpen, translations, language }) {
    const { auth } = usePage().props; // Get user auth details from Inertia

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: menuOpen ? 0 : -270 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-16 w-64 h-screen bg-white dark:bg-green-800 shadow-md p-4 z-50 flex flex-col justify-between"
        >
            {/* ✅ User Profile or Login/Register Section */}
            <div className="pt-3 space-y-2">
                {auth?.user ? (
                    <>
                        {/* ✅ User Profile Info */}
                        <div className="flex flex-col items-center text-white">
                            <img
                                src={auth.user.profile_image || "/assets/avatars/avatar.png"} // Use profile image or default
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                            />
                            <Link href={route("dashboard")}>
                                <p className="mt-2 font-bold text-lg transition-all duration-200 transform hover:scale-105 hover:text-green-300">
                                    {auth.user.name}
                                </p>
                            </Link>
                            <p className="text-sm opacity-75">{auth.user.email}</p>
                        </div>

                        {/* ✅ Logout Button */}
                        <div>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-red-600 w-full justify-center"
                            >
                                <LogOut size={20} /> {translations[language]?.logout || "Log Out"}
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        {/* ✅ Login & Register Buttons */}
                        <Link
                            href="/login"
                            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-blue-700 w-full justify-center"
                        >
                            <LogIn size={20} /> {translations[language]?.login || "Login"}
                        </Link>
                        <Link
                            href="/register"
                            className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-green-600 w-full justify-center"
                        >
                            <UserPlus size={20} /> {translations[language]?.register || "Register"}
                        </Link>
                    </>
                )}
            </div>

            {/* ✅ Navigation Links */}
            <ul className="space-y-2 text-white flex-1">
                {/* ✅ Admin Section */}
                {auth?.user?.role === "admin" && (
                    <>
                        <hr className="border-gray-400 my-2" />
                        <span className="text-gray-300 text-sm font-semibold uppercase tracking-wide block px-2">
                            📌 {translations[language]?.adminSection || "Admin"}
                        </span>
                        <li className="p-2 border-b flex items-center gap-2">
                            <FileText size={20} />
                            <Link href={route("admin.islamic-contents.index")}>
                                {translations[language]?.adminIslamicContent || "Islamic Content"}
                            </Link>
                        </li>
                    </>
                )}

                {/* ✅ Other Navigation Links */}
                <li className="p-2 border-b flex items-center gap-2">
                    <Book size={20} />
                    <Link href="/history">{translations[language]?.history || "History"}</Link>
                </li>
                <li className="p-2 border-b flex items-center gap-2">
                    <CalendarCheck size={20} />
                    <Link href="/daily-reminder">{translations[language]?.dailyReminder || "Daily Reminder"}</Link>
                </li>
                <li className="p-2 border-b flex items-center gap-2">
                    <HelpCircle size={20} />
                    <Link href="/question">{translations[language]?.question || "Question"}</Link>
                </li>
                {auth?.user && (
                    <li className="p-2 border-b flex items-center gap-2">
                        <MessageSquare size={20} />
                        <Link href="/ask-question">{translations[language]?.askQuestion || "Ask Question"}</Link>
                    </li>
                )}
                <li className="p-2 border-b flex items-center gap-2">
                    <Heart size={20} className="text-red-500" />
                    <Link href="/donate">{translations[language]?.donate || "Donate"}</Link>
                </li>
            </ul>
            <br />
        </motion.div>
    );
}
