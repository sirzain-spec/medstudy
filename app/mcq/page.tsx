import type { Metadata } from "next";
import { PlaceholderPanel } from "@/components/placeholder-panel";

export const metadata: Metadata = {
  title: "MCQ Practice · MedStudy",
  description: "Practice questions to lock the material in.",
};

export default function McqPage() {
  return (
    <PlaceholderPanel
      title="MCQ Practice"
      description="Practice questions to lock the material in."
    />
  );
}