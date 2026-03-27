/**
 * Генератор тестовых данных для системы учёта граждан
 */

import { fakerRU as faker } from "@faker-js/faker";
import dayjs from "dayjs";
import type {
  BloodType,
  Citizen,
  Citizenship,
  Document,
  DocumentType,
  Education,
  EducationLevel,
  FamilyMember,
  Property,
  PropertyStatus,
  RelativeType,
  Work,
} from "@/types/citizen";

const documentTypes: DocumentType[] = ['Паспорт', 'Загранпаспорт', 'Свидетельство о рождении', 'Водительское удостоверение'];
const educationLevels: EducationLevel[] = ['Среднее', 'Среднее специальное', 'Высшее', 'Неполное высшее', 'Учёная степень'];
const relativeTypes: RelativeType[] = ['Супруг(а)', 'Ребёнок', 'Родитель', 'Брат/Сестра', 'Другой родственник'];
const propertyTypes = ['Квартира', 'Дом', 'Земельный участок', 'Гараж', 'Комната', 'Дача'];
const propertyStatuses: PropertyStatus[] = ['Собственность', 'Аренда', 'Социальный найм', 'Долевое участие'];
const citizenships: Citizenship[] = ['РФ', 'СНГ', 'Другое'];
const bloodTypes: BloodType[] = ['I+', 'I-', 'II+', 'II-', 'III+', 'III-', 'IV+', 'IV-'];

const moscowStreets = ['Ленина', 'Пушкина', 'Гагарина', 'Кирова', 'Новая', 'Советская', 'Московская', 'Октябрьская', 'Первомайская', 'Мира'];
const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Ростов-на-Дону', 'Уфа'];

const universities = ['МГУ', 'СПбГУ', 'МГТУ им. Баумана', 'МГИМО', 'ВШЭ', 'МФТИ', 'КФУ', 'НГУ', 'УрФУ', 'ЮФУ'];
const faculties = ['Экономический', 'Юридический', 'Инженерный', 'Медицинский', 'Педагогический', 'Гуманитарный'];
const specializations = ['Экономист', 'Юрист', 'Инженер', 'Врач', 'Учитель', 'Менеджер', 'Программист', 'Бухгалтер'];
const positions = ['Директор', 'Менеджер', 'Специалист', 'Ведущий специалист', 'Начальник отдела', 'Инженер', 'Бухгалтер', 'Секретарь'];

const generateDocument = (): Document => {
  const type = faker.helpers.arrayElement(documentTypes);
  return {
    id: faker.string.uuid(),
    type,
    series: faker.string.numeric(4),
    number: faker.string.numeric(6),
    issueDate: faker.date.past({ years: 20 }).toISOString().split('T')[0],
    expiryDate: type === 'Паспорт' ? undefined : faker.date.future({ years: 5 }).toISOString().split('T')[0],
    issuer: `${faker.location.city()}, ${faker.helpers.arrayElement(['ОВД', 'УФМС', 'МВД'])}`,
  };
};

const generateFamilyMember = (gender: 'male' | 'female'): FamilyMember => {
  const relation = faker.helpers.arrayElement(relativeTypes);
  const memberGender = relation === 'Супруг(а)' ? (gender === 'male' ? 'female' : 'male') : faker.helpers.arrayElement(['male', 'female'] as const);
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(memberGender),
    surname: faker.person.lastName(memberGender),
    patronymic: faker.person.middleName(memberGender),
    birthDate: faker.date.between({ 
      from: relation === 'Ребёнок' ? '2000-01-01' : '1940-01-01', 
      to: relation === 'Ребёнок' ? '2015-12-31' : '1995-12-31' 
    }).toISOString().split('T')[0],
    relation,
    phone: faker.helpers.maybe(() => faker.phone.number({ style: 'international' }), { probability: 0.5 }) ?? undefined,
  };
};

const generateEducation = (): Education => {
  const level = faker.helpers.arrayElement(educationLevels);
  const startYear = faker.number.int({ min: 1970, max: 2020 });
  return {
    id: faker.string.uuid(),
    institution: faker.helpers.arrayElement(universities),
    faculty: faker.helpers.arrayElement(faculties),
    specialization: faker.helpers.arrayElement(specializations),
    level,
    startYear,
    endYear: level === 'Учёная степень' ? startYear + 8 : startYear + 5,
    diplomaNumber: `№${faker.string.numeric(6)}`,
  };
};

const generateWork = (): Work => {
  const startDate = faker.date.past({ years: 15 });
  return {
    id: faker.string.uuid(),
    organization: `${faker.company.name()} ${faker.helpers.arrayElement(['ООО', 'АО', 'ПАО'])}`,
    position: faker.helpers.arrayElement(positions),
    department: faker.helpers.arrayElement(['Бухгалтерия', 'Отдел кадров', 'IT-отдел', 'Продажи', 'Производство']),
    startDate: startDate.toISOString().split('T')[0],
    endDate: faker.helpers.maybe(() => faker.date.between({ from: startDate, to: new Date() }).toISOString().split('T')[0], { probability: 0.3 }) ?? undefined,
    address: `${faker.helpers.arrayElement(cities)}, ${faker.helpers.arrayElement(moscowStreets)} ул., д. ${faker.string.numeric(3)}`,
    phone: faker.phone.number({ style: 'international' }),
  };
};

const generateProperty = (): Property => {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(propertyTypes),
    address: `${faker.helpers.arrayElement(cities)}, ${faker.helpers.arrayElement(moscowStreets)} ул., д. ${faker.string.numeric(2)}`,
    area: faker.number.int({ min: 20, max: 200 }),
    cadastreNumber: `${faker.string.numeric(2)}:${faker.string.numeric(2)}:${faker.string.numeric(3)}:${faker.string.numeric(7)}`,
    status: faker.helpers.arrayElement(propertyStatuses),
    share: faker.helpers.maybe(() => faker.number.float({ min: 0.1, max: 1, fractionDigits: 2 }), { probability: 0.7 }) ?? undefined,
    estimatedValue: faker.number.int({ min: 1000000, max: 50000000 }),
  };
};

const generateCitizen = (): Citizen => {
  const gender = faker.helpers.arrayElement(['male', 'female'] as const);
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName(gender);
  const city = faker.helpers.arrayElement(cities);
  const street = faker.helpers.arrayElement(moscowStreets);
  const houseNumber = faker.string.numeric(faker.number.int({ min: 1, max: 2 }));
  const apartmentNumber = faker.string.numeric(faker.number.int({ min: 1, max: 3 }));
  
  const birthDate = faker.date.between({ from: '1940-01-01', to: '2005-12-31' }).toISOString().split('T')[0];
  const passportIssueDate = faker.date.between({ 
    from: dayjs(birthDate).add(14, 'year').toDate(), 
    to: dayjs(birthDate).add(25, 'year').toDate() 
  }).toISOString().split('T')[0];
  
  const maritalStatus = faker.helpers.arrayElement(['single', 'married', 'divorced', 'widowed'] as const);
  const hasSpouse = maritalStatus === 'married';

  return {
    id: faker.string.uuid(),
    surname: lastName,
    name: firstName,
    patronymic: faker.person.middleName(gender),
    birthDate,
    birthPlace: `${city}`,
    gender,
    phone: faker.phone.number({ style: 'international' }),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    address: `${city}, ${street} ул., д. ${houseNumber}, кв. ${apartmentNumber}`,
    registrationAddress: `${city}, ${street} ул., д. ${houseNumber}, кв. ${apartmentNumber}`,
    maritalStatus,
    citizenship: faker.helpers.arrayElement(citizenships),
    nationality: faker.helpers.arrayElement(['Русский', 'Татарин', 'Украинец', 'Башкир', 'Чуваш', 'Другая'] as const),
    bloodType: faker.helpers.arrayElement(bloodTypes),

    passportSeries: faker.string.numeric(4),
    passportNumber: faker.string.numeric(6),
    passportIssueDate,
    passportIssuer: `${city}, ОВД`,
    passportCode: `${faker.string.numeric(3)}-${faker.string.numeric(3)}`,
    inn: `${faker.string.numeric(4)}${faker.string.numeric(6)}${faker.string.numeric(2)}${faker.string.numeric(1)}`,
    snils: `${faker.string.numeric(3)}-${faker.string.numeric(3)}-${faker.string.numeric(3)} ${faker.string.numeric(2)}`,

    documents: faker.helpers.arrayElements([generateDocument(), generateDocument()], { min: 1, max: 2 }),
    family: [
      ...(hasSpouse ? [generateFamilyMember(gender)] : []),
      ...faker.helpers.arrayElements(
        Array.from({ length: 5 }, () => generateFamilyMember(gender)),
        { min: 0, max: gender === 'male' ? 3 : 4 }
      ),
    ],
    education: faker.helpers.arrayElements([generateEducation(), generateEducation()], { min: 1, max: 2 }),
    workHistory: faker.helpers.arrayElements([generateWork(), generateWork(), generateWork()], { min: 1, max: 3 }),
    property: faker.helpers.arrayElements([generateProperty(), generateProperty()], { min: 0, max: 2 }),

    status: faker.helpers.arrayElement(['active', 'archived', 'pending'] as const),
    registrationDate: faker.date.past({ years: 3 }).toISOString().split('T')[0],
    lastModifiedDate: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 }) ?? undefined,
  };
};

export const generateCitizens = (count: number): Citizen[] => {
  return Array.from({ length: count }, () => generateCitizen());
};

// Генерируем 100 записей для примера
faker.seed(56);
export const citizensData = generateCitizens(100);