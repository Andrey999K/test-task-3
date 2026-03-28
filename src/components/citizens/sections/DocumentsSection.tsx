"use client";

import { Card, Descriptions, Space, Tag, Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { DocumentCard } from "../cards/DocumentCard";

const { Text } = Typography;

type DocumentsSectionProps = {
  citizen: Citizen;
};

export const DocumentsSection = ({ citizen }: DocumentsSectionProps) => {
  return (
    <Card
      size="small"
      title={
        <Space>
          <FileTextOutlined />
          <span>Документы</span>
        </Space>
      }
      extra={<Tag>{citizen.documents?.length || 0}</Tag>}
    >
      {citizen.documents && citizen.documents.length > 0 ? (
        citizen.documents.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))
      ) : (
        <Text type="secondary">Документы не указаны</Text>
      )}
      <Descriptions column={2} size="small" className="mt-2">
        <Descriptions.Item label="Паспорт">
          {citizen.passportSeries && citizen.passportNumber
            ? `${citizen.passportSeries} ${citizen.passportNumber}`
            : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Код подразделения">
          {citizen.passportCode || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="ИНН">
          {citizen.inn || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="СНИЛС">
          {citizen.snils || "—"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};