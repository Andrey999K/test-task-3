"use client";

import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";
import { citizensData } from "@/lib/mock-data";
import type { Citizen } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { formatPhone } from "@/utils/format-phone";
import { MARITAL_STATUS_CONFIG, STATUS_CONFIG } from "@/config/citizen-config";

export type CitizenFilters = {
  search: string;
  status: Citizen["status"] | undefined;
  gender: Citizen["gender"] | undefined;
  maritalStatus: Citizen["maritalStatus"] | undefined;
};

export type PaginationState = {
  page: number;
  pageSize: number;
};

const columns: ColumnsType<Citizen> = [
  {
    title: "ФИО",
    dataIndex: "fullName",
    key: "fullName",
    render: (_: unknown, record: Citizen) => (
      <div className="flex items-center gap-2">
        <UserOutlined className="text-gray-400" />
        <span className="font-medium text-gray-900">
          {record.surname} {record.name} {record.patronymic}
        </span>
      </div>
    ),
    sorter: (a, b) => `${a.surname} ${a.name}`.localeCompare(`${b.surname} ${b.name}`),
  },
  {
    title: "Дата рождения",
    dataIndex: "birthDate",
    key: "birthDate",
    render: (date: string) => formatDate(date),
    sorter: (a, b) => new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime(),
  },
  {
    title: "Пол",
    dataIndex: "gender",
    key: "gender",
    render: (gender: Citizen["gender"]) => (gender === "male" ? "Мужской" : "Женский"),
    filters: [
      { text: "Мужской", value: "male" },
      { text: "Женский", value: "female" },
    ],
    onFilter: (value, record) => record.gender === value,
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
    render: (phone?: string) =>
      phone ? (
        <a href={`tel:${phone.replace(/\D/g, "")}`}>{formatPhone(phone)}</a>
      ) : (
        "—"
      ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email?: string) => (email ? <a href={`mailto:${email}`}>{email}</a> : "—"),
  },
  {
    title: "Семейное положение",
    dataIndex: "maritalStatus",
    key: "maritalStatus",
    render: (status?: Citizen["maritalStatus"]) => (status ? MARITAL_STATUS_CONFIG[status] : "—"),
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (status: Citizen["status"]) => (
      <span style={{ color: STATUS_CONFIG[status].color }}>{STATUS_CONFIG[status].label}</span>
    ),
    filters: [
      { text: "Активен", value: "active" },
      { text: "На проверке", value: "pending" },
      { text: "Архив", value: "archived" },
    ],
    onFilter: (value, record) => record.status === value,
  },
];

export const useCitizensTable = () => {
  const [filters, setFilters] = useState<CitizenFilters>({
    search: "",
    status: undefined,
    gender: undefined,
    maritalStatus: undefined,
  });

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
  });

  const filteredData = citizensData.filter((citizen) => {
    const fullName = `${citizen.surname} ${citizen.name} ${citizen.patronymic}`.toLowerCase();
    const matchesSearch = filters.search === "" || fullName.includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || citizen.status === filters.status;
    const matchesGender = !filters.gender || citizen.gender === filters.gender;
    const matchesMaritalStatus = !filters.maritalStatus || citizen.maritalStatus === filters.maritalStatus;

    return matchesSearch && matchesStatus && matchesGender && matchesMaritalStatus;
  });

  const paginatedData = filteredData.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );

  const total = filteredData.length;

  const resetFilters = () => {
    setFilters({ search: "", status: undefined, gender: undefined, maritalStatus: undefined });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const updateFilter = <K extends keyof CitizenFilters>(key: K, value: CitizenFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    filters,
    pagination,
    total,
    paginatedData,
    columns,
    setPagination,
    updateFilter,
    resetFilters,
  };
};