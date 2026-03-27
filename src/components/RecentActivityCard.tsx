"use client";

import { Card, Avatar } from "antd";
import { UserOutlined, FileTextOutlined, CalendarOutlined } from "@ant-design/icons";

type ActivityItem = {
  id: number;
  type: "user" | "document" | "calendar";
  title: string;
  time: string;
};

const recentActivity: ActivityItem[] = [
  { id: 1, type: "user", title: "Добавлен новый гражданин", time: "5 минут назад" },
  { id: 2, type: "document", title: "Обновлён паспорт", time: "12 минут назад" },
  { id: 3, type: "user", title: "Гражданин переведён в архив", time: "1 час назад" },
  { id: 4, type: "calendar", title: "Назначена встреча", time: "2 часа назад" },
  { id: 5, type: "user", title: "Обновлены данные семьи", time: "3 часа назад" },
];

const getIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "user":
      return <UserOutlined />;
    case "document":
      return <FileTextOutlined />;
    case "calendar":
      return <CalendarOutlined />;
    default:
      return <UserOutlined />;
  }
};

const getBgColor = (type: ActivityItem["type"]) => {
  switch (type) {
    case "user":
      return "#1890ff";
    case "document":
      return "#722ed1";
    case "calendar":
      return "#faad14";
    default:
      return "#1890ff";
  }
};

const RecentActivityCard = () => {
  return (
    <Card title="Последние действия">
      <div className="space-y-3">
        {recentActivity.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
          >
            <Avatar icon={getIcon(item.type)} style={{ backgroundColor: getBgColor(item.type) }} />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{item.title}</div>
              <div className="text-xs text-gray-500">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export { RecentActivityCard };