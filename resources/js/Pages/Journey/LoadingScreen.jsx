import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onFinish }) {
    const { lesson } = usePage().props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
            onFinish(); // Call function when loading completes
        }, 3000); // 3 seconds loading time

        return () => clearTimeout(timeout);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white">
                <motion.img
                    src="/storage/assets/characters/study.png"
                    alt="Loading"
                    className="w-64 h-64 md:w-80 md:h-80"
                    initial={{ scale: 0.8 }}
                    animate={{
                        scale: [1, 1.05, 1],
                        y: [0, -10, 0],  // Moves up and down
                        opacity: 1
                    }}
                    transition={{
                        duration: 1,  // Short pulse effect
                        ease: "easeInOut",
                        repeat: 2, // Pulses twice, then stops
                    }}
                />
            <p className="mt-4 text-lg">Memasuki {lesson.title_bm}...</p>
        </div>
    );
}
