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

    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "bm");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
            setModalMessage(language === "bm" ? "Jawapan Betul! ✅" : "Correct Answer! ✅");
        } else {
            if (lives - 1 === 0) {
                setGameOver(true);
                setModalMessage(language === "bm" ? "Permainan Tamat ❌" : "Game Over ❌");
            } else {
                setLives(lives - 1);
                setModalMessage(language === "bm" ? "Jawapan Salah ❌" : "Wrong Answer ❌");
            }
        }
        setShowModal(true);
    };

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

    // ✅ Redirect to LessonComplete page after finishing
    useEffect(() => {
        if (finished) {
            setTimeout(() => {
                window.location.href = `/lesson-complete?score=${score}&total=${questions.length}`;
            }, 2000);
        }
    }, [finished]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <LessonNav currentQuestion={currentQuestion + 1} totalQuestions={questions.length} lives={lives} />

            {questions[currentQuestion].question_type === "ordered" ? (
                <OrderedQuestion question={questions[currentQuestion]} language={language} onAnswer={handleAnswer} />
            ) : (
                <MCQBinaryQuestion question={questions[currentQuestion]} language={language} onAnswer={handleAnswer} />
            )}

            {/* ✅ Modal Popup (Game Over / Next Question) */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                        <p className="text-xl font-bold">{modalMessage}</p>
                        <button
                            onClick={handleNextQuestion}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            {gameOver ? (language === "bm" ? "OK" : "OK") : language === "bm" ? "Teruskan" : "Continue"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
