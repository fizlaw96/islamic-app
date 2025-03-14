import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
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

                    {/* ✅ Title */}
                    <h2 className="text-center text-2xl font-bold text-green-700 dark:text-white">
                        {language === "bm" ? "🕌 Selamat Datang" : "🕌 Welcome"}
                    </h2>

                    {/* 🔴 Show server error message if login fails */}
                    {status && (
                        <div className="mt-4 text-center text-sm font-medium text-red-600 bg-red-100 p-2 rounded-lg" aria-live="polite">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-4">
                        {/* 📩 Email Input */}
                        <div>
                            <InputLabel htmlFor="email" value={language === "bm" ? "Alamat Email" : "Email Address"} className="text-green-700 dark:text-white" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            {/* 🔴 Show email error if exists */}
                            {errors.email && <InputError message={errors.email} className="mt-2" />}
                        </div>

                        {/* 🔑 Password Input */}
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value={language === "bm" ? "Kata Laluan" : "Password"} className="text-green-700 dark:text-white" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            {/* 🔴 Show password error if exists */}
                            {errors.password && <InputError message={errors.password} className="mt-2" />}
                        </div>

                        {/* 🔘 Remember Me Checkbox */}
                        <div className="mt-4 flex items-center">
                            <Checkbox name="remember" checked={data.remember} onChange={(e) => setData("remember", e.target.checked)} />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{language === "bm" ? "Ingat saya" : "Remember me"}</span>
                        </div>

                        {/* 🔗 Forgot Password & Login Button */}
                        <div className="mt-6 flex justify-between items-center">
                            {canResetPassword && (
                                <Link href={route("password.request")} className="text-sm text-green-700 dark:text-gray-300 underline hover:text-green-900">
                                    {language === "bm" ? "Lupa kata laluan?" : "Forgot your password?"}
                                </Link>
                            )}

                            {/* ✅ Login Button */}
                            <PrimaryButton className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-md font-bold" disabled={processing}>
                                {processing ? (language === "bm" ? "Memproses..." : "Processing...") : language === "bm" ? "Masuk" : "Login"}
                            </PrimaryButton>
                        </div>
                    </form>

                    {/* 📌 Register Link */}
                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                        {language === "bm" ? "Belum mempunyai akaun?" : "Don't have an account?"}{" "}
                        <Link href="/register" className="text-green-100 font-bold hover:underline">
                            {language === "bm" ? "Daftar di sini" : "Register here"}
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
