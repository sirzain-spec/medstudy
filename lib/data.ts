import { seedSubjects } from "@/data/seed";
import type { Subject, Topic, TopicId, TopicStatus } from "@/data/types";

export type TopicSummary = {
  id: TopicId;
  title: string;
  subjectName: string;
  subjectSlug: string;
  moduleTitle: string;
  status: TopicStatus;
  estMinutes: number;
};

export function getSubjects(): Subject[] {
  return seedSubjects;
}

export function getSubject(slug: string): Subject | undefined {
  return seedSubjects.find((subject) => subject.slug === slug);
}

export function getSubjectTopics(slug: string): Topic[] {
  return getSubject(slug)?.modules.flatMap((module) => module.topics) ?? [];
}

export function getTopic(id: TopicId): TopicSummary | undefined {
  for (const subject of seedSubjects) {
    for (const mod of subject.modules) {
      const topic = mod.topics.find((candidate) => candidate.id === id);
      if (topic) {
        return {
          id: topic.id,
          title: topic.title,
          subjectName: subject.name,
          subjectSlug: subject.slug,
          moduleTitle: mod.title,
          status: topic.status,
          estMinutes: topic.estMinutes,
        };
      }
    }
  }
  return undefined;
}

export function getAllTopics(): TopicSummary[] {
  return seedSubjects.flatMap((subject) =>
    subject.modules.flatMap((module) =>
      module.topics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        subjectName: subject.name,
        subjectSlug: subject.slug,
        moduleTitle: module.title,
        status: topic.status,
        estMinutes: topic.estMinutes,
      })),
    ),
  );
}

export function countTopics(subject: Subject): number {
  return subject.modules.reduce(
    (sum, module) => sum + module.topics.length,
    0,
  );
}

export type ProgressSummary = {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  percentage: number;
  next: TopicSummary | undefined;
};

export function getProgress(topicStatuses: TopicStatus[]): ProgressSummary {
  const total = topicStatuses.length;
  const completed = topicStatuses.filter(
    (status) => status === "revised" || status === "mastered",
  ).length;
  const inProgress = topicStatuses.filter(
    (status) => status === "in-progress",
  ).length;
  const notStarted = total - completed - inProgress;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const nextTopic = getAllTopics().find(
    (topic) => topic.status === "in-progress",
  );

  return { total, completed, inProgress, notStarted, percentage, next: nextTopic };
}