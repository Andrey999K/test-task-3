"use client";

import { Card, Col, Row, Statistic, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CheckCircleOutlined, ClockCircleOutlined, InboxOutlined, TeamOutlined } from "@ant-design/icons";
import { citizensData } from "@/lib/mock-data";
import type { Citizen } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { STATUS_CONFIG } from "@/config/citizen-config";
import { StatusChartCard } from "@/components/StatusChartCard";
import { GenderChartCard } from "@/components/GenderChartCard";
import { AgeChartCard } from "@/components/AgeChartCard";
import { RegistrationsChartCard } from "@/components/RegistrationsChartCard";
import { RecentActivityCard } from "@/components/RecentActivityCard";

type StatusData = { name: string; value: number; color: string };
type GenderData = { name: string; value: number };

const getStatusStats = (): StatusData[] => {
  const active = citizensData.filter((c) => c.status === "active").length;
  const pending = citizensData.filter((c) => c.status === "pending").length;
  const archived = citizensData.filter((c) => c.status === "archived").length;
  return [
    { name: "Активные", value: active, color: "#52c41a" },
    { name: "На проверке", value: pending, color: "#faad14" },
    { name: "Архив", value: archived, color: "#8c8c8c" },
  ];
};

const getGenderStats = (): GenderData[] => {
  const male = citizensData.filter((c) => c.gender === "male").length;
  const female = citizensData.filter((c) => c.gender === "female").length;
  return [
    { name: "Мужской", value: male },
    { name: "Женский", value: female },
  ];
};

const statusData = getStatusStats();
const genderData = getGenderStats();

const totalCitizens = citizensData.length;
const activeCitizens = statusData[0].value;
const pendingCitizens = statusData[1].value;
const archivedCitizens = statusData[2].value;

const recentCitizens = [...citizensData]
  .sort((a, b) => new Date(b.registrationDate || 0).getTime() - new Date(a.registrationDate || 0).getTime())
  .slice(0, 5);

const columns: ColumnsType<Citizen> = [
  {
    title: "ФИО",
    dataIndex: "fullName",
    key: "fullName",
    render: (_: unknown, record: Citizen) => (
      <span>
        {record.surname} {record.name} {record.patronymic}
      </span>
    ),
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
      <span style={{ color: STATUS_CONFIG[status].color }}>{STATUS_CONFIG[status].label}</span>
    ),
  },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-blue-500">
            <Statistic
              title="Всего граждан"
              value={totalCitizens}
              prefix={<TeamOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-green-500">
            <Statistic
              title="Активные"
              value={activeCitizens}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-yellow-500">
            <Statistic
              title="На проверке"
              value={pendingCitizens}
              prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-gray-400">
            <Statistic
              title="В архиве"
              value={archivedCitizens}
              prefix={<InboxOutlined style={{ color: "#8c8c8c" }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <StatusChartCard data={statusData} />
        </Col>

        <Col xs={24} lg={8}>
          <GenderChartCard data={genderData} />
        </Col>

        <Col xs={24} lg={8}>
          <AgeChartCard />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <RegistrationsChartCard />
        </Col>

        <Col xs={24} lg={12}>
          <RecentActivityCard />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Последние добавленные граждане">
            <Table
              columns={columns}
              dataSource={recentCitizens}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;