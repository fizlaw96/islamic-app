import { usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProfileImage from "@/UserComponents/ProfileImage"; // Import ProfileImage component
import { Flame, BookOpen, ChevronRight } from "lucide-react";

export default function Dashboard() {
    const {
        user,
        completedLessons = 0,
        latestLessons = [],
        nextLesson = null,
        streak = 0,
        totalLessons = 1 // Avoid division by zero
    } = usePage().props;

    // ✅ Calculate lesson completion percentage safely
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

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

                        {/* ✅ User Profile Section */}
                        <ProfileImage user={user} />

                        {/* ✅ Streak Section */}
                        <div className="mt-8 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center gap-4">
                            <Flame size={32} className="text-red-500" />
                            <div>
                                <h3 className="text-lg font-semibold">🔥 Streak: {streak} days</h3>
                                <p className="text-gray-500 text-sm">Stay consistent! Don't break your streak.</p>
                            </div>
                        </div>

                        {/* ✅ Progress Section */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold">📚 Lesson Progress</h3>
                            <p className="text-gray-500 text-sm">{completedLessons} out of {totalLessons} lessons completed</p>

                            {/* ✅ Progress Bar */}
                            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                                <div
                                    className="h-4 rounded-full bg-green-500 transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* ✅ Continue Learning Section */}
                        {nextLesson && (
                            <div className="mt-8 bg-green-100 dark:bg-green-700 p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">🎯 Next Lesson</h3>
                                    <p className="text-gray-500">{nextLesson.title}</p>
                                </div>
                                <Link
                                    href={route("lesson.show", { id: nextLesson.id })}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 flex items-center gap-2"
                                >
                                    Continue <ChevronRight size={18} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
