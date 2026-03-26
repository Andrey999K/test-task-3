// Семейное положение
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';

export interface Citizen {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  birthDate: string;
  gender: 'male' | 'female';

  phone?: string;
  email?: string;

  address?: string;
  
  maritalStatus?: MaritalStatus;

  status: 'active' | 'archived' | 'pending';

  // Дополнительные поля (для расширения)
  [key: string]: unknown;
}
