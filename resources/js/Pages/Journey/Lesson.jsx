import React, { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import LessonMain from "./LessonMain";

export default function Lesson() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading ? <LoadingScreen onFinish={() => setLoading(false)} /> : <LessonMain />}
        </>
    );
}
