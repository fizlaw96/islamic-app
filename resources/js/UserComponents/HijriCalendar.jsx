import React, { useState, useEffect } from "react";
import moment from "moment-hijri";

export default function HijriCalendar() {
    const [hijriDate, setHijriDate] = useState("");
    const [reminder, setReminder] = useState("");
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    useEffect(() => {
        moment.locale("en"); // Ensure locale is English

        const todayHijri = moment();
        const tomorrowHijri = moment().add(1, "day");

        // Format Hijri Date (Example: 26 Rajab 1445)
        const formattedHijri = todayHijri.format("iD iMMMM iYYYY");
        setHijriDate(formattedHijri);

        // Get Hijri day & month
        const tomorrowHijriDay = tomorrowHijri.iDate(); // Hijri day (1-30)
        const tomorrowHijriMonth = tomorrowHijri.iMonth() + 1; // Hijri month (1-12)

        // ✅ Puasa Sunat Reminder Logic (Excluding Ramadan)
        let reminderMessage = "";

        if (tomorrowHijriMonth !== 9) { // ❌ Skip Ramadan reminders
            if (tomorrowHijriDay === 9 && tomorrowHijriMonth === 12) {
                reminderMessage = language === "bm" ? "Esok: Puasa Hari Arafah! 🌙" : "Tomorrow: Arafah Fasting! 🌙";
            } else if ([13, 14, 15].includes(tomorrowHijriDay)) {
                reminderMessage = language === "bm" ? "Esok: Puasa Ayyamul Bidh! 🌕" : "Tomorrow: Ayyamul Bidh Fasting! 🌕";
            } else if (tomorrowHijriMonth === 10 && tomorrowHijriDay <= 6) {
                reminderMessage = language === "bm" ? "Esok: Puasa 6 Syawal! 🌙" : "Tomorrow: 6 Syawal Fasting! 🌙";
            } else if (tomorrowHijriDay === 9 && tomorrowHijriMonth === 1) {
                reminderMessage = language === "bm" ? "Esok: Puasa Tasu’aa (9 Muharram)! 🏴" : "Tomorrow: Tasu’aa Fasting (9 Muharram)! 🏴";
            } else if (tomorrowHijriDay === 10 && tomorrowHijriMonth === 1) {
                reminderMessage = language === "bm" ? "Esok: Puasa Asyura' (10 Muharram)! 🏴" : "Tomorrow: Asyura' Fasting (10 Muharram)! 🏴";
            } else if (tomorrowHijriMonth === 12 && tomorrowHijriDay > 1) {
                reminderMessage = language === "bm" ? "Esok: Puasa Zulhijjah! 🕋" : "Tomorrow: Zulhijjah Fasting! 🕋";
            } else if (moment().add(1, "day").isoWeekday() === 1 || moment().add(1, "day").isoWeekday() === 4) {
                reminderMessage = language === "bm" ? "Esok: Puasa Isnin & Khamis! 🌙" : "Tomorrow: Monday & Thursday Fasting! 🌙";
            }
        }

        setReminder(reminderMessage);
    }, [language]); // ✅ Updates when language changes

    return (
        <div className="sticky top-0 w-full z-50 bg-gradient-to-r from-green-500 to-blue-600 text-white text-center shadow-md py-2">
            {/* ✅ Display Hijri Date */}
            <p className="text-sm font-bold">
                {hijriDate}
            </p>

            {/* ✅ Puasa Reminder */}
            {reminder && (
                <p className="text-xs font-bold bg-yellow-400 text-black py-1 px-2 rounded-md inline-block mt-1">
                    {reminder}
                </p>
            )}
        </div>
    );
}
