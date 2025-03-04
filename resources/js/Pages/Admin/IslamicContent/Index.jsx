import React from "react";
import { Link, usePage, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function Index() {
    const { contents } = usePage().props;
    const { delete: destroy } = useForm(); // Inertia delete function

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this content?")) {
            destroy(route("admin.islamic-contents.destroy", id));
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Islamic Content Management</h1>

                {/* ✅ Add New Content Button */}
                <Link
                    href={route("admin.islamic-contents.create")}
                    className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add New Content
                </Link>

                {/* ✅ Content Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Topic (BM)</th>
                                <th className="border p-2">Title (BM)</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contents.length > 0 ? (
                                contents.map((content) => (
                                    <tr key={content.id} className="border">
                                        <td className="p-2">{content.topic_bm}</td> {/* ✅ Topic BM */}
                                        <td className="p-2">{content.title_bm}</td> {/* ✅ Title BM */}
                                        <td className="p-2 flex flex-wrap gap-2">
                                            {/* ✅ Edit Button */}
                                            <Link
                                                href={route("admin.islamic-contents.edit", content.id)}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </Link>

                                            {/* ✅ View Button */}
                                            <Link
                                                href={route("admin.islamic-contents.show", content.id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                View
                                            </Link>

                                            {/* ✅ Delete Button with Confirmation */}
                                            <button
                                                onClick={() => handleDelete(content.id)}
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center text-gray-500">
                                        No content found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
