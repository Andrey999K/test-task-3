'use client';

import React, { useState } from "react";
import type { DrawerProps } from "antd";
import { Avatar, Button, Card, Descriptions, Drawer, Form, Input, Select, Space, Tag, Typography } from "antd";
import {
  BankOutlined,
  BookOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  HeartOutlined,
  HomeOutlined,
  ManOutlined,
  SaveOutlined,
  UserOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { formatPhone } from "@/utils/format-phone";
import {
  STATUS_CONFIG,
  GENDER_CONFIG,
  MARITAL_STATUS_CONFIG,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  CITIZENSHIP_OPTIONS,
  NATIONALITY_OPTIONS,
  BLOOD_TYPE_OPTIONS,
} from "@/config/citizen-config";
import { DocumentCard } from "@/components/UI/DocumentCard";
import { FamilyCard } from "@/components/UI/FamilyCard";
import { EducationCard } from "@/components/UI/EducationCard";
import { WorkCard } from "@/components/UI/WorkCard";
import { PropertyCard } from "@/components/UI/PropertyCard";

const { Text } = Typography;
const { TextArea } = Input;

interface CitizenDrawerProps extends Omit<DrawerProps, 'children'> {
  citizen: Citizen | null;
  onClose: () => void;
  onSave?: (citizen: Citizen) => void;
}

export default function CitizenDrawer({ citizen, onClose, onSave, ...drawerProps }: CitizenDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editedCitizen, setEditedCitizen] = useState<Citizen | null>(null);

  if (!citizen) {
    return null;
  }

  const status = STATUS_CONFIG[citizen.status];
  const displayCitizen = isEditing && editedCitizen ? editedCitizen : citizen;

  const handleEdit = () => {
    setEditedCitizen({ ...citizen });
    form.setFieldsValue({
      ...citizen,
      birthDate: citizen.birthDate,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCitizen(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedCitizen = { ...citizen, ...values };
      onSave?.(updatedCitizen);
      setIsEditing(false);
      setEditedCitizen(null);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Drawer
      title={
        <Space>
          <UserOutlined />
          <span>{displayCitizen.surname} {displayCitizen.name} {displayCitizen.patronymic}</span>
          {isEditing && <Tag color="blue">Редактирование</Tag>}
        </Space>
      }
      size="large"
      onClose={onClose}
      extra={
        isEditing ? (
          <Space>
            <Button icon={<CloseOutlined />} onClick={handleCancel}>Отмена</Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>Сохранить</Button>
          </Space>
        ) : (
          <Space>
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>Редактировать</Button>
            <Button danger icon={<DeleteOutlined />}>Удалить</Button>
          </Space>
        )
      }
      {...drawerProps}
    >
      <Form form={form} layout="vertical">
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
                {GENDER_CONFIG[citizen.gender]} • {formatDate(citizen.birthDate)} 
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
          <Descriptions.Item label="Фамилия">
            {isEditing ? (
              <Form.Item name="surname" noStyle>
                <Input />
              </Form.Item>
            ) : displayCitizen.surname}
          </Descriptions.Item>
          <Descriptions.Item label="Имя">
            {isEditing ? (
              <Form.Item name="name" noStyle>
                <Input />
              </Form.Item>
            ) : displayCitizen.name}
          </Descriptions.Item>
          <Descriptions.Item label="Отчество">
            {isEditing ? (
              <Form.Item name="patronymic" noStyle>
                <Input />
              </Form.Item>
            ) : displayCitizen.patronymic}
          </Descriptions.Item>
          <Descriptions.Item label="Дата рождения">
            {isEditing ? (
              <Form.Item name="birthDate" noStyle>
                <Input type="date" />
              </Form.Item>
            ) : formatDate(displayCitizen.birthDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Место рождения" span={2}>
            {isEditing ? (
              <Form.Item name="birthPlace" noStyle>
                <Input />
              </Form.Item>
            ) : displayCitizen.birthPlace || '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Пол" span={2}>
            {isEditing ? (
              <Form.Item name="gender" noStyle>
                <Select options={GENDER_OPTIONS} style={{ width: 150 }} />
              </Form.Item>
            ) : GENDER_CONFIG[displayCitizen.gender]}
          </Descriptions.Item>
          <Descriptions.Item label="Семейное положение" span={2}>
            {isEditing ? (
              <Form.Item name="maritalStatus" noStyle>
                <Select options={MARITAL_STATUS_OPTIONS} style={{ width: 200 }} />
              </Form.Item>
            ) : displayCitizen.maritalStatus ? MARITAL_STATUS_CONFIG[displayCitizen.maritalStatus] : '—'}
          </Descriptions.Item>
        </Descriptions>

        {/* Контактные данные */}
        <Descriptions title="Контактные данные" bordered column={2} size="small">
          <Descriptions.Item label="Телефон">
            {isEditing ? (
              <Form.Item name="phone" noStyle>
                <Input />
              </Form.Item>
            ) : displayCitizen.phone ? (
              <a href={`tel:${displayCitizen.phone.replace(/\D/g, '')}`}>
                {formatPhone(displayCitizen.phone)}
              </a>
            ) : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {isEditing ? (
              <Form.Item name="email" noStyle>
                <Input />
              </Form.Item>
            ) : displayCitizen.email ? (
              <a href={`mailto:${displayCitizen.email}`}>{displayCitizen.email}</a>
            ) : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Адрес регистрации" span={2}>
            {isEditing ? (
              <Form.Item name="address" noStyle>
                <Input />
              </Form.Item>
            ) : displayCitizen.address || '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Фактический адрес" span={2}>
            {isEditing ? (
              <Form.Item name="registrationAddress" noStyle>
                <Input />
              </Form.Item>
            ) : displayCitizen.registrationAddress !== displayCitizen.address ? displayCitizen.registrationAddress : '—'}
          </Descriptions.Item>
        </Descriptions>

        {/* Дополнительные сведения */}
        {isEditing ? (
          <Descriptions title="Дополнительные сведения" bordered column={2} size="small">
            <Descriptions.Item label="Гражданство">
              <Form.Item name="citizenship" noStyle>
                <Select options={CITIZENSHIP_OPTIONS} style={{ width: 150 }} allowClear />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Национальность">
              <Form.Item name="nationality" noStyle>
                <Select options={NATIONALITY_OPTIONS} style={{ width: 150 }} allowClear />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Группа крови">
              <Form.Item name="bloodType" noStyle>
                <Select options={BLOOD_TYPE_OPTIONS} style={{ width: 100 }} allowClear />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Статус">
              <Form.Item name="status" noStyle>
                <Select 
                  options={[
                    { value: 'active', label: 'Активен' },
                    { value: 'pending', label: 'На проверке' },
                    { value: 'archived', label: 'Архив' },
                  ]} 
                  style={{ width: 150 }} 
                />
              </Form.Item>
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Descriptions title="Дополнительные сведения" bordered column={2} size="small">
            <Descriptions.Item label="Гражданство">
              {displayCitizen.citizenship || '—'}
            </Descriptions.Item>
            <Descriptions.Item label="Национальность">
              {displayCitizen.nationality || '—'}
            </Descriptions.Item>
            <Descriptions.Item label="Группа крови">
              {displayCitizen.bloodType || '—'}
            </Descriptions.Item>
            <Descriptions.Item label="Статус">
              <Tag color={STATUS_CONFIG[displayCitizen.status].color}>
                {STATUS_CONFIG[displayCitizen.status].label}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}

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
                {isEditing ? (
                  <Form.Item name="notes" noStyle>
                    <TextArea rows={2} />
                  </Form.Item>
                ) : citizen.notes}
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Space>
      </Form>
    </Drawer>
  );
}
