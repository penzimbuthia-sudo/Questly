import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";

export default function AreaChartCard({ title, data = [], xKey, series = [], height = 220 }) {
  return (
    <Card className="p-5">
      {title && <SectionHeader title={title} />}

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          {/* Faint horizontal grid lines behind the chart */}
          <CartesianGrid stroke="var(--color-fg)" strokeOpacity={0.08} vertical={false} />

          {/* The x-axis (e.g. week labels along the bottom) */}
          <XAxis
            dataKey={xKey}
            tick={{ fill: "var(--color-fg)", fillOpacity: 0.4, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />

          {/* The y-axis (the numbers on the left) */}
          <YAxis
            tick={{ fill: "var(--color-fg)", fillOpacity: 0.4, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />

          {/* The little box that pops up when you hover a point */}
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-line)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--color-fg)" }}
          />

          {/* One <Area> per line we were asked to draw */}
          {series.map((line) => (
            <Area
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              fill={line.color}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}