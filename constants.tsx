
import React from 'react';

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
  trophy: (className?: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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
    title: 'إرث',
    subtitle: 'أبطال الإيمان',
    study: 'تعلم',
    quiz: 'اختبار',
    compete: 'لوحة المتصدرين',
    timeline: 'الجدول الزمني',
    admin: 'الإدارة',
    prophets: 'الأنبياء',
    sahaba: 'الصحابة',
    tabiin: 'التابعين',
    atba_tabiin: 'أتباع التابعين',
    scholars_devout: 'العلماء والصالحين',
    known: 'أعرفه',
    review: 'مراجعة',
    next: 'التالي',
    finish: 'إنهاء',
    score: 'النقاط',
    streak: 'سلسلة انتصارات',
    global_rank: 'الترتيب العالمي',
    username_prompt: 'سجل دخولك لبدء التحدي',
    start_learning: 'ابدأ التعلم الآن',
    rank: 'الترتيب',
    player: 'اللاعب',
    points: 'نقاط الخبرة',
    matching_title: 'صل بين الاسم وما يناسبه',
    correct: 'صحيح!',
    wrong: 'حاول مرة أخرى',
    total_xp: 'مجموع النقاط',
    level: 'المستوى',
    signin_required: 'يجب تسجيل الدخول للوصول إلى هذا المحتوى'
  },
  en: {
    title: 'Erth',
    subtitle: 'Heroes of Faith',
    study: 'Study',
    quiz: 'Quiz',
    compete: 'Leaderboards',
    timeline: 'Timeline',
    admin: 'Admin',
    prophets: 'Prophets',
    sahaba: 'Sahaba',
    tabiin: 'Tabi’in',
    atba_tabiin: 'Atba’ al-Tabi’in',
    scholars_devout: 'Scholars & Devout',
    known: 'Got it!',
    review: 'Review',
    next: 'Next',
    finish: 'Finish',
    score: 'XP',
    streak: 'Streak',
    global_rank: 'Global Rank',
    username_prompt: 'Sign in to start competing',
    start_learning: 'Start Learning Now',
    rank: 'Rank',
    player: 'Player',
    points: 'XP Points',
    matching_title: 'Match the pairs correctly',
    correct: 'Correct!',
    wrong: 'Try again',
    total_xp: 'Total XP',
    level: 'Level',
    signin_required: 'Please sign in to access this content'
  }
};
