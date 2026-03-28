"use client";

import { Card, Space, Tag, Typography } from "antd";
import { BankOutlined } from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { WorkCard } from "../cards/WorkCard";

const { Text } = Typography;

type WorkSectionProps = {
  citizen: Citizen;
};

export const WorkSection = ({ citizen }: WorkSectionProps) => {
  return (
    <Card
      size="small"
      title={
        <Space>
          <BankOutlined />
          <span>Трудовая деятельность</span>
        </Space>
      }
      extra={<Tag>{citizen.workHistory?.length || 0}</Tag>}
    >
      {citizen.workHistory && citizen.workHistory.length > 0 ? (
        citizen.workHistory.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))
      ) : (
        <Text type="secondary">Трудовая деятельность не указана</Text>
      )}
    </Card>
  );
};
