'use client';

import React from 'react';
import { Drawer, Descriptions, Tag, Space, Typography } from 'antd';
import type { DrawerProps } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import type { Citizen, MaritalStatus } from '@/types/citizen';
import { formatDate } from '@/utils/format-date';
import { formatPhone } from '@/utils/format-phone';

const { Text } = Typography;

interface CitizenDrawerProps extends Omit<DrawerProps, 'children'> {
  citizen: Citizen | null;
  onClose: () => void;
}

// Конфигурация статусов
const statusConfig: Record<Citizen['status'], { color: string; label: string }> = {
  active: { color: 'green', label: 'Активен' },
  pending: { color: 'orange', label: 'На проверке' },
  archived: { color: 'gray', label: 'Архив' },
};

// Конфигурация семейного положения
const maritalStatusConfig: Record<MaritalStatus, string> = {
  single: 'Не женат/не замужем',
  married: 'Женат/замужем',
  divorced: 'Разведён(а)',
  widowed: 'Вдовец/вдова',
};

// Конфигурация пола
const genderConfig: Record<'male' | 'female', string> = {
  male: 'Мужской',
  female: 'Женский',
};

export default function CitizenDrawer({ citizen, onClose, ...drawerProps }: CitizenDrawerProps) {
  if (!citizen) {
    return null;
  }

  const status = statusConfig[citizen.status];

  return (
    <Drawer
      title={
        <Space>
          <UserOutlined />
          <span>{citizen.surname} {citizen.name} {citizen.patronymic}</span>
        </Space>
      }
      placement="right"
      width={720}
      onClose={onClose}
      {...drawerProps}
    >
      <Space direction="vertical" size="large" className="w-full">
        {/* Основной статус */}
        <div className="flex items-center gap-2">
          <Tag color={status.color} className="text-sm">{status.label}</Tag>
        </div>

        {/* Личные данные */}
        <Descriptions
          title="Личные данные"
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="ФИО">
            {citizen.surname} {citizen.name} {citizen.patronymic}
          </Descriptions.Item>
          <Descriptions.Item label="Дата рождения">
            {formatDate(citizen.birthDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Пол">
            {genderConfig[citizen.gender]}
          </Descriptions.Item>
          <Descriptions.Item label="Семейное положение">
            {citizen.maritalStatus ? maritalStatusConfig[citizen.maritalStatus] : '—'}
          </Descriptions.Item>
        </Descriptions>

        {/* Контактные данные */}
        <Descriptions
          title="Контактные данные"
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Телефон">
            {citizen.phone ? (
              <Space>
                <PhoneOutlined />
                <a href={`tel:${citizen.phone.replace(/\D/g, '')}`}>
                  {formatPhone(citizen.phone)}
                </a>
              </Space>
            ) : (
              <Text type="secondary">—</Text>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {citizen.email ? (
              <Space>
                <MailOutlined />
                <a href={`mailto:${citizen.email}`}>{citizen.email}</a>
              </Space>
            ) : (
              <Text type="secondary">—</Text>
            )}
          </Descriptions.Item>
        </Descriptions>

        {/* Адрес */}
        <Descriptions
          title="Адрес"
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Адрес регистрации">
            <Space>
              <HomeOutlined />
              {citizen.address || '—'}
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Drawer>
  );
}
