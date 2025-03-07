import React, { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import LessonNav from "./LessonNav";

export default function LessonMain() {
    const { lesson, questions } = usePage().props;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [lives, setLives] = useState(3);
    const [selectedOption, setSelectedOption] = useState(null);
    const [message, setMessage] = useState("");
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // ✅ Listen for language changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setLanguage(localStorage.getItem("language") || "bm");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleSubmit = () => {
        if (!selectedOption) return;

        const isCorrect = selectedOption.is_correct;

        if (isCorrect) {
            setModalMessage(language === "bm" ? "Jawapan Betul! ✅" : "Correct Answer! ✅");
        } else {
            setLives(lives - 1);
            setModalMessage(language === "bm" ? "Jawapan Salah ❌" : "Wrong Answer ❌");

            if (lives - 1 === 0) {
                setTimeout(() => {
                    window.location.href = "/journey"; // Redirect if all hearts lost
                }, 2000);
                return;
            }
        }

        setShowModal(true); // ✅ Show modal before proceeding
    };

    const handleNextQuestion = () => {
        setShowModal(false); // Close modal
        setSelectedOption(null);

        if (selectedOption?.is_correct) {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setMessage(language === "bm" ? "Tahniah! Anda Berjaya! 🎉" : "Congratulations! 🎉");
                setTimeout(() => {
                    window.location.href = "/journey"; // Redirect to journey after finishing
                }, 2000);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <LessonNav
                currentQuestion={currentQuestion + 1}
                totalQuestions={questions.length}
                lives={lives}
            />

            <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">
                    {language === "bm" ? lesson.title_bm : lesson.title_en}
                </h2>
                <p className="text-lg mb-4">
                    {language === "bm" ? questions[currentQuestion].question_text_bm : questions[currentQuestion].question_text_en}
                </p>

                <div className="grid gap-2">
                    {questions[currentQuestion].options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedOption(option)}
                            className={`p-3 border rounded-lg ${
                                selectedOption === option ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            {language === "bm" ? option.option_text_bm : option.option_text_en}
                        </button>
                    ))}
                </div>

                {message && <p className="mt-4 text-lg">{message}</p>}

                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    {language === "bm" ? "Jawab" : "Answer"}
                </button>
            </div>

            {/* ✅ Modal Popup */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                        <p className="text-xl font-bold">{modalMessage}</p>
                        <button
                            onClick={handleNextQuestion}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            {language === "bm" ? "Saya Faham" : "I Understand"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
