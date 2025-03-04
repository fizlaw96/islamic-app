import React from "react";
import { useForm, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import Form from "./Form"; // ✅ Import the shared form

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        topic_bm: "",
        topic_en: "",
        category_bm: "",
        category_en: "",
        content_bm: "",
        content_en: "",
        slug: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.islamic-contents.store"), {
            onSuccess: () => {
                window.location.href = route("admin.islamic-contents.index");
            },
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
                <h1 className="text-2xl font-bold mb-8">Create Islamic Content</h1>

                {/* ✅ Use the shared form */}
                <Form
                    data={data}
                    setData={setData}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    processing={processing}
                />
            </div>
        </Layout>
    );
}
