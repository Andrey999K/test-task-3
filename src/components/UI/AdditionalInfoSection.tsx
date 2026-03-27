'use client';

import { Descriptions, Form, Select, Tag } from "antd";
import type { Citizen } from "@/types/citizen";
import { STATUS_CONFIG, CITIZENSHIP_OPTIONS, NATIONALITY_OPTIONS, BLOOD_TYPE_OPTIONS } from "@/config/citizen-config";

type AdditionalInfoSectionProps = {
  citizen: Citizen;
  isEditing: boolean;
};

export const AdditionalInfoSection = ({ citizen, isEditing }: AdditionalInfoSectionProps) => {
  if (isEditing) {
    return (
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
    );
  }

  const status = STATUS_CONFIG[citizen.status];

  return (
    <Descriptions title="Дополнительные сведения" bordered column={2} size="small">
      <Descriptions.Item label="Гражданство">
        {citizen.citizenship || '—'}
      </Descriptions.Item>
      <Descriptions.Item label="Национальность">
        {citizen.nationality || '—'}
      </Descriptions.Item>
      <Descriptions.Item label="Группа крови">
        {citizen.bloodType || '—'}
      </Descriptions.Item>
      <Descriptions.Item label="Статус">
        <Tag color={status.color}>{status.label}</Tag>
      </Descriptions.Item>
    </Descriptions>
  );
};
