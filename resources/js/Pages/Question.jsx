import React from "react";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Question() {
    return (
        <Layout>
            <Head title="Under Construction" />

            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black whitespace-nowrap overflow-hidden text-ellipsis">
                    🚧 Under Construction 🚧
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    We're working on this page. Please check back later!
                </p>
            </div>
        </Layout>
    );
}
