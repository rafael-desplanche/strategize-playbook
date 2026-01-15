import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadar, ResponsiveContainer } from "recharts";
import { DomainScore } from "@/lib/scoring";

interface RadarChartProps {
  domainScores: DomainScore[];
}

export function RadarChart({ domainScores }: RadarChartProps) {
  const data = domainScores.map((domain) => ({
    domain: domain.domainName.split(" ")[0], // First word only for readability
    score: domain.percentage,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[300px] sm:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.3}
          />
          <PolarAngleAxis 
            dataKey="domain" 
            tick={{ 
              fill: "hsl(var(--muted-foreground))", 
              fontSize: 11,
              fontWeight: 500
            }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="Votre score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
