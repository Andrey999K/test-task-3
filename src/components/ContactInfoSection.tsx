'use client';

import { Descriptions, Form, Input } from "antd";
import type { Citizen } from "@/types/citizen";
import { formatPhone } from "@/utils/format-phone";

type ContactInfoSectionProps = {
  citizen: Citizen;
  isEditing: boolean;
};

export const ContactInfoSection = ({ citizen, isEditing }: ContactInfoSectionProps) => (
  <Descriptions title="Контактные данные" bordered column={2} size="small">
    <Descriptions.Item label="Телефон">
      {isEditing ? (
        <Form.Item name="phone" noStyle>
          <Input />
        </Form.Item>
      ) : citizen.phone ? (
        <a href={`tel:${citizen.phone.replace(/\D/g, '')}`}>
          {formatPhone(citizen.phone)}
        </a>
      ) : '—'}
    </Descriptions.Item>
    <Descriptions.Item label="Email">
      {isEditing ? (
        <Form.Item name="email" noStyle>
          <Input />
        </Form.Item>
      ) : citizen.email ? (
        <a href={`mailto:${citizen.email}`}>{citizen.email}</a>
      ) : '—'}
    </Descriptions.Item>
    <Descriptions.Item label="Адрес регистрации" span={2}>
      {isEditing ? (
        <Form.Item name="address" noStyle>
          <Input />
        </Form.Item>
      ) : citizen.address || '—'}
    </Descriptions.Item>
    <Descriptions.Item label="Фактический адрес" span={2}>
      {isEditing ? (
        <Form.Item name="registrationAddress" noStyle>
          <Input />
        </Form.Item>
      ) : citizen.registrationAddress !== citizen.address ? citizen.registrationAddress : '—'}
    </Descriptions.Item>
  </Descriptions>
);
