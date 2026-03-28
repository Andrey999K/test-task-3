"use client";

import { Card } from "antd";
import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import { StatusDataType } from "@/types/dashboard";

type StatusChartCardProps = {
  data: StatusDataType[];
};

const renderSlice = (props: PieSectorDataItem & { color?: string }) => (
  <Sector {...props} fill={props.color} />
);

export const StatusChartCard = ({ data }: StatusChartCardProps) => (
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
          shape={renderSlice}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex justify-center gap-4 mt-2">
      {data.map((item) => (
        <div key={item.name} className="flex items-center gap-1 text-sm">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
          <span>{item.name}: {item.value}</span>
        </div>
      ))}
    </div>
  </Card>
);