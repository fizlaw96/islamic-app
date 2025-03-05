import React from "react";
import { usePage } from "@inertiajs/react";
import Layout from "../Layouts/Layout";

export default function Lesson() {
    const { props } = usePage();
    const { lesson, questions } = props; // Get lesson & questions from Inertia

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
                <h1 className="text-3xl font-bold text-white dark:text-black mb-4">{lesson.title}</h1>
                <p className="text-lg text-white dark:text-black mb-6">{lesson.description}</p>

                {/* ✅ Show Questions */}
                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{question.question_text}</h2>

                            {/* ✅ Multiple Choice (MCQ) */}
                            {question.question_type === "mcq" && (
                                <div className="space-y-2">
                                    {question.options.map((option, idx) => (
                                        <label key={idx} className="block p-2 border rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                                            <input type="radio" name={`question-${question.id}`} className="mr-2" />
                                            {option.option_text}
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
                                            {option.option_text}
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
                                            <div key={idx} className="p-2 border rounded-lg bg-white dark:bg-gray-700">
                                                {idx + 1}. {option.option_text}
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
