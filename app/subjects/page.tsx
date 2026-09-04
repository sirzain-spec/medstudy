import Link from "next/link";
import { getSubjects } from "@/lib/data";

export default function SubjectsIndexPage() {
  const subjects = getSubjects();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Subjects</h1>
      <p className="mt-2 text-lg text-zinc-600">
        All your medical subjects, from anatomy to your final year.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">{subject.name}</h2>
              <p className="mt-1 text-sm text-zinc-600">{subject.description}</p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-4">
              <span className="text-sm text-zinc-500">Year {subject.year}</span>
              <Link
                href={`/subjects/${subject.slug}`}
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
              >
                Open subject
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}