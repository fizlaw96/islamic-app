import React from "react";
import { usePage, Link } from "@inertiajs/react";
import Layout from "../../Layouts/Layout"; // ✅ Import Layout

export default function LessonComplete() {
    const { score, total } = usePage().props;
    const percentage = Math.round((score / total) * 100);

    return (
        <Layout>
            {/* ✅ Full-page Centered Container (No Scroll) */}
            <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
                <div className="text-center p-6 max-w-lg">
                    {/* ✅ Responsive Heading */}
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        🎉 {percentage === 100 ? "Hebat! Semua Betul!" : "Tahniah Anda Berjaya!"} 🎉
                    </h1>

                    {/* ✅ Score Percentage */}
                    <p className="text-lg sm:text-xl mt-2">
                        Anda mendapat <span className="font-bold">{percentage}%</span> markah.
                    </p>

                    {/* ✅ Space Below the Text */}
                    <div className="mt-8">
                        {/* ✅ Button - Lowered for better spacing */}
                        <Link href="/journey" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md
                            hover:bg-blue-600 transition-all duration-200 text-lg w-full sm:w-auto">
                            Kembali ke Perjalanan
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
