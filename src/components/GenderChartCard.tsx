"use client";

import { Card } from "antd";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

type GenderData = { name: string; value: number };

type GenderChartCardProps = {
  data: GenderData[];
};

const GenderChartCard = ({ data }: GenderChartCardProps) => {
  const colors = ["#1890ff", "#eb2f96"];

  return (
    <Card title="Распределение по полу">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        <div className="flex items-center gap-1 text-sm">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span>Мужской: {data[0]?.value ?? 0}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="w-3 h-3 rounded-full bg-pink-500" />
          <span>Женский: {data[1]?.value ?? 0}</span>
        </div>
      </div>
    </Card>
  );
};

export { GenderChartCard };
export type { GenderChartCardProps, GenderData };