import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Layout from "../Layouts/Layout";

export default function Setting() {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "en"
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

        // Reload the page to apply changes globally
        setTimeout(() => {
            window.location.reload();
        }, 100); // Small delay to ensure the setting is saved before reload
    };

    const changeLanguage = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        localStorage.setItem("language", selectedLanguage);
        window.dispatchEvent(new Event("storage")); // Notify all components
    };

    const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
    const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));

    const translations = {
        en: {
            darkMode: "Dark Mode",
            language: "Language",
            fontSize: "Font Size",
        },
        bm: {
            darkMode: "Mod Gelap",
            language: "Bahasa",
            fontSize: "Saiz Font",
        },
    };

    return (
        <Layout>
            <div className="w-full max-w-lg mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    {language === "bm" ? "Tetapan" : "Setting"}
                </h1>

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg text-white">
                    <span>{translations[language].darkMode}</span>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </button>
                </div>

                {/* Language Selection */}
                <div className="flex items-center justify-between mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg text-white">
                    <span>{translations[language].language}</span>
                    <select
                        value={language}
                        onChange={changeLanguage}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                    >
                        <option value="en">English</option>
                        <option value="bm">Bahasa Melayu</option>
                    </select>
                </div>

                {/* Font Size Control */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg text-white">
                    <span>{translations[language].fontSize}</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={decreaseFontSize}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                        >
                            A-
                        </button>
                        <span className="text-lg font-semibold">{fontSize}px</span>
                        <button
                            onClick={increaseFontSize}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                        >
                            A+
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
