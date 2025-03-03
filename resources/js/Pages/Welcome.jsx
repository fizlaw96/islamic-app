import React from "react";
import Layout from "../Layouts/Layout"; // Import the Layout component
import { motion } from "framer-motion";
import TopicButtons from "../UserComponents/TopicButtons";
import { MessageCircle } from "lucide-react";

export default function Home() {
    return (
        <Layout>
            <TopicButtons />
        </Layout>
    );
}
