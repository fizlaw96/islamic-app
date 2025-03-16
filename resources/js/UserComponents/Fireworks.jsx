import React, { useEffect, useRef, forwardRef } from "react";
import StaticElements from "./StaticElements";

const Fireworks = forwardRef(({ isPlaying }, ref) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Make the canvas cover the full screen dynamically
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let fireworks = [];
        let particles = [];

        const fireworkSound = new Audio("/storage/assets/mp3/firework.mp3");
        fireworkSound.volume = 0.6;
        fireworkSound.preload = "auto";

        class Firework {
            constructor(x, y, targetX, targetY) {
                this.x = x;
                this.y = y;
                this.targetX = targetX;
                this.targetY = targetY;
                this.speed = Math.random() * 4 + 2;
                this.angle = Math.atan2(targetY - y, targetX - x);
                this.opacity = 1;
                this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
                this.exploded = false;
            }

            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                if (!this.exploded && Math.abs(this.y - this.targetY) < 5) {
                    if (isPlaying) {
                        fireworkSound.currentTime = 0;
                        fireworkSound.play().catch(() => {});
                    }
                    this.exploded = true;
                }
                this.opacity -= 0.01;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.speed = Math.random() * 4 + 1;
                this.angle = Math.random() * Math.PI * 2;
                this.opacity = 1;
                this.color = color;
            }

            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                this.opacity -= 0.02;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function createFirework() {
            if (!isPlaying) return;
            let x = Math.random() * canvas.width;
            let y = canvas.height;
            let targetX = Math.random() * canvas.width;
            let targetY = Math.random() * (canvas.height - 250);
            fireworks.push(new Firework(x, y, targetX, targetY));
        }

        function animateFireworks() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            fireworks.forEach((fw, index) => {
                fw.update();
                fw.draw();
                if (fw.opacity <= 0) {
                    for (let i = 0; i < 30; i++) {
                        particles.push(new Particle(fw.x, fw.y, fw.color));
                    }
                    fireworks.splice(index, 1);
                }
            });

            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                if (particle.opacity <= 0) {
                    particles.splice(index, 1);
                }
            });

            requestAnimationFrame(animateFireworks);
        }

        animateFireworks();

        const fireworkInterval = setInterval(createFirework, 800);

        return () => {
            clearInterval(fireworkInterval);
            fireworkSound.pause();
            fireworkSound.currentTime = 0;
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [isPlaying]);

    return (
        <div className="relative w-full h-screen flex justify-center items-center">
            <StaticElements />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
    );
});

export default Fireworks;
