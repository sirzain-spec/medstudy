import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getTopic } from "@/lib/data";

export async function generateMetadata({ params }: PageProps<"/topics/[id]">) {
  const { id } = await params;
  const topic = getTopic(id);
  return { title: topic ? `${topic.title} · MedStudy` : "Topic · MedStudy" };
}

export default async function TopicPage({ params }: PageProps<"/topics/[id]">) {
  const { id } = await params;
  const topic = getTopic(id);
  if (!topic) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href={`/subjects/${topic.subjectSlug}`}
        className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
      >
        &larr; {topic.subjectName}
      </Link>

      <header className="mt-6 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          {topic.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600">
          <span>{topic.moduleTitle}</span>
          <span className="text-zinc-300">&middot;</span>
          <StatusBadge status={topic.status} />
          <span className="text-zinc-300">&middot;</span>
          <span>{topic.estMinutes} min</span>
        </div>
      </header>

      <Card className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900">Study notes</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Notes and study content for this topic will live here. This is an early
          placeholder while the site is being built.
        </p>
      </Card>
    </div>
  );
}