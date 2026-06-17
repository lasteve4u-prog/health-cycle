export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type ConditionLevel = 1 | 2 | 3 | 4 | 5;

export const SYMPTOMS = [
  "頭痛",
  "腹痛",
  "腰痛",
  "むくみ",
  "乳房の張り",
  "倦怠感",
  "イライラ",
  "不安感",
  "落ち込み",
  "食欲増加",
  "眠気",
  "不眠",
] as const;

export type Symptom = (typeof SYMPTOMS)[number];

export interface User {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface HealthRecord {
  id: string;
  user_id: string;
  recorded_at: string;
  mood: MoodLevel;
  condition: ConditionLevel;
  symptoms: string[];
  memo: string | null;
  created_at: string;
}

export type HealthRecordInsert = Omit<HealthRecord, "id" | "created_at">;
