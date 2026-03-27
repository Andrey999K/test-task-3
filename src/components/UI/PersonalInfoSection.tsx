"use client";

import { Descriptions, Form, Input, Select } from "antd";
import type { Citizen } from "@/types/citizen";
import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS } from "@/config/citizen-config";
import { formatDate } from "@/utils/format-date";

type PersonalInfoSectionProps = {
  citizen: Citizen;
  isEditing: boolean;
};

export const PersonalInfoSection = ({ citizen, isEditing }: PersonalInfoSectionProps) => (
  <Descriptions title="Личные данные" bordered column={2} size="small">
    <Descriptions.Item label="Фамилия">
      {isEditing ? (
        <Form.Item name="surname" noStyle>
          <Input />
        </Form.Item>
      ) : citizen.surname}
    </Descriptions.Item>
    <Descriptions.Item label="Имя">
      {isEditing ? (
        <Form.Item name="name" noStyle>
          <Input />
        </Form.Item>
      ) : citizen.name}
    </Descriptions.Item>
    <Descriptions.Item label="Отчество">
      {isEditing ? (
        <Form.Item name="patronymic" noStyle>
          <Input />
        </Form.Item>
      ) : citizen.patronymic}
    </Descriptions.Item>
    <Descriptions.Item label="Дата рождения">
      {isEditing ? (
        <Form.Item name="birthDate" noStyle>
          <Input type="date" />
        </Form.Item>
      ) : formatDate(citizen.birthDate)}
    </Descriptions.Item>
    <Descriptions.Item label="Место рождения" span={2}>
      {isEditing ? (
        <Form.Item name="birthPlace" noStyle>
          <Input />
        </Form.Item>
      ) : citizen.birthPlace || "—"}
    </Descriptions.Item>
    <Descriptions.Item label="Пол" span={2}>
      {isEditing ? (
        <Form.Item name="gender" noStyle>
          <Select options={GENDER_OPTIONS} style={{ width: 150 }} />
        </Form.Item>
      ) : citizen.gender === "male" ? "Мужской" : "Женский"}
    </Descriptions.Item>
    <Descriptions.Item label="Семейное положение" span={2}>
      {isEditing ? (
        <Form.Item name="maritalStatus" noStyle>
          <Select options={MARITAL_STATUS_OPTIONS} style={{ width: 200 }} />
        </Form.Item>
      ) : citizen.maritalStatus || "—"}
    </Descriptions.Item>
  </Descriptions>
);
