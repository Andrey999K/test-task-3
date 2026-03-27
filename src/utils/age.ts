export const getAge = (birthDate: string): number => {
  const now = new Date();
  const birth = new Date(birthDate);
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export type AgeGroup = '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';

export const getAgeGroup = (birthDate: string): AgeGroup => {
  const age = getAge(birthDate);
  if (age < 25) return '18-24';
  if (age < 35) return '25-34';
  if (age < 45) return '35-44';
  if (age < 55) return '45-54';
  if (age < 65) return '55-64';
  return '65+';
};