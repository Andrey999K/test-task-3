'use client';

import { Avatar, Card, Space, Tag } from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { STATUS_CONFIG, GENDER_CONFIG } from "@/config/citizen-config";
import { formatDate } from "@/utils/format-date";

type ProfileHeaderProps = {
  citizen: Citizen;
};

const getAge = (birthDate: string): number => {
  const now = new Date();
  const birth = new Date(birthDate);
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const ProfileHeader = ({ citizen }: ProfileHeaderProps) => {
  const status = STATUS_CONFIG[citizen.status];
  const age = getAge(citizen.birthDate);

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <Space size="large" className="w-full">
        <Avatar 
          size={80} 
          icon={citizen.gender === 'male' ? <ManOutlined /> : <WomanOutlined />}
          style={{ 
            backgroundColor: citizen.gender === 'male' ? '#1890ff' : '#eb2f96',
            fontSize: '32px'
          }}
        />
        <div>
          <div className="text-xl font-semibold">
            {citizen.surname} {citizen.name} {citizen.patronymic}
          </div>
          <div className="text-gray-500">
            {GENDER_CONFIG[citizen.gender]} • {formatDate(citizen.birthDate)} ({age} лет)
          </div>
          <Space className="mt-2">
            <Tag color={status.color} className="text-sm">{status.label}</Tag>
            {citizen.citizenship && <Tag>{citizen.citizenship}</Tag>}
            {citizen.nationality && <Tag>{citizen.nationality}</Tag>}
            {citizen.bloodType && <Tag color="red">{citizen.bloodType}</Tag>}
          </Space>
        </div>
      </Space>
    </Card>
  );
};
