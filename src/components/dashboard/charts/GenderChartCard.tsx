"use client";

import { Card } from "antd";
import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import { GenderDataType } from "@/types/dashboard";

type GenderChartCardProps = {
  data: GenderDataType[];
};

const GENDER_COLORS = ["#1890ff", "#eb2f96"];

const renderSlice = (props: PieSectorDataItem & { index?: number }) => (
  <Sector {...props} fill={GENDER_COLORS[props.index ?? 0]} />
);

export const GenderChartCard = ({ data }: GenderChartCardProps) => (
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
          shape={renderSlice}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex justify-center gap-4 mt-2">
      {data.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: GENDER_COLORS[index] }}
          />
          <span>{item.name}: {item.value}</span>
        </div>
      ))}
    </div>
  </Card>
);