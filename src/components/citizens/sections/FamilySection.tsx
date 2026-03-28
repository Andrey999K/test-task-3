"use client";

import { Card, Space, Tag, Typography } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { FamilyCard } from "../cards/FamilyCard";

const { Text } = Typography;

type FamilySectionProps = {
  citizen: Citizen;
};

export const FamilySection = ({ citizen }: FamilySectionProps) => {
  return (
    <Card
      size="small"
      title={
        <Space>
          <HeartOutlined />
          <span>Члены семьи</span>
        </Space>
      }
      extra={<Tag>{citizen.family?.length || 0}</Tag>}
    >
      {citizen.family && citizen.family.length > 0 ? (
        citizen.family.map((member) => (
          <FamilyCard key={member.id} member={member} />
        ))
      ) : (
        <Text type="secondary">Члены семьи не указаны</Text>
      )}
    </Card>
  );
};