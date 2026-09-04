import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  countTopics,
  getProgress,
  getSubjectTopics,
  getSubjects,
} from "@/lib/data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/mcq", label: "MCQs" },
  { href: "/revision", label: "Revision" },
  { href: "/notes", label: "Notes" },
];

const QUICK_ACCESS = [
  {
    href: "/notes",
    title: "Notes",
    description: "Everything you've written down, in one place.",
  },
  {
    href: "/mcq",
    title: "MCQs",
    description: "Practice questions to lock the material in.",
  },
  {
    href: "/revision",
    title: "Revision",
    description: "Spaced review of topics you've already studied.",
  },
];

export default function Home() {
  const subjects = getSubjects();
  const allStatuses = subjects.map((subject) =>
    getSubjectTopics(subject.slug).map((topic) => topic.status),
  );
  const progress = getProgress(allStatuses.flat());

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-zinc-900">
          MedStudy
        </Link>
        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600">
          {NAV_LINKS.map((link) =>
            link.href === "/" ? null : (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-zinc-900"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </nav>

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Morning, future doc.
        </h1>
        <p className="text-lg text-zinc-600">
          Here&apos;s where your first year stands. Steady, one topic at a time.
        </p>
      </header>

      <section className="flex flex-col gap-6 lg:flex-row">
        {progress.next ? (
          <Card href={`/topics/${progress.next.id}`} className="flex-1">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Continue studying
              </p>
              <h2 className="text-xl font-semibold text-zinc-900">{progress.next.title}</h2>
              <p className="text-sm text-zinc-600">
                {progress.next.subjectName} · {progress.next.moduleTitle}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <StatusBadge status={progress.next.status} />
                <span className="text-sm text-zinc-500">&middot; {progress.next.estMinutes} min</span>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="flex-1">
            <p className="text-sm text-zinc-600">
              Nothing in progress yet — pick a topic below to get started.
            </p>
          </Card>
        )}

        <Card className="w-full lg:w-72">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Overall progress
              </p>
              <p className="mt-1 text-3xl font-semibold text-zinc-900">{progress.percentage}%</p>
            </div>
            <ProgressBar value={progress.percentage} />
            <dl className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <dt className="text-zinc-500">Done</dt>
                <dd className="font-medium text-zinc-900">{progress.completed}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Doing</dt>
                <dd className="font-medium text-zinc-900">{progress.inProgress}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Left</dt>
                <dd className="font-medium text-zinc-900">{progress.notStarted}</dd>
              </div>
            </dl>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
          Quick access
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {QUICK_ACCESS.map((item) => (
            <Card key={item.href} href={item.href}>
              <h3 className="font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Your subjects
          </h2>
          <Link href="/subjects" className="text-sm text-zinc-600 transition-colors hover:text-zinc-900">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {subjects.map((subject) => {
            const topics = getSubjectTopics(subject.slug);
            const completed = topics.filter(
              (topic) => topic.status === "revised" || topic.status === "mastered",
            ).length;
            return (
              <Card key={subject.id} href={`/subjects/${subject.slug}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">{subject.name}</h3>
                    <p className="mt-1 text-sm text-zinc-600">{subject.description}</p>
                  </div>
                  <div className="flex-shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600">
                    Yr {subject.year}
                  </div>
                </div>
                <dl className="mt-4 flex gap-6 text-sm">
                  <div>
                    <dt className="text-zinc-500">Modules</dt>
                    <dd className="font-medium text-zinc-900">{subject.modules.length}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Topics</dt>
                    <dd className="font-medium text-zinc-900">{countTopics(subject)}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Done</dt>
                    <dd className="font-medium text-zinc-900">{completed}</dd>
                  </div>
                </dl>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}