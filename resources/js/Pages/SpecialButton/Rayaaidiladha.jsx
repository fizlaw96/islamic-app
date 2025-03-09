import React, { useState } from "react";
import Layout from "../../Layouts/Layout";

export default function RayaAidiladha() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-3xl font-bold text-green-700 text-center">🕋 Selamat Hari Raya Aidiladha! 🕋</h1>
                <p className="mt-4 text-lg text-center">
                    Aidiladha is a reminder of <b>sacrifice</b> and <b>devotion to Allah</b>. May this holy celebration strengthen our faith and bring us closer to each other.
                </p>
                <img src="/assets/button/haji.jpg" alt="Raya Aidiladha" className="mx-auto mt-6 w-60 h-auto rounded-lg shadow-lg" />

                {/* ✅ Toggle Sections for More Information */}
                <div className="mt-8 space-y-4">

                    {/* ✅ About Hajj */}
                    <div>
                        <button
                            onClick={() => toggleSection("aboutHajj")}
                            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-yellow-600"
                        >
                            📖 Tentang Haji
                        </button>
                        {openSection === "aboutHajj" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <p>
                                    Haji adalah rukun Islam ke-5 dan diwajibkan kepada setiap Muslim yang mampu sekali dalam seumur hidup.
                                    Ia adalah simbol <b>pengorbanan</b>, <b>ketaatan</b>, dan <b>kesatuan umat Islam</b> dalam menyembah Allah SWT.
                                </p>
                                <ul className="list-disc mt-3 pl-5">
                                    <li>Haji berlangsung pada bulan <b>Zulhijjah</b>.</li>
                                    <li>Puncaknya adalah <b>wukuf di Arafah</b> pada 9 Zulhijjah.</li>
                                    <li>Jutaan umat Islam berkumpul di Makkah untuk menunaikan ibadah ini.</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* ✅ Talbiyah - Labbaik Allah Humma Labbaik */}
                    <div>
                        <button
                            onClick={() => toggleSection("talbiyah")}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-blue-600"
                        >
                            🕋 Talbiyah Haji - Labbaik Allah Humma Labbaik 🎶
                        </button>
                        {openSection === "talbiyah" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700 text-right">
                                <h2 className="text-lg font-bold text-blue-700">🌙 Bacaan Talbiyah</h2>

                                {/* ✅ First Recitation */}
                                <p className="text-xl font-arabic leading-loose mt-3">
                                    لَبَّيْكَ ٱللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ <br />
                                    إِنَّ ٱلْحَمْدَ وَٱلنِّعْمَةَ لَكَ وَٱلْمُلْكَ، لَا شَرِيْكَ لَكَ
                                </p>
                                <p className="mt-2 italic">
                                    <b>"Aku sambut panggilan-Mu, ya Allah, aku sambut panggilan-Mu. Tidak ada sekutu bagi-Mu, aku sambut panggilan-Mu.
                                    Segala puji, nikmat, dan kerajaan adalah milik-Mu, tidak ada sekutu bagi-Mu."</b>
                                </p>

                                {/* ✅ Repeated Recitation for Chanting */}
                                <h3 className="mt-4 font-semibold text-blue-600">📢 Ulangi Talbiyah Berulang Kali</h3>
                                <p className="text-xl font-arabic leading-loose mt-3">
                                    لَبَّيْكَ ٱللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ <br />
                                    إِنَّ ٱلْحَمْدَ وَٱلنِّعْمَةَ لَكَ وَٱلْمُلْكَ، لَا شَرِيْكَ لَكَ
                                </p>
                                <p className="text-xl font-arabic leading-loose mt-3">
                                    لَبَّيْكَ ٱللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ <br />
                                    إِنَّ ٱلْحَمْدَ وَٱلنِّعْمَةَ لَكَ وَٱلْمُلْكَ، لَا شَرِيْكَ لَكَ
                                </p>

                                <h3 className="mt-4 font-semibold text-blue-600">📜 Keutamaan Talbiyah</h3>
                                <p>
                                    Talbiyah adalah **seruan hamba kepada Allah SWT** dalam ibadah Haji dan Umrah sebagai **pengakuan ketundukan dan keikhlasan** kepada-Nya.
                                    Setiap Muslim yang memasuki ihram disunnahkan untuk **mengulang Talbiyah sebanyak mungkin** sepanjang perjalanan hingga tiba di Makkah.
                                </p>

                                {/* ✅ Hadis tentang Talbiyah */}
                                <h3 className="mt-4 font-semibold text-blue-600">📜 Hadis tentang Talbiyah</h3>
                                <p className="italic">
                                    <b>"Tidaklah seorang Muslim bertalbiyah kecuali pasti akan ikut bertalbiyah bersamanya semua yang ada di sebelah kanan dan kirinya,
                                    baik itu batu, pohon, dan tanah hingga ke ujung timur dan barat bumi." (HR. Tirmidzi)</b>
                                </p>

                                {/* ✅ Sunnah dalam Mengucapkan Talbiyah */}
                                <h3 className="mt-4 font-semibold text-blue-600">🕌 Sunnah dalam Mengucapkan Talbiyah</h3>
                                <ul className="list-disc list-inside text-gray-700 mt-2">
                                    <li>Disunnahkan membaca **Talbiyah dengan suara lantang bagi laki-laki**, sementara wanita cukup dengan suara perlahan.</li>
                                    <li>Talbiyah **diulang berulang kali** sepanjang perjalanan menuju Makkah.</li>
                                    <li>Disunnahkan membaca Talbiyah **setelah setiap salat, saat naik kendaraan, saat tiba di tempat baru, dan sebelum memasuki Masjidil Haram**.</li>
                                </ul>

                                {/* ✅ Penutup dengan Talbiyah */}
                                <h3 className="mt-4 font-semibold text-blue-600">📢 Ulangi Lagi Talbiyah</h3>
                                <p className="text-xl font-arabic leading-loose mt-3">
                                    لَبَّيْكَ ٱللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ <br />
                                    إِنَّ ٱلْحَمْدَ وَٱلنِّعْمَةَ لَكَ وَٱلْمُلْكَ، لَا شَرِيْكَ لَكَ
                                </p>

                                <p className="mt-4 text-center font-bold text-blue-700">💙 Ya Allah, kami menyambut panggilan-Mu, terimalah ibadah kami. Aamiin. 🤲</p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Steps of Performing Hajj */}
                    <div>
                        <button
                            onClick={() => toggleSection("hajjSteps")}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-green-600"
                        >
                            🕋 Cara Menunaikan Haji
                        </button>
                        {openSection === "hajjSteps" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <h2 className="text-lg font-bold text-green-700">🌙 Panduan Lengkap Ibadah Haji</h2>
                                <p>
                                    Ibadah Haji adalah rukun Islam yang ke-5 dan wajib bagi yang mampu. Berikut adalah langkah-langkah pelaksanaan haji secara terperinci.
                                </p>

                                <ol className="list-decimal mt-3 pl-5 space-y-3">
                                    {/* ✅ 1. Niat & Ihram */}
                                    <li>
                                        <b>Niat & Ihram</b> - Memakai pakaian ihram dan berniat haji dari <b>Miqat</b>.
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>Miqat adalah tempat yang ditetapkan untuk berniat haji.</li>
                                            <li>Berniat dengan <b>"Labbaikallahumma Hajjan"</b> (Ya Allah, aku sambut panggilan-Mu untuk haji).</li>
                                            <li>Ihram bermaksud memasuki keadaan suci dan mematuhi larangan ihram.</li>
                                        </ul>
                                    </li>

                                    {/* ✅ 2. Wukuf di Arafah */}
                                    <li>
                                        <b>Wukuf di Arafah</b> - Kemuncak ibadah haji pada **9 Zulhijjah**.
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>Berlaku dari waktu Zuhur hingga Maghrib.</li>
                                            <li>Tempat berkumpulnya jemaah untuk berdoa dan berzikir.</li>
                                            <li>Rasulullah SAW bersabda: **"Haji itu adalah Arafah"** (HR. Tirmidzi).</li>
                                        </ul>
                                    </li>

                                    {/* ✅ 3. Mabit di Muzdalifah */}
                                    <li>
                                        <b>Mabit di Muzdalifah</b> - Bermalam di Muzdalifah selepas Arafah.
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>Selepas matahari terbenam pada **9 Zulhijjah**, jemaah bergerak ke Muzdalifah.</li>
                                            <li>Di sini, jemaah mengumpulkan batu untuk melontar Jamrah.</li>
                                            <li>Allah SWT berfirman:
                                                <br />
                                                <b>"Maka apabila kamu telah bertolak dari Arafah, berzikirlah kepada Allah di Masy’aril Haram" (QS. Al-Baqarah: 198).</b>
                                            </li>
                                        </ul>
                                    </li>

                                    {/* ✅ 4. Melontar Jamrah */}
                                    <li>
                                        <b>Melontar Jamrah</b> - Simbolik melawan godaan syaitan pada **10, 11, 12, dan 13 Zulhijjah**.
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>Melontar 7 biji batu di Jamrah Kubra pada 10 Zulhijjah.</li>
                                            <li>Pada 11, 12, dan 13 Zulhijjah, melontar di **Jamrah Ula, Wusta, dan Kubra**.</li>
                                            <li>Melambangkan tindakan Nabi Ibrahim AS yang melontar syaitan.</li>
                                        </ul>
                                    </li>

                                    {/* ✅ 5. Tawaf & Sa'i */}
                                    <li>
                                        <b>Tawaf & Sa'i</b> - Mengelilingi Kaabah sebanyak **7 kali** dan berlari kecil di antara **Safa dan Marwah**.
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>Tawaf Ifadhah wajib dilakukan selepas melontar Jamrah.</li>
                                            <li>Sa’i adalah larian kecil antara **Safa dan Marwah** sebanyak **7 pusingan**.</li>
                                            <li>Sa’i mengingatkan pengorbanan **Hajar** yang mencari air untuk Nabi Ismail AS.</li>
                                        </ul>
                                    </li>

                                    {/* ✅ 6. Tahallul */}
                                    <li>
                                        <b>Tahallul</b> - Mencukur rambut sebagai tanda penyucian.
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>Boleh mencukur botak atau memendekkan rambut.</li>
                                            <li>Bagi wanita, cukup memotong hujung rambut sepanjang **satu ruas jari**.</li>
                                            <li>Setelah Tahallul, sebahagian larangan ihram sudah boleh dilakukan.</li>
                                        </ul>
                                    </li>

                                    {/* ✅ 7. Tawaf Wada' */}
                                    <li>
                                        <b>Tawaf Wada'</b> - Tawaf perpisahan sebelum meninggalkan Makkah.
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>Menandakan tamatnya ibadah haji.</li>
                                            <li>Wajib dilakukan sebelum meninggalkan Makkah.</li>
                                            <li>Disunnahkan berdoa sebanyak mungkin ketika Tawaf.</li>
                                        </ul>
                                    </li>
                                </ol>

                                {/* ✅ Hadis dan Doa Haji */}
                                <h3 className="mt-4 font-semibold text-green-700">📜 Doa & Hadis Tentang Haji</h3>
                                <p>
                                    Rasulullah SAW bersabda:
                                    <b>"Barang siapa berhaji dan tidak melakukan rafath (perkataan keji) serta tidak berbuat fasik, maka ia akan kembali suci seperti bayi yang baru lahir." (HR. Bukhari & Muslim)</b>
                                </p>

                                {/* ✅ Sunnah dalam Menunaikan Haji */}
                                <h3 className="mt-4 font-semibold text-green-700">🕌 Sunnah dalam Haji</h3>
                                <ul className="list-disc pl-5">
                                    <li>Melakukan **Shalat 2 rakaat** selepas memakai ihram.</li>
                                    <li>Berzikir dan bertakbir ketika berjalan menuju Arafah.</li>
                                    <li>Membaca **Doa Arafah** sebanyak mungkin.</li>
                                    <li>Memperbanyakkan doa selepas melontar Jamrah.</li>
                                </ul>

                                {/* ✅ Penutup */}
                                <h3 className="mt-4 font-semibold text-green-700">🤲 Doa Agar Haji Diterima</h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ اجْعَلْ حَجَّنَا مَبْرُورًا، وَذَنْبَنَا مَغْفُورًا، وَسَعْيَنَا مَشْكُورًا
                                </p>
                                <p className="mt-2"><b>"Ya Allah, jadikanlah haji kami mabrur, dosa kami diampuni, dan usaha kami diterima."</b></p>

                                <p className="mt-4 text-center font-bold text-green-700">💚 Semoga Allah menerima ibadah haji kita semua. Aamiin. 🤲</p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Kisah Nabi Ibrahim dan Raya Korban */}
                    <div>
                        <button
                            onClick={() => toggleSection("storyIbrahim")}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-red-600"
                        >
                            🕊️ Kisah Nabi Ibrahim & Raya Korban
                        </button>
                        {openSection === "storyIbrahim" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <h2 className="text-lg font-bold text-red-700">🌿 Kisah Pengorbanan Nabi Ibrahim AS</h2>
                                <p>
                                    Nabi Ibrahim AS adalah seorang hamba Allah yang sangat taat dan diuji dengan ujian berat untuk mengorbankan anaknya,
                                    <b> Nabi Ismail AS</b>. Kisah ini menjadi asal usul ibadah Qurban yang disyariatkan dalam Islam.
                                </p>

                                {/* ✅ 1. Perintah Allah dalam Mimpi */}
                                <h3 className="mt-4 font-semibold text-red-600">📜 1. Perintah Allah dalam Mimpi</h3>
                                <p>
                                    Allah SWT menguji Nabi Ibrahim AS dengan perintah melalui mimpi untuk menyembelih anaknya, Ismail AS.
                                    Nabi Ibrahim AS menyampaikan perkara ini kepada anaknya dengan penuh kelembutan:
                                </p>
                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    يَا بُنَيَّ إِنِّي أَرَىٰ فِي ٱلْمَنَامِ أَنِّيٓ أَذْبَحُكَ فَٱنظُرْ مَاذَا تَرَىٰ ۚ قَالَ يَٰٓأَبَتِ ٱفْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِىٓ إِن شَآءَ ٱللَّهُ مِنَ ٱلصَّٰبِرِينَ
                                </p>
                                <p className="italic mt-2">
                                    <b>"Wahai anakku! Sesungguhnya aku melihat dalam mimpiku bahawa aku menyembelihmu. Maka fikirkanlah apa pendapatmu?"
                                    (Ismail menjawab:) "Wahai ayahku! Laksanakanlah apa yang diperintahkan kepadamu; insyaAllah engkau akan mendapatiku termasuk orang yang sabar." (Surah As-Saffat: 102)</b>
                                </p>

                                {/* ✅ 2. Kepatuhan Nabi Ismail */}
                                <h3 className="mt-4 font-semibold text-red-600">📜 2. Kepatuhan & Ketaatan Nabi Ismail</h3>
                                <p>
                                    Dalam ketaatan yang luar biasa, Nabi Ismail AS **menerima perintah ini dengan ikhlas** dan berserah diri kepada Allah SWT.
                                    Ketika mereka berdua telah bersedia, Nabi Ibrahim AS pun bersiap untuk melaksanakan perintah Allah.
                                </p>
                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    فَلَمَّآ أَسْلَمَا وَتَلَّهُۥ لِلْجَبِينِ
                                </p>
                                <p className="italic mt-2">
                                    <b>"Maka ketika keduanya telah berserah diri dan Ibrahim membaringkan Ismail di atas pelipisnya..." (Surah As-Saffat: 103)</b>
                                </p>

                                {/* ✅ 3. Penggantian dengan Seekor Kibas */}
                                <h3 className="mt-4 font-semibold text-red-600">📜 3. Penggantian Ismail dengan Kibas</h3>
                                <p>
                                    Sebagai tanda kasih sayang-Nya, Allah menggantikan Nabi Ismail dengan seekor **kibas (domba)** sebelum penyembelihan dilakukan.
                                </p>
                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    وَفَدَيْنَٰهُ بِذِبْحٍ عَظِيمٍ
                                </p>
                                <p className="italic mt-2">
                                    <b>"Dan Kami tebus anak itu dengan seekor sembelihan yang besar." (Surah As-Saffat: 107)</b>
                                </p>
                                <p>
                                    Kejadian ini menjadi simbol **ketaatan yang luar biasa** kepada perintah Allah SWT dan melambangkan nilai-nilai pengorbanan dalam Islam.
                                </p>

                                {/* ✅ 4. Ibadah Qurban dalam Islam */}
                                <h3 className="mt-4 font-semibold text-red-600">📜 4. Asal-Usul Ibadah Qurban</h3>
                                <p>
                                    Dari peristiwa ini, Allah SWT mensyariatkan **Ibadah Qurban** bagi umat Islam sebagai tanda **ketaatan dan berbagi rezeki** kepada golongan yang memerlukan.
                                </p>
                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    فَصَلِّ لِرَبِّكَ وَٱنْحَرْ
                                </p>
                                <p className="italic mt-2">
                                    <b>"Maka laksanakanlah solat kerana Tuhanmu, dan berqurbanlah." (Surah Al-Kauthar: 2)</b>
                                </p>

                                {/* ✅ 5. Hadis tentang Keutamaan Qurban */}
                                <h3 className="mt-4 font-semibold text-red-600">📜 5. Hadis tentang Keutamaan Qurban</h3>
                                <p>
                                    Nabi Muhammad ﷺ bersabda mengenai keutamaan qurban bagi orang Islam:
                                </p>
                                <p className="mt-3 italic">
                                    <b>“Tidak ada suatu amalan pun yang dikerjakan oleh manusia pada hari raya qurban yang lebih dicintai Allah daripada menyembelih qurban.
                                    Sesungguhnya binatang qurban itu akan datang pada hari kiamat dengan tanduk, bulu, dan kukunya.
                                    Dan sebelum darahnya jatuh ke tanah, ia sudah diterima di sisi Allah. Maka berbahagialah dengan qurbanmu.”</b> (HR. Tirmidzi)
                                </p>

                                {/* ✅ Kesimpulan */}
                                <h3 className="mt-4 font-semibold text-red-600">🕌 Kesimpulan</h3>
                                <p>
                                    Kisah Nabi Ibrahim AS dan Nabi Ismail AS mengajarkan kita tentang <b>ketaatan mutlak kepada Allah SWT</b>,
                                    serta <b>keikhlasan dalam pengorbanan</b>. Hari Raya Aidiladha mengingatkan kita untuk selalu **berbagi, bersyukur, dan bersabar** dalam setiap ujian hidup.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ✅ Sunnah Raya Korban */}
                    <div>
                        <button
                            onClick={() => toggleSection("sunnahQurban")}
                            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-purple-600"
                        >
                            🐑 Sunnah Raya Korban
                        </button>
                        {openSection === "sunnahQurban" && (
                            <div className="mt-2 bg-white p-4 shadow-md rounded-md text-gray-700">
                                <ul className="list-disc mt-3 pl-5">
                                    <li>Puasa sunat <b>Arafah</b> pada 9 Zulhijjah.</li>
                                    <li>Mandi sunat dan memakai pakaian terbaik.</li>
                                    <li>Bertakbir selepas solat bermula dari 9 hingga 13 Zulhijjah.</li>
                                    <li>Berdoa selepas penyembelihan haiwan qurban.</li>
                                    <li>Membahagikan daging qurban kepada <b>tiga bahagian</b>: sendiri, keluarga, dan fakir miskin.</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* ✅ Closing Message */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-green-600">🌙 Selamat Hari Raya Aidiladha! 🌙</h2>
                    <p className="mt-2 text-gray-700">Semoga ibadah dan pengorbanan kita diterima oleh Allah SWT. Aamiin. 🤲</p>
                </div>
            </div>
        </Layout>
    );
}
