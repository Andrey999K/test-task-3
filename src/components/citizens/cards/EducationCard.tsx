'use client';

import { Avatar, Card, Space, Tag, Typography } from "antd";
import { BookOutlined } from "@ant-design/icons";
import type { Education } from "@/types/citizen";

const { Text } = Typography;

type EducationCardProps = {
  edu: Education;
};

export const EducationCard = ({ edu }: EducationCardProps) => (
  <Card size="small" className="mb-2">
    <Space align="start" className="w-full justify-between">
      <Space>
        <Avatar icon={<BookOutlined />} className="bg-purple-500" />
        <div>
          <Text strong>{edu.institution}</Text>
          <div className="text-xs text-gray-500">
            {edu.faculty} факультет
          </div>
          <div className="text-xs text-gray-500">
            {edu.specialization} • {edu.startYear}–{edu.endYear || 'н.в.'}
          </div>
        </div>
      </Space>
      <Tag color="purple">{edu.level}</Tag>
    </Space>
  </Card>
);
