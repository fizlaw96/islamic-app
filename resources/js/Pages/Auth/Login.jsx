import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout"; // ✅ Use your existing Layout
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <Layout>
            <Head title="Masuk" />

            <div className="flex flex-col items-center justify-center mt-20">
                {/* ✅ Login Card */}
                <div className="w-full max-w-md bg-white dark:bg-green-800 shadow-lg rounded-lg p-6">
                    {/* 📜 Title */}
                    <h2 className="text-center text-2xl font-bold text-green-700 dark:text-white">
                        🕌 Selamat Datang
                    </h2>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                        Masuk untuk meneruskan perjalanan Islam anda ✨
                    </p>

                    {status && (
                        <div className="mt-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    {/* ✅ Form */}
                    <form onSubmit={submit} className="mt-4">
                        {/* 📩 Email Input */}
                        <div>
                            <InputLabel htmlFor="email" value="Alamat Email" className="text-green-700 dark:text-white" />
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
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* 🔑 Password Input */}
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Kata Laluan" className="text-green-700 dark:text-white" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* ✅ Remember Me Checkbox */}
                        <div className="mt-4 flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-300">
                                Ingat saya
                            </span>
                        </div>

                        {/* 🔗 Forgot Password & Submit Button */}
                        <div className="mt-6 flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-green-700 dark:text-gray-300 underline hover:text-green-900"
                                >
                                    Lupa kata laluan?
                                </Link>
                            )}

                            <PrimaryButton className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow-md font-bold transition-all duration-200">
                                Masuk
                            </PrimaryButton>
                        </div>
                    </form>

                    {/* 📌 Register Link */}
                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                        Belum mempunyai akaun?{" "}
                        <Link href="/register" className="text-green-100 font-bold hover:underline">
                            Daftar di sini
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
