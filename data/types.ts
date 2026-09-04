export type TopicId = string;
export type SubjectId = string;

export type TopicStatus = "not-started" | "in-progress" | "revised" | "mastered";

export interface Topic {
  id: TopicId;
  title: string;
  description: string;
  status: TopicStatus;
  estMinutes: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Subject {
  id: SubjectId;
  slug: string;
  name: string;
  shortName: string;
  year: number;
  description: string;
  modules: Module[];
}