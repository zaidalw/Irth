
import { Person, Segment } from '../types';

export const SEED_PEOPLE: Person[] = [
  // Prophets (Sample from the 25)
  {
    id: 'adam',
    segment: Segment.PROPHETS,
    category: 'بداية الخلق',
    name_ar: 'آدم عليه السلام',
    name_en: 'Adam (AS)',
    facts_ar: ['أبو البشر وأول خليفة في الأرض', 'خلقه الله بيده من طين وعلمه الأسماء كلها', 'أسجد الله له الملائكة تشريفاً له'],
    facts_en: ['The father of humanity', 'Created from clay', 'Angels prostrated to him']
  },
  {
    id: 'idris',
    segment: Segment.PROPHETS,
    category: 'رسل قدامى',
    name_ar: 'إدريس عليه السلام',
    name_en: 'Idris (AS)',
    facts_ar: ['أول من خط بالقلم', 'اشتهر بالصبر والصدق', 'رفعه الله مكاناً علياً'],
    facts_en: ['First to write with a pen', 'Known for patience', 'Raised to a high place']
  },
  {
    id: 'nuh',
    segment: Segment.PROPHETS,
    category: 'أولو العزم',
    name_ar: 'نوح عليه السلام',
    name_en: 'Nuh (AS)',
    facts_ar: ['صاحب السفينة الشهيرة', 'دعا قومه 950 عاماً', 'لقب بشيخ المرسلين'],
    facts_en: ['The one with the Ark', 'Preached for 950 years', 'Senior Messenger']
  },
  // Sahaba (Expanding to reach 1000 dynamically, seeding with major ones)
  {
    id: 'abu_bakr',
    segment: Segment.SAHABA,
    category: 'الخلفاء الراشدون',
    name_ar: 'أبو بكر الصديق',
    name_en: 'Abu Bakr Al-Siddiq',
    facts_ar: ['رفيق الهجرة وأول خليفة', 'أنفق ماله كله في سبيل الله', 'لقب بالعتيق والصديق'],
    facts_en: ['Companion in Hijra', 'First Caliph', 'Nicknamed As-Siddiq']
  },
  {
    id: 'ali',
    segment: Segment.SAHABA,
    category: 'الخلفاء الراشدون',
    name_ar: 'علي بن أبي طالب',
    name_en: 'Ali ibn Abi Talib',
    facts_ar: ['ابن عم النبي وفدائي الهجرة', 'رابع الخلفاء الراشدين', 'صاحب سيف ذو الفقار'],
    facts_en: ['Cousin of the Prophet', 'Fourth Caliph', 'Hero of many battles']
  },
  {
    id: 'khalid_walid',
    segment: Segment.SAHABA,
    category: 'القادة',
    name_ar: 'خالد بن الوليد',
    name_en: 'Khalid ibn al-Walid',
    facts_ar: ['لقبه النبي بسيف الله المسلول', 'لم يهزم في معركة قط', 'قائد معركة اليرموك'],
    facts_en: ['The Sword of Allah', 'Never defeated in battle', 'Leader at Yarmouk']
  },
  // Others / Scholars
  {
    id: 'malik',
    segment: Segment.SCHOLARS_DEVOUT,
    category: 'أئمة المذاهب',
    name_ar: 'الإمام مالك بن أنس',
    name_en: 'Imam Malik',
    facts_ar: ['إمام دار الهجرة', 'صاحب كتاب الموطأ', 'كان يجل حديث رسول الله جداً'],
    facts_en: ['Imam of Medina', 'Author of Al-Muwatta', 'Highly respected Hadith']
  },
  {
    id: 'shafi',
    segment: Segment.SCHOLARS_DEVOUT,
    category: 'أئمة المذاهب',
    name_ar: 'الإمام الشافعي',
    name_en: 'Imam Al-Shafi\'i',
    facts_ar: ['مجدد القرن الثاني الهجري', 'صاحب كتاب الرسالة', 'برع في الفقه والشعر والشجاعة'],
    facts_en: ['Great Jurist', 'Author of Al-Risala', 'Expert in Fiqh and Poetry']
  }
];
