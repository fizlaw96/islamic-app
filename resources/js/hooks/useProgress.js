import { useState, useEffect } from "react";
import axios from "axios";

export default function useProgress() {
    const [progress, setProgress] = useState([]);
    const sessionId = localStorage.getItem("sessionId"); // ✅ Use existing UUID

    useEffect(() => {
        if (sessionId) {
            axios.post("/api/user/progress", { session_id: sessionId })
                .then((res) => setProgress(res.data.progress))
                .catch((err) => console.error("Failed to load progress", err));
        }
    }, [sessionId]);

    const updateProgress = async (lessonId, questionId) => {
        try {
            await axios.post("/api/user/progress/update", {
                session_id: sessionId,
                lesson_id: lessonId,
                question_id: questionId,
            });

            setProgress((prev) => [...prev, questionId]);
        } catch (err) {
            console.error("Failed to update progress", err);
        }
    };

    return { progress, updateProgress };
}
