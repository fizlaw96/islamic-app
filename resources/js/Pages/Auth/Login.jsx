import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout"; // ✅ Use your existing Layout
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // Language State
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <Layout>
            <Head title={language === "bm" ? "Masuk" : "Login"} />

            <div className="flex flex-col items-center justify-center mt-20">
                <div className="w-full max-w-md bg-white dark:bg-green-800 shadow-lg rounded-lg p-6">

                    <h2 className="text-center text-2xl font-bold text-green-700 dark:text-white">
                        {language === "bm" ? "🕌 Selamat Datang" : "🕌 Welcome"}
                    </h2>

                    <form onSubmit={submit} className="mt-4">
                        <InputLabel htmlFor="email" value={language === "bm" ? "Alamat Email" : "Email Address"} className="text-green-700 dark:text-white" />
                        <TextInput id="email" type="email" name="email" value={data.email} className="mt-1 block w-full" autoComplete="username" onChange={(e) => setData("email", e.target.value)} />

                        <InputLabel htmlFor="password" value={language === "bm" ? "Kata Laluan" : "Password"} className="text-green-700 dark:text-white mt-4" />
                        <TextInput id="password" type="password" name="password" value={data.password} className="mt-1 block w-full" autoComplete="current-password" onChange={(e) => setData("password", e.target.value)} />

                        <PrimaryButton className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-md font-bold">
                            {language === "bm" ? "Masuk" : "Login"}
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
