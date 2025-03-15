import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import moment from "moment-hijri";

export default function SpecialButton() {
    const [buttonName, setButtonName] = useState("Special Day");
    const [buttonImage, setButtonImage] = useState("/assets/button/special.png"); // Default Image
    const [isSpecial, setIsSpecial] = useState(false); // Track if it's a special month

    useEffect(() => {
        moment.locale("en"); // Ensure moment.js uses English
        const todayHijri = moment();
        const hijriMonth = todayHijri.iMonth() + 1; // Hijri month (1-12)

        let specialEvent = "Special Day";
        let specialImage = "/storage/assets/button/special.png"; // Default
        let specialStatus = false;

        // ✅ Show Special Event for the Whole Month with Correct Image
        if (hijriMonth === 10) {
            specialEvent = "Raya Aidilfitri";
            specialImage = "/storage/assets/button/raya.jpg";
            specialStatus = true;
        } else if (hijriMonth === 12) {
            specialEvent = "Raya Aidiladha";
            specialImage = "/storage/assets/button/haji.jpg";
            specialStatus = true;
        } else if (hijriMonth === 9) {
            specialEvent = "Ramadhan";
            specialImage = "/storage/assets/button/ramadan.jpg";
            specialStatus = true;
        }

        setButtonName(specialEvent);
        setButtonImage(specialImage);
        setIsSpecial(specialStatus);
    }, []);

    return (
        <Link
            href={isSpecial ? `/special/${buttonName.toLowerCase().replace(/\s+/g, "-")}` : "/special"}
            className="flex flex-col items-center relative"
        >
            {/* ✅ Special Button: Shining Animation */}
            <div className="relative">
                <img
                    src={buttonImage}
                    alt={buttonName}
                    className={`rounded-full shadow-lg transition-all duration-300 ${
                        isSpecial
                            ? "w-16 h-16 sm:w-20 sm:h-20 -mt-4 sm:-mt-6 hover:scale-110 animate-shine"
                            : "w-10 h-10 sm:w-12 sm:h-12 hover:scale-105"
                    }`}
                />
                {isSpecial && (
                    <div className="absolute inset-0 w-full h-full rounded-full animate-glow"></div>
                )}
            </div>

            <span className="text-xs sm:text-sm mt-1">{buttonName}</span>
        </Link>
    );
}
