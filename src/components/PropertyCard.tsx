'use client';

import { Avatar, Card, Space, Tag, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import type { Property } from "@/types/citizen";

const { Text } = Typography;

type PropertyCardProps = {
  prop: Property;
};

const statusColors: Record<string, string> = {
  'Собственность': 'green',
  'Аренда': 'blue',
  'Социальный найм': 'orange',
  'Долевое участие': 'purple',
};

export const PropertyCard = ({ prop }: PropertyCardProps) => (
  <Card size="small" className="mb-2">
    <Space align="start" className="w-full justify-between">
      <Space>
        <Avatar icon={<HomeOutlined />} className="bg-cyan-500" />
        <div>
          <Text strong>{prop.type}</Text>
          <div className="text-xs text-gray-500">
            {prop.address}
          </div>
          {prop.area && (
            <div className="text-xs text-gray-500">
              Площадь: {prop.area} м²
              {prop.share && prop.share < 1 && ` • Доля: ${(prop.share * 100).toFixed(0)}%`}
            </div>
          )}
          {prop.estimatedValue && (
            <div className="text-xs text-gray-500">
              Стоимость: {prop.estimatedValue.toLocaleString('ru-RU')} ₽
            </div>
          )}
        </div>
      </Space>
      <Tag color={statusColors[prop.status] || 'default'}>{prop.status}</Tag>
    </Space>
  </Card>
);
