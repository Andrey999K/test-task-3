import { useState } from "react";

import { Form } from "antd";

import type { Citizen } from "@/types/citizen";

export const useCitizenDrawer = (citizen: Citizen | null, onSave?: (c: Citizen) => void) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    if (!citizen) return;
    form.setFieldsValue(citizen);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async () => {
    if (!citizen) return;
    try {
      const values = await form.validateFields();
      onSave?.({ ...citizen, ...values });
      setIsEditing(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return { form, isEditing, handleEdit, handleCancel, handleSave };
};