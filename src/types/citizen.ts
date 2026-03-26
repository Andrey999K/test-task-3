// Семейное положение
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';

// Гражданство
export type Citizenship = 'РФ' | 'СНГ' | 'Другое';

// Группа крови
export type BloodType = 'I+' | 'I-' | 'II+' | 'II-' | 'III+' | 'III-' | 'IV+' | 'IV-';

// Уровень образования
export type EducationLevel = 'Среднее' | 'Среднее специальное' | 'Высшее' | 'Неполное высшее' | 'Учёная степень';

// Тип документа
export type DocumentType = 'Паспорт' | 'Загранпаспорт' | 'Свидетельство о рождении' | 'Водительское удостоверение';

// Статус недвижимости
export type PropertyStatus = 'Собственность' | 'Аренда' | 'Социальный найм' | 'Долевое участие';

// Тип родственной связи
export type RelativeType = 'Супруг(а)' | 'Ребёнок' | 'Родитель' | 'Брат/Сестра' | 'Другой родственник';

export interface FamilyMember {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  birthDate: string;
  relation: RelativeType;
  phone?: string;
}

export interface Document {
  id: string;
  type: DocumentType;
  series: string;
  number: string;
  issueDate: string;
  expiryDate?: string;
  issuer: string;
}

export interface Education {
  id: string;
  institution: string;
  faculty: string;
  specialization: string;
  level: EducationLevel;
  startYear: number;
  endYear?: number;
  diplomaNumber?: string;
}

export interface Work {
  id: string;
  organization: string;
  position: string;
  department?: string;
  startDate: string;
  endDate?: string;
  address?: string;
  phone?: string;
}

export interface Property {
  id: string;
  type: string;
  address: string;
  area?: number;
  cadastreNumber?: string;
  status: PropertyStatus;
  share?: number;
  estimatedValue?: number;
}

export interface Citizen {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  birthDate: string;
  birthPlace: string;
  gender: 'male' | 'female';
  
  phone?: string;
  email?: string;
  
  address: string;
  registrationAddress?: string;
  
  maritalStatus?: MaritalStatus;
  citizenship?: Citizenship;
  nationality?: string;
  bloodType?: BloodType;
  
  passportSeries?: string;
  passportNumber?: string;
  passportIssueDate?: string;
  passportIssuer?: string;
  passportCode?: string;
  inn?: string;
  snils?: string;
  
  documents?: Document[];
  family?: FamilyMember[];
  education?: Education[];
  workHistory?: Work[];
  property?: Property[];
  
  status: 'active' | 'archived' | 'pending';
  
  registrationDate?: string;
  lastModifiedDate?: string;
  
  photo?: string;
  notes?: string;
  
  [key: string]: unknown;
}
