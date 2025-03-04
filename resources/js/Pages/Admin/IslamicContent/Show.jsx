import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function Show() {
    const { content } = usePage().props;

    return (
        <Layout>
            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {content.topic_en} ({content.topic_bm})
                </h1>

                <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Category (BM):</strong> {content.category_bm}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Category (EN):</strong> {content.category_en}
                    </p>
                </div>

                <hr className="my-4 border-gray-300 dark:border-gray-600" />

                {/* Content Sections */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Content (BM)</h2>
                    <p className="text-gray-700 dark:text-gray-300">{content.content_bm}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Content (EN)</h2>
                    <p className="text-gray-700 dark:text-gray-300">{content.content_en}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                    <Link
                        href={route("admin.islamic-contents.edit", content.id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                        ✏️ Edit
                    </Link>

                    <Link
                        href={route("admin.islamic-contents.index")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        ← Back to List
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
