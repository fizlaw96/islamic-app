import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // Language State
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <Layout>
            <Head title={language === "bm" ? "Daftar" : "Register"} />

            <div className="flex flex-col items-center justify-center mt-20">
                <div className="w-full max-w-md bg-white dark:bg-green-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-center text-2xl font-bold text-green-700 dark:text-white">
                        {language === "bm" ? "🕌 Daftar Akaun" : "🕌 Create an Account"}
                    </h2>

                    <form onSubmit={submit} className="mt-4">
                        <div>
                            <InputLabel htmlFor="name" value={language === "bm" ? "Nama" : "Name"} className="text-green-700 dark:text-white" />
                            <TextInput id="name" name="name" value={data.name} className="mt-1 block w-full" autoComplete="name" isFocused={true} onChange={(e) => setData("name", e.target.value)} required />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value={language === "bm" ? "Alamat Email" : "Email Address"} className="text-green-700 dark:text-white" />
                            <TextInput id="email" type="email" name="email" value={data.email} className="mt-1 block w-full" autoComplete="username" onChange={(e) => setData("email", e.target.value)} required />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value={language === "bm" ? "Kata Laluan" : "Password"} className="text-green-700 dark:text-white" />
                            <TextInput id="password" type="password" name="password" value={data.password} className="mt-1 block w-full" autoComplete="new-password" onChange={(e) => setData("password", e.target.value)} required />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value={language === "bm" ? "Sahkan Kata Laluan" : "Confirm Password"} className="text-green-700 dark:text-white" />
                            <TextInput id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} className="mt-1 block w-full" autoComplete="new-password" onChange={(e) => setData("password_confirmation", e.target.value)} required />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                            {language === "bm" ? "Sudah mempunyai akaun?" : "Already have an account?"}{" "}
                            <Link href="/login" className="text-green-100 font-bold hover:underline">
                                {language === "bm" ? "Log masuk di sini" : "Login here"}
                            </Link>
                        </div>

                        <div className="mt-6 flex items-center justify-center">
                            <PrimaryButton className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md font-bold transition-all duration-200">
                                {language === "bm" ? "Daftar" : "Register"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
