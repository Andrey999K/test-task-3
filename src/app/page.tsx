'use client';

import React from "react";
import { Card, Col, Progress, Row, Statistic, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CheckCircleOutlined, ClockCircleOutlined, InboxOutlined, TeamOutlined } from "@ant-design/icons";
import { citizensData } from "@/lib/mock-data";
import AppLayout from "@/components/AppLayout";
import type { Citizen } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { formatPhone } from "@/utils/format-phone";

// Статистика
const totalCitizens = citizensData.length;
const activeCitizens = citizensData.filter((c) => c.status === 'active').length;
const pendingCitizens = citizensData.filter((c) => c.status === 'pending').length;
const archivedCitizens = citizensData.filter((c) => c.status === 'archived').length;

// Последние добавленные
const recentCitizens = citizensData.slice(0, 5);

const columns: ColumnsType<Citizen> = [
  {
    title: 'ФИО',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (_: unknown, record: Citizen) =>
      `${record.surname} ${record.name} ${record.patronymic}`,
  },
  {
    title: 'Дата рождения',
    dataIndex: 'birthDate',
    key: 'birthDate',
    render: (date: string) => formatDate(date),
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone: string) => (
      <a href={`tel:${phone.replace(/\D/g, "")}`}>
        {formatPhone(phone)}
      </a>
    ),
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status: Citizen['status']) => {
      const colors = {
        active: 'green',
        pending: 'orange',
        archived: 'gray',
      };
      const labels = {
        active: 'Активен',
        pending: 'На проверке',
        archived: 'Архив',
      };
      return <span style={{ color: colors[status] }}>{labels[status]}</span>;
    },
  },
];

const activePercent = Math.round((activeCitizens / totalCitizens) * 100);
const pendingPercent = Math.round((pendingCitizens / totalCitizens) * 100);
const archivedPercent = Math.round((archivedCitizens / totalCitizens) * 100);

export default function DashboardPage() {


  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Карточки статистики */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Всего граждан"
                value={totalCitizens}
                prefix={<TeamOutlined />}
                style={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Активные"
                value={activeCitizens}
                prefix={<CheckCircleOutlined />}
                style={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="На проверке"
                value={pendingCitizens}
                prefix={<ClockCircleOutlined />}
                style={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="В архиве"
                value={archivedCitizens}
                prefix={<InboxOutlined />}
                style={{ color: '#8c8c8c' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Распределение по статусам">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Активные</span>
                    <span className="text-gray-500">
                      {activePercent}%
                    </span>
                  </div>
                  <Progress
                    percent={activePercent}
                    strokeColor="#52c41a"
                    showInfo={false}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>На проверке</span>
                    <span className="text-gray-500">
                      {pendingPercent}%
                    </span>
                  </div>
                  <Progress
                    percent={pendingPercent}
                    strokeColor="#faad14"
                    showInfo={false}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>В архиве</span>
                    <span className="text-gray-500">
                      {archivedPercent}%
                    </span>
                  </div>
                  <Progress
                    percent={archivedPercent}
                    strokeColor="#8c8c8c"
                    showInfo={false}
                  />
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Последние добавленные">
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
    </AppLayout>
  );
}
