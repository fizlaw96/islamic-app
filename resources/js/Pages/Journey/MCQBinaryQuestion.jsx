import React, { useState, useEffect } from "react";

export default function MCQBinaryQuestion({ question, language, onAnswer }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    // Shuffle options whenever the question changes
    useEffect(() => {
        setShuffledOptions(shuffleArray([...question.options]));
        setSelectedOption(null); // Reset selected option when question changes
    }, [question]);

    // Function to shuffle options randomly
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleSubmit = () => {
        if (!selectedOption) return;
        onAnswer(selectedOption.is_correct);
    };

    return (
        <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">
                {language === "bm" ? question.question_text_bm : question.question_text_en}
            </p>

            <div className="grid gap-2">
                {shuffledOptions.map((option, idx) => (
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

            <button
                onClick={handleSubmit}
                disabled={!selectedOption} // Reset on question change
                className={`mt-4 px-4 py-2 rounded-lg ${
                    selectedOption ? "bg-green-500 text-white" : "bg-gray-400 cursor-not-allowed"
                }`}
            >
                {language === "bm" ? "Jawab" : "Answer"}
            </button>
        </div>
    );
}
