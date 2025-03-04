import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react"; // ✅ Import usePage
import Layout from "@/Layouts/Layout";
import Form from "./Form"; // ✅ Import the form

export default function Create() {
    const { categories = [] } = usePage().props; // ✅ Get categories from props

    const { data, setData, post, errors, processing } = useForm({
        topic_bm: "",
        topic_en: "",
        title_bm: "",
        title_en: "",
        category_bm: "",
        category_en: "",
        content_bm: "",
        content_en: "",
        slug: "",
        banner: null,
        media: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.islamic-contents.store"), {
            data,
            onSuccess: () => window.location.href = route("admin.islamic-contents.index"),
        });
    };

    return (
        <Layout>
            <div className="p-6 mb-20">
                <Link
                    href={route("admin.islamic-contents.index")}
                    className="mb-6 inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    ← Back to List
                </Link>
                <h1 className="text-2xl font-bold mb-8">Create New Islamic Content</h1>

                <Form
                    data={data}
                    setData={setData}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    processing={processing}
                    categories={categories} // ✅ Pass categories to Form
                />
            </div>
        </Layout>
    );
}
