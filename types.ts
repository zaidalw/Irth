
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
  following: string[]; // List of UIDs
}

export interface LeaderboardEntry {
  uid: string;
  username: string;
  score: number;
  rank: number;
  isFollowing?: boolean;
}

export enum QuestionType {
  MCQ = 'mcq'
}

export interface QuizQuestion {
  type: QuestionType;
  prompt_ar: string;
  prompt_en: string;
  options: { id: string; text_ar: string; text_en: string }[];
  correctId: string;
}

export type Language = 'ar' | 'en';
