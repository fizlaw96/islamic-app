import React, { useState, useRef } from "react";
import { FaStop, FaPlay, FaShareAlt } from "react-icons/fa";
import Fireworks from "../../UserComponents/Fireworks";

export default function KadRaya() {
    const [showFireworks, setShowFireworks] = useState(false);
    const takbirAudioRef = useRef(null);
    const fireworksAudioRef = useRef(new Audio("/storage/assets/mp3/firework.mp3"));
    const pageUrl = window.location.href;

    const handlePlay = () => {
        setShowFireworks(true);

        // ✅ Play Takbir audio
        if (takbirAudioRef.current) {
            takbirAudioRef.current.currentTime = 0;
            takbirAudioRef.current.play().catch(() => {});
        }

        // ✅ Play Fireworks audio (looping)
        if (fireworksAudioRef.current) {
            fireworksAudioRef.current.loop = true;
            fireworksAudioRef.current.currentTime = 0;
            fireworksAudioRef.current.play().catch(() => {});
        }
    };

    const handleStop = () => {
        setShowFireworks(false);

        // ✅ Stop Takbir audio
        if (takbirAudioRef.current) {
            takbirAudioRef.current.pause();
            takbirAudioRef.current.currentTime = 0;
        }

        // ✅ Stop Fireworks audio
        if (fireworksAudioRef.current) {
            fireworksAudioRef.current.pause();
            fireworksAudioRef.current.currentTime = 0;
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            // ✅ Native Share API (Mobile-Friendly)
            navigator
                .share({
                    title: "🎆 Selamat Hari Raya!",
                    text: "Tonton Kad Raya interaktif ini! 🎇",
                    url: pageUrl,
                })
                .catch(() => {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            // ✅ Copy to Clipboard (Secure Context Only)
            await navigator.clipboard.writeText(pageUrl);
            alert("✅ Link copied! Share it with your friends.");
        } else {
            // ✅ Fallback: Show input field for manual copying
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
                {showFireworks ? <Fireworks ref={fireworksAudioRef} isPlaying={showFireworks} /> : <p className="text-white text-2xl">🎇 Press Play!</p>}
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

            {/* 🎶 Takbir Audio */}
            <audio ref={takbirAudioRef} src="/storage/assets/mp3/takbir.MP3" preload="auto"></audio>
        </div>
    );
}
