"use client";

import { Card } from "antd";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getAgeGroup } from "@/utils/age";
import { citizensData } from "@/lib/mock-data";

type AgeData = { group: string; count: number };

const getAgeStats = (): AgeData[] => {
  const groups = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"] as const;
  return groups.map((group) => ({
    group,
    count: citizensData.filter((c) => getAgeGroup(c.birthDate) === group).length,
  }));
};

const ageData = getAgeStats();

export const AgeChartCard = () => {
  return (
    <Card title="Распределение по возрасту">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={ageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="group" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(value) => [`Всего: ${value}`]}
          />
          <Bar dataKey="count" fill="#722ed1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};