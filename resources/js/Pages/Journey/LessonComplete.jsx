import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

export default function LessonComplete() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => setShow(false), 3000); // Show message for 3 seconds
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-black">
            <h1 className="text-3xl font-bold">Tahniah Anda Berjaya! 🎉</h1>
            <Link href="/journey" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg">
                Kembali ke Perjalanan
            </Link>
        </div>
    );
}
