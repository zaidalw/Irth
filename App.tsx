
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
export enum Segment {
  PROPHETS = 'prophets',
  SAHABA = 'sahaba',
  TABIIN = 'tabiin',
  ATBA_TABIIN = 'atba_tabiin',
  SCHOLARS_DEVOUT = 'scholars_devout'
}

export interface Era {
  birth?: string;
  death?: string;
}

export interface Person {
  id: string;
  segment: Segment;
  category: string;
  name_ar: string;
  name_en: string;
  kunya?: string;
  nisba?: string;
  era_hijri?: Era;
  era_greg?: Era;
  region?: string;
  roles?: string[];
  facts_ar: [string, string, string];
  facts_en?: [string, string, string];
  sources?: string[];
  icon?: string;
}

export interface UserProfile {
  uid: string;
  username: string;
  displayName: string;
  photoURL?: string;
  country?: string;
  createdAt: number;
  totalScore: number;
  level: number;
  badges: string[];
  following: string[];
}

export interface LeaderboardEntry {
  uid: string;
  username: string;
  score: number;
  rank: number;
  isFollowing?: boolean;
}

export type Language = 'ar' | 'en';

// ==========================================
// 2. CONSTANTS & TRANSLATIONS
// ==========================================
export const ICONS = {
  mosque: (className?: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  book: (className?: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  star: (className?: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  shield: (className?: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

export const TRANSLATIONS = {
  ar: {
    title: 'إرث', subtitle: 'أبطال الإيمان', study: 'تعلم', quiz: 'اختبار', compete: 'لوحة المتصدرين',
    prophets: 'الأنبياء', sahaba: 'الصحابة', scholars_devout: 'العلماء والصالحين', next: 'التالي',
    score: 'النقاط', username_prompt: 'سجل دخولك لبدء التحدي', points: 'نقاط الخبرة', level: 'المستوى'
  },
  en: {
    title: 'Erth', subtitle: 'Heroes of Faith', study: 'Study', quiz: 'Quiz', compete: 'Leaderboards',
    prophets: 'Prophets', sahaba: 'Sahaba', scholars_devout: 'Scholars & Devout', next: 'Next',
    score: 'XP', username_prompt: 'Sign in to start competing', points: 'XP Points', level: 'Level'
  }
};

// ==========================================
// 3. DATA: PEOPLE & QUESTIONS
// ==========================================
export const SEED_PEOPLE: Person[] = [
  { id: 'adam', segment: Segment.PROPHETS, category: 'بداية الخلق', name_ar: 'آدم عليه السلام', name_en: 'Adam (AS)', facts_ar: ['أبو البشر وأول خليفة في الأرض', 'خلقه الله بيده من طين', 'أسجد الله له الملائكة'], facts_en: ['The father of humanity', 'Created from clay', 'Angels prostrated to him'] },
  { id: 'nuh', segment: Segment.PROPHETS, category: 'أولو العزم', name_ar: 'نوح عليه السلام', name_en: 'Nuh (AS)', facts_ar: ['صاحب السفينة الشهيرة', 'دعا قومه 950 عاماً', 'لقب بشيخ المرسلين'], facts_en: ['The one with the Ark', 'Preached for 950 years', 'Senior Messenger'] },
  { id: 'abu_bakr', segment: Segment.SAHABA, category: 'الخلفاء الراشدون', name_ar: 'أبو بكر الصديق', name_en: 'Abu Bakr Al-Siddiq', facts_ar: ['رفيق الهجرة وأول خليفة', 'أنفق ماله كله', 'لقب بالصديق'], facts_en: ['Companion in Hijra', 'First Caliph', 'Nicknamed As-Siddiq'] },
  { id: 'khalid_walid', segment: Segment.SAHABA, category: 'القادة', name_ar: 'خالد بن الوليد', name_en: 'Khalid ibn al-Walid', facts_ar: ['لقبه النبي بسيف الله المسلول', 'لم يهزم في معركة قط', 'قائد اليرموك'], facts_en: ['The Sword of Allah', 'Never defeated', 'Leader at Yarmouk'] },
  { id: 'malik', segment: Segment.SCHOLARS_DEVOUT, category: 'أئمة المذاهب', name_ar: 'الإمام مالك', name_en: 'Imam Malik', facts_ar: ['إمام دار الهجرة', 'صاحب الموطأ', 'كان يجل الحديث'], facts_en: ['Imam of Medina', 'Author of Al-Muwatta', 'Respected Hadith'] }
];

export interface LocalQuestion { id: string; segment: Segment; prompt_ar: string; prompt_en: string; correct_ar: string; correct_en: string; distractors_ar: string[]; distractors_en: string[]; }

export const QUESTION_BANK: LocalQuestion[] = [
  { id: 'p1', segment: Segment.PROPHETS, prompt_ar: 'مَنْ هُوَ النَّبِيُّ الَّذِي بَنَى السَّفِينَةَ لِيَنْجُوَ الْمُؤْمِنُونَ مِنَ الطُّوفَانِ؟', prompt_en: 'Who built the Ark to save the believers from the Great Flood?', correct_ar: 'نُوحٌ عَلَيْهِ السَّلَامُ', correct_en: 'Nuh (AS)', distractors_ar: ['إِبْرَاهِيمُ عَلَيْهِ السَّلَامُ', 'مُوسَى عَلَيْهِ السَّلَامُ', 'عِيسَى عَلَيْهِ السَّلَامُ'], distractors_en: ['Ibrahim (AS)', 'Musa (AS)', 'Isa (AS)'] },
  { id: 'p2', segment: Segment.PROPHETS, prompt_ar: 'مَنْ هُوَ النَّبِيُّ الَّذِي أَلَانَ اللَّهُ لَهُ الْحَدِيدَ وَعَلَّمَهُ صِنَاعَةَ الدُّرُوعِ؟', prompt_en: 'For whom did Allah soften iron and teach the making of armor?', correct_ar: 'دَاوُدُ عَلَيْهِ السَّلَامُ', correct_en: 'Dawud (AS)', distractors_ar: ['سُلَيْمَانُ عَلَيْهِ السَّلَامُ', 'يُوسُفُ عَلَيْهِ السَّلَامُ', 'أَيُّوبُ عَلَيْهِ السَّلَامُ'], distractors_en: ['Sulaiman (AS)', 'Yusuf (AS)', 'Ayyub (AS)'] },
  { id: 'p4', segment: Segment.PROPHETS, prompt_ar: 'مَنْ هُوَ النَّبِيُّ الَّذِي لُقِّبَ بِـ "كَلِيمِ اللَّهِ"؟', prompt_en: 'Which Prophet was nicknamed "Kaleem Allah"?', correct_ar: 'مُوسَى عَلَيْهِ السَّلَامُ', correct_en: 'Musa (AS)', distractors_ar: ['عِيسَى عَلَيْهِ السَّلَامُ', 'يَحْيَى عَلَيْهِ السَّلَامُ', 'هَارُونُ عَلَيْهِ السَّلَامُ'], distractors_en: ['Isa (AS)', 'Yahya (AS)', 'Harun (AS)'] },
  { id: 's1', segment: Segment.SAHABA, prompt_ar: 'مَنْ هُوَ الصَّحَابِيُّ الَّذِي لُقِّبَ بِـ "سَيْفِ اللَّهِ الْمَسْلُولِ"؟', prompt_en: 'Which companion was nicknamed "The Drawn Sword of Allah"?', correct_ar: 'خَالِدُ بْنُ الْوَلِيدِ', correct_en: 'Khalid ibn al-Walid', distractors_ar: ['عُمَرُ بْنُ الْخَطَّابِ', 'حَمْزَةُ بْنُ عَبْدِ الْمُطَّلِبِ', 'سَعْدُ بْنُ أَبِي وَقَّاصٍ'], distractors_en: ['Omar ibn al-Khattab', 'Hamza ibn Abd al-Muttalib', 'Saad ibn Abi Waqqas'] },
  { id: 's2', segment: Segment.SAHABA, prompt_ar: 'مَنْ هُوَ أَوَّلُ مَنْ آمَنَ بِالنَّبِيِّ ﷺ مِنَ الرِّجَالِ وَرَفِيقُهُ فِي الْهِجْرَةِ؟', prompt_en: 'Who was the first man to embrace Islam and the Prophet\'s companion during the Hijra?', correct_ar: 'أَبُو بَكْرٍ الصِّدِّيقُ', correct_en: 'Abu Bakr Al-Siddiq', distractors_ar: ['عُثْمَانُ بْنُ عَفَّانَ', 'عَلِيُّ بْنُ أَبِي طَالِبٍ', 'الزُّبَيْرُ بْنُ الْعَوَّامِ'], distractors_en: ['Uthman ibn Affan', 'Ali ibn Abi Talib', 'Zubair ibn al-Awwam'] },
  { id: 's4', segment: Segment.SAHABA, prompt_ar: 'مَنْ هُوَ الصَّحَابِيُّ الَّذِي كَانَ أَوَّلَ مُؤَذِّنٍ فِي الْإِسْلَامِ؟', prompt_en: 'Who was the companion who served as the first Muezzin in Islam?', correct_ar: 'بِلَالُ بْنُ رَبَاحٍ', correct_en: 'Bilal ibn Rabah', distractors_ar: ['عَمَّارُ بْنُ يَاسِرٍ', 'سَلْمَانُ الْفَارِسِيُّ', 'خَبَّابُ بْنُ الْأَرَتِّ'], distractors_en: ['Ammar ibn Yasir', 'Salman al-Farsi', 'Khabbab ibn al-Aratt'] },
  { id: 'sc1', segment: Segment.SCHOLARS_DEVOUT, prompt_ar: 'مَنْ هُوَ الْإِمَامُ الَّذِي يُلَقَّبُ بِـ "إِمَامِ دَارِ الْهِجْرَةِ" وَصَاحِبُ كِتَابِ "الْمُوَطَّأِ"؟', prompt_en: 'Who is the Imam nicknamed "Imam of Dar al-Hijra" and the author of "Al-Muwatta"?', correct_ar: 'الْإِمَامُ مَالِكٌ', correct_en: 'Imam Malik', distractors_ar: ['الْإِمَامُ الشَّافِعِيُّ', 'الْإِمَامُ أَحْمَدُ', 'الْإِمَامُ أَبُو حَنِيفَةَ'], distractors_en: ['Imam Al-Shafi\'i', 'Imam Ahmad', 'Imam Abu Hanifa'] },
  { id: 'sc2', segment: Segment.SCHOLARS_DEVOUT, prompt_ar: 'مَنْ هُوَ الْعَالِمُ الَّذِي جَمَعَ أَصَحَّ كِتَابٍ بَعْدَ الْقُرْآنِ الْكَرِيمِ فِي الْحَدِيثِ النَّبَوِيِّ؟', prompt_en: 'Who compiled the most authentic book of Hadith after the Quran?', correct_ar: 'الْإِمَامُ الْبُخَارِيُّ', correct_en: 'Imam Al-Bukhari', distractors_ar: ['الْإِمَامُ مُسْلِمٌ', 'الْإِمَامُ النَّوَوِيُّ', 'الْإِمَامُ ابْنُ كَثِيرٍ'], distractors_en: ['Imam Muslim', 'Imam Al-Nawawi', 'Imam Ibn Kathir'] }
];

export const getQuestionsLocally = (segment: Segment, lang: Language) => {
  const pool = QUESTION_BANK.filter(q => q.segment === segment);
  const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
  return shuffled.map(q => {
    const correctOption = { id: 'correct', text: lang === 'ar' ? q.correct_ar : q.correct_en };
    const distractorOptions = (lang === 'ar' ? q.distractors_ar : q.distractors_en).map((d, i) => ({ id: `dist_${i}`, text: d }));
    return { id: q.id, prompt: lang === 'ar' ? q.prompt_ar : q.prompt_en, correctId: 'correct', options: [correctOption, ...distractorOptions].sort(() => 0.5 - Math.random()) };
  });
};

// ==========================================
// 4. SERVICES
// ==========================================
class SoundService {
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;
  constructor() {
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('sound_enabled') !== 'false';
      const unlock = () => {
        this.initContext();
        if (this.audioContext?.state === 'suspended') this.audioContext.resume();
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock);
      window.addEventListener('touchstart', unlock);
    }
  }
  private initContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.audioContext = new AudioCtx();
    }
  }
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('sound_enabled', String(this.enabled));
    if (this.enabled && this.audioContext?.state === 'suspended') this.audioContext.resume();
    return this.enabled;
  }
  isEnabled() { return this.enabled; }
  async play(type: 'click' | 'correct' | 'wrong' | 'flip' | 'success' | 'nav' | 'hover') {
    if (!this.enabled) return;
    this.initContext();
    if (!this.audioContext) return;
    if (this.audioContext.state === 'suspended' && type !== 'hover') {
      try { await this.audioContext.resume(); } catch (e) { return; }
    }
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const createOsc = (freq: number, start: number, dur: number, vol: number, type: OscillatorType = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(vol, start + 0.01); gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(start); osc.stop(start + dur);
    };

    switch (type) {
      case 'hover': if (ctx.state === 'running') createOsc(880, now, 0.05, 0.02); break;
      case 'click': createOsc(440, now, 0.1, 0.1, 'triangle'); break;
      case 'nav': createOsc(330, now, 0.1, 0.05); setTimeout(() => createOsc(440, now + 0.05, 0.1, 0.05), 50); break;
      case 'flip':
        createOsc(200, now, 0.2, 0.08);
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.frequency.setValueAtTime(200, now); osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
        gain.gain.setValueAtTime(0.08, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + 0.2);
        break;
      case 'correct': createOsc(523.25, now, 0.3, 0.1); createOsc(659.25, now + 0.1, 0.3, 0.1); break;
      case 'wrong':
        const oscW = ctx.createOscillator(); const gainW = ctx.createGain();
        oscW.frequency.setValueAtTime(150, now); oscW.frequency.linearRampToValueAtTime(100, now + 0.3);
        gainW.gain.setValueAtTime(0.1, now); gainW.gain.linearRampToValueAtTime(0.001, now + 0.3);
        oscW.connect(gainW); gainW.connect(ctx.destination); oscW.start(now); oscW.stop(now + 0.3);
        break;
      case 'success': [440, 554.37, 659.25, 880].forEach((f, i) => createOsc(f, now + i * 0.1, 0.4, 0.1)); break;
    }
  }
}
export const sounds = new SoundService();

const db = {
  async getFollowing(uid: string): Promise<string[]> {
    try {
      const d = localStorage.getItem(`following_${uid}`);
      const parsed = d ? JSON.parse(d) : [];
      return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      return [];
    }
  },
  async followUser(currentUid: string, targetUid: string) { const f = await this.getFollowing(currentUid); if (!f.includes(targetUid)) { f.push(targetUid); localStorage.setItem(`following_${currentUid}`, JSON.stringify(f)); } },
  async unfollowUser(currentUid: string, targetUid: string) { let f = await this.getFollowing(currentUid); f = f.filter(id => id !== targetUid); localStorage.setItem(`following_${currentUid}`, JSON.stringify(f)); },
  async getAllUsers(): Promise<LeaderboardEntry[]> {
    const fallback = [
      { uid: '1', username: 'عمر_الفاروق', score: 2450, rank: 1 }, { uid: '2', username: 'Aisha_Learn', score: 2100, rank: 2 },
      { uid: '3', username: 'نور_العلم', score: 1850, rank: 3 }, { uid: '4', username: 'Zaid_Hassan', score: 1200, rank: 4 },
    ];
    try {
      const d = localStorage.getItem('all_users_mock');
      const parsed = d ? JSON.parse(d) : fallback;
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
};

// ==========================================
// 5. COMPONENTS
// ==========================================
const IslamicPattern: React.FC = () => <div className="fixed inset-0 pointer-events-none opacity-40 islamic-pattern" />;

const Badge: React.FC<{ name: string; icon: React.ReactNode }> = ({ name, icon }) => (
  <button onClick={() => sounds.play('click')} onMouseEnter={() => sounds.play('hover')} className="flex flex-col items-center justify-center p-2 bg-white rounded-lg border border-emerald-100 shadow-sm transition-transform hover:scale-110 active:scale-95">
    <div className="w-10 h-10 text-emerald-600 mb-1">{icon}</div>
    <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-tighter">{name}</span>
  </button>
);

const Navbar: React.FC<{ lang: Language; setLang: (l: Language) => void; currentView: string; setView: (v: string) => void; user?: UserProfile; }> = ({ lang, setLang, currentView, setView, user }) => {
  const t = TRANSLATIONS[lang]; const isAr = lang === 'ar';
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => { sounds.play('nav'); setView('home'); }}>
        <div className="bg-emerald-800 text-white p-2 rounded-full shadow-lg">{ICONS.mosque('w-6 h-6')}</div>
        <div className="hidden sm:block"><h1 className="text-xl font-bold text-emerald-900 leading-tight">{t.title}</h1><p className="text-xs text-emerald-600 font-medium">{t.subtitle}</p></div>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <button onClick={() => { sounds.play('nav'); setView('home'); }} className={`font-bold text-sm sm:text-base ${currentView === 'home' ? 'text-emerald-700 underline' : 'text-slate-600'}`}>{isAr ? 'الرئيسية' : 'Home'}</button>
        <button onClick={() => { sounds.play('nav'); setView('compete'); }} className={`font-bold text-sm sm:text-base ${currentView === 'compete' ? 'text-emerald-700 underline' : 'text-slate-600'}`}>{t.compete}</button>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={() => { sounds.play('click'); setLang(isAr ? 'en' : 'ar'); }} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors">{isAr ? 'EN' : 'AR'}</button>
        <button onClick={() => { if (sounds.toggle()) sounds.play('click'); }} className="p-1 hover:bg-slate-100 rounded-full">{sounds.isEnabled() ? '🔊' : '🔇'}</button>
        {user && (
          <div className="flex items-center gap-2 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
            <div className="flex flex-col items-end">
              <span className="text-[10px] sm:text-xs font-black text-emerald-900 leading-none">{user.username}</span>
              <span className="text-[8px] sm:text-[10px] text-emerald-600">{t.level} {user.level}</span>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">{user.username[0].toUpperCase()}</div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Home: React.FC<{ lang: Language; onSelect: (s: Segment) => void; user: UserProfile }> = ({ lang, onSelect, user }) => {
  const t = TRANSLATIONS[lang];
  const segments = [
    { id: Segment.PROPHETS, icon: ICONS.star, color: 'bg-amber-100 text-amber-900 border-amber-200' },
    { id: Segment.SAHABA, icon: ICONS.mosque, color: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
    { id: Segment.SCHOLARS_DEVOUT, icon: ICONS.book, color: 'bg-indigo-100 text-indigo-900 border-indigo-200' },
  ];
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12">
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl ring-4 ring-white">{user.username[0].toUpperCase()}</div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-sm">LVL {user.level}</div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900">{user.username}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-emerald-600 font-medium">{user.totalScore} {t.points}</span>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(user.totalScore % 100)}%` }} /></div>
            </div>
          </div>
        </div>
        <div className="flex gap-3"><Badge name="Explorer" icon={ICONS.star()} /><Badge name="Scholar" icon={ICONS.book()} /><Badge name="Hero" icon={ICONS.shield()} /></div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {segments.map(seg => (
          <button key={seg.id} onClick={() => { sounds.play('click'); onSelect(seg.id); }} onMouseEnter={() => sounds.play('hover')} className={`group flex flex-col items-center justify-center p-8 rounded-3xl border-2 transition-all hover:scale-105 hover:shadow-xl ${seg.color}`}>
            <div className="p-4 rounded-2xl bg-white/50 mb-4 group-hover:rotate-12 transition-transform">{seg.icon('w-16 h-16')}</div>
            <span className="text-2xl font-black tracking-wide">{t[seg.id as keyof typeof t]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const QuizView: React.FC<{ lang: Language; segment: Segment; onFinish: (score: number) => void }> = ({ lang, segment, onFinish }) => {
  const t = TRANSLATIONS[lang];
  const [step, setStep] = useState(0); const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null); const [isSpeaking, setIsSpeaking] = useState(false);
  const questions = useMemo(() => getQuestionsLocally(segment, lang), [segment, lang]);
  const cancelSpeech = useCallback(() => {
    if (typeof window === 'undefined') return;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const speakText = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;
    cancelSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [cancelSpeech, lang]);

  useEffect(() => {
    if (questions[step]) speakText(questions[step].prompt);
    return () => cancelSpeech();
  }, [step, questions, speakText, cancelSpeech]);

  const handleSelect = (id: string) => {
    if (selectedId) return; setSelectedId(id); cancelSpeech();
    if (id === questions[step].correctId) { setScore(s => s + 20); sounds.play('correct'); } else { sounds.play('wrong'); }
  };
  const nextStep = () => { if (step < questions.length - 1) { setStep(s => s + 1); setSelectedId(null); sounds.play('click'); } else { sounds.play('success'); onFinish(score); } };

  if (!questions.length) return <div className="p-20 text-center font-bold">No questions found.</div>;
  const currentQ = questions[step];

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm"><span className="font-bold text-emerald-900">{t.score}: {score} XP</span><span className="font-bold text-emerald-900">{step + 1} / {questions.length}</span></div>
      <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-emerald-700 relative">
        <div className="flex flex-col items-center">
          <button onClick={() => speakText(currentQ.prompt)} className={`mb-4 p-3 rounded-full transition-all active:scale-90 ${isSpeaking ? 'bg-emerald-100 text-emerald-600 animate-pulse scale-110' : 'bg-slate-100 text-slate-400 hover:text-emerald-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          </button>
          <p className="text-xl md:text-2xl font-black text-center text-slate-800 mb-10 leading-relaxed">"{currentQ.prompt}"</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {currentQ.options.map((opt) => (
            <button key={opt.id} disabled={!!selectedId} onClick={() => handleSelect(opt.id)} className={`p-5 rounded-2xl font-black text-lg border-2 transition-all flex justify-between items-center shadow-sm relative group ${selectedId === opt.id ? (opt.id === currentQ.correctId ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-red-100 border-red-500 text-red-900') : (selectedId && opt.id === currentQ.correctId ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-slate-100 hover:border-emerald-300 text-slate-800 hover:bg-slate-50')}`}>
              {!selectedId && <div onClick={(e) => { e.stopPropagation(); speakText(opt.text); }} className="absolute left-4 opacity-40 group-hover:opacity-100 hover:text-emerald-600 transition-opacity p-2 rounded-full hover:bg-emerald-50"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg></div>}
              <span className="flex-grow text-center px-8">{opt.text}</span>
              {selectedId && opt.id === currentQ.correctId && <span className="text-emerald-600 absolute right-4">✓</span>}
              {selectedId === opt.id && opt.id !== currentQ.correctId && <span className="text-red-600 absolute right-4">✗</span>}
            </button>
          ))}
        </div>
      </div>
      {selectedId && <button onClick={nextStep} className="w-full bg-emerald-700 text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-emerald-800 transition-all active:scale-95">{step === questions.length - 1 ? (lang === 'ar' ? 'إنهاء التحدي' : 'Finish Challenge') : t.next}</button>}
    </div>
  );
};

const Leaderboard: React.FC<{ lang: Language; user: UserProfile; onUpdateUser: (u: UserProfile) => void }> = ({ lang, user, onUpdateUser }) => {
  const t = TRANSLATIONS[lang]; const [tab, setTab] = useState<'global' | 'friends'>('global');
  const [allUsers, setAllUsers] = useState<LeaderboardEntry[]>([]); const [followingIds, setFollowingIds] = useState<string[]>([]);
  useEffect(() => { const fetchData = async () => { setAllUsers(await db.getAllUsers()); setFollowingIds(await db.getFollowing(user.uid)); }; fetchData(); }, [user.uid]);
  const displayedUsers = useMemo(() => { let list = tab === 'global' ? allUsers : allUsers.filter(u => followingIds.includes(u.uid)); return [...list].sort((a, b) => b.score - a.score); }, [allUsers, tab, followingIds]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 mt-4">
      <div className="text-center">
        <h2 className="text-3xl font-black text-emerald-900">{t.compete}</h2>
        <div className="flex justify-center mt-6 bg-slate-100 p-1 rounded-2xl w-fit mx-auto">
          <button onClick={() => setTab('global')} className={`px-6 py-2 rounded-xl font-bold ${tab === 'global' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'}`}>Global</button>
          <button onClick={() => setTab('friends')} className={`px-6 py-2 rounded-xl font-bold ${tab === 'friends' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'}`}>Friends</button>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-50">
        <table className="w-full text-right" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <thead className="bg-emerald-800 text-white"><tr><th className="p-4">#</th><th className="p-4">Name</th><th className="p-4">XP</th><th className="p-4">Action</th></tr></thead>
          <tbody>
            {displayedUsers.map((u, i) => (
              <tr key={u.uid} className="border-b border-slate-50">
                <td className="p-4 font-bold">{i + 1}</td><td className="p-4">{u.username}</td><td className="p-4 font-black text-emerald-700">{u.score}</td>
                <td className="p-4">
                  {u.uid !== user.uid && (followingIds.includes(u.uid)
                    ? <button onClick={async () => { sounds.play('click'); await db.unfollowUser(user.uid, u.uid); const f = await db.getFollowing(user.uid); setFollowingIds(f); onUpdateUser({ ...user, following: f }); }} className="text-xs font-bold text-red-500 hover:underline">Unfollow</button>
                    : <button onClick={async () => { sounds.play('success'); await db.followUser(user.uid, u.uid); const f = await db.getFollowing(user.uid); setFollowingIds(f); onUpdateUser({ ...user, following: f }); }} className="text-xs font-bold text-emerald-600 hover:underline">Follow</button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AuthView: React.FC<{ onLogin: (u: UserProfile) => void; lang: Language }> = ({ onLogin, lang }) => {
  const [username, setUsername] = useState(''); const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-md mx-auto p-12 bg-white rounded-3xl shadow-2xl mt-12 border border-emerald-50">
      <div className="text-center mb-8">
        <div className="bg-emerald-800 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">{ICONS.mosque('w-10 h-10')}</div>
        <h2 className="text-2xl font-black text-emerald-900 leading-tight">{t.username_prompt}</h2>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); const trimmed = username.trim(); if (trimmed) { sounds.play('success'); onLogin({ uid: 'u_' + Date.now(), username: trimmed, displayName: trimmed, createdAt: Date.now(), totalScore: 0, level: 1, badges: [], following: [] }); } }} className="space-y-6">
        <input type="text" autoFocus placeholder={lang === 'ar' ? 'اكتب اسمك هنا' : 'Enter your name'} className="w-full p-4 border-2 border-slate-100 rounded-2xl text-center text-xl font-black text-emerald-900 placeholder:text-slate-300 outline-none focus:border-emerald-500" value={username} onChange={e => setUsername(e.target.value)} />
        <button type="submit" className="w-full bg-emerald-700 text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-emerald-800 active:scale-95 transition-all">Enter Challenge</button>
      </form>
    </div>
  );
};

const StudyView: React.FC<{ lang: Language; segment: Segment; onFinish: () => void; setView: (v: string) => void }> = ({ lang, segment, setView }) => {
  const people = useMemo(() => SEED_PEOPLE.filter(p => p.segment === segment), [segment]);
  const [index, setIndex] = useState(0); const [flipped, setFlipped] = useState(false);
  if (people.length === 0) return <div className="p-20 text-center font-bold">No data...</div>;
  const person = people[index];
  return (
    <div className="flex flex-col items-center p-4 gap-8">
      <button onClick={() => { sounds.play('nav'); setView('quiz'); }} className="bg-amber-500 text-white px-8 py-4 rounded-full font-black shadow-lg hover:bg-amber-600 transition-all hover:scale-105 active:scale-95">Start Quiz ✨</button>
      <div className={`w-full max-w-md h-[400px] flip-card ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front bg-white flex flex-col items-center justify-center p-8 rounded-3xl shadow-xl border border-emerald-50">
            <h3 className="text-4xl font-black text-emerald-900 text-center">{lang === 'ar' ? person.name_ar : person.name_en}</h3>
            <button onClick={() => { sounds.play('flip'); setFlipped(true); }} className="mt-8 text-emerald-600 font-bold underline hover:text-emerald-700">Show Details</button>
          </div>
          <div className="flip-card-back bg-emerald-800 text-white p-8 rounded-3xl flex flex-col shadow-xl">
            <h4 className="text-xl font-bold border-b border-emerald-700 pb-2 mb-4">{lang === 'ar' ? person.name_ar : person.name_en}</h4>
            <p className="text-md leading-relaxed flex-grow">{lang === 'ar' ? person.facts_ar[0] : person.facts_en?.[0]}</p>
            <button onClick={() => { sounds.play('flip'); setFlipped(false); }} className="mt-auto font-bold underline hover:text-emerald-200">Back</button>
          </div>
        </div>
      </div>
      <button onClick={() => { sounds.play('click'); setIndex((index + 1) % people.length); setFlipped(false); }} className="bg-emerald-600 text-white px-12 py-4 rounded-full font-black shadow-lg hover:bg-emerald-700 transition-all">Next Card →</button>
    </div>
  );
};

// ==========================================
// 6. MAIN APP EXPORT
// ==========================================
const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar'); const [view, setView] = useState<string>('home');
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [user, setUser] = useState<UserProfile | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      const saved = localStorage.getItem('user_profile');
      return saved ? JSON.parse(saved) : undefined;
    } catch {
      return undefined;
    }
  });

  useEffect(() => { document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    if (!user && view !== 'auth') setView('auth');
  }, [user, view]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) localStorage.setItem('user_profile', JSON.stringify(user));
    else localStorage.removeItem('user_profile');
  }, [user]);

  const handleQuizFinish = (addedXp: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const totalScore = prev.totalScore + addedXp;
      return { ...prev, totalScore, level: Math.floor(totalScore / 100) + 1 };
    });
    setView('home');
  };

  const renderContent = () => {
    if (!user) return <AuthView lang={lang} onLogin={(u) => { setUser(u); setView('home'); }} />;
    switch (view) {
      case 'home': return <Home lang={lang} onSelect={(s) => { setSelectedSegment(s); setView('study'); }} user={user} />;
      case 'compete': return <Leaderboard lang={lang} user={user} onUpdateUser={setUser} />;
      case 'study': return selectedSegment ? <StudyView lang={lang} segment={selectedSegment} onFinish={() => setView('home')} setView={setView} /> : null;
      case 'quiz': return selectedSegment ? <QuizView lang={lang} segment={selectedSegment} onFinish={handleQuizFinish} /> : null;
      default: return <Home lang={lang} onSelect={(s) => { setSelectedSegment(s); setView('study'); }} user={user} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50">
      <IslamicPattern />
      <Navbar lang={lang} setLang={setLang} currentView={view} setView={setView} user={user} />
      <main className="flex-grow relative z-10 pb-12">{renderContent()}</main>
      <footer className="bg-white border-t p-4 text-center text-slate-400 font-bold text-[10px]">&copy; 2024 Erth. Learning Islam with AI.</footer>
    </div>
  );
};

export default App;
