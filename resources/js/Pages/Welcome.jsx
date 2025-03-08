import React, { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import { motion } from "framer-motion";
import TopicButtons from "../UserComponents/TopicButtons";
import HijriCalendar from "../UserComponents/HijriCalendar";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const [sessionId, setSessionId] = useState("");

    useEffect(() => {
        let storedSessionId = localStorage.getItem("sessionId");

        if (!storedSessionId) {
            storedSessionId = uuidv4();
            localStorage.setItem("sessionId", storedSessionId);
        }

        setSessionId(storedSessionId);

        axios.post("/api/session-id", { session_id: storedSessionId }).catch((error) => {
            console.error("Error setting session ID:", error);
        });
    }, []);

    return (
        <Layout>
            <div className="mt-6 flex flex-col items-center gap-6">
                <HijriCalendar insideDrawer={false} />
                <TopicButtons />
            </div>
        </Layout>
    );
}
