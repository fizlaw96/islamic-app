import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import Form from "./Form"; // ✅ Import the shared form

export default function Edit() {
    const { content } = usePage().props;

    const { data, setData, put, errors, processing } = useForm({
        topic_bm: content.topic_bm || "",
        topic_en: content.topic_en || "",
        title_bm: content.title_bm || "",
        title_en: content.title_en || "",
        category_bm: content.category_bm || "",
        category_en: content.category_en || "",
        content_bm: content.content_bm || "",
        content_en: content.content_en || "",
        slug: content.slug || "",
        banner: null, // ✅ Ensure banner is handled properly
        media: null, // ✅ Ensure media is handled properly
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("topic_bm", data.topic_bm || ""); // Ensure value exists
        formData.append("topic_en", data.topic_en || "");
        formData.append("title_bm", data.title_bm || "");
        formData.append("title_en", data.title_en || "");
        formData.append("category_bm", data.category_bm || "");
        formData.append("category_en", data.category_en || "");
        formData.append("content_bm", data.content_bm || "");
        formData.append("content_en", data.content_en || "");
        formData.append("slug", data.slug || "");

        if (data.banner) formData.append("banner", data.banner);
        if (data.media) formData.append("media", data.media);

        put(route("admin.islamic-contents.update", content.id), {
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            onSuccess: () => {
                window.location.href = route("admin.islamic-contents.show", content.id);
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
                <h1 className="text-2xl font-bold mb-8">Edit Islamic Content</h1>

                <Form
                    data={data}
                    setData={setData}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    processing={processing}
                    isEdit={true}
                />
            </div>
        </Layout>
    );
}
