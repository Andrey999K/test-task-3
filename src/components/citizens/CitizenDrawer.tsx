"use client";

import { Button, Drawer, Form, Space, Tag } from "antd";
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";

import type { Citizen } from "@/types/citizen";
import { useCitizenDrawer } from "@/hooks/useCitizenDrawer";
import { AdditionalSection } from "./sections/AdditionalSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";
import { DocumentsSection } from "./sections/DocumentsSection";
import { EducationSection } from "./sections/EducationSection";
import { FamilySection } from "./sections/FamilySection";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { ProfileHeader } from "./ProfileHeader";
import { PropertySection } from "./sections/PropertySection";
import { WorkSection } from "./sections/WorkSection";

type CitizenDrawerProps = {
  open: boolean;
  citizen: Citizen | null;
  onCloseAction: () => void;
  onSaveAction?: (citizen: Citizen) => void;
};

export const CitizenDrawer = ({ open, citizen, onCloseAction, onSaveAction }: CitizenDrawerProps) => {
  const { form, isEditing, handleEdit, handleCancel, handleSave } = useCitizenDrawer(
    citizen,
    onSaveAction,
  );

  return (
    <Drawer
      open={open}
      size="large"
      onClose={onCloseAction}
      title={
        citizen && (
          <Space>
            <UserOutlined />
            <span>
              {citizen.surname} {citizen.name} {citizen.patronymic}
            </span>
            {isEditing && <Tag color="blue">Редактирование</Tag>}
          </Space>
        )
      }
      extra={
        isEditing ? (
          <Space className="ml-4">
            <Button icon={<CloseOutlined />} onClick={handleCancel}>
              Отмена
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Сохранить
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              Редактировать
            </Button>
            <Button danger icon={<DeleteOutlined />}>
              Удалить
            </Button>
          </Space>
        )
      }
    >
      {citizen && (
        <Form form={form} layout="vertical">
          <Space orientation="vertical" size="middle" className="w-full">
            <ProfileHeader citizen={citizen} />
            <PersonalInfoSection citizen={citizen} isEditing={isEditing} />
            <ContactInfoSection citizen={citizen} isEditing={isEditing} />
            <AdditionalSection citizen={citizen} isEditing={isEditing} />
            <DocumentsSection citizen={citizen} />
            <FamilySection citizen={citizen} />
            <EducationSection citizen={citizen} />
            <WorkSection citizen={citizen} />
            <PropertySection citizen={citizen} />
          </Space>
        </Form>
      )}
    </Drawer>
  );
};