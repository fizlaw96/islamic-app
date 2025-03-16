import React, { useState } from "react";
import Layout from "../../Layouts/Layout";

export default function RayaAidiladha() {
    const [openSection, setOpenSection] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "bm");

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <Layout>
            <div className="p-6 text-gray-700 dark:text-gray-300">
                <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 text-center">
                    🕋 {language === "bm" ? "Selamat Hari Raya Aidiladha!" : "Happy Eid al-Adha!"} 🕋
                </h1>
                <p className="mt-4 text-lg text-center dark:text-black">
                    {language === "bm"
                        ? "Aidiladha mengingatkan kita tentang pengorbanan dan keikhlasan dalam beribadah kepada Allah. Semoga perayaan ini mempererat ukhuwah kita."
                        : "Eid al-Adha reminds us of sacrifice and sincerity in worshiping Allah. May this celebration strengthen our bonds."}
                </p>
                <img src="/storage/assets/button/umrah.jpg" alt="Raya Aidiladha" className="mx-auto mt-6 w-60 h-auto rounded-lg shadow-lg" />

                {/* ✅ Toggle Sections for More Information */}
                <div className="mt-8 space-y-4">

                    {/* ✅ About Hajj */}
                    <div>
                        <button
                            onClick={() => toggleSection("aboutHajj")}
                            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-yellow-600"
                        >
                            {language === "bm" ? "📖 Tentang Haji" : "📖 About Hajj"}
                        </button>
                        {openSection === "aboutHajj" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
                                <p>
                                    {language === "bm"
                                        ? "Haji adalah rukun Islam kelima dan wajib bagi yang mampu. Ia melambangkan pengorbanan, ketaatan, dan kesatuan umat Islam."
                                        : "Hajj is the fifth pillar of Islam and is obligatory for those who can afford it. It symbolizes sacrifice, obedience, and unity among Muslims."}
                                </p>
                                <ul className="list-disc mt-3 pl-5">
                                    <li>{language === "bm" ? "Haji berlaku pada bulan Zulhijjah." : "Hajj takes place in the month of Zulhijjah."}</li>
                                    <li>{language === "bm" ? "Puncaknya adalah wukuf di Arafah pada 9 Zulhijjah." : "Its climax is the standing at Arafah on the 9th of Zulhijjah."}</li>
                                    <li>{language === "bm" ? "Jutaan umat Islam berkumpul di Makkah untuk menunaikan ibadah ini." : "Millions of Muslims gather in Makkah to perform this pilgrimage."}</li>
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
                            {language === "bm" ? "🕋 Talbiyah Haji - Labbaik Allah Humma Labbaik 🎶" : "🕋 Hajj Talbiyah - Labbaik Allah Humma Labbaik 🎶"}
                        </button>
                        {openSection === "talbiyah" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300 text-right">
                                <h2 className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                    {language === "bm" ? "🌙 Bacaan Talbiyah" : "🌙 Talbiyah Recitation"}
                                </h2>

                                {/* ✅ First Recitation */}
                                <p className="text-xl font-arabic leading-loose mt-3">
                                    لَبَّيْكَ ٱللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ <br />
                                    إِنَّ ٱلْحَمْدَ وَٱلنِّعْمَةَ لَكَ وَٱلْمُلْكَ، لَا شَرِيْكَ لَكَ
                                </p>
                                <p className="mt-2 italic">
                                    <b>
                                        {language === "bm"
                                            ? "Aku sambut panggilan-Mu, ya Allah, aku sambut panggilan-Mu. Tidak ada sekutu bagi-Mu, aku sambut panggilan-Mu. Segala puji, nikmat, dan kerajaan adalah milik-Mu, tidak ada sekutu bagi-Mu."
                                            : "I respond to Your call, O Allah, I respond to Your call. There is no partner for You, I respond to Your call. All praise, blessings, and sovereignty belong to You, and You have no partner."}
                                    </b>
                                </p>

                                {/* ✅ Repeated Recitation for Chanting */}
                                <h3 className="mt-4 font-semibold text-blue-600 dark:text-blue-400">
                                    {language === "bm" ? "📢 Ulangi Talbiyah Berulang Kali" : "📢 Repeat Talbiyah Continuously"}
                                </h3>
                                <p className="text-xl font-arabic leading-loose mt-3">
                                    لَبَّيْكَ ٱللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ <br />
                                    إِنَّ ٱلْحَمْدَ وَٱلنِّعْمَةَ لَكَ وَٱلْمُلْكَ، لَا شَرِيْكَ لَكَ
                                </p>

                                {/* ✅ Importance of Talbiyah */}
                                <h3 className="mt-4 font-semibold text-blue-600 dark:text-blue-400">
                                    {language === "bm" ? "📜 Keutamaan Talbiyah" : "📜 The Importance of Talbiyah"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Talbiyah adalah seruan hamba kepada Allah SWT dalam ibadah Haji dan Umrah sebagai pengakuan ketundukan dan keikhlasan kepada-Nya. Setiap Muslim yang memasuki ihram disunnahkan untuk mengulang Talbiyah sebanyak mungkin sepanjang perjalanan hingga tiba di Makkah."
                                        : "Talbiyah is a call to Allah SWT during Hajj and Umrah, signifying humility and sincerity. Every Muslim who enters Ihram is encouraged to repeat Talbiyah as frequently as possible during their journey until they arrive in Makkah."}
                                </p>

                                {/* ✅ Hadith on Talbiyah */}
                                <h3 className="mt-4 font-semibold text-blue-600 dark:text-blue-400">
                                    {language === "bm" ? "📜 Hadis tentang Talbiyah" : "📜 Hadith about Talbiyah"}
                                </h3>
                                <p className="italic">
                                    <b>
                                        {language === "bm"
                                            ? "Tidaklah seorang Muslim bertalbiyah kecuali pasti akan ikut bertalbiyah bersamanya semua yang ada di sebelah kanan dan kirinya, baik itu batu, pohon, dan tanah hingga ke ujung timur dan barat bumi. (HR. Tirmidzi)"
                                            : "Whenever a Muslim recites the Talbiyah, everything on his right and left—stones, trees, and even the earth—joins him in reciting it until the ends of the East and West. (Hadith by Tirmidhi)"}
                                    </b>
                                </p>

                                {/* ✅ Sunnah of Reciting Talbiyah */}
                                <h3 className="mt-4 font-semibold text-blue-600 dark:text-blue-400">
                                    {language === "bm" ? "🕌 Sunnah dalam Mengucapkan Talbiyah" : "🕌 Sunnah in Reciting Talbiyah"}
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
                                    <li>
                                        {language === "bm"
                                            ? "Disunnahkan membaca Talbiyah dengan suara lantang bagi laki-laki, sementara wanita cukup dengan suara perlahan."
                                            : "It is Sunnah for men to recite the Talbiyah loudly, while women should say it softly."}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Talbiyah diulang berulang kali sepanjang perjalanan menuju Makkah."
                                            : "Talbiyah should be repeated continuously throughout the journey to Makkah."}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Disunnahkan membaca Talbiyah setelah setiap solat, saat naik kendaraan, saat tiba di tempat baru, dan sebelum memasuki Masjidil Haram."
                                            : "It is Sunnah to recite the Talbiyah after every prayer, when boarding a vehicle, upon arriving at a new place, and before entering Masjid al-Haram."}
                                    </li>
                                </ul>

                                {/* ✅ Closing with Talbiyah */}
                                <h3 className="mt-4 font-semibold text-blue-600 dark:text-blue-400">
                                    {language === "bm" ? "📢 Ulangi Lagi Talbiyah" : "📢 Repeat Talbiyah Again"}
                                </h3>
                                <p className="text-xl font-arabic leading-loose mt-3">
                                    لَبَّيْكَ ٱللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ <br />
                                    إِنَّ ٱلْحَمْدَ وَٱلنِّعْمَةَ لَكَ وَٱلْمُلْكَ، لَا شَرِيْكَ لَكَ
                                </p>

                                <p className="mt-4 text-center font-bold text-blue-700 dark:text-blue-400">
                                    💙 {language === "bm" ? "Ya Allah, kami menyambut panggilan-Mu, terimalah ibadah kami. Aamiin. 🤲" : "O Allah, we respond to Your call. Accept our worship. Ameen. 🤲"}
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            onClick={() => toggleSection("hajjSteps")}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-green-600"
                        >
                            {language === "bm" ? "🕋 Cara Menunaikan Haji" : "🕋 Steps of Performing Hajj"}
                        </button>
                        {openSection === "hajjSteps" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300">
                                <h2 className="text-lg font-bold text-green-700 dark:text-green-400">
                                    {language === "bm" ? "🌙 Panduan Lengkap Ibadah Haji" : "🌙 Complete Guide to Hajj"}
                                </h2>
                                <p>
                                    {language === "bm"
                                        ? "Ibadah Haji adalah rukun Islam ke-5 dan wajib bagi yang mampu. Berikut adalah langkah-langkah pelaksanaan haji secara terperinci."
                                        : "Hajj is the fifth pillar of Islam and is obligatory for those who can afford it. Below are the detailed steps of performing Hajj."}
                                </p>

                                <ol className="list-decimal mt-3 pl-5 space-y-3">
                                    {/* ✅ 1. Niat & Ihram */}
                                    <li>
                                        <b>{language === "bm" ? "Niat & Ihram" : "Intention & Ihram"}</b> -
                                        {language === "bm" ? " Memakai pakaian ihram dan berniat haji dari " : " Wear the Ihram attire and make the intention for Hajj at "}
                                        <b>Miqat</b>.
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>{language === "bm" ? "Miqat adalah tempat yang ditetapkan untuk berniat haji." : "Miqat is the designated place to make the Hajj intention."}</li>
                                            <li>
                                                {language === "bm"
                                                    ? "Berniat dengan "
                                                    : "Make the intention with "}
                                                <b>"Labbaikallahumma Hajjan"</b> ({language === "bm" ? "Ya Allah, aku sambut panggilan-Mu untuk haji" : "O Allah, I respond to Your call for Hajj"}).
                                            </li>
                                            <li>{language === "bm" ? "Ihram bermaksud memasuki keadaan suci dan mematuhi larangan ihram." : "Ihram means entering a state of purity and observing its restrictions."}</li>
                                        </ul>
                                    </li>

                                    {/* ✅ 2. Wukuf di Arafah */}
                                    <li>
                                        <b>{language === "bm" ? "Wukuf di Arafah" : "Standing at Arafah"}</b> -
                                        {language === "bm" ? " Kemuncak ibadah haji pada " : " The peak of Hajj on "}
                                        <b>9 Zulhijjah</b>.
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>{language === "bm" ? "Berlaku dari waktu Zuhur hingga Maghrib." : "Occurs from Dhuhr to Maghrib time."}</li>
                                            <li>{language === "bm" ? "Tempat berkumpulnya jemaah untuk berdoa dan berzikir." : "Pilgrims gather to pray and perform dhikr."}</li>
                                            <li>
                                                {language === "bm"
                                                    ? "Rasulullah SAW bersabda: "
                                                    : "Prophet Muhammad (SAW) said: "}
                                                <b>"{language === "bm" ? "Haji itu adalah Arafah" : "Hajj is Arafah"}"</b> (HR. Tirmidzi).
                                            </li>
                                        </ul>
                                    </li>

                                    {/* ✅ 3. Mabit di Muzdalifah */}
                                    <li>
                                        <b>{language === "bm" ? "Mabit di Muzdalifah" : "Staying at Muzdalifah"}</b> -
                                        {language === "bm" ? " Bermalam di Muzdalifah selepas Arafah." : " Spending the night in Muzdalifah after Arafah."}
                                        <ul className="list-disc pl-5 mt-1">
                                            <li>{language === "bm" ? "Selepas matahari terbenam pada 9 Zulhijjah, jemaah bergerak ke Muzdalifah." : "After sunset on 9th Zulhijjah, pilgrims move to Muzdalifah."}</li>
                                            <li>{language === "bm" ? "Di sini, jemaah mengumpulkan batu untuk melontar Jamrah." : "Here, pilgrims collect stones for stoning the Jamrah."}</li>
                                        </ul>
                                    </li>

                                    {/* ✅ 4. Melontar Jamrah */}
                                    <li>
                                        <b>{language === "bm" ? "Melontar Jamrah" : "Stoning the Jamrah"}</b> -
                                        {language === "bm" ? " Simbolik melawan godaan syaitan pada 10, 11, 12, dan 13 Zulhijjah." : " A symbolic act of resisting Shaytan on 10th, 11th, 12th, and 13th Zulhijjah."}
                                    </li>

                                    {/* ✅ 5. Tawaf & Sa'i */}
                                    <li>
                                        <b>{language === "bm" ? "Tawaf & Sa'i" : "Tawaf & Sa'i"}</b> -
                                        {language === "bm" ? " Mengelilingi Kaabah sebanyak 7 kali dan berlari kecil di antara Safa dan Marwah." : " Circling the Kaabah seven times and performing Sa’i between Safa and Marwah."}
                                    </li>

                                    {/* ✅ 6. Tahallul */}
                                    <li>
                                        <b>{language === "bm" ? "Tahallul" : "Shaving Hair (Tahallul)"}</b> -
                                        {language === "bm" ? " Mencukur rambut sebagai tanda penyucian." : " Shaving the head as a sign of purification."}
                                    </li>

                                    {/* ✅ 7. Tawaf Wada' */}
                                    <li>
                                        <b>{language === "bm" ? "Tawaf Wada'" : "Farewell Tawaf"}</b> -
                                        {language === "bm" ? " Tawaf perpisahan sebelum meninggalkan Makkah." : " The final Tawaf before leaving Makkah."}
                                    </li>
                                </ol>

                                {/* ✅ Hadis dan Doa Haji */}
                                <h3 className="mt-4 font-semibold text-green-700 dark:text-green-400">
                                    {language === "bm" ? "📜 Doa & Hadis Tentang Haji" : "📜 Dua & Hadith about Hajj"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Rasulullah SAW bersabda: "
                                        : "The Prophet Muhammad (SAW) said: "}
                                    <b>
                                        "{language === "bm"
                                            ? "Barang siapa berhaji dan tidak melakukan rafath serta tidak berbuat fasik, maka ia akan kembali suci seperti bayi yang baru lahir."
                                            : "Whoever performs Hajj and avoids obscene language and wrongdoing, he will return as pure as a newborn baby."}" (HR. Bukhari & Muslim)
                                    </b>
                                </p>

                                {/* ✅ Doa Haji */}
                                <h3 className="mt-4 font-semibold text-green-700 dark:text-green-400">
                                    {language === "bm" ? "🤲 Doa Agar Haji Diterima" : "🤲 Dua for an Accepted Hajj"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose">
                                    اللَّهُمَّ اجْعَلْ حَجَّنَا مَبْرُورًا، وَذَنْبَنَا مَغْفُورًا، وَسَعْيَنَا مَشْكُورًا
                                </p>
                                <p className="mt-2">
                                    <b>
                                        {language === "bm"
                                            ? "Ya Allah, jadikanlah haji kami mabrur, dosa kami diampuni, dan usaha kami diterima."
                                            : "O Allah, make our Hajj accepted, forgive our sins, and bless our efforts."}
                                    </b>
                                </p>

                                <p className="mt-4 text-center font-bold text-green-700 dark:text-green-400">
                                    💚 {language === "bm" ? "Semoga Allah menerima ibadah haji kita semua. Aamiin. 🤲" : "May Allah accept our Hajj. Ameen. 🤲"}
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            onClick={() => toggleSection("storyIbrahim")}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md font-bold shadow-md hover:bg-red-600"
                        >
                            {language === "bm" ? "🕊️ Kisah Nabi Ibrahim & Raya Korban" : "🕊️ Story of Prophet Ibrahim & Eid al-Adha Sacrifice"}
                        </button>
                        {openSection === "storyIbrahim" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300">
                                <h2 className="text-lg font-bold text-red-700 dark:text-red-400">
                                    {language === "bm" ? "🌿 Kisah Pengorbanan Nabi Ibrahim AS" : "🌿 The Sacrifice of Prophet Ibrahim (AS)"}
                                </h2>
                                <p>
                                    {language === "bm"
                                        ? "Nabi Ibrahim AS diuji oleh Allah dengan perintah untuk mengorbankan anaknya, "
                                        : "Prophet Ibrahim (AS) was tested by Allah with the command to sacrifice his son, "}
                                    <b> Nabi Ismail AS</b>.{" "}
                                    {language === "bm"
                                        ? "Kisah ini menjadi asal usul ibadah Qurban yang disyariatkan dalam Islam."
                                        : "This story is the origin of the Islamic practice of Qurban (sacrifice)."}
                                </p>

                                {/* ✅ 1. Perintah Allah dalam Mimpi */}
                                <h3 className="mt-4 font-semibold text-red-600 dark:text-red-400">
                                    {language === "bm" ? "📜 1. Perintah Allah dalam Mimpi" : "📜 1. Allah’s Command in a Dream"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Allah menguji Nabi Ibrahim AS melalui mimpi untuk menyembelih anaknya. Dengan penuh kelembutan, beliau menyampaikan hal ini kepada Ismail."
                                        : "Allah tested Prophet Ibrahim (AS) through a dream commanding him to sacrifice his son. With great wisdom, he informed Ismail."}
                                </p>
                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    يَا بُنَيَّ إِنِّي أَرَىٰ فِي ٱلْمَنَامِ أَنِّيٓ أَذْبَحُكَ فَٱنظُرْ مَاذَا تَرَىٰ ۚ قَالَ يَٰٓأَبَتِ ٱفْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِىٓ إِن شَآءَ ٱللَّهُ مِنَ ٱلصَّٰبِرِينَ
                                </p>
                                <p className="italic mt-2">
                                    <b>
                                        {language === "bm"
                                            ? '"Wahai anakku! Sesungguhnya aku melihat dalam mimpiku bahawa aku menyembelihmu. Maka fikirkanlah apa pendapatmu?"'
                                            : '"O my son! Indeed, I have seen in a dream that I must sacrifice you. So tell me what you think."'}

                                        <br />
                                        {language === "bm"
                                            ? '(Ismail menjawab:) "Wahai ayahku! Laksanakanlah apa yang diperintahkan kepadamu; insyaAllah engkau akan mendapatiku termasuk orang yang sabar."'
                                            : '(Ismail replied:) "O my father! Do as you are commanded. If Allah wills, you will find me among the patient."'}

                                        (Surah As-Saffat: 102)
                                    </b>
                                </p>

                                {/* ✅ 2. Kepatuhan Nabi Ismail */}
                                <h3 className="mt-4 font-semibold text-red-600 dark:text-red-400">
                                    {language === "bm" ? "📜 2. Kepatuhan & Ketaatan Nabi Ismail" : "📜 2. Ismail’s Obedience & Patience"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Nabi Ismail AS menerima perintah ini dengan penuh keikhlasan dan berserah diri kepada Allah SWT."
                                        : "Prophet Ismail (AS) accepted this command with sincerity and full submission to Allah SWT."}
                                </p>
                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    فَلَمَّآ أَسْلَمَا وَتَلَّهُۥ لِلْجَبِينِ
                                </p>
                                <p className="italic mt-2">
                                    <b>
                                        {language === "bm"
                                            ? '"Maka ketika keduanya telah berserah diri dan Ibrahim membaringkan Ismail di atas pelipisnya..."'
                                            : '"When they both submitted to Allah’s will, and Ibrahim laid his son on his forehead..."'}
                                        (Surah As-Saffat: 103)
                                    </b>
                                </p>

                                {/* ✅ 3. Penggantian dengan Seekor Kibas */}
                                <h3 className="mt-4 font-semibold text-red-600 dark:text-red-400">
                                    {language === "bm" ? "📜 3. Penggantian Ismail dengan Kibas" : "📜 3. The Replacement of Ismail with a Ram"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Allah menggantikan Nabi Ismail dengan seekor kibas sebagai tanda kasih sayang-Nya."
                                        : "Allah replaced Prophet Ismail with a ram as a sign of His mercy."}
                                </p>
                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    وَفَدَيْنَٰهُ بِذِبْحٍ عَظِيمٍ
                                </p>
                                <p className="italic mt-2">
                                    <b>
                                        {language === "bm"
                                            ? '"Dan Kami tebus anak itu dengan seekor sembelihan yang besar."'
                                            : '"And We ransomed him with a great sacrifice."'}
                                        (Surah As-Saffat: 107)
                                    </b>
                                </p>

                                {/* ✅ 4. Ibadah Qurban dalam Islam */}
                                <h3 className="mt-4 font-semibold text-red-600 dark:text-red-400">
                                    {language === "bm" ? "📜 4. Asal-Usul Ibadah Qurban" : "📜 4. The Origin of Qurban (Sacrifice)"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Dari peristiwa ini, ibadah Qurban disyariatkan dalam Islam."
                                        : "From this event, the practice of Qurban (sacrifice) was established in Islam."}
                                </p>
                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    فَصَلِّ لِرَبِّكَ وَٱنْحَرْ
                                </p>
                                <p className="italic mt-2">
                                    <b>
                                        {language === "bm"
                                            ? '"Maka laksanakanlah solat kerana Tuhanmu, dan berqurbanlah."'
                                            : '"So pray to your Lord and offer sacrifice."'}
                                        (Surah Al-Kauthar: 2)
                                    </b>
                                </p>

                                {/* ✅ Kesimpulan */}
                                <h3 className="mt-4 font-semibold text-red-600 dark:text-red-400">
                                    {language === "bm" ? "🕌 Kesimpulan" : "🕌 Conclusion"}
                                </h3>
                                <p>
                                    {language === "bm"
                                        ? "Kisah Nabi Ibrahim AS mengajarkan tentang ketaatan mutlak kepada Allah."
                                        : "The story of Prophet Ibrahim (AS) teaches us absolute obedience to Allah."}
                                </p>

                                <p className="mt-4 text-center font-bold text-red-700 dark:text-red-400">
                                    💚 {language === "bm" ? "Semoga kita dapat mengambil hikmah dari pengorbanan ini. Aamiin. 🤲" : "May we learn from this great sacrifice. Ameen. 🤲"}
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
                            {language === "bm" ? "🐑 Sunnah Raya Korban" : "🐑 Sunnah of Eid al-Adha Sacrifice"}
                        </button>
                        {openSection === "sunnahQurban" && (
                            <div className="mt-2 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md text-gray-700 dark:text-gray-300">
                                <h2 className="text-lg font-bold text-purple-700 dark:text-purple-400">
                                    {language === "bm" ? "📜 Amalan Sunnah Raya Korban" : "📜 Sunnah Practices on Eid al-Adha"}
                                </h2>
                                <ul className="list-disc mt-3 pl-5">
                                    <li>
                                        {language === "bm"
                                            ? "Puasa sunat"
                                            : "Observing voluntary fasting on"}{" "}
                                        <b>Arafah</b> {language === "bm" ? "pada 9 Zulhijjah." : "on the 9th of Zulhijjah."}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Mandi sunat dan memakai pakaian terbaik."
                                            : "Performing Sunnah bath and wearing the best clothing."}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Bertakbir selepas solat bermula dari 9 hingga 13 Zulhijjah."
                                            : "Reciting Takbir after prayers from the 9th to the 13th of Zulhijjah."}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Berdoa selepas penyembelihan haiwan qurban."
                                            : "Making dua after the sacrificial animal is slaughtered."}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Membahagikan daging qurban kepada"
                                            : "Distributing the Qurban meat into"}{" "}
                                        <b>{language === "bm" ? "tiga bahagian" : "three portions"}</b>:{" "}
                                        {language === "bm"
                                            ? "sendiri, keluarga, dan fakir miskin."
                                            : "for oneself, family, and the needy."}
                                    </li>
                                </ul>

                                {/* ✅ Additional Sunnah */}
                                <h3 className="mt-4 font-semibold text-purple-700 dark:text-purple-400">
                                    {language === "bm" ? "📌 Amalan Tambahan Sunnah" : "📌 Additional Sunnah Practices"}
                                </h3>
                                <ul className="list-disc mt-3 pl-5">
                                    <li>
                                        {language === "bm"
                                            ? "Mengerjakan solat sunat Aidiladha sebelum menyembelih qurban."
                                            : "Performing Eid al-Adha Sunnah prayer before the Qurban sacrifice."}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Menghindari memotong rambut dan kuku sebelum berqurban."
                                            : "Avoiding cutting hair and nails before performing Qurban."}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Membaca doa dan menyebut nama Allah sebelum menyembelih."
                                            : "Reciting the prayer and mentioning Allah’s name before slaughtering the animal."}
                                    </li>
                                    <li>
                                        {language === "bm"
                                            ? "Membantu orang lain dalam menyembelih dan membahagikan daging."
                                            : "Helping others in the slaughter and distribution of the meat."}
                                    </li>
                                </ul>

                                {/* ✅ Sunnah Dua for Qurban */}
                                <h3 className="mt-4 font-semibold text-purple-700 dark:text-purple-400">
                                    {language === "bm" ? "📜 Doa Semasa Menyembelih Qurban" : "📜 Dua When Performing Qurban"}
                                </h3>
                                <p className="text-xl font-arabic text-right leading-loose mt-3">
                                    بِسْمِ ٱللَّهِ ٱللَّهُ أَكْبَرُ، ٱللَّهُمَّ هَذَا مِنِّي وَتَقَبَّلْهُ مِنِّي
                                </p>
                                <p className="italic mt-2">
                                    <b>
                                        {language === "bm"
                                            ? '"Dengan nama Allah, Allah Maha Besar. Ya Allah, ini dariku dan terimalah ia dariku."'
                                            : '"In the name of Allah, Allah is the Greatest. O Allah, this is from me, and accept it from me."'}
                                    </b>
                                </p>

                                {/* ✅ Conclusion */}
                                <p className="mt-4 text-center font-bold text-purple-700 dark:text-purple-400">
                                    💜 {language === "bm" ? "Semoga Allah menerima amalan Qurban kita semua. Aamiin. 🤲" : "May Allah accept our Qurban sacrifice. Ameen. 🤲"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ✅ Closing Message */}
                <div className="mt-8 text-center">
                    <h2 className="text-xl font-bold text-green-600 dark:text-green-400">
                        {language === "bm" ? "🌙 Selamat Hari Raya Aidiladha!" : "🌙 Happy Eid al-Adha!"}
                    </h2>
                    <p className="mt-2 dark:text-black">
                        {language === "bm"
                            ? "Semoga ibadah dan pengorbanan kita diterima oleh Allah SWT. Aamiin. 🤲"
                            : "May our worship and sacrifices be accepted by Allah SWT. Ameen. 🤲"}
                    </p>
                </div>
            </div>
        </Layout>
    );
}
