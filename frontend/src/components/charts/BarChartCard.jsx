import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";

export default function BarChartCard({
  title,
  data = [],
  nameKey = "name",
  valueKey = "value",
  color = "#8B5CF6",
  height = 220,
}) {
  return (
    <Card className="p-5">
      {title && <SectionHeader title={title} />}

      <ResponsiveContainer width="100%" height={height}>
        {/* layout="vertical" is recharts' way of saying "bars go
            sideways" — it swaps what the x-axis and y-axis mean */}
        <BarChart data={data} layout="vertical" margin={{ left: 8 }}>
          <CartesianGrid stroke="var(--color-fg)" strokeOpacity={0.08} horizontal={false} />

          <XAxis
            type="number"
            tick={{ fill: "var(--color-fg)", fillOpacity: 0.4, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            type="category"
            dataKey={nameKey}
            width={160}
            tick={{ fill: "var(--color-fg)", fillOpacity: 0.4, fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            // Long names get cut short with "…" so they don't
            // crowd out the bars.
            tickFormatter={(name) => (name.length > 22 ? name.slice(0, 22) + "…" : name)}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-line)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--color-fg)" }}
          />

          <Bar dataKey={valueKey} fill={color} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}