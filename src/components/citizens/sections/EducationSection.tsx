"use client";

import { Card, Space, Tag, Typography } from "antd";
import { BookOutlined } from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { EducationCard } from "./EducationCard";

const { Text } = Typography;

type EducationSectionProps = {
  citizen: Citizen;
};

export const EducationSection = ({ citizen }: EducationSectionProps) => {
  return (
    <Card
      size="small"
      title={
        <Space>
          <BookOutlined />
          <span>Образование</span>
        </Space>
      }
      extra={<Tag>{citizen.education?.length || 0}</Tag>}
    >
      {citizen.education && citizen.education.length > 0 ? (
        citizen.education.map((edu) => (
          <EducationCard key={edu.id} edu={edu} />
        ))
      ) : (
        <Text type="secondary">Образование не указано</Text>
      )}
    </Card>
  );
};