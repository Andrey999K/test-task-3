// Dumb компонент — columns внутри, т.к. они принадлежат только этому UI
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { Citizen } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { STATUS_CONFIG } from "@/config/citizen-config";

const columns: ColumnsType<Citizen> = [
  {
    title: "ФИО",
    key: "fullName",
    render: (record: Citizen) =>
      `${record.surname} ${record.name} ${record.patronymic}`,
  },
  {
    title: "Дата рождения",
    dataIndex: "birthDate",
    key: "birthDate",
    render: (date: string) => formatDate(date),
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
  },
];

type RecentCitizensTableProps = {
  data: Citizen[];
};

export const RecentCitizensTable = ({ data }: RecentCitizensTableProps) => {
  return (
    <Card title="Последние добавленные граждане">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        size="small"
      />
    </Card>
  );
};