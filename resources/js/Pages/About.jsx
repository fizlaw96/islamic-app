import React, { useState, useEffect } from "react";
import Layout from "../Layouts/Layout";

const About = () => {
    // Load language from localStorage or default to English
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() => {
        // Listen for language changes from other components or tabs
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "en");
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Function to change language and save to localStorage
    const changeLanguage = (newLang) => {
        localStorage.setItem("language", newLang);
        setLanguage(newLang);
    };

    return (
        <Layout>
            {/* 🔥 Hero Section with Gradient */}
            <div className="bg-gradient-to-r from-green-600 to-blue-500 text-white py-16 text-center">
                <div className="container mx-auto px-6">
                    {/* ✅ Logo & Icon Side by Side */}
                    <div className="flex items-center justify-center mb-6 animate-fade-in">
                        {/* Arabic Logo */}
                        <svg
                            width="200"
                            height="60"
                            viewBox="0 0 200 60"
                            fill="url(#animatedGradient)"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                {/* Animated Gradient */}
                                <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#34D399">
                                        <animate attributeName="stop-color" values="#34D399; #3B82F6; #9333EA; #EAB308; #34D399" dur="4s" repeatCount="indefinite"/>
                                    </stop>
                                    <stop offset="50%" stopColor="#3B82F6">
                                        <animate attributeName="stop-color" values="#3B82F6; #9333EA; #EAB308; #34D399; #3B82F6" dur="4s" repeatCount="indefinite"/>
                                    </stop>
                                    <stop offset="100%" stopColor="#9333EA">
                                        <animate attributeName="stop-color" values="#9333EA; #EAB308; #34D399; #3B82F6; #9333EA" dur="4s" repeatCount="indefinite"/>
                                    </stop>
                                </linearGradient>
                            </defs>

                            {/* Arabic Text for "Tafheem" with Animated Gradient */}
                            <text x="10" y="45" fontSize="45" fontWeight="bold" fill="url(#animatedGradient)" fontFamily="'Amiri', serif">
                                تفهيم
                            </text>
                        </svg>

                        {/* Icon: Bigger & Rounded */}
                        <img
                            src="/assets/button/logo.jpg"
                            alt="Tafheem Icon"
                            className="h-20 w-20 rounded-full shadow-lg border-4 border-white ml-4"
                        />
                    </div>

                    <h1 className="text-4xl font-bold mb-2">
                        {language === "bm" ? "Tentang Tafheem" : "About Tafheem"}
                    </h1>
                    <p className="text-lg text-white/90">
                        {language === "bm"
                            ? "Membantu pembelajaran Islam secara interaktif & mendalam."
                            : "Helping with interactive and in-depth Islamic learning."}
                    </p>
                </div>
            </div>

            {/* 🔥 Main Content */}
            <div className="container mx-auto px-6 py-12 space-y-10 animate-fade-in">
                {/* What We Offer Section */}
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-green-700">
                        {language === "bm" ? "Apa Yang Kami Tawarkan" : "What We Offer"}
                    </h2>
                    <ul className="list-disc ml-6 mt-3 text-gray-700 text-lg">
                        <li>{language === "bm" ? "Pembelajaran Islam langkah demi langkah" : "Step-by-step Islamic learning"}</li>
                        <li>{language === "bm" ? "Kuiz AI dan pembelajaran peribadi" : "AI-powered quizzes & personalized learning"}</li>
                        <li>{language === "bm" ? "Mendalami ajaran Islam, Tajwid, dan Fiqh" : "Deep dive into Islamic teachings, Tajwid & Fiqh"}</li>
                        <li>{language === "bm" ? "Kandungan interaktif untuk semua" : "Interactive content for everyone"}</li>
                    </ul>
                </div>

                {/* Our Mission Section */}
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-green-700">
                        {language === "bm" ? "Misi Kami" : "Our Mission"}
                    </h2>
                    <p className="text-lg text-gray-700 mt-3">
                        {language === "bm"
                            ? "Tafheem bertujuan untuk menjadikan pembelajaran Islam lebih mudah diakses oleh semua orang."
                            : "Tafheem aims to make Islamic learning accessible to everyone."}
                    </p>
                </div>

                {/* Contact Section */}
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-semibold text-green-700">
                        {language === "bm" ? "Hubungi Kami" : "Contact Us"}
                    </h2>
                    <p className="text-lg text-gray-700 mt-3">
                        {language === "bm" ? "Ada sebarang soalan? Hubungi kami di " : "Have any questions? Contact us at "}
                        <a href="mailto:support@tafheem.com" className="text-blue-600 font-semibold">
                            support@tafheem.com
                        </a>
                    </p>
                </div>

            </div>
        </Layout>
    );
};

export default About;
