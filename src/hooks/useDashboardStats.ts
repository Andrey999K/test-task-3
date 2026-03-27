import { citizensData } from "@/lib/mock-data";
import type { Citizen } from "@/types/citizen";
import type { DashboardStatsType, GenderDataType, StatusDataType } from "@/types/dashboard";

const getStatusData = (citizens: Citizen[]): StatusDataType[] => [
  {
    name: "Активные",
    value: citizens.filter((c) => c.status === "active").length,
    color: "#52c41a",
  },
  {
    name: "На проверке",
    value: citizens.filter((c) => c.status === "pending").length,
    color: "#faad14",
  },
  {
    name: "Архив",
    value: citizens.filter((c) => c.status === "archived").length,
    color: "#8c8c8c",
  },
];

const getGenderData = (citizens: Citizen[]): GenderDataType[] => [
  {
    name: "Мужской",
    value: citizens.filter((c) => c.gender === "male").length,
  },
  {
    name: "Женский",
    value: citizens.filter((c) => c.gender === "female").length,
  },
];

const getStats = (statusData: StatusDataType[]): DashboardStatsType => ({
  total: citizensData.length,
  active: statusData[0].value,
  pending: statusData[1].value,
  archived: statusData[2].value,
});

const getRecentCitizens = (citizens: Citizen[]): Citizen[] => {
  return [...citizens]
    .sort(
      (a, b) =>
        new Date(b.registrationDate || 0).getTime() -
        new Date(a.registrationDate || 0).getTime(),
    )
    .slice(0, 5);
};


export const useDashboardStats = () => {
  const statusData = getStatusData(citizensData);
  const genderData = getGenderData(citizensData);
  const stats = getStats(statusData);
  const recentCitizens = getRecentCitizens(citizensData);

  return { statusData, genderData, stats, recentCitizens };
};