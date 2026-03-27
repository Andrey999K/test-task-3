import type { Citizen, MaritalStatus } from '@/types/citizen';

export type { Citizen, MaritalStatus };

export const STATUS_CONFIG: Record<Citizen['status'], { color: string; label: string }> = {
  active: { color: 'green', label: 'Активен' },
  pending: { color: 'orange', label: 'На проверке' },
  archived: { color: 'gray', label: 'Архив' },
};

export const GENDER_CONFIG: Record<Citizen['gender'], string> = {
  male: 'Мужской',
  female: 'Женский',
};

export const MARITAL_STATUS_CONFIG: Record<MaritalStatus, string> = {
  single: 'Не женат/не замужем',
  married: 'Женат/замужем',
  divorced: 'Разведён(а)',
  widowed: 'Вдовец/вдова',
};

export const RELATION_CONFIG: Record<string, string> = {
  'Супруг(а)': 'blue',
  'Ребёнок': 'green',
  'Родитель': 'orange',
  'Брат/Сестра': 'purple',
  'Другой родственник': 'default',
};

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Активен' },
  { value: 'pending', label: 'На проверке' },
  { value: 'archived', label: 'Архив' },
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

export const MARITAL_STATUS_OPTIONS = [
  { value: 'single', label: 'Не женат/не замужем' },
  { value: 'married', label: 'Женат/замужем' },
  { value: 'divorced', label: 'Разведён(а)' },
  { value: 'widowed', label: 'Вдовец/вдова' },
];

export const CITIZENSHIP_OPTIONS = [
  { value: 'РФ', label: 'РФ' },
  { value: 'СНГ', label: 'СНГ' },
  { value: 'Другое', label: 'Другое' },
];

export const NATIONALITY_OPTIONS = [
  { value: 'Русский', label: 'Русский' },
  { value: 'Татарин', label: 'Татарин' },
  { value: 'Украинец', label: 'Украинец' },
  { value: 'Башкир', label: 'Башкир' },
  { value: 'Чуваш', label: 'Чуваш' },
  { value: 'Другая', label: 'Другая' },
];

export const BLOOD_TYPE_OPTIONS = [
  { value: 'I+', label: 'I+' },
  { value: 'I-', label: 'I-' },
  { value: 'II+', label: 'II+' },
  { value: 'II-', label: 'II-' },
  { value: 'III+', label: 'III+' },
  { value: 'III-', label: 'III-' },
  { value: 'IV+', label: 'IV+' },
  { value: 'IV-', label: 'IV-' },
];
