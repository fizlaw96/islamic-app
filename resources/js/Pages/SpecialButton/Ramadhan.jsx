import React from "react";
import Layout from "../../Layouts/Layout";

export default function Ramadhan() {
    return (
        <Layout>
            <div className="text-center p-6">
                <h1 className="text-3xl font-bold text-green-700">🌙 Ramadhan Mubarak! 🌙</h1>
                <p className="mt-4 text-lg">
                    The holy month of Ramadhan is a time for fasting, prayer, and self-reflection. May it bring peace and blessings to your life.
                </p>
                <img src="/assets/button/ramadan.jpg" alt="Ramadhan" className="mx-auto mt-6 w-60 h-auto" />
            </div>
        </Layout>
    );
}
