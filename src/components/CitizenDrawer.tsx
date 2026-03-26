'use client';

import React from "react";
import type { DrawerProps } from "antd";
import { Avatar, Button, Card, Descriptions, Drawer, Space, Tag, Typography } from "antd";
import {
  BankOutlined,
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  HeartOutlined,
  HomeOutlined,
  LaptopOutlined,
  ManOutlined,
  PhoneOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import type { Citizen, Document, Education, FamilyMember, MaritalStatus, Property, Work } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { formatPhone } from "@/utils/format-phone";

const { Text } = Typography;

interface CitizenDrawerProps extends Omit<DrawerProps, 'children'> {
  citizen: Citizen | null;
  onClose: () => void;
}

const statusConfig: Record<Citizen['status'], { color: string; label: string }> = {
  active: { color: 'green', label: 'Активен' },
  pending: { color: 'orange', label: 'На проверке' },
  archived: { color: 'gray', label: 'Архив' },
};

const maritalStatusConfig: Record<MaritalStatus, string> = {
  single: 'Не женат/не замужем',
  married: 'Женат/замужем',
  divorced: 'Разведён(а)',
  widowed: 'Вдовец/вдова',
};

const genderConfig: Record<'male' | 'female', string> = {
  male: 'Мужской',
  female: 'Женский',
};

const relationConfig: Record<string, string> = {
  'Супруг(а)': 'blue',
  'Ребёнок': 'green',
  'Родитель': 'orange',
  'Брат/Сестра': 'purple',
  'Другой родственник': 'default',
};

function FamilyCard({ member }: { member: FamilyMember }) {
  return (
    <Card size="small" className="mb-2">
      <Space align="start" className="w-full justify-between">
        <Space>
          <Avatar 
            icon={member.relation === 'Супруг(а)' ? (member.surname ? '' : '') : <UserOutlined />}
            style={{ 
              backgroundColor: relationConfig[member.relation] === 'blue' ? '#1890ff' : 
                              relationConfig[member.relation] === 'green' ? '#52c41a' : '#faad14'
            }}
          />
          <div>
            <Text strong>{member.surname} {member.name} {member.patronymic}</Text>
            <div className="text-xs text-gray-500">
              {member.birthDate && formatDate(member.birthDate)}
              {member.phone && <span> • {formatPhone(member.phone)}</span>}
            </div>
          </div>
        </Space>
        <Tag color={relationConfig[member.relation] || 'default'}>{member.relation}</Tag>
      </Space>
    </Card>
  );
}

function DocumentCard({ doc }: { doc: Document }) {
  return (
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
}

function EducationCard({ edu }: { edu: Education }) {
  return (
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
}

function WorkCard({ work }: { work: Work }) {
  return (
    <Card size="small" className="mb-2">
      <Space align="start" className="w-full justify-between">
        <Space>
          <Avatar icon={<LaptopOutlined />} className="bg-orange-500" />
          <div>
            <Text strong>{work.organization}</Text>
            <div className="text-xs text-gray-500">
              {work.position}
            </div>
            <div className="text-xs text-gray-500">
              {work.department && `${work.department} • `}{formatDate(work.startDate)} – {work.endDate ? formatDate(work.endDate) : 'н.в.'}
            </div>
          </div>
        </Space>
        {work.phone && (
          <Text type="secondary" className="text-xs">
            <PhoneOutlined /> {formatPhone(work.phone)}
          </Text>
        )}
      </Space>
    </Card>
  );
}

function PropertyCard({ prop }: { prop: Property }) {
  const statusColors: Record<string, string> = {
    'Собственность': 'green',
    'Аренда': 'blue',
    'Социальный найм': 'orange',
    'Долевое участие': 'purple',
  };
  
  return (
    <Card size="small" className="mb-2">
      <Space align="start" className="w-full justify-between">
        <Space>
          <Avatar icon={<HomeOutlined />} className="bg-cyan-500" />
          <div>
            <Text strong>{prop.type}</Text>
            <div className="text-xs text-gray-500">
              {prop.address}
            </div>
            {prop.area && (
              <div className="text-xs text-gray-500">
                Площадь: {prop.area} м²
                {prop.share && prop.share < 1 && ` • Доля: ${(prop.share * 100).toFixed(0)}%`}
              </div>
            )}
            {prop.estimatedValue && (
              <div className="text-xs text-gray-500">
                Стоимость: {prop.estimatedValue.toLocaleString('ru-RU')} ₽
              </div>
            )}
          </div>
        </Space>
        <Tag color={statusColors[prop.status] || 'default'}>{prop.status}</Tag>
      </Space>
    </Card>
  );
}

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
      size="large"
      onClose={onClose}
      extra={
        <Space>
          <Button type="primary" icon={<EditOutlined />}>Редактировать</Button>
          <Button icon={<DeleteOutlined />}>Удалить</Button>
        </Space>
      }
      {...drawerProps}
    >
      <Space orientation="vertical" size="middle" className="w-full">
        {/* Профиль */}
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
                {genderConfig[citizen.gender]} • {formatDate(citizen.birthDate)} 
                {' '} ({Math.floor((new Date().getTime() - new Date(citizen.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} лет)
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

        {/* Личные данные */}
        <Descriptions title="Личные данные" bordered column={2} size="small">
          <Descriptions.Item label="Дата рождения" span={1}>
            {formatDate(citizen.birthDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Место рождения" span={1}>
            {citizen.birthPlace || '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Семейное положение" span={2}>
            {citizen.maritalStatus ? maritalStatusConfig[citizen.maritalStatus] : '—'}
          </Descriptions.Item>
        </Descriptions>

        {/* Контактные данные */}
        <Descriptions title="Контактные данные" bordered column={2} size="small">
          <Descriptions.Item label="Телефон" span={1}>
            {citizen.phone ? (
              <a href={`tel:${citizen.phone.replace(/\D/g, '')}`}>
                {formatPhone(citizen.phone)}
              </a>
            ) : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={1}>
            {citizen.email ? (
              <a href={`mailto:${citizen.email}`}>{citizen.email}</a>
            ) : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Адрес регистрации" span={2}>
            {citizen.address || '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Фактический адрес" span={2}>
            {citizen.registrationAddress !== citizen.address ? citizen.registrationAddress : '—'}
          </Descriptions.Item>
        </Descriptions>

        {/* Документы */}
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
                : '—'}
            </Descriptions.Item>
            <Descriptions.Item label="Код подразделения">
              {citizen.passportCode || '—'}
            </Descriptions.Item>
            <Descriptions.Item label="ИНН">
              {citizen.inn || '—'}
            </Descriptions.Item>
            <Descriptions.Item label="СНИЛС">
              {citizen.snils || '—'}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Семья */}
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

        {/* Образование */}
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

        {/* Работа */}
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

        {/* Имущество */}
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

        {/* Дополнительная информация */}
        {(citizen.notes || citizen.registrationDate || citizen.lastModifiedDate) && (
          <Descriptions title="Дополнительно" bordered column={1} size="small">
            {citizen.registrationDate && (
              <Descriptions.Item label="Дата регистрации">
                {formatDate(citizen.registrationDate)}
              </Descriptions.Item>
            )}
            {citizen.lastModifiedDate && (
              <Descriptions.Item label="Последнее изменение">
                {formatDate(citizen.lastModifiedDate)}
              </Descriptions.Item>
            )}
            {citizen.notes && (
              <Descriptions.Item label="Заметки">
                {citizen.notes}
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Space>
    </Drawer>
  );
}
