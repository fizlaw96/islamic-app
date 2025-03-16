import React, { useState, useEffect } from "react";
import Layout from "../../Layouts/Layout";

export default function RayaAidilfitri() {
    const [openSection, setOpenSection] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

    useEffect(() => {
        // Apply dark mode class globally
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    // Translations for BM & EN
    const translations = {
        en: {
            title: "🎉 Selamat Hari Raya Aidilfitri! 🎉",
            message: "Aidilfitri is a special time of joy, forgiveness, and family gatherings. May this festival bring blessings to you and your loved ones.",
            qrTitle: "💰 Scan Here to Give Duit Raya! 💰",
            sunnah: "Sunnah Hari Raya 📜",
            takbir: "Takbir Raya 🕌",
            importance: "Pentingnya Aidilfitri ✨",
            eidMeaning: "✨ Meaning & Importance of Eid",
        },
        bm: {
            title: "🎉 Selamat Hari Raya Aidilfitri! 🎉",
            message: "Aidilfitri adalah waktu kegembiraan, kemaafan, dan perjumpaan keluarga. Semoga hari ini membawa keberkatan kepada anda dan keluarga.",
            qrTitle: "💰 Imbas Kod untuk Beri Duit Raya! 💰",
            sunnah: "Sunnah Hari Raya 📜",
            takbir: "Takbir Raya 🕌",
            importance: "Pentingnya Aidilfitri ✨",
            eidMeaning: "✨ Makna & Kepentingan Aidilfitri",
        },
    };

    return (
        <Layout>
            <div className="p-6 text-center text-black dark:text-white">
                {/* 🎉 Hari Raya Title */}
                <h1 className="text-3xl font-bold text-white dark:text-black">
                    {translations[language].title}
                </h1>
                <p className="mt-4 text-lg dark:text-black">{translations[language].message}</p>
                <img src="/storage/assets/button/raya.jpg" alt="Raya Aidilfitri" className="mx-auto mt-6 w-60 h-auto rounded-lg shadow-lg" />

                {/* 💰 Duit Raya QR Code */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-green-600 dark:text-black">
                        {translations[language].qrTitle}
                    </h2>
                    <img src="/storage/assets/button/qrcode.jpeg" alt="QR Code Duit Raya" className="mx-auto w-40 h-40 mt-3 shadow-lg rounded-lg" />
                </div>

                {/* 📜 Toggle Sections */}
                <div className="mt-8 space-y-4">
                    {/* Sunnah Hari Raya */}
                    <div>
                        <button
                            onClick={() => toggleSection("sunnah")}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-green-600"
                        >
                            {language === "bm" ? "📜 Amalan Sunnah di Hari Raya" : "📜 Sunnah Practices on Eid"}
                        </button>
                        {openSection === "sunnah" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
                                <ul className="text-left list-disc list-inside text-gray-700 dark:text-gray-300">
                                    <li>
                                        🛁 <b>{language === "bm" ? "Mandi sunnah" : "Performing Sunnah bath"}</b>
                                        {language === "bm" ? " sebelum solat raya." : " before the Eid prayer."}
                                    </li>
                                    <li>
                                        👕 <b>{language === "bm" ? "Memakai pakaian terbaik" : "Wearing the best attire"}</b>
                                        {language === "bm" ? " dan menggunakan wangi-wangian." : " and applying perfume."}
                                    </li>
                                    <li>
                                        📢 <b>{language === "bm" ? "Bertakbir" : "Reciting the Takbir"}</b>
                                        {language === "bm" ? " sepanjang perjalanan ke masjid." : " throughout the journey to the mosque."}
                                    </li>
                                    <li>
                                        🤝 <b>{language === "bm" ? "Memberi salam & memohon maaf" : "Exchanging greetings & seeking forgiveness"}</b>
                                        {language === "bm" ? " dengan keluarga & jiran." : " with family & neighbors."}
                                    </li>
                                    <li>
                                        🍽️ <b>{language === "bm" ? "Menjamu makanan" : "Eating a meal"}</b>
                                        {language === "bm" ? " selepas solat raya." : " after the Eid prayer."}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Takbir Raya */}
                    <div>
                        <button
                            onClick={() => toggleSection("takbir")}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-blue-600"
                        >
                            {translations[language].takbir}
                        </button>
                        {openSection === "takbir" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700 text-right">
                                <p className="text-xl font-arabic leading-loose">
                                    ٱللّٰهُ أَكْبَرُ ٱللّٰهُ أَكْبَرُ ٱللّٰهُ أَكْبَرُ، لَا إِلٰهَ إِلَّا ٱللّٰهُ، <br />
                                    ٱللّٰهُ أَكْبَرُ ٱللّٰهُ أَكْبَرُ، وَلِلّٰهِ ٱلْحَمْدُ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    ٱللّٰهُ أَكْبَرُ كَبِيرًا، وَٱلْحَمْدُ لِلّٰهِ كَثِيرًا، وَسُبْحَانَ ٱللّٰهِ بُكْرَةً وَأَصِيلًا
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    لَا إِلٰهَ إِلَّا ٱللّٰهُ وَحْدَهُ، صَدَقَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَأَعَزَّ جُنْدَهُ، وَهَزَمَ ٱلْأَحْزَابَ وَحْدَهُ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    لَا إِلٰهَ إِلَّا ٱللّٰهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ، مُخْلِصِينَ لَهُ ٱلدِّينَ وَلَوْ كَرِهَ ٱلْكَافِرُونَ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    ٱللّٰهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ، وَعَلَىٰ آلِ سَيِّدِنَا مُحَمَّدٍ، وَعَلَىٰ أَصْحَابِ سَيِّدِنَا مُحَمَّدٍ، وَعَلَىٰ أَتْبَاعِ سَيِّدِنَا مُحَمَّدٍ
                                </p>

                                {/* Repeat Section for Continuous Recitation */}
                                <p className="mt-6 text-xl font-arabic leading-loose border-t pt-4">
                                    ٱللّٰهُ أَكْبَرُ ٱللّٰهُ أَكْبَرُ ٱللّٰهُ أَكْبَرُ، لَا إِلٰهَ إِلَّا ٱللّٰهُ، <br />
                                    ٱللّٰهُ أَكْبَرُ ٱللّٰهُ أَكْبَرُ، وَلِلّٰهِ ٱلْحَمْدُ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    لَا إِلٰهَ إِلَّا ٱللّٰهُ وَحْدَهُ، صَدَقَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَأَعَزَّ جُنْدَهُ، وَهَزَمَ ٱلْأَحْزَابَ وَحْدَهُ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    ٱللّٰهُ أَكْبَرُ كَبِيرًا، وَٱلْحَمْدُ لِلّٰهِ كَثِيرًا، وَسُبْحَانَ ٱللّٰهِ بُكْرَةً وَأَصِيلًا
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    ٱللّٰهُ أَكْبَرُ ٱللّٰهُ أَكْبَرُ ٱللّٰهُ أَكْبَرُ، لَا إِلٰهَ إِلَّا ٱللّٰهُ، <br />
                                    ٱللّٰهُ أَكْبَرُ ٱللّٰهُ أَكْبَرُ، وَلِلّٰهِ ٱلْحَمْدُ
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 🌙 Festive Decoration */}
                    <div className="mt-8">
                        <button
                            onClick={() => toggleSection("info")}
                            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-yellow-600"
                        >
                            {language === "bm" ? "Pentingnya Aidilfitri ✨" : "The Importance of Eid ✨"}
                        </button>
                        {openSection === "info" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300">
                                {/* ✅ Centered Title */}
                                <h2 className="text-lg font-bold text-yellow-700 dark:text-yellow-400 text-center">
                                    {language === "bm" ? "✨ Makna & Kepentingan Aidilfitri" : "✨ Meaning & Importance of Eid"}
                                </h2>
                                <p className="mt-3 text-left">
                                    {language === "bm"
                                        ? "Aidilfitri bukan sekadar hari perayaan tetapi merupakan hari kemenangan bagi umat Islam selepas menjalani ibadah puasa selama sebulan di bulan Ramadhan. Ia adalah hari penuh keberkatan yang dianugerahkan oleh Allah SWT kepada hamba-Nya yang bertakwa."
                                        : "Eid al-Fitr is not just a celebration but a day of victory for Muslims after completing a month of fasting in Ramadan. It is a day full of blessings granted by Allah SWT to His faithful servants."}
                                </p>

                                {/* ✅ Quranic Verse on Eid Significance */}
                                <p className="mt-3 text-left">{language === "bm" ? "Allah SWT berfirman dalam Al-Quran:" : "Allah SWT says in the Quran:"}</p>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    وَلِتُكْمِلُوا۟ ٱلْعِدَّةَ وَلِتُكَبِّرُوا۟ ٱللَّهَ عَلَىٰ مَا هَدَىٰكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ
                                </p>
                                <p className="text-left">
                                    <b>
                                        {language === "bm"
                                            ? '"Dan hendaklah kamu mencukupkan bilangan (hari Ramadhan) dan hendaklah kamu mengagungkan Allah atas petunjuk-Nya yang diberikan kepadamu, agar kamu bersyukur." (Surah Al-Baqarah: 185)'
                                            : '"And so that you may complete the prescribed period and glorify Allah for guiding you, and that perhaps you will be grateful." (Surah Al-Baqarah: 185)'}
                                    </b>
                                </p>

                                {/* ✅ Sunnah Practices on Eid al-Fitr */}
                                <h3 className="mt-4 font-semibold text-yellow-700 dark:text-yellow-400 text-center">
                                    {language === "bm" ? "📜 Amalan Sunnah di Hari Raya Aidilfitri" : "📜 Sunnah Practices on Eid al-Fitr"}
                                </h3>
                                <ul className="list-disc pl-5 space-y-2 text-left">
                                    <li><b>{language === "bm" ? "Mandi sunnah" : "Performing a Sunnah bath"}</b> {language === "bm" ? "sebelum solat Aidilfitri." : "before the Eid prayer."}</li>
                                    <li><b>{language === "bm" ? "Memakai pakaian terbaik" : "Wearing the best attire"}</b> {language === "bm" ? "dan menggunakan wangi-wangian." : "and applying perfume."}</li>
                                    <li><b>{language === "bm" ? "Makan sebelum solat raya" : "Eating before the Eid prayer"}</b> {language === "bm" ? ", sebaiknya kurma dalam jumlah ganjil." : ", preferably an odd number of dates."}</li>
                                    <li><b>{language === "bm" ? "Bertakbir" : "Reciting the Takbir"}</b> {language === "bm" ? "bermula dari malam raya hingga sebelum solat." : "from the night before until the prayer."}</li>
                                    <li><b>{language === "bm" ? "Solat sunat Aidilfitri" : "Performing the Eid prayer"}</b> {language === "bm" ? "secara berjemaah." : "in congregation."}</li>
                                    <li><b>{language === "bm" ? "Mengucapkan tahniah" : "Exchanging greetings"}</b> {language === "bm" ? "dan memperbanyak doa." : "and making supplications."}</li>
                                    <li><b>{language === "bm" ? "Menghidupkan silaturahim" : "Strengthening family ties"}</b> {language === "bm" ? "dengan keluarga dan jiran." : "by visiting relatives and friends."}</li>
                                    <li><b>{language === "bm" ? "Bersedekah" : "Giving charity"}</b> {language === "bm" ? "dan membantu mereka yang memerlukan." : "and helping those in need."}</li>
                                </ul>

                                {/* ✅ Hadith on Eid Celebration */}
                                <h3 className="mt-4 font-semibold text-yellow-700 dark:text-yellow-400 text-center">
                                    {language === "bm" ? "📜 Hadis Tentang Aidilfitri" : "📜 Hadith on Eid al-Fitr"}
                                </h3>
                                <p className="text-left">{language === "bm" ? "Rasulullah SAW bersabda:" : "The Prophet (SAW) said:"}</p>
                                <p className="text-left">
                                    <b>
                                        {language === "bm"
                                            ? '"Sesungguhnya setiap kaum mempunyai hari raya, dan ini adalah hari raya kita (Aidilfitri dan Aidiladha)." (HR. Bukhari & Muslim)'
                                            : '"Indeed, every nation has its festival, and this is our festival (Eid al-Fitr and Eid al-Adha)." (HR. Bukhari & Muslim)'}
                                    </b>
                                </p>

                                {/* ✅ Beautiful Eid Greetings */}
                                <h3 className="mt-4 font-semibold text-yellow-700 dark:text-yellow-400 text-center">
                                    {language === "bm" ? "🕌 Ucapan & Doa Hari Raya" : "🕌 Eid Greetings & Duas"}
                                </h3>
                                <p className="text-left">
                                    {language === "bm"
                                        ? 'Pada hari raya, kita digalakkan untuk saling mengucapkan "Taqabbalallahu minna wa minkum" (Semoga Allah menerima amal ibadah kami dan kalian).'
                                        : 'On Eid, it is recommended to greet one another with "Taqabbalallahu minna wa minkum" (May Allah accept our deeds and yours).'}
                                </p>

                                {/* ✅ Closing Prayer */}
                                <h3 className="mt-4 font-semibold text-yellow-700 dark:text-yellow-400 text-center">
                                    {language === "bm" ? "🤲 Doa Agar Ibadah Diterima" : "🤲 A Dua for Acceptance of Worship"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ تَقَبَّلْ مِنَّا صِيَامَنَا وَقِيَامَنَا وَأَعْمَالَنَا وَاجْعَلْنَا مِنَ الْفَائِزِينَ فِي هَذَا الشَّهْرِ الْكَرِيمِ
                                </p>
                                <p className="mt-2 text-left">
                                    <b>
                                        {language === "bm"
                                            ? '"Ya Allah, terimalah puasa kami, solat kami, dan amal ibadah kami. Jadikanlah kami termasuk orang-orang yang berjaya di bulan yang mulia ini."'
                                            : '"O Allah, accept from us our fasting, prayers, and deeds. Make us among those who are successful in this blessed month."'}
                                    </b>
                                </p>

                                <p className="mt-4 text-center font-bold text-yellow-700 dark:text-yellow-400">
                                    💛 {language === "bm" ? "Semoga Aidilfitri ini membawa keberkatan dan kebahagiaan bagi kita semua. Aamiin. 🤲" : "May this Eid bring blessings and happiness to us all. Ameen. 🤲"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 🌙 Festive Decoration */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-green-600 dark:text-green-400">🌙 Salam Lebaran! 🌙</h2>
                    <p className="mt-2 text-white dark:text-black">
                        {language === "bm" ? "Semoga hari raya ini dipenuhi dengan keberkatan dan kegembiraan. Maaf Zahir & Batin!"
                        : "May this Eid be filled with blessings and happiness. Forgive me for any shortcomings!"}
                    </p>
                </div>
            </div>
        </Layout>
    );
}
