"use client";

import { Descriptions, Form, Input } from "antd";
import { formatDate } from "@/utils/format-date";
import type { Citizen } from "@/types/citizen";

const { TextArea } = Input;

type AdditionalSectionProps = {
  citizen: Citizen;
  isEditing: boolean;
};

export const AdditionalSection = ({ citizen, isEditing }: AdditionalSectionProps) => {
  if (!citizen.notes && !citizen.registrationDate && !citizen.lastModifiedDate) {
    return null;
  }

  return (
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
  );
};