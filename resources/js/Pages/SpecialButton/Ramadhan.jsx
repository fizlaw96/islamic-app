import React, { useState } from "react";
import Layout from "../../Layouts/Layout";

export default function Ramadhan() {
    const [openSection, setOpenSection] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <Layout>
            <div className="text-center p-6">
                {/* ✅ Ramadhan Greeting */}
                <h1 className="text-3xl font-bold text-center text-green-700 dark:text-green-400">
                    {language === "bm" ? "Selamat Menyambut Ramadan! 🌙" : "Ramadan Mubarak! 🌙"}
                </h1>
                <p className="mt-4 text-lg text-gray-700 dark:text-black">
                    {language === "bm"
                        ? "Bulan suci Ramadhan adalah waktu untuk berpuasa, solat, dan refleksi diri. Semoga ia membawa keberkatan dan kedamaian."
                        : "The holy month of Ramadhan is a time for fasting, prayer, and self-reflection. May it bring peace and blessings."}
                </p>

                <div className="mt-4 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md border-l-4 border-green-500 text-gray-700 dark:text-gray-300">
                    {/* Arabic Text */}
                    <p className="text-xl font-arabic text-right leading-loose">
                        يَا أَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ كُتِبَ عَلَيْكُمُ ٱلصِّيَامُ كَمَا كُتِبَ عَلَى ٱلَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ
                    </p>

                    {/* Surah Reference */}
                    <p className="mt-2 font-bold text-right">— Surah Al-Baqarah (2:183)</p>

                    {/* Translation Based on Selected Language */}
                    <p className="mt-4 text-lg text-gray-700 dark:text-white">
                        {language === "bm"
                            ? "Wahai orang-orang yang beriman! Kamu diwajibkan berpuasa sebagaimana diwajibkan ke atas orang-orang yang dahulu daripada kamu, supaya kamu bertakwa."
                            : "O you who believe! Fasting is prescribed for you as it was prescribed for those before you, so that you may become righteous."}
                    </p>
                </div>

                <img src="/storage/assets/button/ramadan.jpg" alt="Ramadhan" className="mx-auto mt-6 w-60 h-auto rounded-lg shadow-lg" />

                {/* ✅ Toggle Sections for Ramadhan Topics */}
                <div className="mt-8 space-y-4">
                    {/* ✅ Niat Puasa (Fasting Intention) */}
                    <div>
                        <button
                            onClick={() => toggleSection("niatPuasa")}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-green-600"
                        >
                            {language === "bm" ? "📜 Niat Puasa" : "📜 Intention for Fasting"}
                        </button>
                        {openSection === "niatPuasa" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300">
                                <p className="text-xl font-arabic text-right leading-loose">
                                    نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى
                                </p>
                                <p className="italic mt-2">
                                    Nawaitu ṣawma ghadin ‘an adā’i farḍi shahri ramaḍān hadzihis-sanati lillāhi ta‘ālā.
                                </p>
                                <p className="mt-1">
                                    {language === "bm"
                                        ? "👉 'Sahaja aku berpuasa esok hari untuk menunaikan fardu bulan Ramadhan tahun ini kerana Allah Taala.'"
                                        : "👉 'I intend to fast tomorrow for the obligation of Ramadhan this year for the sake of Allah.'"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Doa Berbuka Puasa (Dua for Breaking Fast) */}
                    <div>
                        <button
                            onClick={() => toggleSection("doaBuka")}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-blue-600"
                        >
                            {language === "bm" ? "🍽️ Doa Berbuka Puasa" : "🍽️ Dua for Breaking Fast"}
                        </button>
                        {openSection === "doaBuka" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300">
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ
                                </p>
                                <p className="mt-2">
                                    {language === "bm"
                                        ? "👉 'Ya Allah, kerana-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka.'"
                                        : "👉 'O Allah, for You I have fasted, in You I believe, and with Your provision, I break my fast.'"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Panduan Solat Tarawih (Guide to Tarawih Prayer) */}
                    <div>
                        <button
                            onClick={() => toggleSection("solatTarawih")}
                            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-yellow-600"
                        >
                            {language === "bm" ? "🕌 Panduan Solat Tarawih" : "🕌 Guide to Tarawih Prayer"}
                        </button>
                        {openSection === "solatTarawih" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300">
                                <p>
                                    {language === "bm"
                                        ? "Solat Tarawih boleh dilakukan secara berjemaah atau bersendirian. Ia terdiri daripada 8 rakaat (2 rakaat x 4 salam) atau 20 rakaat."
                                        : "Tarawih prayer can be performed in congregation or individually. It consists of 8 rakaat (2 rakaat x 4 sets) or 20 rakaat."}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Selawat Solat Tarawih (Bilal Recitation) */}
                    <div className="mt-8 space-y-4">
                        {/* ✅ Selawat Solat Tarawih */}
                        <div>
                            <button
                                onClick={() => toggleSection("selawatTarawih")}
                                className="w-full bg-teal-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-teal-600"
                            >
                                {language === "bm" ? "🎶 Selawat Solat Tarawih" : "🎶 Tarawih Prayer Selawat"}
                            </button>
                            {openSection === "selawatTarawih" && (
                                <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700 text-left">
                                {/* 🌙 Bacaan Selawat Tarawih */}
                                <h2 className="text-lg font-bold text-teal-700">
                                    🌙 {language === "bm" ? "Bacaan Bilal & Makmum Solat Tarawih" : "Bilal & Congregation Recitation for Tarawih"}
                                </h2>
                                <p className="mt-2">
                                    {language === "bm"
                                        ? "Dalam solat tarawih, bilal akan membaca selawat dan makmum akan memberikan jawapan."
                                        : "During Tarawih prayer, the bilal recites the selawat, and the congregation responds."}
                                </p>

                                {/* ✅ Bacaan Bilal */}
                                <h3 className="mt-4 font-semibold text-green-600">
                                    📢 {language === "bm" ? "Bacaan Bilal" : "Bilal's Recitation"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ،<br />
                                    وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ
                                </p>

                                {/* ✅ Selawat Nabi */}
                                <h3 className="mt-4 font-semibold text-green-600">
                                    📢 {language === "bm" ? "Selawat Nabi" : "Prophet's Selawat"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ
                                </p>

                                {/* ✅ Jawapan Makmum */}
                                <h3 className="mt-4 font-semibold text-green-600">
                                    📢 {language === "bm" ? "Jawapan Makmum" : "Congregation's Response"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
                                </p>

                                {/* ✅ Repeat for Each Tarawih Break */}
                                <p className="mt-6 text-xl font-arabic text-right leading-loose border-t pt-4">
                                    سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ،<br />
                                    وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ
                                </p>
                                <p className="mt-3 text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ
                                </p>
                                <p className="mt-3 text-xl font-arabic text-right leading-loose">
                                    صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
                                </p>

                                {/* ✅ Doa Selepas Rakaat Ke-4 */}
                                <h3 className="mt-4 font-semibold text-green-600">
                                    📢 {language === "bm" ? "Doa Selepas Rakaat Ke-4" : "Dua After 4th Rakaah"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ إِنَّا نَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ وَنَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ
                                </p>

                                {/* ✅ Doa Selepas Rakaat Ke-8 */}
                                <h3 className="mt-4 font-semibold text-green-600">
                                    📢 {language === "bm" ? "Doa Selepas Rakaat Ke-8" : "Dua After 8th Rakaah"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ اجْعَلْنَا مِنَ الْمُقْبُولِينَ وَاجْعَلْنَا مِنَ الْمُسْتَغْفِرِينَ وَاجْعَلْنَا مِنْ عِبَادِكَ الصَّالِحِينَ
                                </p>

                                {/* ✅ Doa Selepas Solat Tarawih */}
                                <h3 className="mt-4 font-semibold text-green-600">
                                    📢 {language === "bm" ? "Doa Selepas Solat Tarawih" : "Dua After Tarawih Prayer"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ اجْعَلْنَا مِنَ الْمَقْبُولِينَ وَاجْعَلْنَا مِنَ الْمُسْتَغْفِرِينَ وَاجْعَلْنَا مِنْ عِبَادِكَ الصَّالِحِينَ
                                </p>

                                {/* ✅ Final Repeat for Closing Selawat */}
                                <p className="mt-6 text-xl font-arabic text-right leading-loose border-t pt-4">
                                    اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ
                                </p>
                                <p className="mt-3 text-xl font-arabic text-right leading-loose">
                                    صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
                                </p>
                            </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => toggleSection("doaTarawih")}
                            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-purple-600"
                        >
                            {language === "bm" ? "🤲 Doa Selepas Solat Tarawih" : "🤲 Dua After Tarawih Prayer"}
                        </button>
                        {openSection === "doaTarawih" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700 text-right">
                                <h2 className="text-lg font-bold text-purple-700">
                                    {language === "bm" ? "🌙 Doa Selepas Solat Tarawih" : "🌙 Supplication After Tarawih Prayer"}
                                </h2>
                                <p className="mt-2 text-xl font-arabic leading-loose">
                                    اللَّهُمَّ اجْعَلْنَا مِنَ الْمَقْبُولِينَ وَاجْعَلْنَا مِنَ الْمُسْتَغْفِرِينَ وَاجْعَلْنَا مِنْ عِبَادِكَ الصَّالِحِينَ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    اللَّهُمَّ تَقَبَّلْ صَلَاتَنَا وَصِيَامَنَا وَقِيَامَنَا وَرُكُوعَنَا وَسُجُودَنَا وَاجْعَلْنَا مِنَ الْبَارِّينَ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    اللَّهُمَّ اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    اللَّهُمَّ أَعِنَّا عَلَىٰ ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ
                                </p>
                                <p className="mt-3 text-xl font-arabic leading-loose">
                                    اللَّهُمَّ بَلِّغْنَا لَيْلَةَ الْقَدْرِ وَاجْعَلْنَا مِنْ عِبَادِكَ الْفَائِزِينَ
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Guide Solat Witir */}
                    <div>
                        <button
                            onClick={() => toggleSection("solatWitir")}
                            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-purple-600"
                        >
                            {language === "bm" ? "Panduan Solat Witir 🌙" : "Witir Prayer Guide 🌙"}
                        </button>
                        {openSection === "solatWitir" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300">
                                <h2 className="text-lg font-bold text-purple-700 text-center">
                                    {language === "bm" ? "📜 Panduan Solat Witir" : "📜 Witir Prayer Guide"}
                                </h2>
                                <p>
                                    {language === "bm"
                                        ? "Solat Witir dilakukan selepas Solat Tarawih sebagai penutup. Ia dilakukan dengan "
                                        : "Witir prayer is performed after Tarawih as a closing prayer. It is performed with "}
                                    <b>1, 3, or 11 rakaat</b>,{" "}
                                    {language === "bm"
                                        ? "dengan niat untuk mendekatkan diri kepada Allah."
                                        : "with the intention of seeking closeness to Allah."}
                                </p>

                                {/* ✅ Doa After Solat Witir */}
                                <h3 className="mt-4 font-semibold text-purple-700 text-center">
                                    {language === "bm" ? "🤲 Doa Selepas Solat Witir" : "🤲 Du'a After Witir Prayer"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ وَأَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ
                                </p>
                                <p className="mt-2">
                                    {language === "bm"
                                        ? '"Ya Allah, aku memohon kepada-Mu keredhaan dan syurga-Mu, dan aku berlindung dengan-Mu daripada kemurkaan dan neraka-Mu."'
                                        : '"O Allah, I ask You for Your pleasure and Paradise, and I seek refuge with You from Your wrath and the Hellfire."'}
                                </p>

                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    اللَّهُمَّ اجْعَلْنَا مِنَ الْمُقْبُولِينَ وَاجْعَلْنَا مِنَ الْمُسْتَغْفِرِينَ وَاجْعَلْنَا مِنْ عِبَادِكَ الصَّالِحِينَ
                                </p>
                                <p className="mt-2">
                                    {language === "bm"
                                        ? '"Ya Allah, jadikanlah kami di antara mereka yang diterima, mereka yang memohon keampunan, dan di kalangan hamba-hamba-Mu yang soleh."'
                                        : '"O Allah, make us among those who are accepted, those who seek forgiveness, and among Your righteous servants."'}
                                </p>

                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    اللَّهُمَّ أَعِنَّا عَلَىٰ ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ
                                </p>
                                <p className="mt-2">
                                    {language === "bm"
                                        ? '"Ya Allah, bantulah kami untuk mengingati-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu."'
                                        : '"O Allah, help us to remember You, be grateful to You, and worship You in the best way."'}
                                </p>

                                <p className="mt-4 text-center font-bold text-purple-700">
                                    {language === "bm"
                                        ? "💛 Semoga Allah menerima ibadah kita semua. Aamiin! 🤲"
                                        : "💛 May Allah accept our worship. Ameen! 🤲"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Sunnah Berbuka Puasa */}
                    <div>
                        <button
                            onClick={() => toggleSection("sunnahBuka")}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-red-600"
                        >
                            {language === "bm" ? "Sunnah Berbuka Puasa 🍉" : "Sunnah of Breaking Fast 🍉"}
                        </button>
                        {openSection === "sunnahBuka" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <ul className="text-left list-disc list-inside">
                                    <li>
                                        {language === "bm"
                                            ? "Berbuka dengan kurma atau air"
                                            : "Breaking fast with dates or water"}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Membaca doa berbuka puasa"
                                            : "Reciting the dua for breaking fast"}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Tidak berlebihan dalam makan"
                                            : "Avoiding excessive eating"}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Segera solat Maghrib selepas berbuka"
                                            : "Praying Maghrib immediately after breaking fast"}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* ✅ Kewajiban Zakat Fitrah (Obligation of Zakat Fitrah) */}
                    <div>
                        <button
                            onClick={() => toggleSection("zakat")}
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-indigo-600"
                        >
                            {language === "bm" ? "💰 Kewajiban Zakat Fitrah" : "💰 Obligation of Zakat Fitrah"}
                        </button>
                        {openSection === "zakat" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300">
                                <h2 className="text-lg font-bold text-indigo-700 text-center">
                                    {language === "bm" ? "📜 Apa Itu Zakat Fitrah?" : "📜 What is Zakat Fitrah?"}
                                </h2>
                                <p className="mt-2">
                                    {language === "bm"
                                        ? "Zakat Fitrah wajib ditunaikan sebelum solat Aidilfitri. Ia bertujuan untuk menyucikan puasa dan membantu golongan fakir miskin."
                                        : "Zakat Fitrah must be given before the Eid prayer. It purifies the fast and helps the poor."}
                                </p>

                                <h3 className="mt-4 font-semibold text-indigo-700">
                                    {language === "bm" ? "🕌 Siapa Yang Wajib Membayar?" : "🕌 Who Must Pay?"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Zakat Fitrah wajib bagi setiap Muslim, termasuk kanak-kanak, dewasa, lelaki, dan perempuan yang mempunyai keperluan asas mencukupi pada hari raya."
                                        : "Zakat Fitrah is obligatory for every Muslim, including children, adults, men, and women who have enough basic needs on Eid day."}
                                </p>

                                <h3 className="mt-4 font-semibold text-indigo-700">
                                    {language === "bm" ? "📏 Berapa Kadar Zakat Fitrah?" : "📏 How Much is Zakat Fitrah?"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Kadar zakat fitrah ialah 1 ṣāʿ (~2.5 - 3kg) makanan ruji seperti beras atau nilai duit setara."
                                        : "The amount of Zakat Fitrah is 1 ṣāʿ (~2.5 - 3kg) of staple food such as rice or an equivalent cash amount."}
                                </p>

                                <h3 className="mt-4 font-semibold text-indigo-700">
                                    {language === "bm" ? "⏳ Bila Perlu Dibayar?" : "⏳ When Must It Be Paid?"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Zakat fitrah perlu dibayar sebelum solat Aidilfitri. Sebaiknya dibayar lebih awal agar dapat disalurkan kepada penerima dengan baik."
                                        : "Zakat Fitrah must be paid before the Eid prayer. It is recommended to pay it earlier to ensure proper distribution to recipients."}
                                </p>

                                <h3 className="mt-4 font-semibold text-indigo-700">
                                    {language === "bm" ? "🤲 Siapa Penerima Zakat?" : "🤲 Who Receives the Zakat?"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Zakat Fitrah diberikan kepada golongan asnaf, terutamanya fakir dan miskin."
                                        : "Zakat Fitrah is distributed to the eligible categories (asnaf), especially the poor and needy."}
                                </p>

                                <h3 className="mt-4 font-semibold text-indigo-700">
                                    {language === "bm" ? "📜 Hadis Tentang Zakat Fitrah" : "📜 Hadith About Zakat Fitrah"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    فَرَضَ رَسُولُ اللَّهِ ﷺ زَكَاةَ الْفِطْرِ طُهْرَةً لِلصَّائِمِ مِنَ اللَّغْوِ وَالرَّفَثِ وَطُعْمَةً لِلْمَسَاكِينِ
                                </p>
                                <p className="mt-2">
                                    {language === "bm"
                                        ? '"Rasulullah ﷺ mewajibkan zakat fitrah sebagai penyucian bagi yang berpuasa dan makanan bagi orang miskin." (HR Abu Dawud)'
                                        : '"The Messenger of Allah ﷺ made Zakat Fitrah obligatory as purification for the fasting person and as food for the needy." (Hadith Abu Dawud)'}
                                </p>

                                <h3 className="mt-4 font-semibold text-indigo-700">
                                    {language === "bm" ? "✅ Bagaimana Membayar?" : "✅ How to Pay?"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Bayaran boleh dilakukan di masjid, pusat zakat, atau secara dalam talian melalui organisasi rasmi."
                                        : "Payment can be made at mosques, zakat centers, or online through official organizations."}
                                </p>

                                <p className="mt-4 text-center font-bold text-indigo-700">
                                    {language === "bm"
                                        ? "💛 Semoga Allah menerima ibadah kita semua. Aamiin! 🤲"
                                        : "💛 May Allah accept our worship. Ameen! 🤲"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ✅ Ramadhan Closing Message */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-green-600 dark:text-green-400">
                        {language === "bm" ? "✨ Selamat Berpuasa! ✨" : "✨ Blessed Ramadhan! ✨"}
                    </h2>
                    <p className="mt-2 text-gray-700 dark:text-black">
                        {language === "bm"
                            ? "Semoga Ramadhan ini membawa keberkatan dan keampunan bagi kita semua. Aamiin. 🤲"
                            : "May this Ramadhan bring blessings and forgiveness for all of us. Ameen. 🤲"}
                    </p>
                </div>
            </div>
        </Layout>
    );
}
