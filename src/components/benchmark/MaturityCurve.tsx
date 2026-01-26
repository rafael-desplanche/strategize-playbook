import { cn } from "@/lib/utils";

const stages = [
  { label: "Excel", lines: ["Excel"] },
  { label: "Business Intelligence", lines: ["Business", "Intelligence"] },
  { label: "Data Warehousing", lines: ["Data", "Warehousing"] },
  { label: "Data Science", lines: ["Data", "Science"] },
  { label: "Machine Learning", lines: ["Machine", "Learning"] },
  { label: "Full AI Transformation", lines: ["Full AI", "Transformation"] },
  { label: "Generative AI & LLMs", lines: ["Generative", "AI & LLMs"] },
  { label: "Advanced AI Use Cases", lines: ["Advanced AI", "Use Cases"] },
  "Excel",
  "Business Intelligence",
  "Data Warehousing",
  "Data Science (Understanding data – “What happened?”)",
  "Machine Learning (“What will happen?”)",
  "Full AI transformation",
  "Generative AI & LLMs",
  "Advanced AI use cases (Predictive maintenance, personalization, digital twins, generative design)",
];

interface MaturityCurveProps {
  score: number;
  marketAverageScore?: number;
  label: string;
  label: string;
  highlightRange?: [number, number];
  note?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function getCurvePoint(t: number) {
  const x = 10 + t * 80;
  const y = 85 - Math.pow(t, 1.7) * 60;
  return { x, y };
}

function scoreToT(score: number) {
  return clamp((score - 1) / 4, 0, 1);
}

export function MaturityCurve({ score, marketAverageScore = 2.8, label, note }: MaturityCurveProps) {
  const markerT = scoreToT(score);
  const marketT = scoreToT(marketAverageScore);

  const chart = {
    xMin: 10,
    xMax: 96,
    yMin: 10,
    yMax: 46,
  };

  const getPoint = (t: number) => ({
    x: chart.xMin + t * (chart.xMax - chart.xMin),
    y: chart.yMax - t * (chart.yMax - chart.yMin),
  });

  const userPoint = getPoint(markerT);
  const marketPoint = getPoint(marketT);
  const labelOffset = Math.abs(userPoint.x - marketPoint.x) < 6 ? -6 : 0;
export function MaturityCurve({ score, label, highlightRange = [0.14, 0.43], note }: MaturityCurveProps) {
  const markerT = scoreToT(score);
  const marker = getCurvePoint(markerT);
  const highlightStart = getCurvePoint(highlightRange[0]);
  const highlightEnd = getCurvePoint(highlightRange[1]);

  const curvePath = (() => {
    const p0 = getCurvePoint(0);
    const p1 = getCurvePoint(0.33);
    const p2 = getCurvePoint(0.66);
    const p3 = getCurvePoint(1);
    return `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`;
  })();

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 px-4 py-6">
      <div className="relative overflow-hidden rounded-xl bg-background/40 px-2 py-4 sm:px-4">
        <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMid meet" className="w-full h-56 sm:h-64 lg:h-72">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="w-full h-56 sm:h-64 lg:h-72">
          <defs>
            <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--muted-foreground))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
          </defs>
          <line x1={chart.xMin} y1={chart.yMin} x2={chart.xMin} y2={chart.yMax} stroke="hsl(var(--muted-foreground))" strokeWidth="0.6" />
          <line x1={chart.xMin} y1={chart.yMax} x2={chart.xMax} y2={chart.yMax} stroke="hsl(var(--muted-foreground))" strokeWidth="0.6" />
          <path
            d={`M ${chart.xMin} ${chart.yMax} L ${chart.xMax} ${chart.yMin}`}
            fill="none"
            stroke="url(#curveStroke)"
            strokeWidth="1.6"
          />
          <circle cx={marketPoint.x} cy={marketPoint.y} r="2.4" fill="hsl(var(--muted-foreground))" />
          <rect
            x={marketPoint.x - 20}
            y={marketPoint.y + 3 + labelOffset}
            width="40"
            height="7"
            rx="2"
            className="fill-muted"
          />
          <text
            x={marketPoint.x}
            y={marketPoint.y + 8 + labelOffset}
            textAnchor="middle"
            className="fill-muted-foreground text-[3px] font-medium"
          >
            Most companies are here
          </text>
          <circle cx={userPoint.x} cy={userPoint.y} r="2.6" fill="hsl(var(--primary))" />
          <rect
            x={userPoint.x - 12}
            y={userPoint.y - 11 + labelOffset}
            width="24"
            height="7"
            rx="2"
            className="fill-primary"
          />
          <text
            x={userPoint.x}
            y={userPoint.y - 6 + labelOffset}
            textAnchor="middle"
            className="fill-primary-foreground text-[3px] font-semibold"
          >
            {label}
          </text>
          <text x={chart.xMin} y={chart.yMin - 3} className="fill-muted-foreground text-[3px]">
            Competitive Advantage
          </text>
          <text x="53" y="66" textAnchor="middle" className="fill-muted-foreground text-[3px]">
            Data + AI Maturity
          </text>
          {stages.map((stage, index) => {
            const t = stages.length === 1 ? 0 : index / (stages.length - 1);
            const x = chart.xMin + t * (chart.xMax - chart.xMin);
            return (
              <text key={stage.label} x={x} y={chart.yMax + 5} textAnchor="middle" className="fill-muted-foreground text-[2.6px]">
                {stage.lines.map((line, lineIndex) => (
                  <tspan key={line} x={x} dy={lineIndex === 0 ? 0 : 3}>
                    {line}
                  </tspan>
                ))}
              </text>
            );
          })}
            </defs>
            <rect
              x={highlightStart.x}
              y={highlightEnd.y - 10}
              width={highlightEnd.x - highlightStart.x}
              height={highlightStart.y - highlightEnd.y + 20}
              fill="hsl(var(--primary) / 0.08)"
              rx="4"
            />
            <text
              x={(highlightStart.x + highlightEnd.x) / 2}
              y={highlightEnd.y - 6}
              textAnchor="middle"
              className="fill-muted-foreground text-[3px] font-medium"
            >
              Most companies are stuck here
            </text>
            <path d={curvePath} fill="none" stroke="url(#curveStroke)" strokeWidth="2" />
            <circle cx={marker.x} cy={marker.y} r="2.6" fill="hsl(var(--primary))" />
            <rect
              x={marker.x + 2}
              y={marker.y - 8}
              width="20"
              height="8"
              rx="2"
              className="fill-primary"
            />
            <text
              x={marker.x + 12}
              y={marker.y - 3}
              textAnchor="middle"
              className="fill-primary-foreground text-[3px] font-semibold"
            >
              {label}
            </text>
            <text x="5" y="8" className="fill-muted-foreground text-[3px]">
              Competitive Advantage
            </text>
          <text x="50" y="96" textAnchor="middle" className="fill-muted-foreground text-[3px]">
            Data + AI Maturity
          </text>
        </svg>
      </div>
      <div className="mt-5 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 sm:gap-x-4">
        {stages.map((stage, index) => (
          <div key={stage.label} className={cn("leading-snug", index === stages.length - 1 && "pt-1")}>
            <span className="font-medium text-foreground">{index + 1}.</span> {stage.label}
          <div key={stage} className={cn("leading-snug", index === stages.length - 1 && "pt-1")}>
            <span className="font-medium text-foreground">{index + 1}.</span> {stage}
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-4 text-xs text-muted-foreground">{note}</p>
      )}
    </div>
  );
}
