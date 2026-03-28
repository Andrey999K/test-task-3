"use client";

import { Card, Space, Tag, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { PropertyCard } from "../cards/PropertyCard";

const { Text } = Typography;

type PropertySectionProps = {
  citizen: Citizen;
};

export const PropertySection = ({ citizen }: PropertySectionProps) => {
  return (
    <Card
      size="small"
      title={
        <Space>
          <HomeOutlined />
          <span>Имущество</span>
        </Space>
      }
      extra={<Tag>{citizen.property?.length || 0}</Tag>}
    >
      {citizen.property && citizen.property.length > 0 ? (
        citizen.property.map((prop) => (
          <PropertyCard key={prop.id} prop={prop} />
        ))
      ) : (
        <Text type="secondary">Имущество не указано</Text>
      )}
    </Card>
  );
};