import React, { useState } from "react";
import Layout from "../../Layouts/Layout";

export default function RayaAidilfitri() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <Layout>
            <div className="text-center p-6">
                <h1 className="text-3xl font-bold text-green-700">🎉 Selamat Hari Raya Aidilfitri! 🎉</h1>
                <p className="mt-4 text-lg">
                    Aidilfitri is a special time of joy, forgiveness, and family gatherings. May this festival bring blessings to you and your loved ones.
                </p>
                <img src="/assets/button/raya.jpg" alt="Raya Aidilfitri" className="mx-auto mt-6 w-60 h-auto rounded-lg shadow-lg" />

                {/* ✅ Duit Raya QR Code */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-green-600">💰 Scan Here to Give Duit Raya! 💰</h2>
                    <img src="/assets/button/qrcode.jpeg" alt="QR Code Duit Raya" className="mx-auto w-40 h-40 mt-3 shadow-lg rounded-lg" />
                </div>

                {/* ✅ Toggle Blog Sections */}
                <div className="mt-8 space-y-4">
                    {/* Sunnah Hari Raya */}
                    <div>
                        <button
                            onClick={() => toggleSection("sunnah")}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-green-600"
                        >
                            Sunnah Hari Raya 📜
                        </button>
                        {openSection === "sunnah" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md">
                                <ul className="text-left list-disc list-inside text-gray-700">
                                    <li>🛁 Mandi sunnah sebelum solat raya</li>
                                    <li>👕 Memakai pakaian terbaik dan wangi-wangian</li>
                                    <li>📢 Bertakbir sepanjang perjalanan ke masjid</li>
                                    <li>🤝 Memberi salam dan maaf kepada keluarga & jiran</li>
                                    <li>🍽️ Menjamu makanan selepas solat raya</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Full Takbir Raya Lyrics in Arabic */}
                    <div>
                        <button
                            onClick={() => toggleSection("takbir")}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-blue-600"
                        >
                            Takbir Raya 🕌
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

                    {/* Necessary Raya Info */}
                    <div>
                        <button
                            onClick={() => toggleSection("info")}
                            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-yellow-600"
                        >
                            Pentingnya Aidilfitri ✨
                        </button>
                        {openSection === "info" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                {/* ✅ Center Only Titles */}
                                <h2 className="text-lg font-bold text-yellow-700 text-center">✨ Makna & Kepentingan Aidilfitri</h2>
                                <p className="mt-3 text-left">
                                    Aidilfitri bukan sekadar hari perayaan tetapi merupakan <b>hari kemenangan</b> bagi umat Islam selepas menjalani ibadah puasa selama sebulan di bulan Ramadhan.
                                    Ia adalah hari penuh keberkatan yang dianugerahkan oleh Allah SWT kepada hamba-Nya yang bertakwa.
                                </p>

                                {/* ✅ Quranic Verse on Eid Significance (Right Align for Arabic) */}
                                <p className="mt-3 text-left">
                                    Allah SWT berfirman dalam Al-Quran:
                                </p>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    وَلِتُكْمِلُوا۟ ٱلْعِدَّةَ وَلِتُكَبِّرُوا۟ ٱللَّهَ عَلَىٰ مَا هَدَىٰكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ
                                </p>
                                <p className="text-left"><b>"Dan hendaklah kamu mencukupkan bilangan (hari Ramadhan) dan hendaklah kamu mengagungkan Allah atas petunjuk-Nya yang diberikan kepadamu, agar kamu bersyukur."</b> (Surah Al-Baqarah: 185)</p>

                                {/* ✅ Amalan Sunnah di Hari Raya Aidilfitri */}
                                <h3 className="mt-4 font-semibold text-yellow-700 text-center">📜 Amalan Sunnah di Hari Raya Aidilfitri</h3>
                                <ul className="list-disc pl-5 space-y-2 text-left">
                                    <li><b>Mandi sunnah</b> sebelum solat Aidilfitri.</li>
                                    <li><b>Memakai pakaian terbaik</b> dan menggunakan wangi-wangian.</li>
                                    <li><b>Makan sebelum solat raya</b>, sebaiknya kurma dalam jumlah ganjil.</li>
                                    <li><b>Bertakbir</b> bermula dari malam raya hingga sebelum solat Aidilfitri.</li>
                                    <li><b>Solat sunat Aidilfitri</b> secara berjemaah.</li>
                                    <li><b>Mengucapkan tahniah</b> dan memperbanyak doa.</li>
                                    <li><b>Menghidupkan silaturahim</b> dengan keluarga, saudara, dan jiran.</li>
                                    <li><b>Bersedekah</b> dan membantu mereka yang memerlukan.</li>
                                </ul>

                                {/* ✅ Hadith on Eid al-Fitr Celebration */}
                                <h3 className="mt-4 font-semibold text-yellow-700 text-center">📜 Hadis Tentang Aidilfitri</h3>
                                <p className="text-left">
                                    Rasulullah SAW bersabda:
                                </p>
                                <p className="text-left">
                                    <b>"Sesungguhnya setiap kaum mempunyai hari raya, dan ini adalah hari raya kita (Aidilfitri dan Aidiladha)." (HR. Bukhari & Muslim)</b>
                                </p>

                                {/* ✅ Zakat Fitrah Obligation */}
                                <h3 className="mt-4 font-semibold text-yellow-700 text-center">💰 Kewajiban Zakat Fitrah</h3>
                                <p className="text-left">
                                    Aidilfitri juga mengingatkan kita tentang <b>zakat fitrah</b>, yang wajib ditunaikan sebelum solat Aidilfitri sebagai bentuk penyucian jiwa dan membantu golongan fakir miskin.
                                </p>
                                <p className="mt-3 text-left">
                                    Rasulullah SAW bersabda:
                                </p>
                                <p className="text-left">
                                    <b>"Rasulullah SAW mewajibkan zakat fitrah sebagai penyucian bagi orang yang berpuasa dan sebagai makanan bagi orang miskin." (HR. Abu Daud & Ibnu Majah)</b>
                                </p>

                                {/* ✅ Keindahan Ucapan Hari Raya */}
                                <h3 className="mt-4 font-semibold text-yellow-700 text-center">🕌 Ucapan & Doa Hari Raya</h3>
                                <p className="text-left">
                                    Pada hari raya, kita digalakkan untuk saling mengucapkan <b>"Taqabbalallahu minna wa minkum"</b> (Semoga Allah menerima amal ibadah kami dan kalian).
                                </p>

                                {/* ✅ Penutup */}
                                <h3 className="mt-4 font-semibold text-yellow-700 text-center">🤲 Doa Agar Ibadah Diterima</h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ تَقَبَّلْ مِنَّا صِيَامَنَا وَقِيَامَنَا وَأَعْمَالَنَا وَاجْعَلْنَا مِنَ الْفَائِزِينَ فِي هَذَا الشَّهْرِ الْكَرِيمِ
                                </p>
                                <p className="mt-2 text-left">
                                    <b>"Ya Allah, terimalah puasa kami, solat kami, dan amal ibadah kami. Jadikanlah kami termasuk orang-orang yang berjaya di bulan yang mulia ini."</b>
                                </p>

                                <p className="mt-4 text-center font-bold text-yellow-700">💛 Semoga Aidilfitri ini membawa keberkatan dan kebahagiaan bagi kita semua. Aamiin. 🤲</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ✅ Festive Decoration */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-green-600">🌙 Salam Lebaran! 🌙</h2>
                    <p className="mt-2 text-gray-700">Semoga hari raya ini dipenuhi dengan keberkatan dan kegembiraan. Maaf Zahir & Batin!</p>
                </div>
            </div>
        </Layout>
    );
}
