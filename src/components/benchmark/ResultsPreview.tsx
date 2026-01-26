import { Answer, BenchmarkResult } from "@/lib/scoring";

interface ResultsPreviewProps {
  result: BenchmarkResult;
  answers: Answer[];
  userName: string;
  industryLabel: string;
}

export function ResultsPreview({}: ResultsPreviewProps) {
  return <div>Build debug placeholder</div>;
}
