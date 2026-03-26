/**
 * Простой генератор тестовых данных
 */

import { fakerRU as faker } from "@faker-js/faker";
import type { Citizen } from "@/types/citizen";

function generateCitizen(): Citizen {
  const gender = faker.helpers.arrayElement(['male', 'female'] as const);
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName(gender);
  const maritalStatus = faker.helpers.arrayElement(['single', 'married', 'divorced', 'widowed'] as const);

  return {
    id: faker.string.uuid(),
    surname: lastName,
    name: firstName,
    patronymic: faker.person.middleName(gender),
    birthDate: faker.date.between({ from: '1950-01-01', to: '2005-12-31' }).toISOString().split('T')[0],
    gender,
    phone: faker.phone.number({ style: 'international' }),
    email: faker.internet.email(),
    address: `${faker.location.city()}, ${faker.location.street()}, д. ${faker.string.numeric(3)}, кв. ${faker.string.numeric(2)}`,
    maritalStatus,
    status: faker.helpers.arrayElement(['active', 'archived', 'pending'] as const),
  };
}

export function generateCitizens(count: number): Citizen[] {
  return Array.from({ length: count }, () => generateCitizen());
}

// Генерируем 100 записей для примера
faker.seed(42);
export const citizensData = generateCitizens(100);