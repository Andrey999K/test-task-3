'use client';

import { Avatar, Card, Space, Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import type { Document } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";

const { Text } = Typography;

interface DocumentCardProps {
  doc: Document;
}

export const DocumentCard = ({ doc }: DocumentCardProps) => (
  <Card size="small" className="mb-2">
    <Space align="start" className="w-full justify-between">
      <Space>
        <Avatar icon={<FileTextOutlined />} className="bg-blue-500" />
        <div>
          <Text strong>{doc.type}</Text>
          <div className="text-xs text-gray-500">
            Серия {doc.series} №{doc.number}
          </div>
          <div className="text-xs text-gray-500">
            Выдан: {doc.issuer} {doc.issueDate && formatDate(doc.issueDate)}
          </div>
        </div>
      </Space>
    </Space>
  </Card>
);
