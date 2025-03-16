import React, { useEffect, useRef } from "react";

const StaticElements = () => {
    const canvasRef = useRef(null);
    const houseImage = new Image();
    houseImage.src = "/storage/assets/characters/kampung.png";

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        function drawStaticElements() {
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#228B22";
            ctx.fillRect(0, canvas.height - canvas.height * 0.1, canvas.width, canvas.height * 0.1);

            // House dimensions based on screen size
            const houseWidth = canvas.width * 0.4;
            const houseHeight = canvas.height * 0.3;
            const houseX = (canvas.width - houseWidth) / 2;
            const houseY = canvas.height - houseHeight - (canvas.height * 0.05);
            ctx.drawImage(houseImage, houseX, houseY, houseWidth, houseHeight);

            // Text adjustments for screen size
            ctx.fillStyle = "#FFD700";
            ctx.font = `${Math.max(20, canvas.width * 0.04)}px 'Amiri', serif`;
            ctx.textAlign = "center";
            ctx.fillText("سَلَامَتْ هَارِي رَايَا", canvas.width / 2, canvas.height * 0.15);
            ctx.fillText("Selamat Hari Raya dari Tafheem", canvas.width / 2, canvas.height * 0.22);
        }

        houseImage.onload = () => {
            drawStaticElements();
        };

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default StaticElements;
