
import { Segment, Language } from "../types";
import { QUESTION_BANK } from "../data/questions";

export const getQuestionsLocally = (segment: Segment, lang: Language) => {
  // Filter bank by segment
  const pool = QUESTION_BANK.filter(q => q.segment === segment);
  
  // Shuffle and pick 5
  const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
  
  return shuffled.map(q => {
    // Generate options
    const correctOption = {
      id: 'correct',
      text: lang === 'ar' ? q.correct_ar : q.correct_en
    };
    
    const distractorOptions = (lang === 'ar' ? q.distractors_ar : q.distractors_en).map((d, i) => ({
      id: `dist_${i}`,
      text: d
    }));
    
    const options = [correctOption, ...distractorOptions].sort(() => 0.5 - Math.random());
    
    return {
      id: q.id,
      prompt: lang === 'ar' ? q.prompt_ar : q.prompt_en,
      correctId: 'correct',
      options
    };
  });
};
