import type { Metadata } from "next";
import { PlaceholderPanel } from "@/components/placeholder-panel";

export const metadata: Metadata = {
  title: "Revision · MedStudy",
  description: "Spaced review of topics you've already studied.",
};

export default function RevisionPage() {
  return (
    <PlaceholderPanel
      title="Revision"
      description="Spaced review of topics you've already studied."
    />
  );
}