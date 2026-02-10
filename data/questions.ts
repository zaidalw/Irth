
import { Segment } from '../types';

export interface LocalQuestion {
  id: string;
  segment: Segment;
  prompt_ar: string;
  prompt_en: string;
  correct_ar: string;
  correct_en: string;
  distractors_ar: string[];
  distractors_en: string[];
}

export const QUESTION_BANK: LocalQuestion[] = [
  // --- PROPHETS ---
  {
    id: 'p1',
    segment: Segment.PROPHETS,
    prompt_ar: 'مَنْ هُوَ النَّبِيُّ الَّذِي بَنَى السَّفِينَةَ لِيَنْجُوَ الْمُؤْمِنُونَ مِنَ الطُّوفَانِ؟',
    prompt_en: 'Who is the Prophet who built the Ark to save the believers from the Great Flood?',
    correct_ar: 'نُوحٌ عَلَيْهِ السَّلَامُ',
    correct_en: 'Nuh (AS)',
    distractors_ar: ['إِبْرَاهِيمُ عَلَيْهِ السَّلَامُ', 'مُوسَى عَلَيْهِ السَّلَامُ', 'عِيسَى عَلَيْهِ السَّلَامُ'],
    distractors_en: ['Ibrahim (AS)', 'Musa (AS)', 'Isa (AS)']
  },
  {
    id: 'p2',
    segment: Segment.PROPHETS,
    prompt_ar: 'مَنْ هُوَ النَّبِيُّ الَّذِي أَلَانَ اللَّهُ لَهُ الْحَدِيدَ وَعَلَّمَهُ صِنَاعَةَ الدُّرُوعِ؟',
    prompt_en: 'Who is the Prophet for whom Allah softened iron and taught the making of armor?',
    correct_ar: 'دَاوُدُ عَلَيْهِ السَّلَامُ',
    correct_en: 'Dawud (AS)',
    distractors_ar: ['سُلَيْمَانُ عَلَيْهِ السَّلَامُ', 'يُوسُفُ عَلَيْهِ السَّلَامُ', 'أَيُّوبُ عَلَيْهِ السَّلَامُ'],
    distractors_en: ['Sulaiman (AS)', 'Yusuf (AS)', 'Ayyub (AS)']
  },
  {
    id: 'p3',
    segment: Segment.PROPHETS,
    prompt_ar: 'مَنْ هُوَ النَّبِيُّ الَّذِي سَخَّرَ اللَّهُ لَهُ الرِّيحَ وَفَهِمَ لُغَةَ الطُّيُورِ وَالْحَيَوَانَاتِ؟',
    prompt_en: 'Who is the Prophet who controlled the winds and understood the language of birds and animals?',
    correct_ar: 'سُلَيْمَانُ عَلَيْهِ السَّلَامُ',
    correct_en: 'Sulaiman (AS)',
    distractors_ar: ['يُونُسُ عَلَيْهِ السَّلَامُ', 'زَكَرِيَّا عَلَيْهِ السَّلَامُ', 'صَالِحٌ عَلَيْهِ السَّلَامُ'],
    distractors_en: ['Yunus (AS)', 'Zakariyya (AS)', 'Salih (AS)']
  },
  {
    id: 'p4',
    segment: Segment.PROPHETS,
    prompt_ar: 'مَنْ هُوَ النَّبِيُّ الَّذِي لُقِّبَ بِـ "كَلِيمِ اللَّهِ"؟',
    prompt_en: 'Which Prophet was nicknamed "Kaleem Allah" (The one who spoke to Allah)?',
    correct_ar: 'مُوسَى عَلَيْهِ السَّلَامُ',
    correct_en: 'Musa (AS)',
    distractors_ar: ['عِيسَى عَلَيْهِ السَّلَامُ', 'يَحْيَى عَلَيْهِ السَّلَامُ', 'هَارُونُ عَلَيْهِ السَّلَامُ'],
    distractors_en: ['Isa (AS)', 'Yahya (AS)', 'Harun (AS)']
  },
  {
    id: 'p5',
    segment: Segment.PROPHETS,
    prompt_ar: 'مَنْ هُوَ النَّبِيُّ الَّذِي أُلْقِيَ فِي النَّارِ فَجَعَلَهَا اللَّهُ بَرْداً وَسَلَاماً عَلَيْهِ؟',
    prompt_en: 'Who is the Prophet who was thrown into the fire, and Allah made it cool and safe for him?',
    correct_ar: 'إِبْرَاهِيمُ عَلَيْهِ السَّلَامُ',
    correct_en: 'Ibrahim (AS)',
    distractors_ar: ['لُوطٌ عَلَيْهِ السَّلَامُ', 'إِسْمَاعِيلُ عَلَيْهِ السَّلَامُ', 'إِسْحَاقُ عَلَيْهِ السَّلَامُ'],
    distractors_en: ['Lut (AS)', 'Ismail (AS)', 'Ishaq (AS)']
  },
  {
    id: 'p6',
    segment: Segment.PROPHETS,
    prompt_ar: 'مَنْ هُوَ النَّبِيُّ الَّذِي صَبَرَ عَلَى الْمَرَضِ وَالْبَلَاءِ سَنَوَاتٍ طَوِيلَةً؟',
    prompt_en: 'Who is the Prophet who patiently endured illness and hardship for many years?',
    correct_ar: 'أَيُّوبُ عَلَيْهِ السَّلَامُ',
    correct_en: 'Ayyub (AS)',
    distractors_ar: ['شُعَيْبٌ عَلَيْهِ السَّلَامُ', 'هُودٌ عَلَيْهِ السَّلَامُ', 'آدَمُ عَلَيْهِ السَّلَامُ'],
    distractors_en: ['Shuayb (AS)', 'Hud (AS)', 'Adam (AS)']
  },

  // --- SAHABA ---
  {
    id: 's1',
    segment: Segment.SAHABA,
    prompt_ar: 'مَنْ هُوَ الصَّحَابِيُّ الَّذِي لُقِّبَ بِـ "سَيْفِ اللَّهِ الْمَسْلُولِ"؟',
    prompt_en: 'Which companion was nicknamed "The Drawn Sword of Allah"?',
    correct_ar: 'خَالِدُ بْنُ الْوَلِيدِ',
    correct_en: 'Khalid ibn al-Walid',
    distractors_ar: ['عُمَرُ بْنُ الْخَطَّابِ', 'حَمْزَةُ بْنُ عَبْدِ الْمُطَّلِبِ', 'سَعْدُ بْنُ أَبِي وَقَّاصٍ'],
    distractors_en: ['Omar ibn al-Khattab', 'Hamza ibn Abd al-Muttalib', 'Saad ibn Abi Waqqas']
  },
  {
    id: 's2',
    segment: Segment.SAHABA,
    prompt_ar: 'مَنْ هُوَ أَوَّلُ مَنْ آمَنَ بِالنَّبِيِّ ﷺ مِنَ الرِّجَالِ وَرَفِيقُهُ فِي الْهِجْرَةِ؟',
    prompt_en: 'Who was the first man to embrace Islam and the Prophet\'s companion during the Hijra?',
    correct_ar: 'أَبُو بَكْرٍ الصِّدِّيقُ',
    correct_en: 'Abu Bakr Al-Siddiq',
    distractors_ar: ['عُثْمَانُ بْنُ عَفَّانَ', 'عَلِيُّ بْنُ أَبِي طَالِبٍ', 'الزُّبَيْرُ بْنُ الْعَوَّامِ'],
    distractors_en: ['Uthman ibn Affan', 'Ali ibn Abi Talib', 'Zubair ibn al-Awwam']
  },
  {
    id: 's3',
    segment: Segment.SAHABA,
    prompt_ar: 'مَنْ هُوَ الصَّحَابِيُّ الَّذِي كَانَ يُلَقَّبُ بِـ "أَمِينِ هَذِهِ الْأُمَّةِ"؟',
    prompt_en: 'Which companion was nicknamed "The Trustee of this Nation"?',
    correct_ar: 'أَبُو عُبَيْدَةَ الْجَرَّاحُ',
    correct_en: 'Abu Ubaidah al-Jarrah',
    distractors_ar: ['سَعِيدُ بْنُ زَيْدٍ', 'عَبْدُ الرَّحْمَنِ بْنُ عَوْفٍ', 'طَلْحَةُ بْنُ عُبَيْدِ اللَّهِ'],
    distractors_en: ['Said ibn Zayd', 'Abdurrahman ibn Awf', 'Talha ibn Ubaydillah']
  },
  {
    id: 's4',
    segment: Segment.SAHABA,
    prompt_ar: 'مَنْ هُوَ الصَّحَابِيُّ الَّذِي كَانَ أَوَّلَ مُؤَذِّنٍ فِي الْإِسْلَامِ؟',
    prompt_en: 'Who was the companion who served as the first Muezzin in Islam?',
    correct_ar: 'بِلَالُ بْنُ رَبَاحٍ',
    correct_en: 'Bilal ibn Rabah',
    distractors_ar: ['عَمَّارُ بْنُ يَاسِرٍ', 'سَلْمَانُ الْفَارِسِيُّ', 'خَبَّابُ بْنُ الْأَرَتِّ'],
    distractors_en: ['Ammar ibn Yasir', 'Salman al-Farsi', 'Khabbab ibn al-Aratt']
  },
  {
    id: 's5',
    segment: Segment.SAHABA,
    prompt_ar: 'مَنْ هُوَ الصَّحَابِيُّ الَّذِي كَانَ يُلَقَّبُ بِـ "أَسَدِ اللَّهِ" وَاسْتُشْهِدَ فِي غَزْوَةِ أُحُدٍ؟',
    prompt_en: 'Which companion was nicknamed "The Lion of Allah" and was martyred in the Battle of Uhud?',
    correct_ar: 'حَمْزَةُ بْنُ عَبْدِ الْمُطَّلِبِ',
    correct_en: 'Hamza ibn Abd al-Muttalib',
    distractors_ar: ['جَعْفَرُ بْنُ أَبِي طَالِبٍ', 'مُصْعَبُ بْنُ عُمَيْرٍ', 'عُبَيْدَةُ بْنُ الْحَارِثِ'],
    distractors_en: ['Jafar ibn Abi Talib', 'Musab ibn Umayr', 'Ubaidah ibn al-Harith']
  },

  // --- SCHOLARS ---
  {
    id: 'sc1',
    segment: Segment.SCHOLARS_DEVOUT,
    prompt_ar: 'مَنْ هُوَ الْإِمَامُ الَّذِي يُلَقَّبُ بِـ "إِمَامِ دَارِ الْهِجْرَةِ" وَصَاحِبُ كِتَابِ "الْمُوَطَّأِ"؟',
    prompt_en: 'Who is the Imam nicknamed "Imam of Dar al-Hijra" and the author of "Al-Muwatta"?',
    correct_ar: 'الْإِمَامُ مَالِكٌ',
    correct_en: 'Imam Malik',
    distractors_ar: ['الْإِمَامُ الشَّافِعِيُّ', 'الْإِمَامُ أَحْمَدُ', 'الْإِمَامُ أَبُو حَنِيفَةَ'],
    distractors_en: ['Imam Al-Shafi\'i', 'Imam Ahmad', 'Imam Abu Hanifa']
  },
  {
    id: 'sc2',
    segment: Segment.SCHOLARS_DEVOUT,
    prompt_ar: 'مَنْ هُوَ الْعَالِمُ الَّذِي جَمَعَ أَصَحَّ كِتَابٍ بَعْدَ الْقُرْآنِ الْكَرِيمِ فِي الْحَدِيثِ النَّبَوِيِّ؟',
    prompt_en: 'Who is the scholar who compiled the most authentic book of Hadith after the Quran?',
    correct_ar: 'الْإِمَامُ الْبُخَارِيُّ',
    correct_en: 'Imam Al-Bukhari',
    distractors_ar: ['الْإِمَامُ مُسْلِمٌ', 'الْإِمَامُ النَّوَوِيُّ', 'الْإِمَامُ ابْنُ كَثِيرٍ'],
    distractors_en: ['Imam Muslim', 'Imam Al-Nawawi', 'Imam Ibn Kathir']
  },
  {
    id: 'sc3',
    segment: Segment.SCHOLARS_DEVOUT,
    prompt_ar: 'مَنْ هُوَ الْإِمَامُ الَّذِي صَبَرَ فِي الْمِحْنَةِ وَيُلَقَّبُ بِـ "إِمَامِ أَهْلِ السُّنَّةِ"؟',
    prompt_en: 'Who is the Imam who endured the trial and is nicknamed "Imam of Ahl al-Sunnah"?',
    correct_ar: 'الْإِمَامُ أَحْمَدُ بْنُ حَنْبَلٍ',
    correct_en: 'Imam Ahmad ibn Hanbal',
    distractors_ar: ['الْإِمَامُ ابْنُ تَيْمِيَّةَ', 'الْإِمَامُ الْغَزَالِيُّ', 'الْإِمَامُ ابْنُ الْقَيِّمِ'],
    distractors_en: ['Imam Ibn Taymiyyah', 'Imam Al-Ghazali', 'Imam Ibn al-Qayyim']
  }
];
