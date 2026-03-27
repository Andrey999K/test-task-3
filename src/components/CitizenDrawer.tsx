"use client";

import React, { useState } from "react";
import { Button, Drawer, DrawerProps, Form, Space, Tag } from "antd";
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { ProfileHeader } from "@/components/ProfileHeader";
import { PersonalInfoSection } from "@/components/PersonalInfoSection";
import { ContactInfoSection } from "@/components/ContactInfoSection";
import { AdditionalSection } from "@/components/AdditionalSection";
import { DocumentsSection } from "@/components/DocumentsSection";
import { FamilySection } from "@/components/FamilySection";
import { EducationSection } from "@/components/EducationSection";
import { WorkSection } from "@/components/WorkSection";
import { PropertySection } from "@/components/PropertySection";

type CitizenDrawerProps = DrawerProps & {
  citizen: Citizen | null;
  onClose: () => void;
  onSave?: (citizen: Citizen) => void;
};

export const CitizenDrawer = ({ citizen, onClose, onSave, ...drawerProps }: CitizenDrawerProps) => {
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
          <AdditionalSection citizen={displayCitizen} isEditing={isEditing} />
          <DocumentsSection citizen={displayCitizen} />
          <FamilySection citizen={displayCitizen} />
          <EducationSection citizen={displayCitizen} />
          <WorkSection citizen={displayCitizen} />
          <PropertySection citizen={displayCitizen} />
        </Space>
      </Form>
    </Drawer>
  );
};
