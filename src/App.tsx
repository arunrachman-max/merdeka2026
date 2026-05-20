/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Flag, 
  Target, 
  Heart, 
  Trophy, 
  Sparkles, 
  Calendar, 
  ClipboardCheck,
  ChevronRight,
  Menu,
  X,
  Loader2,
  RefreshCw,
  Lightbulb,
  Search,
  CheckCircle,
  HelpCircle,
  Award,
  BookOpen,
  UserCheck,
  PlayCircle,
  Share2,
  Copy,
  Mail,
  Send
} from 'lucide-react';

// Import claymation local image assets
// @ts-ignore
import clayBakiakImg from './assets/images/clay_bakiak_1779260903546.png';
// @ts-ignore
import claySarungImg from './assets/images/clay_sarung_1779260930058.png';
// @ts-ignore
import clayBocorImg from './assets/images/clay_bocor_1779260953388.png';
// @ts-ignore
import clayColoringImg from './assets/images/clay_coloring_1779262156503.png';
// @ts-ignore
import clayPuzzleImg from './assets/images/clay_puzzle_1779262183916.png';
// @ts-ignore
import clayMazeImg from './assets/images/clay_maze_1779262206464.png';
// @ts-ignore
import clayTowerImg from './assets/images/clay_tower_1779262228501.png';
// @ts-ignore
import clayObstaclesImg from './assets/images/clay_obstacles_1779262252463.png';

interface LombaIdea {
  title: string;
  category: 'anak-anak' | 'remaja';
  targetAge: string;
  description: string;
  togethernessValue: string;
  setupComplexity: 'Mudah' | 'Sedang' | 'Sulit';
  iconName: string;
  imageKeyword: string;
  howToPlay: string[];
  equipmentNeeded: string[];
  teamSizeRange: string;
  pahlawanHighlight?: string;
  interactiveQuiz?: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

const IconMap: Record<string, any> = {
  Users,
  Flag,
  Target,
  Heart,
  Trophy,
  Sparkles,
  Calendar,
  ClipboardCheck
};

// 10 Detailed Curated Games for Kids & Teens (with Claymation assets)
const INITIAL_IDEAS: LombaIdea[] = [
  // Kids (5 Lomba)
  {
    title: "Mewarnai Kanvas Raksasa Pahlawan",
    category: "anak-anak",
    targetAge: "Usia 6 - 12 Tahun",
    description: "3 sampai 5 anak berkumpul di depan kanvas jumbo berukuran 2x2 meter yang memuat siluet pahlawan Ir. Soekarno. Setiap anak dibatasi hanya boleh memegang 1 warna cat primer khusus, sehingga memaksa mereka untuk berdiskusi intensif, berbagi warna secara harmonis, dan diakhiri dengan menebak nama pahlawan tersebut bersama panitia.",
    togethernessValue: "Setiap goresan kuas anak yang saling mengisi mengajarkan bahwa keindahan bangsa dirajut dari bersatunya aneka warna gagasan tanpa saling mendominasi.",
    setupComplexity: "Mudah",
    iconName: "Sparkles",
    imageKeyword: "clay_coloring",
    howToPlay: [
      "Panitia membentangkan kanvas berukuran besar yang memuat garis siluet pahlawan Ir. Soekarno.",
      "Anak-anak (tim 3-5 orang) diberi kuas lukis, namun masing-masing hanya boleh memilih 1 warna cat unik (Merah, Putih, Kuning, Biru, atau Hijau).",
      "Mereka harus membagi area mewarnai secara adil agar cat tidak tumpang tindih berantakan.",
      "Anak-anak saling mengarahkan gerakan tangan kawannya jika kesulitan melukis bagian tepian.",
      "Di akhir sesi, mereka harus menjawab tebakan ciri perjuangan Bung Karno untuk memenangkan medali perdamaian."
    ],
    equipmentNeeded: ["Kanvas Siluet Jumbo (2x2 meter)", "Kuas cat akrilik berbagai ukuran", "Cat akrilik non-toxic aneka warna", "Ember kecil & lap kain"],
    teamSizeRange: "3 - 5 Anak",
    pahlawanHighlight: "Ir. Soekarno",
    interactiveQuiz: {
      question: "Siapakah nama pahlawan proklamator Indonesia yang sering memakai peci hitam ikonik dan membacakan teks Proklamasi Kemerdekaan?",
      options: ["Ir. Soekarno", "Jenderal Sudirman", "Pangeran Diponegoro"],
      correctAnswer: "Ir. Soekarno",
      explanation: "Ir. Soekarno merupakan Presiden pertama Republik Indonesia sekaligus sang proklamator bersama Mohammad Hatta pada tanggal 17 Agustus 1945."
    }
  },
  {
    title: "Pencarian Fragmen Puzzle Sejarah",
    category: "anak-anak",
    targetAge: "Usia 7 - 11 Tahun",
    description: "Kolaborasi suara penuntun kedaulatan. 3-5 anak bahu-membahu menyatukan kepingan puzzle kayu R.A. Kartini. Anak pencari kepingan matanya ditutup kain, lalu dipandu penuh oleh sorakan petunjuk vokal seirama dari rekan satu timnya agar bisa melampaui rintangan jalan dan menyusun puzzle bersama-sama.",
    togethernessValue: "Mendengar dan mematuhi arahan suara kawan di tengah ketidaktahuan melatih rasa percaya (trust building) dan kepatuhan kolektif.",
    setupComplexity: "Sedang",
    iconName: "Target",
    imageKeyword: "clay_puzzle",
    howToPlay: [
      "Sebanyak 3 anak ditutup matanya mengandalkan rabaan dan suara rekannya.",
      "2 anak bertindak sebagai penunjuk arah dari garis batas berteriak menuntun jalan ('maju 3 langkah', 'belok kanan sedikit').",
      "Pencari mencari 5 kepingan puzzle kayu pahlawan wanita legendaris R.A. Kartini di kotak tumpukan.",
      "Setelah potongan berhasil dikumpulkan, semua anak dibolehkan membuka penutup mata untuk menyusun puzzle di papan kayu bersama.",
      "Setelah berhasil terbentuk, tim bersama-sama membaca kutipan populer 'Habis Gelap Terbitlah Terang'."
    ],
    equipmentNeeded: ["Tiga pasang kain penutup mata warna merah", "Puzzle kayu tebal wajah R.A. Kartini", "Papan landasan puzzle magnetik", "Rintangan gembira (kerucut dsb)"],
    teamSizeRange: "3 - 5 Anak",
    pahlawanHighlight: "R.A. Kartini",
    interactiveQuiz: {
      question: "Pahlawan wanita inspiratif asal Jepara yang memperjuangkan kesetaraan pendidikan bagi kaum wanita melalui kumpulan surat 'Habis Gelap Terbitlah Terang' adalah...",
      options: ["Cut Nyak Dhien", "R.A. Kartini", "Dewi Sartika"],
      correctAnswer: "R.A. Kartini",
      explanation: "Raden Adjeng Kartini memperjuangkan emansipasi wanita agar perempuan Indonesia berhak mendapatkan pendidikan yang setara."
    }
  },
  {
    title: "Tebak Bisik Berantai Gaya Pejuang",
    category: "anak-anak",
    targetAge: "Usia 6 - 10 Tahun",
    description: "Lomba bisik berantai dengan sentuhan tebak tokoh sejarah. 3-5 anak berbaris sejajar menghindari bising. Anak terdepan menghafal deskripsi singkat perjuangan tokoh pahlawan dari panitia, membisikkannya seakurat mungkin ke anak berikutnya, lalu anak terakhir wajib memeragakan aksi pahlawan dan menebak namanya.",
    togethernessValue: "Melatih kesabaran mendengarkan orang lain secara utuh demi mewariskan estafet kisah perjuangan para pahlawan bangsa dengan benar.",
    setupComplexity: "Mudah",
    iconName: "Users",
    imageKeyword: "clay_sarung",
    howToPlay: [
      "Seluruh anggota tim berdiri berbaris ke belakang saling membelakangi.",
      "Panitia memberi secarik kertas berisi misi perjuangan Kapitan Pattimura dari Maluku pembawa senjata parang.",
      "Anak pertama membisikkan kalimat tersebut ke anak kedua dalam waktu 5 detik sembari berantai.",
      "Anak paling ujung (anak ke-4 atau ke-5) bertugas memperagakan aksi tebas pedang penuh wibawa dihadapan juri.",
      "Di saat yang sama, ia menebak gambar pahlawan Pattimura dari tumpukan kartu claymation bergambar."
    ],
    equipmentNeeded: ["Kartu petunjuk perjuangan pahlawan", "Tumpukan kartu foto pahlawan nasional", "Peluit panitia"],
    teamSizeRange: "3 - 5 Anak",
    pahlawanHighlight: "Kapitan Pattimura",
    interactiveQuiz: {
      question: "Pahlawan gagah berani dari Maluku yang memimpin perlawanan rakyat melawan Belanda menggunakan senjata parang panjang dan tergambar di pecahan uang kertas seribu rupiah lama adalah...",
      options: ["Pangeran Diponegoro", "Kapitan Pattimura", "Tuanku Imam Bonjol"],
      correctAnswer: "Kapitan Pattimura",
      explanation: "Kapitan Pattimura (Thomas Matulessy) adalah pemimpin perjuangan rakyat Maluku melawan kesewenang-wenangan VOC Belanda."
    }
  },
  {
    title: "Estafet Atribut Sang Jenderal",
    category: "anak-anak",
    targetAge: "Usia 6 - 12 Tahun",
    description: "Kerjasama ketangkasan fisik anak-anak menjaga balon keseimbangan bersama-sama. Tim anak-anak 3-5 orang mengapit balon karet besar di sela tubuh mereka agar tidak terjatuh selagi melangkah sejajar. Mereka harus bepergian mengumpulkan potongan atribut pertahanan Jenderal Sudirman.",
    togethernessValue: "Bahu-membahu melangkah serentak tanpa menjatuhkan balon mengajarkan bahwa dalam komunitas, menjaga keseimbangan kawan adalah kunci keutuhan tim.",
    setupComplexity: "Mudah",
    iconName: "Flag",
    imageKeyword: "clay_bakiak",
    howToPlay: [
      "Tim berbaris rapat menyamping, mengapit balon karet kokoh pada sisi pinggul antarpemain.",
      "Mereka harus melangkah serempak bersama-sama melintasi track bambu sejauh 8 meter.",
      "Di ujung lintasan, mereka mengambil aksesoris pahlawan Jenderal Sudirman (seperti replika tandu kayu, blangkon, jubah hangat).",
      "Membawa kembali atribut tersebut dalam barisan balon menuju papan pahlawan untuk direkatkan pada gambar yang sesuai.",
      "Tim dengan waktu paling harmonis dan pemasangan paling tepat dinobatkan sebagai pemenang."
    ],
    equipmentNeeded: ["Balon tebal Merah-Putih", "Replika aksesoris pahlawan (blangkon kertas, foto tandu dll)", "Papan siluet pahlawan besar", "Perekat velcro aman"],
    teamSizeRange: "3 - 5 Anak",
    pahlawanHighlight: "Jenderal Sudirman",
    interactiveQuiz: {
      question: "Siapakah panglima besar tentara Indonesia yang memimpin perang gerilya secara gigih dari atas tandu kayu meskipun sedang dalam kondisi sakit parah?",
      options: ["Sutan Sjahrir", "Jenderal Sudirman", "Bung Tomo"],
      correctAnswer: "Jenderal Sudirman",
      explanation: "Jenderal Besar Sudirman tetap memimpin taktik perang gerilya yang legendaris melawan agresi militer Belanda meskipun hanya memiliki satu paru-paru yang berfungsi."
    }
  },
  {
    title: "Paduan Ketukan Angklung Supratman",
    category: "anak-anak",
    targetAge: "Usia 7 - 12 Tahun",
    description: "Lomba menciptakan melodi harmonis lagu-lagu nasional ciptaan tokoh legendaris Indonesia. Setiap anak memegang sebilah angklung bernada berbeda. Mereka wajib menebak potongan judul lagu nasional, lalu beriringan membunyikan angklung sesuai ritme petunjuk warna demi mengaktifkan melodi yang indah.",
    togethernessValue: "Suara nada tunggal terdengar sunyi, namun bersatunya aneka nada berbeda menghasilkan melodi persatuan Indonesia yang megah di telinga.",
    setupComplexity: "Sedang",
    iconName: "Trophy",
    imageKeyword: "clay_bocor",
    howToPlay: [
      "Panitia membagikan angklung bambu dengan label nada do-re-mi-fa-sol ke masing-masing dari 5 anak dalam tim.",
      "Panitia memberikan kuis judul lagu kebangsaan Indonesia ciptaan W.R. Supratman.",
      "Begitu tim berhasil menebak judul 'Indonesia Raya', panitia membuka tirai partitur lagu yang diwakili oleh kode warna-warni.",
      "Setiap anak bertugas menggoyangkan angklung milik mereka tepat saat warna nada mereka ditunjuk oleh konduktor tim.",
      "Keindahan alunan melodi dipantau bersama oleh juri keserasian."
    ],
    equipmentNeeded: ["Satu set angklung bambu melodi dasar", "Peta warna ritme lagu", "Papan nilai kuis musik"],
    teamSizeRange: "3 - 5 Anak",
    pahlawanHighlight: "W.R. Supratman",
    interactiveQuiz: {
      question: "Siapakah tokoh pencipta lagu kebangsaan 'Indonesia Raya' yang pertama kali memainkannya menggunakan alat musik biola pada Kongres Pemuda Kedua tahun 1928?",
      options: ["W.R. Supratman", "Ismail Marzuki", "Ibu Sud"],
      correctAnswer: "W.R. Supratman",
      explanation: "Wage Rudolf Supratman adalah pahlawan nasional yang menggubah lagu kebangsaan kebanggaan kita, Indonesia Raya."
    }
  },

  // Teens (5 Lomba)
  {
    title: "Labirin Lintasan Trivia Perjuangan",
    category: "remaja",
    targetAge: "Usia 13 - 17 Tahun",
    description: "Uji ketahanan fisik dan taktik sejarah. 3 sampai 5 remaja bekerjasama menyeberangi jaring koordinasi tali elastis tanpa memicu lonceng berbunyi. Setiap kali melewati rintangan jalan, pintu rintangan hanya boleh dibuka jika tim kompak berunding memecahkan kuis taktik perang gerilya dengan tenggat waktu ketat.",
    togethernessValue: "Mengajarkan remaja bahwa mengatasi tantangan besar tidak sanggup mengandalkan kekuatan fisik semata, namun harus dipadukan dengan kesepakatan batin dan logika sejarah.",
    setupComplexity: "Sulit",
    iconName: "ChevronRight",
    imageKeyword: "clay_maze",
    howToPlay: [
      "Panitia memasang belasan jaring tali merah-putih berlonceng setinggi paha di lapangan rumput.",
      "Setiap tim menugaskan satu peserta sebagai navigator yang berdiri di garis luar sebagai pembaca instruksi keselamatan.",
      "Anggota tim yang merayap di jaring harus berhati-hati agar lonceng rintangan tidak berdering.",
      "Ketika sampai di pos perbatasan, tim dihadapkan pada pertanyaan sejarah kritis mengenai BPUPKI atau naskah Proklamasi.",
      "Jawaban yang sah disepakati bersama oleh tim untuk membuka izin lanjut ke pos finish."
    ],
    equipmentNeeded: ["Tali jemuran warna-warni (30 meter)", "Lonceng bel kerincingan kuningan kecil", "Papan tulis skor mini", "Kumpulan soal trivia BPUPKI & PPKI"],
    teamSizeRange: "3 - 5 Remaja",
    interactiveQuiz: {
      question: "Di kota manakah Ir. Soekarno dan Drs. Mohammad Hatta sempat diculik dan diamankan oleh golongan pemuda sebelum proklamasi kemerdekaan dideklarasikan?",
      options: ["Bandung", "Rengasdengklok", "Yogyakarta"],
      correctAnswer: "Rengasdengklok",
      explanation: "Peristiwa Rengasdengklok terjadi pada tanggal 16 Agustus 1945 di mana para pemuda mengamankan Soekarno-Hatta agar terbebas dari pengaruh Jepang."
    }
  },
  {
    title: "Menara Penyelamat Bambu Merdeka",
    category: "remaja",
    targetAge: "Usia 13 - 18 Tahun",
    description: "Kegiatan mendirikan bambu setinggi 2 meter menggunakan rantaian tali radial yang ditarik oleh 3 sampai 5 remaja secara harmonis dari sekeliling arah mata angin. Tim dituntut mengatur tarikan dan kelonggaran otot agar bambu tetap seimbang, sembari memecahkan kuis konstitusi beruntun.",
    togethernessValue: "Keseimbangan pilar menara mencerminkan kesepakatan bersama bahwa jika seseorang egois melepas ketegangan, maka merobohkan kesejahteraan seluruh kelompok.",
    setupComplexity: "Sedang",
    iconName: "Heart",
    imageKeyword: "clay_tower",
    howToPlay: [
      "Satu tongkat bambu diposisikan berdiri di tengah garis lingkaran batas.",
      "Terdapat 5 utas tali tambang tipis yang menyebar dari puncak bambu ke arah para peserta.",
      "Para peserta harus saling berkomunikasi memberi instruksi tarik-ulur agar bambu tidak jatuh menyentuh tanah.",
      "Panitia memberikan kuis mengenai amandemen UUD 1945 dan sejarah perjuangan.",
      "Jawaban benar diraih melalui teriakan bulat mufakat tim, diikuti hak memasang bendera kehormatan di pucuk bambu."
    ],
    equipmentNeeded: ["Batang Bambu ringan 2 meter", "Tali nilon tipis fleksibel (5 utas x 4 meter)", "Dudukan bendera berlubang di puncak bambu", "Bendera mini kain"],
    teamSizeRange: "3 - 5 Remaja",
    interactiveQuiz: {
      question: "Berapakah jumlah sila atau prinsip dasar negara Indonesia yang tercantum secara resmi pada pembukaan Undang-Undang Dasar 1945?",
      options: ["4 Sila", "5 Sila", "6 Sila"],
      correctAnswer: "5 Sila",
      explanation: "Pancasila terdiri dari lima sila yang menjadi landasan dasar ideologi, hukum, dan panduan hidup berbangsa dan bernegara bagi Indonesia."
    }
  },
  {
    title: "Jembatan Belahan Bambu Kelereng",
    category: "remaja",
    targetAge: "Usia 12 - 17 Tahun",
    description: "Penyaluran kelereng estafet dinamis sejauh 15 meter melewati tantangan jalan berliku. Tim remaja yang memegang belahan bambu harus menyambungkan ujung talang bambu agar kelereng terus menggelinding tanpa tersendat atau terjatuh. Setiap pemberhentian meter, tim dihentikan untuk menjawab pertanyaan kuis pahlawan.",
    togethernessValue: "Estafet kelereng yang mengalir mulus mewakili transisi tongkat perjuangan dan pembangunan peradaban bangsa yang berkelanjutan tanpa friksi.",
    setupComplexity: "Sedang",
    iconName: "Trophy",
    imageKeyword: "clay_obstacles",
    howToPlay: [
      "Masing-masing peserta (3-5 remaja) memegang sebilah bambu parit sepanjang setengah meter.",
      "Kelereng digulirkan dari garis start dan meluncur lambat mengikuti kemiringan bambu.",
      "Pemain di belakang harus secepat kilat berlari menyambung di ujung terdepan sebelum kelereng tergelincir jatuh.",
      "Di pos cek poin (tiap 5 meter), jalannya kelereng harus ditahan memakai jari bersama sembari memecahkan kuis sejarah pahlawan.",
      "Apabila jawaban tepat, perjalanan kelereng diizinkan melesat kembali ke garis finish."
    ],
    equipmentNeeded: ["Potongan bambu berlubang talang (5 bilah)", "Kelereng warna-warni", "Garis pembatas kapur", "Buku tebakan kuis perjuangan"],
    teamSizeRange: "3 - 5 Remaja",
    interactiveQuiz: {
      question: "Siapakah nama perdana menteri pertama RI yang memimpin perwakilan diplomasi Indonesia dalam perundingan kemerdekaan dan dijuluki diplomat cerdas?",
      options: ["Sutan Sjahrir", "Mohammad Hatta", "Ahong Tan"],
      correctAnswer: "Sutan Sjahrir",
      explanation: "Sutan Sjahrir merupakan perdana menteri pertama Indonesia yang juga memimpin perjuangan diplomatik di kancah internasional hingga kedaulatan diakui."
    }
  },
  {
    title: "Sumbat Paralon Kebocoran Kebangsaan",
    category: "remaja",
    targetAge: "Usia 13 - 18 Tahun",
    description: "Permainan basah yang memicu tawa riang dan kekompakan tinggi. Tim berisi 4-5 remaja merapatkan barisan menyumbat 20 lubang bocor pada pipa paralon setinggi dada warga. Sembari memegang sumbatan agar air tumpah dapat dikurangi dan bola pingpong pelampung naik, mereka dituntut melafalkan pilar kebangsaan secara lancar.",
    togethernessValue: "Kerja kolektif menutup kebocoran air menyimbolkan tekad kuat pemuda Indonesia untuk sigap menyelesaikan setiap ancaman disintegrasi bangsa secara sinergi.",
    setupComplexity: "Sulit",
    iconName: "Users",
    imageKeyword: "clay_bocor",
    howToPlay: [
      "Pipa paralon tegak setinggi 1.5 meter yang sudah dimodifikasi berlubang kecil disiapkan di tengah lapangan.",
      "Satu rekan menuangkan ember air dari atas pipa secara stabil.",
      "Peserta lain mengerahkan seluruh jemari, lengan, atau sikut menutup lubang-lubang bocor di sekeliling pipa.",
      "Panitia menguji fokus tim dengan membacakan pertanyaan seputar wawasan nusantara.",
      "Jika kuis berhasil diselesaikan cepat, bola merah di dalam pipa berhasil naik mengapung dan misi dinyatakan sukses."
    ],
    equipmentNeeded: ["Pipa paralon bocor moderen bergambar", "Ember air besar isi penuh", "Bola pingpong merah-putih", "Lembar kuis wawasan nusantara"],
    teamSizeRange: "4 - 5 Remaja",
    interactiveQuiz: {
      question: "Semboyan persatuan bangsa Indonesia 'Bhinneka Tunggal Ika' diambil dari kitab kuno Kakawin Sutasoma buatan empu terkenal di era Majapahit, yaitu...",
      options: ["Empu Tantular", "Empu Prapanca", "Empu Gandring"],
      correctAnswer: "Empu Tantular",
      explanation: "Semboyan Bhinneka Tunggal Ika tertulis dalam karya sastra Kakawin Sutasoma karangan Empu Tantular pada masa kejayaan Kerajaan Majapahit."
    }
  },
  {
    title: "Tari Tambang Sumbu Nusantara",
    category: "remaja",
    targetAge: "Usia 12 - 18 Tahun",
    description: "Lomba menggerakkan sumbu gambar berarah tali radial secara presisi. 5 remaja mengenakan sabuk penarik yang disatukan di cincin logam tengah pembawa spidol raksasa. Mereka saling membelakangi dan harus menjaga ketegangan otot pinggul secara presisi untuk menuntun arah spidol menggambar kata 'MERDEKA' di lantai terpal putih.",
    togethernessValue: "Mengajarkan pentingnya regulasi diri dan keterpaduan gerak, di mana tindakan satu orang langsung mempengaruhi arah kuas peradaban kelompok.",
    setupComplexity: "Sedang",
    iconName: "Users",
    imageKeyword: "clay_bakiak",
    howToPlay: [
      "Tali tambang elastis diikat melingkar dan disatukan pada sebuah cincin besi kokoh.",
      "Cincin besi dipasangi alat tulis spidol kontras tebal mengarah ke permukaan kanvas bawah.",
      "Remaja yang memakai ikat pinggang sabuk tali bergerak sinkron mundur-maju dengan mata jeli.",
      "Mereka harus melukis aksara tulisan kata 'MERDEKA' mengikuti pola garis garis putus yang tersedia.",
      "Tiap kali spidol goyah keluar jalur, mereka diwajibkan menjawab satu kuis lambang sila pancasila."
    ],
    equipmentNeeded: ["Tali tambang elastis (5 utas)", "Sabuk ikat pinggang empuk", "Cincin logam penahan dengan dudukan spidol", "Terpal putih pola aksara"],
    teamSizeRange: "3 - 5 Remaja",
    interactiveQuiz: {
      question: "Apakah lambang atau simbol dari Sila Ketiga Pancasila yang bermakna mengayomi seluruh keberagaman suku bangsa di bawah naungan persatuan Indonesia?",
      options: ["Kepala Banteng", "Pohon Beringin", "Rantai Emas"],
      correctAnswer: "Pohon Beringin",
      explanation: "Pohon Beringin melambangkan tempat berteduh, mengayomi, dan melambangkan persatuan seluruh rakyat Indonesia yang kokoh menancap di tanah air."
    }
  }
];

interface VideoTutorialInfo {
  youtubeId: string;
  duration: string;
  narrator: string;
  keySteps: string[];
  safetyNotes: string;
  tips: string;
}

const LOMBA_VIDEOS: Record<string, VideoTutorialInfo> = {
  "Mewarnai Kanvas Raksasa Pahlawan": {
    youtubeId: "VdFw98gQkK8",
    duration: "3 Menit 15 Detik",
    narrator: "Kak Aris (Mewarnai Kreatif)",
    keySteps: [
      "Siapkan kanvas raksasa (2x2 Meter) bergambar siluet pahlawan Ir. Soekarno di lapangan utama.",
      "Bagikan 1 warna cat unik yang berbeda ke masing-masing anak (tim berisi 3-5 orang).",
      "Anak-anak harus bersinergi mewarnai wilayahnya tanpa menabrak batas warna temannya.",
      "Latih koordinasi anak dengan membiarkan mereka berbagi kuas dan saling menuntun tangan.",
      "Minta seluruh regu menebak ciri perjuangan pahlawan sebelum diberi penilaian juri."
    ],
    safetyNotes: "Gunakan cat jenis akrilik non-toxic water-based yang aman bila terkena bibir atau kulit anak-anak.",
    tips: "Sediakan kuas berukuran besar dan kecil agar area lebar maupun arsiran sempit terisi rapi."
  },
  "Pencarian Fragmen Puzzle Sejarah": {
    youtubeId: "2M8I3gWfRNo",
    duration: "4 Menit 20 Detik",
    narrator: "Kak Indah (Panitia Lapangan)",
    keySteps: [
      "Tutup mata 3 pencari keping dengan penutup kain merah putih yang tidak tembus pandang.",
      "Posisikan 2 navigator tim di garis pembatas untuk berteriak memandu pergerakan temannya.",
      "Pencari merayap dan berjalan mendengarkan instruksi seperti 'kiri 2 langkah, jongkok!'",
      "Kumpulkan seluruh potongan kepingan puzzle kayu bergambar R.A. Kartini di kotak titik aman.",
      "Buka seluruh penutup mata dan bekerjasama merangkai puzzle hingga utuh secara sinkron."
    ],
    safetyNotes: "Pastikan tanah bersih bebas dari pecahan kaca atau bebatuan tajam yang membahayakan anak.",
    tips: "Buat kepingan puzzle berukuran cukup tebal dan beralas magnetik agar kokoh saat disusun."
  },
  "Tebak Bisik Berantai Gaya Pejuang": {
    youtubeId: "8K6mFhcoB14",
    duration: "2 Menit 45 Detik",
    narrator: "Kak Budi (Seksi Dokumentasi)",
    keySteps: [
      "Kumpulkan anak-anak dalam posisi berdiri berurutan membelakangi garis depan khalayak.",
      "Bisikkan rahasia narasi perjuangan Kapitan Pattimura dari Maluku kepada anak baris pertama.",
      "Estafetkan bisikan berantai sampai menyentuh anak di posisi paling ujung dalam 30 detik.",
      "Anak terakhir meniru gaya pedang parang Pattimura dan memilih kartu bergambar yang cocok.",
      "Tim mendapatkan poin setelah berhasil melafalkan nama pahlawan nasional dengan serempak."
    ],
    safetyNotes: "Jaga jarak berdiri minimal 1.5 meter agar anak tidak berdesakan saat membisikkan kata.",
    tips: "Bisikkan kata-kata yang menggunakan intonasi ceria dan memicu tawa hangat agar suasana riang."
  },
  "Estafet Atribut Sang Jenderal": {
    youtubeId: "1fT7X0yQx1s",
    duration: "3 Menit 50 Detik",
    narrator: "Kak Agus (Koor Perlengkapan)",
    keySteps: [
      "Jepit balon merah-putih kokoh di sela-sela pinggang antaranak dalam barisan rapat.",
      "Melangkah serasi bersama menyamping sejauh 8 meter mengikuti aba-aba genderang RT.",
      "Kumpulkan aksesoris replika milik Jenderal Sudirman (blangkon, jubah, foto tandu).",
      "Kembali dengan formasi balon utuh menuju papan rekat sejarah di baris awal permainan.",
      "Tempatkan atribut pahlawan dengan presisi sempurna sesuai kerangka bayangan yang benar."
    ],
    safetyNotes: "Pompa balon sewajarnya agar tidak terlalu tegang dan mudah meletus mengejutkan anak.",
    tips: "Gunakan rumput empuk sebagai medan tempur agar jika balon meletus/terjatuh, anak tetap ceria."
  },
  "Paduan Ketukan Angklung Supratman": {
    youtubeId: "Q_3rIdFvL0c",
    duration: "5 Menit 10 Detik",
    narrator: "Ibu Maya (Divisi Acara & Seni)",
    keySteps: [
      "Bagikan 5 buah angklung bernada dasar do-re-mi-fa-sol kepada masing-masing anak.",
      "Buka partitur musik berkas besar bermotifkan warna-warni kontras di depan para pemain.",
      "Anak-anak harus mengamati warna notasi dan mengguncang angklung saat warnanya ditunjuk.",
      "Padukan ketukan secara estafet membentuk lantunan refrein lagu nasional Indonesia Raya.",
      "Diskusikan tempo bersama-sama agar permainan melodi terdengar seimbang dan serasi."
    ],
    safetyNotes: "Berikan pengarahan memegang bagian tiang tegak angklung agar mencegah jari terjepit sayatan bambu.",
    tips: "Beri stiker penanda warna yang besar di setiap badan angklung untuk memudahkan fokus anak."
  },
  "Labirin Lintasan Trivia Perjuangan": {
    youtubeId: "p3Fm_2G4UeI",
    duration: "5 Menit 40 Detik",
    narrator: "Bung Dani (Technical Director)",
    keySteps: [
      "Gantungkan jaring rumit dari rantaian elastis/tali jemuran melingkar berlonceng rendah di tanah.",
      "Remaja bergantian merayap hati-hati bagai tentara gerilya tanpa memicu bel berbunyi.",
      "Di pos perbatasan, seluruh tim harus mufakat menjawab soal taktik perjuangan Pancasila.",
      "Kunci pintu pos dibuka hanya apabila jawaban lolos seleksi pertanyaan dari panitia keamanan.",
      "Selesaikan semua 3 tingkatan rintangan untuk merebut lencana emas persatuan remaja."
    ],
    safetyNotes: "Pastikan elastisitas tali jemuran longgar agar tidak menyengat atau menciderai kulit remaja.",
    tips: "Gunakan bel kuningan berukuran kecil agar tingkat kepekaan guncangan rintangan bertambah seru."
  },
  "Menara Penyelamat Bambu Merdeka": {
    youtubeId: "C6D9YJq-ZJ4",
    duration: "6 Menit 15 Detik",
    narrator: "Kak Linda (Pemandu Outbound)",
    keySteps: [
      "Tancapkan batang bambu setinggi 2 meter di tengah area cincin garis kapur lingkar.",
      "Sediakan 5 utas tali nilon panjang yang terhubung langsung pada puncak kepala tiang bambu.",
      "Remaja berdiri di sekeliling wilayah dan menarik tali secara seirama menjaga bambu tetap tegak.",
      "Panitia memberikan kuis amandemen UUD 1945 berantai saat tiang dalam proses penyeimbangan.",
      "Grup remaja yang berhasil mengibarkan bendera merah-putih di puncak tanpa menyentuh bambu menang."
    ],
    safetyNotes: "Peserta wajib memakai sarung tangan kain rajut untuk menghindari lecet di telapak tangan.",
    tips: "Gunakan bambu yang cukup ringan untuk meminimalisir beban tarikan tim remaja."
  },
  "Jembatan Belahan Bambu Kelereng": {
    youtubeId: "C9tGclRve28",
    duration: "4 Menit 30 Detik",
    narrator: "Koor Pemuda RT 08",
    keySteps: [
      "Bagikan sepotong talang bambu selokan setengah meter ke masing-masing remaja.",
      "Gulirkan satu kelereng meluncur pelan melewati talang bambu pertama perintis.",
      "Peserta di urutan belakang harus lari kilat meluncur menyambung talang di barisan depan.",
      "Tahan pergerakan kelereng sejenak di pos trivia pahlawan Sutan Sjahrir sebelum bergulir kembali.",
      "Hantarkan kelereng merdeka memasuki wadah botol di garis finish tanpa terjatuh sekali pun."
    ],
    safetyNotes: "Haluskan seluruh serpihan tajam di tepian belahan bambu parit dengan amplas kasar.",
    tips: "Lakukan latihan pemanasan kaki terlebih dahulu karena game ini menuntut kecepatan lari estafet."
  },
  "Sumbat Paralon Kebocoran Kebangsaan": {
    youtubeId: "J8P7F2o6zks",
    duration: "5 Menit",
    narrator: "Kak Edo (Seksi Air Bersih)",
    keySteps: [
      "Posisikan pipa paralon berlubang tegak lurus di tengah hamparan lapangan terbuka.",
      "Kumpulkan tim remaja merapatkan tubuh menyumbat 20 titik lubang kebocoran memakai sikut.",
      "Panitia mendampingi memasukkan air ke paralon sembari memberi pertanyaan wawasan kebangsaan.",
      "Kelompok remaja harus membacakan teks proklamasi selagi lengan berjuang menyumbat semburan air.",
      "Bola pingpong merah putih di dasar pipa harus melampung naik ke atas mulut paralon."
    ],
    safetyNotes: "Pastikan tanah tidak lincir. Sediakan lap pel dan pakaian ganti bagi seluruh peserta.",
    tips: "Berikan tekanan air konstan agar semburan tawa remaja makin meriah mendinginkan suasana."
  },
  "Tari Tambang Sumbu Nusantara": {
    youtubeId: "W3fQY7zC1w4",
    duration: "4 Menit 50 Detik",
    narrator: "Kak Farah (Instruktur Seni)",
    keySteps: [
      "Pasangkan ikat pinggang sabuk empuk ke masing-masing 5 remaja pelindung.",
      "Sambungkan seluruh sabuk penarik nilon langsung ke cincin pusat spidol lukis raksasa.",
      "Remaja berdiri saling membelakangi mengandalkan pergerakan pinggul penyesuaian tegangan.",
      "Tulis kata 'MERDEKA' seindah mungkin mengikuti pola garis putus di kanvas lantai.",
      "Dilarang menyentuh tali besi atau spidol secara paksa menggunakan telapak tangan langsung."
    ],
    safetyNotes: "Gunakan sabuk yang tebal dan empuk agar tidak mencederai tulang pinggul atau pinggang remaja.",
    tips: "Pilih kapten tim di tengah lapangan sebagai komando gerak: 'Maju', 'Mundur', atau 'Geser Kanan'."
  }
};

export default function App() {
  const [activeTab, setActiveTab ] = useState<'brainstorm' | 'plan' | 'about'>('brainstorm');
  const [categoryFilter, setCategoryFilter] = useState<'semua' | 'anak-anak' | 'remaja'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // App state for the list of games
  const [ideas, setIdeas] = useState<LombaIdea[]>(INITIAL_IDEAS);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Selected Game for Interactive Details Simulator
  const [selectedGame, setSelectedGame] = useState<LombaIdea | null>(null);
  const [modalTab, setModalTab] = useState<'simulasi' | 'video'>('video');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Simulated Interactive Game Sesi Mewarnai (Anak-anak)
  const [coloredSections, setColoredSections] = useState<Record<string, string>>({
    'peci': '#e2e8f0',
    'jas': '#e2e8f0',
    'dasi': '#e2e8f0',
    'background': '#f1f5f9'
  });
  const [activeColor, setActiveColor] = useState('#ee1b24'); // Default Merah
  const [kidTeammates, setKidTeammates] = useState([
    { name: 'Budi (Kuas Biru 🔵)', status: 'Siap membantu', progress: 0 },
    { name: 'Siti (Kuas Kuning 🟡)', status: 'Siap membantu', progress: 0 },
    { name: 'Agus (Kuas Hijau 🟢)', status: 'Siap membantu', progress: 0 }
  ]);
  const [kidsConsoleLogs, setKidsConsoleLogs] = useState<string[]>(['Sesi mewarnai kolaboratif dimulai! Bagilah daerah bersama kawan timmu.']);
  const [kidsQuizAnswer, setKidsQuizAnswer] = useState<string | null>(null);
  const [kidsSuccess, setKidsSuccess] = useState(false);

  // Simulated Interactive Game Sesi Lintasan Trivia (Remaja)
  const [teensStage, setTeensStage] = useState(1); // 1, 2, 3
  const [teensLogs, setTeensLogs] = useState<string[]>(['Tim bersiap menghadapi rintangan pertama: Melompati jaring tali merah-putih berlonceng!']);
  const [teensQuizAnswer, setTeensQuizAnswer] = useState<string | null>(null);
  const [teensTeammates, setTeensTeammates] = useState([
    { name: 'Eko (Remaja)', comment: 'Ayo tahan talinya bersama agar tidak memicu bel jaring!' },
    { name: 'Linda (Remaja)', comment: 'Fokus! Ingat pelajaran sejarah perjuangan kita.' }
  ]);
  const [teensSuccess, setTeensSuccess] = useState(false);

  // Management Timeline State for the 5 Committee Personnel
  const [tasks, setTasks] = useState([
    { id: 1, task: "Menentukan lokasi lapangan RT & urus perizinan warga", role: "Ketua Panitia", desc: "Berkoordinasi langsung dengan Ketua RT/RW setempat.", status: "Done" },
    { id: 2, task: "Penyusunan logistik (sound system, tenda peneduh, krayon)", role: "Divisi Perlengkapan", desc: "Meminjam inventaris milik warga dan mencari vendor.", status: "In Progress" },
    { id: 3, task: "Pengadaan cat akrilik besar & pipa paralon modifikasi", role: "Divisi Lomba", desc: "Membeli cat non-toxic dan melubangi paralon sesuai spesifikasi.", status: "In Progress" },
    { id: 4, task: "Konsumsi (snack kotak sehat untuk anak & remaja)", role: "Divisi Konsumsi", desc: "Menghubungi katering ibu-ibu PKK untuk snack tradisional.", status: "Pending" },
    { id: 5, task: "Publikasi pamflet digital melalui sosial media & WhatsApp", role: "Divisi Humas", desc: "Membuat poster berhias visual claymation lucu untuk mengundang warga.", status: "In Progress" },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskRole, setNewTaskRole] = useState('Ketua Panitia');

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-lomba', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          teamSize: 5, 
          focus: 'Kekompakan, Kebersamaan, Lomba Anak Kognitif Pahlawan, Lomba Remaja Rintangan Kuis Mufakat, karakter claymation' 
        }),
      });
      const data = await response.json();
      if (data.ideas && data.ideas.length > 0) {
        // Upgrade retrieved ideas to match interface requirement
        const formatted = data.ideas.map((id: any) => ({
          ...id,
          category: id.category || (Math.random() > 0.5 ? 'remaja' : 'anak-anak'),
          targetAge: id.targetAge || (id.category === 'anak-anak' ? 'Usia 6 - 12 Tahun' : 'Usia 13 - 18 Tahun'),
          howToPlay: id.howToPlay || [id.description],
          equipmentNeeded: id.equipmentNeeded || ["Peralatan keselamatan kolaboratif"],
          teamSizeRange: id.teamSizeRange || "3 - 5 Orang"
        }));
        setIdeas([...formatted, ...INITIAL_IDEAS]);
      } else {
        setIdeas(INITIAL_IDEAS);
      }
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
      setIdeas(INITIAL_IDEAS);
    } finally {
      setLoading(false);
    }
  };

  // Helper image matcher mapping
  function getLombaImage(title: string, keyword: string) {
    const normKeyword = (keyword || '').toLowerCase();
    const normTitle = (title || '').toLowerCase();

    if (normKeyword.includes('coloring') || normTitle.includes('warna') || normTitle.includes('kanvas') || normTitle.includes('painting')) {
      return clayColoringImg;
    }
    if (normKeyword.includes('puzzle') || normTitle.includes('puzzle') || normTitle.includes('fragmen')) {
      return clayPuzzleImg;
    }
    if (normKeyword.includes('maze') || normTitle.includes('maze') || normTitle.includes('labirin') || normTitle.includes('tali')) {
      return clayMazeImg;
    }
    if (normKeyword.includes('tower') || normTitle.includes('menara')) {
      return clayTowerImg;
    }
    if (normKeyword.includes('obstacle') || normTitle.includes('jembatan') || normKeyword.includes('bambu')) {
      return clayObstaclesImg;
    }
    if (normKeyword.includes('bakiak') || normTitle.includes('bakiak')) {
      return clayBakiakImg;
    }
    if (normKeyword.includes('sarung') || normTitle.includes('sarung')) {
      return claySarungImg;
    }
    if (normKeyword.includes('bocor') || normTitle.includes('bocor') || normKeyword.includes('pipa') || normTitle.includes('paralon')) {
      return clayBocorImg;
    }

    return "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?auto=format&fit=crop&w=600&h=450&q=80";
  }

  // Handle Kids Coloring Interaction
  const handleColorSection = (section: string) => {
    setColoredSections(prev => ({
      ...prev,
      [section]: activeColor
    }));

    // Trigger helper log comments
    const helpers = ['Budi', 'Siti', 'Agus'];
    const randomHelper = helpers[Math.floor(Math.random() * helpers.length)];
    const comments = [
      `membantu mewarnai area tepian dengan rapi!`,
      `memuji pilihan warnamu: 'Bagus sekali gradasinya!'`,
      `meminjami kuas ukuran kecil agar pengerjaan makin presisi.`
    ];
    const systemComment = `${randomHelper} ${comments[Math.floor(Math.random() * comments.length)]}`;
    
    setKidsConsoleLogs(prev => [systemComment, ...prev.slice(0, 4)]);
  };

  // Check Kids Quiz
  const handleVerifyKidsQuiz = (ans: string) => {
    setKidsQuizAnswer(ans);
    if (ans === selectedGame?.interactiveQuiz?.correctAnswer) {
      setKidsSuccess(true);
      setKidsConsoleLogs(prev => ["🎉 LUAR BIASA! Jawabanmu benar! Tim anak-anak bersorak gembira merayakan kemenangan bersama!", ...prev]);
    } else {
      setKidsSuccess(false);
      setKidsConsoleLogs(prev => ["❌ Sayang sekali, jawaban masih kurang tepat. Berdiskusilah kembali bersama tim!", ...prev]);
    }
  };

  // Reset Kids Simulator State
  const resetKidsSimulator = () => {
    setColoredSections({
      'peci': '#e2e8f0',
      'jas': '#e2e8f0',
      'dasi': '#e2e8f0',
      'background': '#f1f5f9'
    });
    setKidsQuizAnswer(null);
    setKidsSuccess(false);
    setKidsConsoleLogs(['Sesi mewarnai kolaboratif dimulai kembali! Bagilah wilayah mewarnaimu.']);
  };

  // Handle Teens Simulator Steps
  const handleTeensQuiz = (ans: string) => {
    setTeensQuizAnswer(ans);
    const correct = "Rengasdengklok"; // Safe hardcoded correct for Stage 1, we can branch
    let actualCorrect = selectedGame?.interactiveQuiz?.correctAnswer || "Rengasdengklok";
    
    // For other custom games, we fall back to general teenage quiz answers
    if (teensStage === 2) actualCorrect = "5 Sila";
    if (teensStage === 3) actualCorrect = "Empu Tantular";

    if (ans === actualCorrect) {
      if (teensStage < 3) {
        const nextStage = teensStage + 1;
        setTeensStage(nextStage);
        setTeensQuizAnswer(null);
        
        let msg = '';
        if (nextStage === 2) {
          msg = "🔓 RINTANGAN 1 LUAR BIASA PASSED! Menuju Rintangan 2: Menyeimbangkan bambu pusaka.";
          setTeensTeammates([
            { name: 'Linda (Remaja)', comment: 'Gencar sekali! Tarik tambang penyeimbang nilon sebelah kiri sekarang!' },
            { name: 'Rian (Remaja)', comment: 'Mari seimbangkan bersama dengan sabuk ikat pinggang kita.' }
          ]);
        } else if (nextStage === 3) {
          msg = "🔓 RINTANGAN 2 BERHASIL DILEWATI! Memasuki Rintangan 3 Akhir: Menyumbat kebocoran Pipa Paralon.";
          setTeensTeammates([
            { name: 'Eko (Remaja)', comment: 'Airnya hampir meluap! Tempel lengan kawan-kawan, sumbat lobang bawah!' },
            { name: 'Fahri (Remaja)', comment: 'Inilah perjuangan terakhir kita demi kejayaan kemerdekaan!' }
          ]);
        }
        setTeensLogs(prev => [msg, ...prev]);
      } else {
        setTeensSuccess(true);
        setTeensLogs(prev => ["🏆 CONGRATULATIONS! Tim remaja berhasil menyelesaikan ekspedisi perjuangan secara kompak dan mengibarkan Sang Merah Putih di pucuk tiang pembangunan!", ...prev]);
      }
    } else {
      setTeensLogs(prev => ["❌ Jawaban keliru atau kurang kompak! Berdiskusilah kembali bersama tim agar tarikan tali seimbang kembali.", ...prev]);
    }
  };

  // Reset Teen Simulator
  const resetTeensSimulator = () => {
    setTeensStage(1);
    setTeensQuizAnswer(null);
    setTeensSuccess(false);
    setTeensLogs(['Tim bersiap menghadapi rintangan pertama: Melompati jaring tali merah-putih berlonceng!']);
    setTeensTeammates([
      { name: 'Eko (Remaja)', comment: 'Ayo tahan talinya bersama agar tidak memicu bel jaring!' },
      { name: 'Linda (Remaja)', comment: 'Fokus! Ingat pelajaran sejarah perjuangan kita.' }
    ]);
  };

  // Add a task in committee tab
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      task: newTaskInput,
      desc: newTaskDesc || "Segera koordinasikan bersama rekan panitia.",
      role: newTaskRole,
      status: "Pending"
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskInput('');
    setNewTaskDesc('');
  };

  // Toggle status of a task
  const toggleTaskStatus = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Pending' ? 'In Progress' : t.status === 'In Progress' ? 'Done' : 'Pending';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Remove a task
  const removeTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Generate beautiful sharing text representing active task checklist
  const getShareText = () => {
    const taskSummary = tasks.map((t, idx) => {
      const statusEmoji = t.status === 'Done' ? '✅' : t.status === 'In Progress' ? '⏳' : '❌';
      return `${idx + 1}. [${t.role}] ${t.task} (${statusEmoji} ${t.status === 'Done' ? 'Selesai' : t.status === 'In Progress' ? 'Berjalan' : 'Belum Mulai'})`;
    }).join('\n');
    
    return `🇮🇩 BLUEPRINT TUGAS PANITIA AGUSTUSAN (RW 08) 🇮🇩\n\nHalo rekan panitia! Berikut adalah daftar tugas dan progress tim kita saat ini:\n\n${taskSummary}\n\nMari kita gotong royong sengkuyung bersama demi kesuksesan perayaan kemerdekaan! 💪✨\nLihat selengkapnya di: ${window.location.href}`;
  };

  const handleCopyToClipboard = () => {
    const textToCopy = getShareText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopiedNotification(true);
          setTimeout(() => setCopiedNotification(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    } else {
      // Fallback for custom browsers/iframes
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";  // Avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopiedNotification(true);
          setTimeout(() => setCopiedNotification(false), 2000);
        }
      } catch (err) {
        console.error('Fallback failed: ', err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Filter ideas based on search search Query and Category Filter
  const filteredIdeas = ideas.filter(idea => {
    const matchesCategory = categoryFilter === 'semua' || idea.category === categoryFilter;
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (idea.pahlawanHighlight && idea.pahlawanHighlight.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 merdeka-gradient rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-red-200">
                79
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-extrabold tracking-tight text-gray-900 leading-none uppercase">
                  Sinergi <span className="text-red-600">Merdeka</span>
                </span>
                <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Sajak Gotong Royong</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { id: 'brainstorm', label: '10 Lomba Merdeka', icon: Lightbulb },
                { id: 'plan', label: 'Blueprint Panitia 5 Orang', icon: Calendar },
                { id: 'about', label: 'Filosofi Sinergi', icon: Heart },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 text-sm font-bold transition-all relative py-2 ${
                    activeTab === tab.id ? 'text-red-600' : 'text-gray-500 hover:text-gray-950'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="navigation-active-bar"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="md:hidden">
              <button 
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle Menu Utama"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-red-50 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {[
                { id: 'brainstorm', label: '10 Lomba Merdeka', icon: Lightbulb },
                { id: 'plan', label: 'Blueprint Panitia 5 Orang', icon: Calendar },
                { id: 'about', label: 'Filosofi Sinergi', icon: Heart },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-4 text-base font-bold rounded-2xl transition-all ${
                    activeTab === tab.id ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Banner Hero */}
        <div className="relative mb-16 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-red-600 to-red-700 text-white p-8 md:p-16 shadow-xl shadow-red-100">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-white/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/15 rounded-full blur-[90px] -ml-4 -mb-48"></div>
          
          <div className="relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-6 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                79 TAHUN KEMERDEKAAN RI
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-[1.1] mb-6 tracking-tight">
                Pesta Rakyat Tanah Air: <br />
                <span className="text-yellow-300">Berserikat & Saling Menguatkan</span>
              </h1>
              <p className="text-lg md:text-xl text-red-50 md:leading-relaxed max-w-3xl mb-8 font-medium">
                Kami hadirkan 10 ide lomba kemerdekaan yang dikurasi khusus (5 untuk Anak-Anak, 5 untuk Remaja) berkarakter claymation 3D modern. Setiap kontes dirancang dengan sinergi minimum 3-5 peserta untuk memupuk tawa, edukasi, dan kerja tim sejati.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => { setActiveTab('brainstorm'); setCategoryFilter('semua'); }}
                  className="bg-white text-red-700 font-bold px-8 py-4 rounded-2xl hover:bg-yellow-100 transition-all shadow-md hover:-translate-y-0.5"
                >
                  Jelajahi 10 Lomba
                </button>
                <button 
                  onClick={() => setActiveTab('plan')}
                  className="bg-red-800/40 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all"
                >
                  Atur Tugas Panitia (5 Orang)
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Outer Tabs Rendering */}
        <AnimatePresence mode="wait">
          {activeTab === 'brainstorm' && (
            <motion.div
              key="brainstorm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Filter controls and info */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-red-50 shadow-sm space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-display font-black text-gray-900 tracking-tight">Katalog Lomba Nusantara</h2>
                    <p className="text-sm text-gray-500 font-medium">Saring lomba berdasarkan kelompok usia atau cari pahlawan nasional favoritmu.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Cari lomba atau pahlawan..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all w-64 font-medium"
                      />
                    </div>
                    <button 
                      onClick={fetchIdeas}
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-5 py-3 rounded-xl text-xs font-bold hover:bg-red-100 transition-all disabled:opacity-50"
                      title="Generate tambahan ide lomba berbasis AI"
                    >
                      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                      Minta AI Tambah Lomba
                    </button>
                  </div>
                </div>

                {/* Categories Switch Tabs */}
                <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                  {[
                    { id: 'semua', label: 'Semua Lomba (10)', icon: Trophy },
                    { id: 'anak-anak', label: 'Anak-Anak (Edukasi & Pahlawan)', icon: BookOpen },
                    { id: 'remaja', label: 'Remaja (Obstacle & Kuis)', icon: ShieldAlertIcon },
                  ].map((cat) => {
                    const CatIcon = cat.icon === ShieldAlertIcon ? BadgeTeen : cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(cat.id as any)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-tight transition-all ${
                          categoryFilter === cat.id 
                            ? 'bg-red-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <CatIcon className="w-3.5 h-3.5" />
                        {cat.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Lomba Grid List matching exactly user intent */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredIdeas.map((idea, index) => {
                  const IconComponent = IconMap[idea.iconName] || Trophy;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(index * 0.05, 0.4) }}
                      className="group bg-white rounded-[2rem] border border-gray-150 p-6 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative"
                    >
                      <div>
                        {/* Lomba Header Asset (Claymation styled portrait or Unsplash tailored asset) */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-stone-100 border border-gray-100">
                          <img 
                            src={getLombaImage(idea.title, idea.imageKeyword)} 
                            alt={idea.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          
                          {/* Left icon wrapper */}
                          <div className="absolute top-4 left-4 w-10 h-10 bg-white/95 rounded-xl flex items-center justify-center text-red-600 shadow-md">
                            <IconComponent className="w-5 h-5" />
                          </div>

                          {/* Right size indicator badge */}
                          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {idea.teamSizeRange}
                          </div>

                          {/* Category Badge */}
                          <div className="absolute bottom-4 left-4">
                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                              idea.category === 'anak-anak' 
                                ? 'bg-yellow-400 text-stone-900' 
                                : 'bg-blue-600 text-white'
                            }`}>
                              {idea.category === 'anak-anak' ? 'Anak-Anak' : 'Remaja'}
                            </span>
                          </div>
                        </div>

                        {/* Title and descriptions */}
                        <h3 className="text-xl font-display font-black text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-1">
                          {idea.title}
                        </h3>
                        
                        {idea.category === 'anak-anak' && idea.pahlawanHighlight && (
                          <div className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg text-xs font-bold mb-3 border border-yellow-100">
                            <BookOpen className="w-3.5 h-3.5" />
                            Materi: {idea.pahlawanHighlight}
                          </div>
                        )}

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                          {idea.description}
                        </p>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-5 border-t border-gray-100">
                        {/* Togetherness message card block */}
                        <div className="bg-red-50/50 p-4 rounded-xl border border-red-50 mb-4">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-red-500 block mb-1">Filosofi Sinergi</span>
                          <span className="text-xs font-semibold text-gray-700 leading-snug italic block">
                            "{idea.togethernessValue}"
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            Kompleksitas: <span className="text-red-600 font-extrabold">{idea.setupComplexity}</span>
                          </span>

                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setSelectedGame(idea);
                                resetKidsSimulator();
                                resetTeensSimulator();
                                setModalTab('video');
                              }}
                              className="border-2 border-red-100 hover:bg-red-50 text-red-600 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shrink-0"
                            >
                              <PlayCircle className="w-3.5 h-3.5" />
                              Video Tutorial
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedGame(idea);
                                resetKidsSimulator();
                                resetTeensSimulator();
                                setModalTab('simulasi');
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-1 shrink-0"
                            >
                              <Trophy className="w-3.5 h-3.5" />
                              Mulai Simulasi
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {filteredIdeas.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold">Lomba tidak ditemukan. Silakan merubah filter pencarian Anda.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Committee Task Blueprint Planner */}
          {activeTab === 'plan' && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl mx-auto space-y-10"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-red-100 shadow-xl shadow-red-100/30 text-center relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-red-50 rounded-full blur-2xl"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                  <div className="inline-flex p-4 bg-red-100 text-red-600 rounded-2xl mb-4">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-display font-black text-gray-900 tracking-tight">Blueprint Tugas Tim 5 Orang</h2>
                  <p className="text-gray-500 mt-3 text-base">
                    Ubah kesibukan panitia kecil Anda menjadi orkestrasi yang efisien. Di bawah adalah daftar peran, tugas primer, dan pelacakan progress perayaan 17-an.
                  </p>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowShareModal(true)}
                      className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs md:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5"
                    >
                      <Share2 className="w-4 h-4" />
                      Bagikan Misi & Acara
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Task Form Creator */}
                <div className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-150 h-fit space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-red-600" />
                      Tambah Tugas Baru
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Sematkan tugas baru ke 5 jabatan panitia.</p>
                  </div>

                  <form onSubmit={handleAddTask} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-gray-600 uppercase">Peran Pelaksana</label>
                      <select 
                        value={newTaskRole} 
                        onChange={(e) => setNewTaskRole(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold text-gray-800"
                      >
                        <option value="Ketua Panitia">Ketua Panitia</option>
                        <option value="Divisi Lomba">Divisi Lomba</option>
                        <option value="Divisi Perlengkapan">Divisi Perlengkapan</option>
                        <option value="Divisi Konsumsi">Divisi Konsumsi</option>
                        <option value="Divisi Humas">Divisi Humas</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-gray-600 uppercase">Judul Misi / Tugas</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Contoh: Cetak banner latar belakang..." 
                        value={newTaskInput}
                        onChange={(e) => setNewTaskInput(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-gray-600 uppercase">Detail Deskripsi</label>
                      <textarea 
                        rows={3}
                        placeholder="Contoh: Banner pahlawan raksasa ukuran 2x2 meter akrilik." 
                        value={newTaskDesc}
                        onChange={(e) => setNewTaskDesc(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-white p-3.5 rounded-xl font-bold text-xs shadow-md tracking-wider uppercase transition-all mt-4"
                    >
                      Masukkan ke Blueprint
                    </button>
                  </form>
                </div>

                {/* Task List Grid Board */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between px-4">
                    <span className="text-sm font-bold text-gray-500">Misi Terjadwal ({tasks.length})</span>
                    <span className="text-xs text-red-500 font-extrabold uppercase">Klik Kotak Tugas untuk Mengubah Progress</span>
                  </div>

                  {tasks.map((item, i) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => toggleTaskStatus(item.id)}
                      className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-2xl border border-gray-150 cursor-pointer hover:border-red-200 hover:shadow-xl transition-all relative overflow-hidden"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                          item.status === 'Done' 
                            ? 'bg-green-100 text-green-600' 
                            : item.status === 'In Progress' 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-stone-100 text-stone-400'
                        }`}>
                          {item.status === 'Done' ? <CheckCircle className="w-5 h-5" /> : <Loader2 className={`w-5 h-5 ${item.status === 'In Progress' ? 'animate-spin' : ''}`} />}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug">
                            {item.task}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 font-medium">{item.desc}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Pelaksana: {item.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status indicator and actions */}
                      <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                        <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                          item.status === 'Done' 
                            ? 'bg-green-50 text-green-700' 
                            : item.status === 'In Progress' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'bg-stone-50 text-stone-600'
                        }`}>
                          {item.status === 'Pending' ? 'Belum Mulai' : item.status === 'In Progress' ? 'Berjalan' : 'Selesai'}
                        </span>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTask(item.id);
                          }}
                          className="text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors"
                          title="Hapus tugas"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {tasks.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-3xl border border-gray-150">
                      <ClipboardCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-bold">Blueprint kosong. Silakan tambahkan tugas awal tim!</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Philosophy Section */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-left">
                  <div className="inline-flex p-4 bg-red-600 text-white rounded-3xl shadow-xl shadow-red-200">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>
                  <h2 className="text-4xl font-display font-black text-gray-900 leading-tight">Gotong Royong Tanpa Batas</h2>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    Kemerdekaan Indonesia pada tanggal 17 Agustus 1945 didirikan atas asas kebersamaan segenap elemen bangsa. Kami percaya lomba agustusan seharusnya mencerminkan nilai luhur gotong royong ini, bukan ajang kompetisi individualistik semata.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-yellow-50 rounded-2xl border border-yellow-200">
                      <h4 className="font-extrabold text-stone-900 mb-1.5 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-yellow-600" />
                        Pengenalan Pahlawan
                      </h4>
                      <p className="text-xs text-gray-500 leading-normal">
                        Mendalami biografi para pahlawan Indonesia sejak usia dini secara interaktif.
                      </p>
                    </div>
                    <div className="p-5 bg-red-50 rounded-2xl border border-red-150">
                      <h4 className="font-extrabold text-red-900 mb-1.5 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-red-600" />
                        Sinergi Kelompok
                      </h4>
                      <p className="text-xs text-gray-500 leading-normal">
                        Lomba dirancang dengan mekanika teamwork mutlak: harus dimainkan minimal 3-5 orang.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=800&h=800&q=80" 
                      alt="Gotong Royong" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-red-700/10 mix-blend-multiply"></div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-red-200 rounded-[2.5rem] -z-0"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Simulator Modal Box */}
      <AnimatePresence>
        {selectedGame && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2.5rem] border border-gray-150 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Banner */}
              <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-8 md:p-10 rounded-t-[2.5rem] overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-xl -mr-20 -mt-20"></div>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all"
                  aria-label="Tutup jendela simulasi"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 space-y-2">
                  <span className="text-yellow-300 font-extrabold text-[10px] tracking-widest uppercase">
                    MODUL SIMULASI {selectedGame.category === 'anak-anak' ? 'KARYA ANAK' : 'REMAJA MAJU'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight">{selectedGame.title}</h2>
                  <p className="text-red-100 text-sm md:max-w-xl font-medium">{selectedGame.description}</p>
                </div>
              </div>

              {/* Modal Body & Content */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Side: Game Rules & Equipment */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Flag className="w-4 h-4 text-red-600" />
                      Cara Bermain (Tim {selectedGame.teamSizeRange})
                    </h3>
                    <ul className="space-y-2.5">
                      {selectedGame.howToPlay.map((v, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium leading-relaxed">
                          <span className="w-5 h-5 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0 text-xs font-black">
                            {i + 1}
                          </span>
                          <p className="grow">{v}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Perlengkapan Yang Diperlukan
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedGame.equipmentNeeded.map((eq, idx) => (
                        <span key={idx} className="bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-xl text-xs font-bold">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedGame.category === 'anak-anak' && (
                    <div className="p-5 bg-yellow-50/50 border border-yellow-100 rounded-2xl">
                      <span className="text-[10px] uppercase tracking-widest font-extrabold text-yellow-600 block mb-1">Target Pengetahuan Tokoh</span>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">
                        Lomba ini secara terpadu membiasakan anak-anak mengenal sosok <span className="font-bold text-stone-900">{selectedGame.pahlawanHighlight}</span>, melatih memori sejarah diringi gelak ketawa riang bersama timnya.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Side: Fully Interactive Simulated Game Panel */}
                <div className="bg-[#faf8f5] p-6 rounded-[2rem] border border-gray-150 flex flex-col justify-between space-y-4">
                  {/* Mode Toggles */}
                  <div className="flex bg-gray-200/50 p-1 rounded-2xl shrink-0">
                    <button
                      onClick={() => setModalTab('video')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
                        modalTab === 'video'
                          ? 'bg-red-650 text-white shadow'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      Video Tutorial 📺
                    </button>
                    <button
                      onClick={() => setModalTab('simulasi')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
                        modalTab === 'simulasi'
                          ? 'bg-red-650 text-white shadow'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      Simulasi Kuis 🎮
                    </button>
                  </div>

                  {modalTab === 'video' ? (
                    /* VIDEO TUTORIAL TAB CONTENT */
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Status bar */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse inline-block"></span>
                            Live Tutorial Studio
                          </span>
                          <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-md font-bold">
                            Durasi: {LOMBA_VIDEOS[selectedGame.title]?.duration || "4 Menit"}
                          </span>
                        </div>

                        {/* Youtube embed player */}
                        <div className="relative aspect-video w-full rounded-2xl bg-black border border-gray-200 overflow-hidden shadow-md">
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${LOMBA_VIDEOS[selectedGame.title]?.youtubeId || "64OclbyNlQ4"}?autoplay=0&rel=0`}
                            title={`Video Panduan: ${selectedGame.title}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            referrerPolicy="no-referrer"
                          ></iframe>
                        </div>

                        {/* Narrator Profile Info */}
                        <div className="mt-3 flex items-center justify-between bg-white p-3 rounded-xl border border-gray-150">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs">
                              🎙️
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Dipandu Oleh</p>
                              <p className="text-xs font-black text-stone-900 mt-0.5">
                                {LOMBA_VIDEOS[selectedGame.title]?.narrator || "Panitia Kehormatan"}
                              </p>
                            </div>
                          </div>
                          
                          <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-lg font-bold border border-green-150">
                            ✓ RW 08 Validated
                          </span>
                        </div>
                      </div>

                      {/* Execution Steps */}
                      <div className="bg-white p-4 rounded-xl border border-gray-150 space-y-2.5">
                        <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                          <ClipboardCheck className="w-3.5 h-3.5 text-red-600" />
                          Langkah Visual Pelaksanaan
                        </h4>
                        
                        <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                          {(LOMBA_VIDEOS[selectedGame.title]?.keySteps || []).map((step, idx) => (
                            <div key={idx} className="flex gap-2 text-left">
                              <span className="text-xs text-red-500 font-black shrink-0">{idx + 1}.</span>
                              <p className="text-[11px] text-gray-650 font-medium leading-relaxed">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Safety and Success tips split panel */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
                        <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
                          <span className="text-[9px] uppercase tracking-widest font-extrabold text-yellow-700 block mb-1">
                            ⚠️ Catatan Keamanan
                          </span>
                          <p className="text-[10px] text-yellow-800 font-bold leading-normal">
                            {LOMBA_VIDEOS[selectedGame.title]?.safetyNotes || "Sediakan P3K dasar di dekat perlombaan."}
                          </p>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                          <span className="text-[9px] uppercase tracking-widest font-extrabold text-blue-700 block mb-1">
                            💡 Tips Sukses Panitia
                          </span>
                          <p className="text-[10px] text-blue-800 font-bold leading-normal">
                            {LOMBA_VIDEOS[selectedGame.title]?.tips || "Bacakan info pahlawan sesering mungkin."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    selectedGame.category === 'anak-anak' ? (
                      /* KIDS INTERACTIVE PORTRAIT COLORING APP */
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
                            Studio Mewarnai Bersama
                          </span>
                          <button 
                            onClick={resetKidsSimulator}
                            className="text-[10px] bg-red-50 hover:bg-red-100 text-red-700 px-2.5 py-1 rounded-lg font-bold"
                          >
                            Ulang Sesi
                          </button>
                        </div>

                        {/* Interactive Silhouette canvas click area */}
                        <div className="relative aspect-[4/3] bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col items-center justify-center p-4">
                          <p className="absolute top-2 left-3 text-[10px] font-bold text-gray-400 uppercase">Ketuk bagian kanvas di bawah:</p>
                          
                          <div className="w-48 h-48 relative flex flex-col items-center justify-center">
                            {/* Sketch represented as simple clickable SVG zones */}
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                              {/* Background */}
                              <rect x="0" y="0" width="100" height="100" fill={coloredSections.background} onClick={() => handleColorSection('background')} className="cursor-pointer transition-colors" />
                              {/* Peci */}
                              <path d="M30 30 L70 30 L73 43 L27 43 Z" fill={coloredSections.peci} onClick={() => handleColorSection('peci')} className="cursor-pointer transition-colors stroke-stone-400 stroke-1" />
                              {/* Face Sketch */}
                              <circle cx="50" cy="55" r="13" fill="#fed7aa" className="stroke-stone-400 stroke-1" />
                              {/* Eyeglasses or Specs */}
                              <circle cx="46" cy="54" r="3" fill="none" stroke="#27272a" strokeWidth="1" />
                              <circle cx="54" cy="54" r="3" fill="none" stroke="#27272a" strokeWidth="1" />
                              <line x1="49" y1="54" x2="51" y2="54" stroke="#27272a" strokeWidth="1" />
                              {/* Jas */}
                              <path d="M25 75 L75 75 L68 95 L32 95 Z" fill={coloredSections.jas} onClick={() => handleColorSection('jas')} className="cursor-pointer transition-colors stroke-stone-400 stroke-1" />
                              {/* Dasi */}
                              <path d="M47 75 L53 75 L50 88 Z" fill={coloredSections.dasi} onClick={() => handleColorSection('dasi')} className="cursor-pointer transition-colors stroke-stone-400 stroke-1" />
                            </svg>
                          </div>

                          {/* Co-op Teammates color bar */}
                          <div className="w-full mt-2 grid grid-cols-3 gap-2 border-t pt-2 border-gray-100">
                            {kidTeammates.map((kt, i) => (
                              <div key={i} className="text-center">
                                <p className="text-[10px] font-bold text-gray-700">{kt.name.split(' ')[0]}</p>
                                <div className="w-full bg-gray-100 h-1 rounded-full mt-1 overflow-hidden">
                                  <div className="bg-green-500 h-full w-full"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Color Palette selectors */}
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Pilih Warnamu:</p>
                          <div className="flex gap-2">
                            {[
                              { hex: '#ee1b24', label: 'Merah' },
                              { hex: '#ffffff', label: 'Putih' },
                              { hex: '#ffc107', label: 'Kuning' },
                              { hex: '#007bff', label: 'Biru' },
                              { hex: '#28a745', label: 'Hijau' },
                              { hex: '#212529', label: 'Hitam' },
                            ].map((col) => (
                              <button
                                key={col.hex}
                                onClick={() => setActiveColor(col.hex)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${
                                  activeColor === col.hex ? 'border-red-600 scale-110 shadow-md' : 'border-transparent'
                                }`}
                                style={{ backgroundColor: col.hex }}
                                title={col.label}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Team Log Console Toast */}
                        <div className="bg-stone-900 text-green-400 font-mono p-3 rounded-xl text-[11px] h-20 overflow-y-auto space-y-1">
                          {kidsConsoleLogs.map((log, i) => (
                            <p key={i} className="leading-tight">{log}</p>
                          ))}
                        </div>

                        {/* Final Trivia Guess Name */}
                        {selectedGame.interactiveQuiz && (
                          <div className="bg-red-50 p-4 rounded-xl space-y-3">
                            <p className="text-xs font-black text-gray-900 flex items-center gap-1">
                              <HelpCircle className="w-3.5 h-3.5 text-red-600" />
                              Kuis Tebak Tokoh Bersama Tim:
                            </p>
                            <p className="text-xs text-gray-700 font-medium leading-relaxed">
                              {selectedGame.interactiveQuiz.question}
                            </p>
                            
                            <div className="grid grid-cols-1 gap-2">
                              {selectedGame.interactiveQuiz.options.map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => handleVerifyKidsQuiz(opt)}
                                  className={`p-2.5 rounded-lg text-xs font-bold text-left transition-all ${
                                    kidsQuizAnswer === opt 
                                      ? opt === selectedGame.interactiveQuiz?.correctAnswer 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-red-600 text-white'
                                      : 'bg-white hover:bg-red-50 text-gray-700'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>

                            {kidsSuccess && (
                              <div className="bg-green-100 text-green-800 p-3 rounded-lg text-xs font-bold flex items-center gap-1.5">
                                <Award className="w-4 h-4" />
                                Selamat! Kekompakan tim anak-anak Anda dinobatkan sebagai Juara Sinergi!
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* TEENAGERS ACTIVE QUIZ OBSTACLE RELAY SIMULATOR */
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-red-600" />
                            Rintangan Kuis Ekspedisi Remaja
                          </span>
                          <button 
                            onClick={resetTeensSimulator}
                            className="text-[10px] bg-red-50 hover:bg-red-100 text-red-700 px-2.5 py-1 rounded-lg font-bold"
                          >
                            Ulang Misi
                          </button>
                        </div>

                        {/* Core Obstacle Stages Progression bar */}
                        <div className="flex items-center justify-between gap-2 bg-white p-3 rounded-xl border border-gray-200">
                          {[
                            { st: 1, label: 'Lvl 1: Jaring Bel' },
                            { st: 2, label: 'Lvl 2: Bambu Radial' },
                            { st: 3, label: 'Lvl 3: Pipa Paralon' }
                          ].map((s) => (
                            <div key={s.st} className="flex-1 text-center">
                              <div className={`h-2 rounded-full mb-1 transition-all ${
                                teensStage >= s.st ? 'bg-red-600' : 'bg-gray-200'
                              }`} />
                              <span className="text-[9px] font-bold text-gray-500">{s.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* Active level details */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 min-h-[100px] flex flex-col justify-between">
                          <div>
                            <p className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded w-fit font-black mb-2">
                              STAGE RINTANGAN {teensStage}
                            </p>
                            <h4 className="text-xs font-extrabold text-stone-900">
                              {teensStage === 1 ? 'Menyeberang Labirin Tali' : teensStage === 2 ? 'Menjaga Keseimbangan Bambu Radial' : 'Menyumbat Kebocoran Pipa Paralon Raksasa'}
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-1 font-medium leading-relaxed">
                              {teensStage === 1 
                                ? 'Tim harus melangkah hati-hati melewati tali rafia berlonceng rendah secara sinkron.' 
                                : teensStage === 2 
                                ? 'Tarik tambang berjejer, pertahankan tiang berdiri tegak di tengah lingkar rintangan.' 
                                : 'Tutup 20 lubang bocor paralon dengan sikut dan jari tim demi mengapungkan bola kemenangan!'}
                            </p>
                          </div>
                        </div>

                        {/* Teammate hint avatars */}
                        <div className="space-y-2">
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Komentar Sinergi Teammate:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {teensTeammates.map((t, idx) => (
                              <div key={idx} className="bg-yellow-50 p-3 rounded-xl border border-yellow-105 flex gap-2">
                                <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center font-bold text-[9px] text-yellow-800 uppercase shrink-0">
                                  {t.name[0]}
                                </div>
                                <div>
                                  <p className="text-[9px] font-black text-stone-900">{t.name.split(' ')[0]}</p>
                                  <p className="text-[10px] text-stone-600 leading-tight italic">"{t.comment}"</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Trivia Question for current stage */}
                        <div className="bg-red-50 p-4 rounded-xl space-y-3">
                          <p className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-red-600" />
                            Kuis Trivia Tingkat Lanjut (Rintangan {teensStage}):
                          </p>
                          <p className="text-xs text-stone-800 font-bold leading-normal">
                            {teensStage === 1 
                              ? (selectedGame.interactiveQuiz?.question || "Di kota manakah Ir. Soekarno diculik ke Rengasdengklok?") 
                              : teensStage === 2 
                              ? "Berapakah jumlah sila yang terukir resmi di dasar lambang Pancasila Indonesia?" 
                              : "Semboyan 'Bhinneka Tunggal Ika' dirajut dari karya sastra Empu..."}
                          </p>

                          <div className="grid grid-cols-1 gap-2">
                            {(teensStage === 1 
                              ? (selectedGame.interactiveQuiz?.options || ["Bandung", "Rengasdengklok", "Surabaya"]) 
                              : teensStage === 2 
                              ? ["4 Sila", "5 Sila", "6 Sila"] 
                              : ["Empu Tantular", "Empu Prapanca", "Empu Sedah"]
                            ).map((opt) => (
                              <button
                                key={opt}
                                onClick={() => handleTeensQuiz(opt)}
                                className={`p-2.5 rounded-lg text-xs font-bold text-left transition-all ${
                                  teensQuizAnswer === opt 
                                    ? 'bg-red-605 text-white'
                                    : 'bg-white hover:bg-red-50 text-gray-700'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Active simulation logs */}
                        <div className="bg-[#1e1e1e] text-green-400 p-3 rounded-xl font-mono text-[10px] h-20 overflow-y-auto space-y-1">
                          {teensLogs.map((log, i) => (
                            <p key={i} className="leading-tight">{log}</p>
                          ))}
                        </div>

                        {teensSuccess && (
                          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl text-center space-y-2 shadow-lg">
                            <Award className="w-8 h-8 mx-auto text-yellow-300 animate-bounce" />
                            <h4 className="text-xs font-black tracking-wide uppercase">PIALA REKOR KEKOMPAKAN REMAJA</h4>
                            <p className="text-[10px] text-green-50">Selamat! Tim remaja beranggotakan 5 orang berhasil menyelesaikan Ekspedisi dengan sinergi sempurna!</p>
                          </div>
                        )}
                      </div>
                    )
                  )}

                  {/* Close button for safety */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                    <button 
                      onClick={() => setSelectedGame(null)}
                      className="bg-stone-900 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-stone-850"
                    >
                      Selesai Bermain
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Event Modal Box */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white max-w-lg w-full rounded-[2rem] border border-gray-150 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 relative flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shadow-md">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-display font-black text-stone-900 tracking-tight">Bagikan Rencana Acara</h3>
                    <p className="text-xs text-gray-400 font-bold">Sebarkan detail blueprint tugas ke rekan panitia</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-405 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Text Preview Block */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 block">
                  Pratinjau Pesan yang Dibagikan:
                </span>
                <div className="relative">
                  <textarea
                    readOnly
                    value={getShareText()}
                    className="w-full h-44 p-4 bg-gray-55 border border-gray-200 rounded-2xl font-mono text-[11px] leading-relaxed text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-red-105"
                  />
                  
                  {/* Copy overlay helper */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    {copiedNotification && (
                      <span className="text-[10px] bg-green-105 text-green-700 px-2.5 py-1 rounded-lg font-black animate-fade-in border border-green-200">
                        ✓ Tersalin!
                      </span>
                    )}
                    <button
                      onClick={handleCopyToClipboard}
                      className="bg-stone-900 hover:bg-stone-850 text-white p-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      title="Salin ke papan klip"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Salin Teks
                    </button>
                  </div>
                </div>
              </div>

              {/* Real Share Channels */}
              <div className="space-y-2.5 text-left">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 block">
                  Saluran Berbagi Langsung:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-black text-xs py-3.5 px-4 rounded-xl shadow-sm transition-all hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4 rotate-45" />
                    WhatsApp
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(getShareText())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-black text-xs py-3.5 px-4 rounded-xl shadow-sm transition-all hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" />
                    Telegram
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent("Blueprint Tugas Panitia Dirgahayu RI RW 08")}&body=${encodeURIComponent(getShareText().replace(/\*/g, ""))}`}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs py-3.5 px-4 rounded-xl shadow-sm transition-all hover:-translate-y-0.5"
                  >
                    <Mail className="w-4 h-4" />
                    Kirim Email
                  </a>
                </div>
              </div>

              {/* Info text box */}
              <div className="bg-yellow-50/70 border border-yellow-100 p-3.5 rounded-2xl flex items-start gap-2.5 text-left">
                <span className="text-base shrink-0">💡</span>
                <p className="text-[11px] text-yellow-800 font-bold leading-normal">
                  Rentan tugas diperbarui real-time. Bagikan tautan ini agar seluruh panitia senantiasa kompak membagi tugas secara transparan!
                </p>
              </div>

              {/* Close Button */}
              <div className="border-t border-gray-100 pt-4 flex justify-end">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-xl text-xs font-black transition-all"
                >
                  Tutup Jendela
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="mt-32 bg-gray-950 py-16 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-white to-red-600"></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-red-500/20">79</div>
               <span className="text-2xl font-display font-black tracking-tight uppercase">Sinergi <span className="text-red-500">Merdeka</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Platform modern pendamping panitia kemerdekaan Indonesia dalam mewujudkan kerukunan sosial lewat perlombaan kognitif, kolaborasi, dan visual claymation 3D modern.
            </p>
          </div>
          <div className="space-y-5">
            <h4 className="text-lg font-black tracking-tight text-white border-l-4 border-red-500 pl-3">Dirancang Untuk</h4>
            <ul className="text-sm text-gray-400 space-y-3 font-semibold">
              <li className="flex items-center gap-2">🟢 Karang Taruna RW 08</li>
              <li className="flex items-center gap-2">🟢 Sekolah Menengah & PAUD</li>
              <li className="flex items-center gap-2">🟢 Komunitas Komplek Gotong Royong</li>
              <li className="flex items-center gap-2">🟢 Korps Kegiatan 17 Agustus</li>
            </ul>
          </div>
          <div className="space-y-5">
            <h4 className="text-lg font-black tracking-tight text-white border-l-4 border-red-500 pl-3">Semboyan Kita</h4>
            <p className="text-sm text-gray-400 italic leading-relaxed font-medium">
              "Kemerdekaan ialah hak segala bangsa, bersatu kita teguh bercerai kita runtuh. Lewat tawa dan kebersamaan, Indonesia maju selamanya!"
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-5 bg-red-600 rounded-sm"></div>
              <div className="w-10 h-5 bg-white rounded-sm"></div>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-900 text-center text-gray-600 text-[10px] tracking-[0.25em] uppercase font-bold">
          © 2026 Sinergi Merdeka • Dirgahayu Republik Indonesia Ke-81
        </div>
      </footer>
    </div>
  );
}

// Simple supporting icons compiled or mocked for safety
function BadgeTeen(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function ShieldAlertIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
