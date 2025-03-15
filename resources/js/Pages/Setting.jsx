import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Layout from "../Layouts/Layout";

export default function Setting() {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "bm"
    );
    const [fontSize, setFontSize] = useState(
        parseInt(localStorage.getItem("fontSize")) || 16
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`;
        localStorage.setItem("fontSize", fontSize);
    }, [fontSize]);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", newDarkMode);
        document.documentElement.classList.toggle("dark", newDarkMode);

        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    const changeLanguage = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem("language", selectedLanguage);
        window.dispatchEvent(new Event("storage"));
    };

    const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
    const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));

    const translations = {
        en: { darkMode: "Dark Mode", language: "Language", fontSize: "Font Size" },
        bm: { darkMode: "Mod Gelap", language: "Bahasa", fontSize: "Saiz Font" },
    };

    return (
        <Layout>
            <div className="w-full max-w-xl mx-auto p-4 sm:p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {language === "bm" ? "Tetapan" : "Setting"}
                </h1>

                {/* ✅ Dark Mode Toggle */}
                <div className="flex items-center justify-between mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg text-black dark:text-white">
                    <span className="break-words">{translations[language].darkMode}</span>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>

                {/* ✅ Language Selection */}
                <div className="flex items-center justify-between mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg text-black dark:text-white">
                    <span className="break-words">{translations[language].language}</span>
                    <select
                        value={language}
                        onChange={changeLanguage}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                    >
                        <option value="en">English</option>
                        <option value="bm">Bahasa Melayu</option>
                    </select>
                </div>

                {/* ✅ Font Size Control */}
                <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg text-black dark:text-white">
                    <span className="break-words">{translations[language].fontSize}</span>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                        {/* ✅ Decrease Font Size */}
                        <button
                            onClick={decreaseFontSize}
                            className="p-2 min-w-[40px] bg-gray-200 dark:bg-gray-700 rounded-lg text-lg"
                        >
                            A-
                        </button>

                        {/* ✅ Display Current Font Size */}
                        <span className="text-lg font-semibold min-w-[50px] text-center">
                            {fontSize}px
                        </span>

                        {/* ✅ Increase Font Size */}
                        <button
                            onClick={increaseFontSize}
                            className="p-2 min-w-[40px] bg-gray-200 dark:bg-gray-700 rounded-lg text-lg"
                        >
                            A+
                        </button>

                        {/* ✅ Reset Font Size */}
                        <button
                            onClick={() => setFontSize(16)}
                            className="p-2 bg-red-500 text-white rounded-lg min-w-[60px] text-sm"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
