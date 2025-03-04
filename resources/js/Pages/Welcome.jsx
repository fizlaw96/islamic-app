import React, { useEffect, useState } from "react";
import Layout from "../Layouts/Layout"; // Import Layout
import { motion } from "framer-motion";
import TopicButtons from "../UserComponents/TopicButtons";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Generate unique ID

export default function Home() {
    const [sessionId, setSessionId] = useState("");

    useEffect(() => {
        // Check if session ID already exists
        let storedSessionId = localStorage.getItem("sessionId");

        if (!storedSessionId) {
            // Generate new session ID
            storedSessionId = uuidv4();
            localStorage.setItem("sessionId", storedSessionId);
        }

        setSessionId(storedSessionId);

        // Send session ID to backend (optional, in case Laravel needs it)
        axios.post("/api/session-id", { session_id: storedSessionId }).catch((error) => {
            console.error("Error setting session ID:", error);
        });
    }, []);

    return (
        <Layout>
            <div className="mt-6">
                <TopicButtons />
            </div>
        </Layout>
    );
}
