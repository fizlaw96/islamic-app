import React, { useState, useEffect } from "react";

export default function MCQBinaryQuestion({ question, language, onAnswer }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false); // Tracks if answer has been submitted

    useEffect(() => {
        setShuffledOptions(shuffleArray([...question.options]));
        setSelectedOption(null);
        setIsAnswered(false); // Reset answered state when new question loads
    }, [question]);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleSubmit = () => {
        if (!selectedOption || isAnswered) return; // Prevent submission if already answered
        setIsAnswered(true); // Disable button after submission
        onAnswer(selectedOption.is_correct);
    };

    return (
        <div className="max-w-2xl w-full bg-white dark:bg-white p-6 rounded-lg shadow-lg text-center text-black dark:text-black transition-all duration-200">
            <p className="text-lg mb-4 text-black">
                {language === "bm" ? question.question_text_bm : question.question_text_en}
            </p>

            <div className="grid gap-2">
                {shuffledOptions.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedOption(option)}
                        disabled={isAnswered} // Disable options after answering
                        className={`p-3 border rounded-lg transition-all duration-200 ${
                            selectedOption === option
                                ? "bg-blue-500 text-white dark:bg-blue-600"
                                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                        } ${isAnswered ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 dark:hover:bg-blue-500"}`}
                    >
                        {language === "bm" ? option.option_text_bm : option.option_text_en}
                    </button>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={!selectedOption || isAnswered} // Disable if no selection OR already answered
                className={`mt-6 w-full px-6 py-3 text-lg font-semibold flex items-center justify-center gap-3 rounded-xl transition-all duration-200 ${
                    selectedOption && !isAnswered
                        ? "bg-green-500 text-white dark:bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-50"
                }`}
            >
                {language === "bm" ? "Jawab" : "Answer"}
            </button>
        </div>
    );
}
