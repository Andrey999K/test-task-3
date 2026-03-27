"use client";

import React, { useState } from "react";
import type { DrawerProps } from "antd";
import { Button, Card, Descriptions, Drawer, Form, Input, Space, Tag, Typography } from "antd";
import {
  BankOutlined,
  BookOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  HeartOutlined,
  HomeOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { DocumentCard } from "@/components/UI/DocumentCard";
import { FamilyCard } from "@/components/UI/FamilyCard";
import { EducationCard } from "@/components/UI/EducationCard";
import { WorkCard } from "@/components/UI/WorkCard";
import { PropertyCard } from "@/components/UI/PropertyCard";
import { ProfileHeader } from "@/components/UI/ProfileHeader";
import { PersonalInfoSection } from "@/components/UI/PersonalInfoSection";
import { ContactInfoSection } from "@/components/UI/ContactInfoSection";
import { AdditionalInfoSection } from "@/components/UI/AdditionalInfoSection";

const { Text } = Typography;
const { TextArea } = Input;

interface CitizenDrawerProps extends Omit<DrawerProps, "children"> {
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
      console.error("Validation failed:", error);
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
          <ProfileHeader citizen={displayCitizen} />
          <PersonalInfoSection citizen={displayCitizen} isEditing={isEditing} />
          <ContactInfoSection citizen={displayCitizen} isEditing={isEditing} />
          <AdditionalInfoSection citizen={displayCitizen} isEditing={isEditing} />

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
