import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";

export default function PieChartCard({ title, data = [], centerLabel, height = 180 }) {
  // Add up every slice's value so we can show it in the middle.
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <Card className="p-5">
      {title && <SectionHeader title={title} />}

      {/* The donut itself, with the total number placed on top of it */}
      <div className="relative" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={3}
              stroke="none"
            >
              {data.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* This sits on top of the donut, centered, using absolute
            positioning — that's why the wrapper div above has
            "relative" on it. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-lg font-bold text-fg">{total.toLocaleString()}</span>
          {centerLabel && <span className="text-[11px] text-fg/40">{centerLabel}</span>}
        </div>
      </div>

      {/* Legend: one row per slice, showing its color dot, name, and value */}
      <div className="flex flex-col gap-2 mt-4">
        {data.map((slice) => (
          <div key={slice.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-fg/70">{slice.name}</span>
            </div>
            <span className="text-fg/40">{slice.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}