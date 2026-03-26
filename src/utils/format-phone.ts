export const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, ""); // '79033592987'

  return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
};