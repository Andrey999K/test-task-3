'use client';

import { Avatar, Card, Space, Tag, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { FamilyMember } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { formatPhone } from "@/utils/format-phone";
import { RELATION_CONFIG } from "@/config/citizen-config";

const { Text } = Typography;

interface FamilyCardProps {
  member: FamilyMember;
}

export const FamilyCard = ({ member }: FamilyCardProps) => {
  const bgColor = RELATION_CONFIG[member.relation] === 'blue' ? '#1890ff' : 
                  RELATION_CONFIG[member.relation] === 'green' ? '#52c41a' : '#faad14';

  return (
    <Card size="small" className="mb-2">
      <Space align="start" className="w-full justify-between">
        <Space>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: bgColor }} />
          <div>
            <Text strong>{member.surname} {member.name} {member.patronymic}</Text>
            <div className="text-xs text-gray-500">
              {member.birthDate && formatDate(member.birthDate)}
              {member.phone && <span> • {formatPhone(member.phone)}</span>}
            </div>
          </div>
        </Space>
        <Tag color={RELATION_CONFIG[member.relation] || 'default'}>{member.relation}</Tag>
      </Space>
    </Card>
  );
};
