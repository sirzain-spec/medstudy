import { Card } from "@/components/ui/card";

type PlaceholderProps = {
  title: string;
  description: string;
};

export function PlaceholderPanel({ title, description }: PlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{title}</h1>
      <p className="mt-2 text-lg text-zinc-600">{description}</p>
      <Card className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900">Coming soon</h2>
        <p className="mt-2 text-sm text-zinc-600">
          This section is on the roadmap. The dashboard is ready, so feel free to
          keep browsing subjects and topics in the meantime.
        </p>
      </Card>
    </div>
  );
}