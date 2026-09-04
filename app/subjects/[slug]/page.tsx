import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getSubject, getSubjectTopics, getSubjects } from "@/lib/data";
import type { Topic } from "@/data/types";

export function generateStaticParams() {
  return getSubjects().map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps<"/subjects/[slug]">) {
  const { slug } = await params;
  const subject = getSubject(slug);
  return { title: subject ? `${subject.name} · MedStudy` : "Subject · MedStudy" };
}

export default async function SubjectPage({
  params,
}: PageProps<"/subjects/[slug]">) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const topics = getSubjectTopics(subject.slug);
  const completed = topics.filter(
    (topic) => topic.status === "revised" || topic.status === "mastered",
  ).length;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Link href="/" className="text-sm text-zinc-600 transition-colors hover:text-zinc-900">
        &larr; Back to dashboard
      </Link>

      <header className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {subject.name}
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-zinc-600">{subject.description}</p>
        </div>
        <p className="text-sm text-zinc-600">
          Year {subject.year} &middot; {subject.modules.length} modules &middot;{" "}
          {topics.length} topics &middot; {completed} done
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-6">
        {subject.modules.map((module) => (
          <Card key={module.id}>
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900">{module.title}</h2>
                <p className="mt-1 text-sm text-zinc-600">{module.description}</p>
              </div>
              <ul className="flex flex-col divide-y divide-zinc-100">
                {module.topics.map((topic: Topic) => (
                  <li key={topic.id} className="flex items-center justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <Link
                        href={`/topics/${topic.id}`}
                        className="font-medium text-zinc-900 transition-colors hover:text-sky-700"
                      >
                        {topic.title}
                      </Link>
                      <p className="mt-0.5 text-sm text-zinc-600">{topic.description}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-3">
                      <span className="text-sm text-zinc-500">{topic.estMinutes} min</span>
                      <StatusBadge status={topic.status} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}