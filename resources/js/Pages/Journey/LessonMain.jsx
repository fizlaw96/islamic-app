import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import LessonNav from "./LessonNav";
import MCQBinaryQuestion from "./MCQBinaryQuestion";
import OrderedQuestion from "./OrderedQuestion";

export default function LessonMain() {
    const { lesson, questions } = usePage().props;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [finished, setFinished] = useState(false);
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

    const handleAnswer = (isCorrect) => {
        const wrongAnswersBM = [
            "Cuba lagi dengan lebih fokus!",
            "Oops! Itu bukan jawapan yang betul. Jangan putus asa!",
            "Hmm... Salah kali ini, tapi anda semakin hampir!",
            "Tidak mengapa, ini peluang untuk belajar!",
            "Salah kali ini, tapi cuba fikir dengan lebih teliti!"
        ];

        const wrongAnswersEN = [
            "Try again with more focus!",
            "Oops! That’s not the correct answer. Don’t give up!",
            "Hmm… Wrong this time, but you're getting closer!",
            "It’s okay, this is a chance to learn!",
            "Wrong this time, but try thinking more carefully!"
        ];

        if (isCorrect) {
            setScore(score + 1);
            setModalMessage(language === "bm" ? "Jawapan Betul! ✅" : "Correct Answer! ✅");
        } else {
            if (lives - 1 === 0) {
                setGameOver(true);
                setFinished(true); // ✅ Trigger finish state
            } else {
                setLives(lives - 1);
                const randomWrongMessage = language === "bm"
                    ? (
                        <>
                            <strong className="block text-red-500 text-xl">❌ Jawapan Salah!</strong>
                            <span className="text-gray-800">{wrongAnswersBM[Math.floor(Math.random() * wrongAnswersBM.length)]}</span>
                        </>
                    )
                    : (
                        <>
                            <strong className="block text-red-500 text-xl">❌ Wrong Answer!</strong>
                            <span className="text-gray-800">{wrongAnswersEN[Math.floor(Math.random() * wrongAnswersEN.length)]}</span>
                        </>
                    );
                setModalMessage(randomWrongMessage);
            }
        }
        setShowModal(true);
    };

    // ✅ Redirect to LessonComplete page after finishing
    useEffect(() => {
        if (finished) {
            setTimeout(() => {
                window.location.href = `/lesson-complete?score=${score}&total=${questions.length}`;
            }, 1000);
        }
    }, [finished]);

    const handleNextQuestion = () => {
        setShowModal(false);

        if (gameOver) {
            window.location.href = "/journey"; // Redirect after Game Over confirmation
            return;
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setFinished(true);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-6
            ${darkMode ? "bg-gray-900" : "bg-gray-100"} text-black`}>

            <LessonNav currentQuestion={currentQuestion + 1} totalQuestions={questions.length} lives={lives} />

            {questions[currentQuestion].question_type === "ordered" ? (
                <OrderedQuestion question={questions[currentQuestion]} language={language} onAnswer={handleAnswer} />
            ) : (
                <MCQBinaryQuestion question={questions[currentQuestion]} language={language} onAnswer={handleAnswer} />
            )}

            {/* ✅ Modal Popup (Game Over / Next Question) */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`p-6 rounded-lg shadow-lg text-center max-w-sm bg-white text-black`}>
                        <p className="text-xl font-bold">{modalMessage}</p>
                        <button
                            onClick={handleNextQuestion}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            {gameOver ? (language === "bm" ? "OK" : "OK") : language === "bm" ? "Teruskan" : "Continue"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
