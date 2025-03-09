import React, { useState } from "react";
import Layout from "../../Layouts/Layout";

export default function Ramadhan() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <Layout>
            <div className="text-center p-6">
                {/* ✅ Meaning of Fasting with Quran Verse */}
                <h1 className="text-3xl font-bold text-green-700">🌙 Ramadhan Mubarak! 🌙</h1>
                <p className="mt-4 text-lg text-gray-700">
                    The holy month of Ramadhan is a time for fasting, prayer, and self-reflection. May it bring peace and blessings to your life.
                </p>
                <div className="mt-4 bg-white p-4 shadow-md rounded-md border-l-4 border-green-500 text-gray-700">
                    <p className="text-xl font-arabic text-right leading-loose">
                        يَا أَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ كُتِبَ عَلَيْكُمُ ٱلصِّيَامُ كَمَا كُتِبَ عَلَى ٱلَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ
                    </p>
                    <p className="mt-2 font-bold text-right">— Surah Al-Baqarah (2:183)</p>
                </div>

                <img src="/assets/button/ramadan.jpg" alt="Ramadhan" className="mx-auto mt-6 w-60 h-auto rounded-lg shadow-lg" />

                {/* ✅ Toggle Sections for Ramadhan Topics */}
                <div className="mt-8 space-y-4">
                    {/* ✅ Niat Puasa */}
                    <div>
                        <button
                            onClick={() => toggleSection("niatPuasa")}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-green-600"
                        >
                            Niat Puasa 📜
                        </button>
                        {openSection === "niatPuasa" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <p className="text-xl font-arabic text-right leading-loose">
                                    نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى
                                </p>
                                <p className="italic mt-2">Nawaitu ṣawma ghadin ‘an adā’i farḍi shahri ramaḍān hadzihis-sanati lillāhi ta‘ālā.</p>
                                <p className="mt-1">👉 **Maksud:** "Sahaja aku berpuasa esok hari untuk menunaikan fardu bulan Ramadhan tahun ini kerana Allah Taala."</p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Doa Berbuka Puasa */}
                    <div>
                        <button
                            onClick={() => toggleSection("doaBuka")}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-blue-600"
                        >
                            Doa Berbuka Puasa 🍽️
                        </button>
                        {openSection === "doaBuka" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ
                                </p>
                                <p className="mt-2">"Ya Allah, kerana-Mu aku berpuasa, kepada-Mu aku beriman, dan dengan rezeki-Mu aku berbuka."</p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Guide Solat Tarawih */}
                    <div>
                        <button
                            onClick={() => toggleSection("solatTarawih")}
                            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-yellow-600"
                        >
                            Panduan Solat Tarawih 🕌
                        </button>
                        {openSection === "solatTarawih" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <p>
                                    Solat Tarawih boleh dilakukan secara berjemaah atau bersendirian. Ia terdiri daripada <b>8 rakaat</b> (2 rakaat x 4 salam)
                                    atau <b>20 rakaat</b>. Setiap rakaat membaca Al-Fatihah dan surah pilihan.
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
                                Selawat Solat Tarawih 🎶
                            </button>
                            {openSection === "selawatTarawih" && (
                                <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700 text-left">
                                    {/* 🌙 Bacaan Selawat Tarawih */}
                                    <h2 className="text-lg font-bold text-teal-700">🌙 Bacaan Bilal & Makmum Solat Tarawih</h2>
                                    <p className="mt-2">Dalam solat tarawih, bilal akan membaca selawat dan makmum akan memberikan jawapan.</p>

                                    {/* ✅ Bacaan Bilal */}
                                    <h3 className="mt-4 font-semibold text-green-600">📢 Bacaan Bilal</h3>
                                    <p className="text-xl font-arabic text-right leading-loose">
                                        سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ،<br />
                                        وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ
                                    </p>

                                    {/* ✅ Selawat Nabi */}
                                    <h3 className="mt-4 font-semibold text-green-600">📢 Selawat Nabi</h3>
                                    <p className="text-xl font-arabic text-right leading-loose">
                                        اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ
                                    </p>

                                    {/* ✅ Jawapan Makmum */}
                                    <h3 className="mt-4 font-semibold text-green-600">📢 Jawapan Makmum</h3>
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
                                    <h3 className="mt-4 font-semibold text-green-600">📢 Doa Selepas Rakaat Ke-4</h3>
                                    <p className="text-xl font-arabic text-right leading-loose">
                                        اللَّهُمَّ إِنَّا نَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ وَنَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ
                                    </p>

                                    {/* ✅ Doa Selepas Rakaat Ke-8 */}
                                    <h3 className="mt-4 font-semibold text-green-600">📢 Doa Selepas Rakaat Ke-8</h3>
                                    <p className="text-xl font-arabic text-right leading-loose">
                                        اللَّهُمَّ اجْعَلْنَا مِنَ الْمُقْبُولِينَ وَاجْعَلْنَا مِنَ الْمُسْتَغْفِرِينَ وَاجْعَلْنَا مِنْ عِبَادِكَ الصَّالِحِينَ
                                    </p>

                                    {/* ✅ Doa Selepas Solat Tarawih */}
                                    <h3 className="mt-4 font-semibold text-green-600">📢 Doa Selepas Solat Tarawih</h3>
                                    <p className="text-xl font-arabic text-right leading-loose">
                                        اللَّهُمَّ اجْعَلْنَا مِنَ الْمَقْبُولِينَ وَاجْعَلْنَا مِنَ الْمُسْتَغْفِرِينَ وَاجْعَلْنَا مِنَ عِبَادِكَ الصَّالِحِينَ
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

                        {/* ✅ Doa Selepas Solat Tarawih - Separate Button */}
                    <div>
                        <button
                            onClick={() => toggleSection("doaTarawih")}
                            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-purple-600"
                        >
                            Doa Selepas Solat Tarawih 🤲
                        </button>
                        {openSection === "doaTarawih" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700 text-right">
                                <h2 className="text-lg font-bold text-purple-700">🌙 Doa Selepas Solat Tarawih</h2>
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
                            Panduan Solat Witir 🌙
                        </button>
                        {openSection === "solatWitir" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <p>
                                    Solat Witir dilakukan selepas Solat Tarawih sebagai penutup. Ia dilakukan dengan <b>1, 3, atau 11 rakaat</b>, dengan niat
                                    untuk mendekatkan diri kepada Allah.
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
                            Sunnah Berbuka Puasa 🍉
                        </button>
                        {openSection === "sunnahBuka" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <ul className="text-left list-disc list-inside">
                                    <li>Berbuka dengan kurma atau air</li>
                                    <li>Membaca doa berbuka puasa</li>
                                    <li>Tidak berlebihan dalam makan</li>
                                    <li>Segera solat Maghrib selepas berbuka</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* ✅ Tentang Zakat */}
                    <div>
                        <button
                            onClick={() => toggleSection("zakat")}
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-indigo-600"
                        >
                            Kewajiban Zakat Fitrah 💰
                        </button>
                        {openSection === "zakat" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <p>
                                    Zakat Fitrah wajib ditunaikan sebelum solat Aidilfitri. Ia bertujuan untuk menyucikan puasa dan membantu golongan fakir
                                    miskin. Bayaran zakat fitrah biasanya dalam bentuk makanan atau wang tunai.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ✅ Ramadhan Greeting */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-green-600">✨ Selamat Menjalani Ibadah Puasa! ✨</h2>
                    <p className="mt-2 text-gray-700">Semoga Ramadhan ini membawa keberkatan dan ampunan bagi kita semua. Aamiin. 🤲</p>
                </div>
            </div>
        </Layout>
    );
}
