import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Layout from "../Layouts/Layout";

export default function Lesson() {
    const { props } = usePage();
    const { lesson, questions } = props; // Get lesson & questions from Inertia
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm"); // Default to BM

    if (!lesson) {
        return (
            <Layout>
                <div className="p-6 text-center">
                    <h1 className="text-xl font-bold text-red-500">Lesson not found</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 max-w-4xl mx-auto mb-20">
                {/* ✅ Language Toggle */}
                <div className="flex justify-end mb-4">
                    <button onClick={() => setLanguage("bm")} className={`px-4 py-2 rounded-l-lg ${language === "bm" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                        BM
                    </button>
                    <button onClick={() => setLanguage("en")} className={`px-4 py-2 rounded-r-lg ${language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                        EN
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {language === "bm" ? lesson.title_bm : lesson.title_en}
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    {language === "bm" ? lesson.description_bm : lesson.description_en}
                </p>

                {/* ✅ Show Questions */}
                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {language === "bm" ? question.question_text_bm : question.question_text_en}
                            </h2>

                            {/* ✅ Multiple Choice (MCQ) */}
                            {question.question_type === "mcq" && (
                                <div className="space-y-2">
                                    {question.options.map((option, idx) => (
                                        <label key={idx} className="block p-2 border rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                                            <input type="radio" name={`question-${question.id}`} className="mr-2" />
                                            {language === "bm" ? option.option_text_bm : option.option_text_en}
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* ✅ Binary Question (Yes/No, Halal/Haram) */}
                            {question.question_type === "binary" && (
                                <div className="flex gap-4">
                                    {question.options.map((option, idx) => (
                                        <label key={idx} className="block px-4 py-2 border rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                                            <input type="radio" name={`question-${question.id}`} className="mr-2" />
                                            {language === "bm" ? option.option_text_bm : option.option_text_en}
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* ✅ Ordered Question (Reordering) */}
                            {question.question_type === "ordered" && (
                                <div className="space-y-2">
                                    {question.options
                                        .sort((a, b) => a.order - b.order) // Ensure correct order
                                        .map((option, idx) => (
                                            <div key={idx} className="p-2 border rounded-lg bg-gray-100 dark:bg-gray-700">
                                                {idx + 1}. {language === "bm" ? option.option_text_bm : option.option_text_en}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
