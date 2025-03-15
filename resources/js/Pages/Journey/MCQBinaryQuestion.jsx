import React, { useState, useEffect } from "react";

export default function MCQBinaryQuestion({ question, language, onAnswer }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    useEffect(() => {
        setShuffledOptions(shuffleArray([...question.options]));
        setSelectedOption(null);
    }, [question]);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleSubmit = () => {
        if (!selectedOption) return;
        onAnswer(selectedOption.is_correct);
    };

    return (
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center text-black dark:text-black transition-all duration-200">
            <p className="text-lg mb-4 text-white">
                {language === "bm" ? question.question_text_bm : question.question_text_en}
            </p>

            <div className="grid gap-2">
                {shuffledOptions.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedOption(option)}
                        className={`p-3 border rounded-lg transition-all duration-200 ${
                            selectedOption === option
                                ? "bg-blue-500 text-white dark:bg-blue-600"
                                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                        }`}
                    >
                        {language === "bm" ? option.option_text_bm : option.option_text_en}
                    </button>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className={`mt-4 px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedOption
                        ? "bg-green-500 text-white dark:bg-green-600"
                        : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                }`}
            >
                {language === "bm" ? "Jawab" : "Answer"}
            </button>
        </div>
    );
}
