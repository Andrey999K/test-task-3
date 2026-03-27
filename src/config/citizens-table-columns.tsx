import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import type { Citizen } from "@/types/citizen";
import { MARITAL_STATUS_CONFIG, STATUS_CONFIG } from "@/config/citizen-config";
import { formatDate } from "@/utils/format-date";
import { formatPhone } from "@/utils/format-phone";

export const CITIZENS_TABLE_COLUMNS: ColumnsType<Citizen> = [
  {
    title: "ФИО",
    key: "fullName",
    render: (record: Citizen) => (
      <div className="flex items-center gap-2">
        <UserOutlined className="text-gray-400" />
        <span className="font-medium text-gray-900">
          {record.surname} {record.name} {record.patronymic}
        </span>
      </div>
    ),
    sorter: (a, b) =>
      `${a.surname} ${a.name}`.localeCompare(`${b.surname} ${b.name}`),
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
      phone ? <a href={`tel:${phone.replace(/\D/g, "")}`}>{formatPhone(phone)}</a> : "—",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email?: string) =>
      email ? <a href={`mailto:${email}`}>{email}</a> : "—",
  },
  {
    title: "Семейное положение",
    dataIndex: "maritalStatus",
    key: "maritalStatus",
    render: (status?: Citizen["maritalStatus"]) =>
      status ? MARITAL_STATUS_CONFIG[status] : "—",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (status: Citizen["status"]) => (
      <span style={{ color: STATUS_CONFIG[status].color }}>
        {STATUS_CONFIG[status].label}
      </span>
    ),
    filters: [
      { text: "Активен", value: "active" },
      { text: "На проверке", value: "pending" },
      { text: "Архив", value: "archived" },
    ],
    onFilter: (value, record) => record.status === value,
  },
];