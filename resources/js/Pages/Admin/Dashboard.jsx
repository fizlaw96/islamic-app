import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const { user, completedLessons, latestLessons, nextLesson, streak } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 text-gray-900 dark:text-gray-100">

                        {/* ✅ User Profile */}
                        <div className="flex flex-col items-center text-center space-y-2">
                            {/* Profile Image */}
                            <img
                                src={user.profile_image || "/assets/avatars/avatar.png"} // Use profile image or default
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                            />

                            {/* Name & Subtitle */}
                            <div>
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <p className="text-gray-500">Keep learning!</p>
                            </div>
                        </div>

                        {/* ✅ Streak */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">🔥 Streak: {streak} days</h3>
                            <p className="text-gray-500">Keep it up! Don't break your streak.</p>
                        </div>

                        {/* ✅ Completed Lessons */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">📚 Completed Lessons: {completedLessons}</h3>
                        </div>

                        {/* ✅ Next Lesson */}
                        {nextLesson && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold">🎯 Next Lesson: {nextLesson.title}</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
