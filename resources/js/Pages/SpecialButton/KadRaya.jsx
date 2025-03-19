import React, { useState, useRef, useEffect } from "react";
import { FaStop, FaPlay, FaShareAlt } from "react-icons/fa";
import Fireworks from "../../UserComponents/Fireworks";

// ✅ Function to get query parameters from URL
const getQueryParam = (param) => {
    return new URLSearchParams(window.location.search).get(param);
};

export default function KadRaya() {
    const [showFireworks, setShowFireworks] = useState(false);
    const takbirAudioRef = useRef(null);
    const fireworksAudioRef = useRef(null);
    const pageUrl = window.location.href;
    const userName = getQueryParam("name") || "Tafheem";

    useEffect(() => {
        // ✅ Initialize audio elements on mount
        takbirAudioRef.current = new Audio("/storage/assets/mp3/takbir.MP3");
        fireworksAudioRef.current = new Audio("/storage/assets/mp3/firework.mp3");

        return () => {
            // ✅ Cleanup audio elements on unmount
            takbirAudioRef.current = null;
            fireworksAudioRef.current = null;
        };
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopAllAudio();
            }
        };

        const handleBeforeUnload = () => {
            stopAllAudio();
        };

        const handlePopState = () => {
            stopAllAudio();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const handlePlay = () => {
        setShowFireworks(true);

        // ✅ Play Takbir audio
        if (takbirAudioRef.current) {
            takbirAudioRef.current.currentTime = 0;
            takbirAudioRef.current.play().catch((err) => console.error("❌ Error playing Takbir:", err));
        }

        // ✅ Play Firework audio (looping)
        if (fireworksAudioRef.current) {
            fireworksAudioRef.current.loop = true;
            fireworksAudioRef.current.currentTime = 0;
            fireworksAudioRef.current.play().catch((err) => console.error("❌ Error playing Fireworks:", err));
        }
    };

    const handleStop = () => {
        setShowFireworks(false);
        stopAllAudio();
    };

    const stopAllAudio = () => {
        if (takbirAudioRef.current) {
            takbirAudioRef.current.pause();
            takbirAudioRef.current.currentTime = 0;
        }
        if (fireworksAudioRef.current) {
            fireworksAudioRef.current.pause();
            fireworksAudioRef.current.currentTime = 0;
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "🎆 Selamat Hari Raya!",
                    text: "Tonton Kad Raya interaktif ini! 🎇",
                    url: pageUrl,
                })
                .catch(() => {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(pageUrl);
            alert("✅ Link copied! Share it with your friends.");
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = pageUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            alert("✅ Link copied manually! Share it with your friends.");
        }
    };

    return (
        <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
            {/* Fireworks Full Screen */}
            <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
                {showFireworks ? <Fireworks isPlaying={showFireworks} userName={userName} /> : <p className="text-white text-2xl">🎇 Press Play!</p>}
            </div>

            {/* 🔗 Share Button (Top Left) */}
            <button onClick={handleShare} className="absolute top-4 left-4 bg-blue-500 text-white p-4 rounded-full shadow-lg">
                <FaShareAlt size={24} />
            </button>

            {/* ⏹ Stop Button (Top Right) */}
            {showFireworks && (
                <button onClick={handleStop} className="absolute top-4 right-4 bg-red-500 text-white p-4 rounded-full shadow-lg">
                    <FaStop size={24} />
                </button>
            )}

            {/* ▶ Play Button */}
            {!showFireworks && (
                <button onClick={handlePlay} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-5 rounded-full shadow-lg">
                    <FaPlay size={24} />
                </button>
            )}
        </div>
    );
}
