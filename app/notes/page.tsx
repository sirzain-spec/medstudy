import type { Metadata } from "next";
import { PlaceholderPanel } from "@/components/placeholder-panel";

export const metadata: Metadata = {
  title: "Notes · MedStudy",
  description: "Everything you've written down, in one place.",
};

export default function NotesPage() {
  return (
    <PlaceholderPanel
      title="Notes"
      description="Everything you've written down, in one place."
    />
  );
}