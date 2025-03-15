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
    const [streak, setStreak] = useState(0);
    const [showStreakFire, setShowStreakFire] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

    const correctSound = new Audio("/storage/assets/mp3/correct.mp3");
    const wrongSound = new Audio("/storage/assets/mp3/wrong.mp3");

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "bm");
            setDarkMode(localStorage.getItem("darkMode") === "true");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    useEffect(() => {
        if (startTime) {
            const timer = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [startTime]);

    const handleAnswer = (correct) => {
        setIsCorrect(correct);
        setShowModal(true);

        if (correct) {
            correctSound.play(); // ✅ Play correct answer sound
            setScore((prevScore) => prevScore + 1);
            setStreak((prevStreak) => prevStreak + 1);

            if (streak + 1 >= 2) {
                setShowStreakFire(true);
            }

            setModalMessage(language === "bm" ? "Jawapan Betul!" : "Correct Answer!");
        } else {
            wrongSound.play(); // ❌ Play wrong answer sound
            setStreak(0);
            setShowStreakFire(false);

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
                window.location.href = `/lesson-complete?lesson_id=${lesson.id}&score=${score}&total=${questions.length}&time=${elapsedTime}`;
            }, 2000);
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
            ${darkMode ? "bg-gray-900 text-black" : "bg-gray-100 text-black"}`}>

            <LessonNav currentQuestion={currentQuestion + 1} totalQuestions={questions.length} lives={lives} />

            {/* 🔥 Streak Fire Effect */}
            {showStreakFire && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-10 text-3xl font-bold text-orange-500 animate-pulse"
                >
                    🔥 Streak {streak}!
                </motion.div>
            )}

            {questions[currentQuestion].question_type === "ordered" ? (
                <OrderedQuestion question={questions[currentQuestion]} language={language} onAnswer={handleAnswer} />
            ) : (
                <MCQBinaryQuestion question={questions[currentQuestion]} language={language} onAnswer={handleAnswer} />
            )}

            {/* ✅ Modal Popup */}
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
