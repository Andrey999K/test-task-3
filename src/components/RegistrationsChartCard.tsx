"use client";

import { Card } from "antd";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const dynamicData = [
  { month: "Янв", registered: 25, archived: 5 },
  { month: "Фев", registered: 32, archived: 8 },
  { month: "Мар", registered: 28, archived: 3 },
  { month: "Апр", registered: 35, archived: 6 },
  { month: "Май", registered: 30, archived: 4 },
  { month: "Июн", registered: 22, archived: 7 },
  { month: "Июл", registered: 18, archived: 2 },
  { month: "Авг", registered: 26, archived: 5 },
  { month: "Сен", registered: 33, archived: 9 },
  { month: "Окт", registered: 29, archived: 6 },
  { month: "Ноя", registered: 31, archived: 4 },
  { month: "Дек", registered: 27, archived: 8 },
];

export const RegistrationsChartCard = () => {
  return (
    <Card title="Динамика регистраций">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dynamicData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Legend />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="registered"
            stroke="#52c41a"
            strokeWidth={2}
            name="Зарегистрировано"
            dot={{ fill: "#52c41a" }}
          />
          <Line
            type="monotone"
            dataKey="archived"
            stroke="#8c8c8c"
            strokeWidth={2}
            name="Архивировано"
            dot={{ fill: "#8c8c8c" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};