'use client';

import { Avatar, Card, Space, Typography } from "antd";
import { LaptopOutlined, PhoneOutlined } from "@ant-design/icons";
import type { Work } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { formatPhone } from "@/utils/format-phone";

const { Text } = Typography;

type WorkCardProps = {
  work: Work;
};

export const WorkCard = ({ work }: WorkCardProps) => (
  <Card size="small" className="mb-2">
    <Space align="start" className="w-full justify-between">
      <Space>
        <Avatar icon={<LaptopOutlined />} className="bg-orange-500" />
        <div>
          <Text strong>{work.organization}</Text>
          <div className="text-xs text-gray-500">
            {work.position}
          </div>
          <div className="text-xs text-gray-500">
            {work.department && `${work.department} • `}{formatDate(work.startDate)} – {work.endDate ? formatDate(work.endDate) : 'н.в.'}
          </div>
        </div>
      </Space>
      {work.phone && (
        <Text type="secondary" className="text-xs">
          <PhoneOutlined /> {formatPhone(work.phone)}
        </Text>
      )}
    </Space>
  </Card>
);
