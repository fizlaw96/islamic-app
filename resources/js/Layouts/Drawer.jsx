import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function Drawer({ menuOpen, setMenuOpen, translations, language }) {
    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: menuOpen ? 0 : -250 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-16 w-64 h-screen bg-white dark:bg-green-800 shadow-md p-4 z-50"
        >
            <ul className="space-y-2 text-white">
                <li className="p-2 border-b"><Link href="/history">{translations[language].history}</Link></li>
                <li className="p-2 border-b"><Link href="/question">{translations[language].question}</Link></li>
                <li className="p-2 border-b"><Link href="/daily-reminder">{translations[language].dailyReminder}</Link></li>
                <li className="p-2 border-b"><Link href="/ask-question">{translations[language].askQuestion}</Link></li>
                <li className="p-2 border-b"><Link href="/donate">{translations[language].donate}</Link></li>
            </ul>
        </motion.div>
    );
}
