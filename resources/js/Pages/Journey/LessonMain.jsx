import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import LessonNav from "./LessonNav";
import MCQBinaryQuestion from "./MCQBinaryQuestion";
import OrderedQuestion from "./OrderedQuestion";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function LessonMain() {
    const { user, lesson, questions } = usePage().props;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [finished, setFinished] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "bm");
            setDarkMode(localStorage.getItem("darkMode") === "true");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleAnswer = (correct) => {
        setIsCorrect(correct);
        setShowModal(true);

        if (correct) {
            setScore((prevScore) => prevScore + 1);
            setModalMessage(language === "bm" ? "Jawapan Betul!" : "Correct Answer!");
        } else {
            if (lives - 1 === 0) {
                setGameOver(true);
                setFinished(true);
                setModalMessage(language === "bm" ? "Permainan Tamat!" : "Game Over!");
            } else {
                setLives(lives - 1);
                const wrongMessages = language === "bm"
                    ? ["Cuba lagi!", "Oops! Itu bukan jawapan yang betul.", "Salah kali ini, tapi cuba fikir lagi!"]
                    : ["Try again!", "Oops! That’s not correct.", "Wrong this time, but try thinking more!"];
                setModalMessage(wrongMessages[Math.floor(Math.random() * wrongMessages.length)]);
            }
        }
    };

    useEffect(() => {
        if (finished) {
            setTimeout(() => {
                window.location.href = `/lesson-complete?lesson_id=${lesson.id}&score=${score}&total=${questions.length}`;
            }, 5000);
        }
    }, [finished]);

    const handleNextQuestion = () => {
        setShowModal(false);

        if (gameOver) {
            window.location.href = "/journey";
            return;
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setFinished(true);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-6
            ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>

            <LessonNav currentQuestion={currentQuestion + 1} totalQuestions={questions.length} lives={lives} />

            {questions[currentQuestion].question_type === "ordered" ? (
                <OrderedQuestion question={questions[currentQuestion]} language={language} onAnswer={handleAnswer} />
            ) : (
                <MCQBinaryQuestion question={questions[currentQuestion]} language={language} onAnswer={handleAnswer} />
            )}

            {/* ✅ Modal Popup (Game Over / Next Question) */}
            {showModal && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-0 left-0 w-full flex justify-center bg-opacity-50"
                >
                    <div
                        className={`p-6 rounded-t-lg shadow-lg text-center max-w-sm w-full
                            ${isCorrect ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}
                    >
                        {/* Top Section with Icon and Message */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {isCorrect ? (
                                    <CheckCircle size={24} className="text-green-600" />
                                ) : (
                                    <XCircle size={24} className="text-red-600" />
                                )}
                                <p className="text-xl font-bold">{modalMessage}</p>
                            </div>
                        </div>

                        {/* ✅ Continue Button (Handles Last Question Properly) */}
                        <button
                            onClick={handleNextQuestion}
                            className={`mt-4 w-full py-3 rounded-lg text-white font-bold shadow-md
                                ${isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                        >
                            {finished ? (language === "bm" ? "Lihat Keputusan" : "View Results") : (language === "bm" ? "Teruskan" : "Continue")}
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
