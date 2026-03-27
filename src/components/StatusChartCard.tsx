"use client";

import { Card } from "antd";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

type ChartData = { name: string; value: number; color: string };

type StatusChartCardProps = {
  data: ChartData[];
};

const StatusChartCard = ({ data }: StatusChartCardProps) => {
  return (
    <Card title="Распределение по статусам">
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span>
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export { StatusChartCard };
export type { StatusChartCardProps, ChartData };