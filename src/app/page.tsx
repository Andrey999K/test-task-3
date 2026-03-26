'use client';

import React from "react";
import { Card, Col, Row, Statistic, Table, Tag, Avatar } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CheckCircleOutlined, ClockCircleOutlined, InboxOutlined, TeamOutlined, UserOutlined, FileTextOutlined, CalendarOutlined } from "@ant-design/icons";
import { citizensData } from "@/lib/mock-data";
import type { Citizen } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const totalCitizens = citizensData.length;
const activeCitizens = citizensData.filter((c) => c.status === 'active').length;
const pendingCitizens = citizensData.filter((c) => c.status === 'pending').length;
const archivedCitizens = citizensData.filter((c) => c.status === 'archived').length;

const recentCitizens = [...citizensData]
  .sort((a, b) => new Date(b.registrationDate || 0).getTime() - new Date(a.registrationDate || 0).getTime())
  .slice(0, 5);

const statusConfig: Record<Citizen['status'], { color: string; label: string }> = {
  active: { color: 'green', label: 'Активен' },
  pending: { color: 'orange', label: 'На проверке' },
  archived: { color: 'gray', label: 'Архив' },
};

const statusData = [
  { name: 'Активные', value: activeCitizens, color: '#52c41a' },
  { name: 'На проверке', value: pendingCitizens, color: '#faad14' },
  { name: 'Архив', value: archivedCitizens, color: '#8c8c8c' },
];

const genderData = [
  { name: 'Мужской', value: citizensData.filter(c => c.gender === 'male').length },
  { name: 'Женский', value: citizensData.filter(c => c.gender === 'female').length },
];

const getAgeGroup = (birthDate: string): string => {
  const age = Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  if (age < 25) return '18-24';
  if (age < 35) return '25-34';
  if (age < 45) return '35-44';
  if (age < 55) return '45-54';
  if (age < 65) return '55-64';
  return '65+';
};

const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
const ageData = ageGroups.map(group => ({
  group,
  count: citizensData.filter(c => getAgeGroup(c.birthDate) === group).length,
}));

const dynamicData = [
  { month: 'Янв', registered: 25, archived: 5 },
  { month: 'Фев', registered: 32, archived: 8 },
  { month: 'Мар', registered: 28, archived: 3 },
  { month: 'Апр', registered: 35, archived: 6 },
  { month: 'Май', registered: 30, archived: 4 },
  { month: 'Июн', registered: 22, archived: 7 },
  { month: 'Июл', registered: 18, archived: 2 },
  { month: 'Авг', registered: 26, archived: 5 },
  { month: 'Сен', registered: 33, archived: 9 },
  { month: 'Окт', registered: 29, archived: 6 },
  { month: 'Ноя', registered: 31, archived: 4 },
  { month: 'Дек', registered: 27, archived: 8 },
];

const recentActivity = [
  { id: 1, type: 'user', title: 'Добавлен новый гражданин', time: '5 минут назад', icon: <UserOutlined /> },
  { id: 2, type: 'document', title: 'Обновлён паспорт', time: '12 минут назад', icon: <FileTextOutlined /> },
  { id: 3, type: 'user', title: 'Гражданин переведён в архив', time: '1 час назад', icon: <InboxOutlined /> },
  { id: 4, type: 'calendar', title: 'Назначена встреча', time: '2 часа назад', icon: <CalendarOutlined /> },
  { id: 5, type: 'user', title: 'Обновлены данные семьи', time: '3 часа назад', icon: <UserOutlined /> },
];

const columns: ColumnsType<Citizen> = [
  {
    title: 'ФИО',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (_: unknown, record: Citizen) => (
      <span>{record.surname} {record.name} {record.patronymic}</span>
    ),
  },
  {
    title: 'Дата рождения',
    dataIndex: 'birthDate',
    key: 'birthDate',
    render: (date: string) => formatDate(date),
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status: Citizen['status']) => (
      <Tag color={statusConfig[status].color}>{statusConfig[status].label}</Tag>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-blue-500">
            <Statistic
              title="Всего граждан"
              value={totalCitizens}
              prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-green-500">
            <Statistic
              title="Активные"
              value={activeCitizens}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-yellow-500">
            <Statistic
              title="На проверке"
              value={pendingCitizens}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
              styles={{ content: { color: '#faad14' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="border-l-4 border-l-gray-400">
            <Statistic
              title="В архиве"
              value={archivedCitizens}
              prefix={<InboxOutlined style={{ color: '#8c8c8c' }} />}
              styles={{ content: { color: '#8c8c8c' } }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="Распределение по статусам">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Распределение по полу">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  <Cell fill="#1890ff" />
                  <Cell fill="#eb2f96" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Мужской: {genderData[0].value}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span>Женский: {genderData[1].value}</span>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Распределение по возрасту">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#722ed1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Динамика регистраций">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dynamicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="registered" stroke="#52c41a" strokeWidth={2} name="Зарегистрировано" dot={{ fill: '#52c41a' }} />
                <Line type="monotone" dataKey="archived" stroke="#8c8c8c" strokeWidth={2} name="Архивировано" dot={{ fill: '#8c8c8c' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Последние действия">
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <Avatar 
                    icon={item.icon} 
                    style={{ 
                      backgroundColor: item.type === 'user' ? '#1890ff' : 
                                     item.type === 'document' ? '#722ed1' : '#faad14'
                    }} 
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
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
}
