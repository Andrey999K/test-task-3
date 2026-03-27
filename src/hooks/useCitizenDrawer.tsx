"use client";

import { useState, useCallback } from "react";
import { Form } from "antd";
import type { FormInstance } from "antd";
import type { Citizen } from "@/types/citizen";

type UseCitizenDrawerReturn = {
  isEditing: boolean;
  editedCitizen: Citizen | null;
  form: FormInstance;
  startEditing: (citizen: Citizen) => void;
  cancelEditing: () => void;
  save: (originalCitizen: Citizen, onSave?: (citizen: Citizen) => void) => Promise<void>;
};

const useCitizenDrawer = (): UseCitizenDrawerReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCitizen, setEditedCitizen] = useState<Citizen | null>(null);
  const [form] = Form.useForm();

  const startEditing = useCallback((citizen: Citizen) => {
    setEditedCitizen({ ...citizen });
    form.setFieldsValue({
      ...citizen,
      birthDate: citizen.birthDate,
    });
    setIsEditing(true);
  }, [form]);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setEditedCitizen(null);
    form.resetFields();
  }, [form]);

  const save = useCallback(async (originalCitizen: Citizen, onSave?: (citizen: Citizen) => void) => {
    try {
      const values = await form.validateFields();
      const updatedCitizen = { ...originalCitizen, ...values };
      onSave?.(updatedCitizen);
      setIsEditing(false);
      setEditedCitizen(null);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  }, [form]);

  return {
    isEditing,
    editedCitizen,
    form,
    startEditing,
    cancelEditing,
    save,
  };
};

export { useCitizenDrawer };
export type { UseCitizenDrawerReturn };