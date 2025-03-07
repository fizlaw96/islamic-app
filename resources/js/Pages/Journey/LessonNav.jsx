import React from "react";
import { usePage, Link } from "@inertiajs/react";

export default function LessonNav({ currentQuestion, totalQuestions, lives }) {
    return (
        <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800 text-white">
            {/* Progress Indicator */}
            <span className="text-lg font-bold">Soalan {currentQuestion}/{totalQuestions}</span>

            {/* Heart Lives */}
            <div className="flex gap-2">
                {[...Array(3)].map((_, index) => (
                    <span key={index} className={`text-2xl ${index < lives ? "text-red-500" : "text-gray-500"}`}>
                        ❤️
                    </span>
                ))}
            </div>

            {/* Back to Journey when hearts run out */}
            {lives === 0 && (
                <Link href="/journey" className="bg-red-500 text-white px-4 py-2 rounded">
                    Cuba Lagi
                </Link>
            )}
        </div>
    );
}
