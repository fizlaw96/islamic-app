import React, { useState, useEffect } from "react";
import moment from "moment-hijri";

export default function HijriCalendar({ insideDrawer = false }) {
    const [hijriDate, setHijriDate] = useState("");
    const [reminder, setReminder] = useState("");
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");

    useEffect(() => {
        moment.locale("en"); // ✅ Moment.js stays in English

        const todayHijri = moment();
        const tomorrowHijri = moment().add(1, "day");

        // ✅ Hijri Date in English format
        const formattedHijri = todayHijri.format("iD iMMMM iYYYY");
        setHijriDate(formattedHijri);

        // Get Hijri day & month
        const tomorrowHijriDay = tomorrowHijri.iDate(); // Hijri day (1-30)
        const tomorrowHijriMonth = tomorrowHijri.iMonth() + 1; // Hijri month (1-12)
        const tomorrowWeekday = tomorrowHijri.isoWeekday(); // Get weekday (1 = Monday, 4 = Thursday)

        // ✅ Puasa Sunat Reminder Logic (Excluding Ramadan)
        let reminderMessage = [];

        if (tomorrowHijriMonth !== 9) { // ❌ Skip Ramadan reminders
            if (tomorrowHijriDay === 9 && tomorrowHijriMonth === 12) {
                reminderMessage.push(language === "bm" ? "Esok: Puasa Hari Arafah! 🌙" : "Tomorrow: Arafah Fasting! 🌙");
            }
            if ([13, 14, 15].includes(tomorrowHijriDay)) {
                reminderMessage.push(language === "bm" ? "Esok: Puasa Ayyamul Bidh! 🌕" : "Tomorrow: Ayyamul Bidh Fasting! 🌕");
            }
            if (tomorrowHijriMonth === 10 && tomorrowHijriDay >= 2) {
                reminderMessage.push(language === "bm" ? "Esok: Puasa 6 Syawal! 🌙" : "Tomorrow: 6 Syawal Fasting! 🌙");
            }
            if (tomorrowHijriDay === 9 && tomorrowHijriMonth === 1) {
                reminderMessage.push(language === "bm" ? "Esok: Puasa Tasu’aa (9 Muharram)! 🏴" : "Tomorrow: Tasu’aa Fasting (9 Muharram)! 🏴");
            }
            if (tomorrowHijriDay === 10 && tomorrowHijriMonth === 1) {
                reminderMessage.push(language === "bm" ? "Esok: Puasa Asyura' (10 Muharram)! 🏴" : "Tomorrow: Asyura' Fasting! 🏴");
            }
            if (tomorrowHijriMonth === 12 && tomorrowHijriDay > 1) {
                reminderMessage.push(language === "bm" ? "Esok: Puasa Zulhijjah! 🕋" : "Tomorrow: Zulhijjah Fasting! 🕋");
            }
            if (tomorrowWeekday === 1 || tomorrowWeekday === 4) {
                reminderMessage.push(language === "bm" ? "Esok: Puasa Isnin & Khamis! 🌙" : "Tomorrow: Monday & Thursday Fasting! 🌙");
            }
        }

        // ✅ Join multiple reminders into one message
        setReminder(reminderMessage.length > 0 ? reminderMessage.join("\n") : "");
    }, [language]); // ✅ Updates only when language changes

    return (
        <div className={`w-full text-center py-2 ${insideDrawer ? "bg-green-700" : "bg-gradient-to-r from-green-500 to-blue-600 shadow-md text-white"}`}>
            {/* ✅ Display Hijri Date */}
            <p className="text-sm font-bold">{hijriDate}</p>

            {/* ✅ Puasa Reminder */}
            {reminder && (
                <p className="text-xs font-bold bg-yellow-400 text-black py-1 px-2 rounded-md inline-block mt-1">
                    {reminder}
                </p>
            )}
        </div>
    );
}
