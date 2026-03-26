'use client';

import React, { useState } from "react";
import { Button, Card, Input, Pagination, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { citizensData } from "@/lib/mock-data";
import type { Citizen, MaritalStatus } from "@/types/citizen";
import { formatDate } from "@/utils/format-date";
import { formatPhone } from "@/utils/format-phone";
import CitizenDrawer from "@/components/CitizenDrawer";

const { Option } = Select;

// Статусы для отображения
const statusConfig = {
  active: { color: 'green', label: 'Активен' },
  pending: { color: 'orange', label: 'На проверке' },
  archived: { color: 'gray', label: 'Архив' },
} as const;

// Семейное положение для отображения
const maritalStatusConfig = {
  single: 'Не женат/не замужем',
  married: 'Женат/замужем',
  divorced: 'Разведён(а)',
  widowed: 'Вдовец/вдова',
} as const;

export default function CitizensPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Citizen['status'] | undefined>();
  const [genderFilter, setGenderFilter] = useState<Citizen['gender'] | undefined>();
  const [maritalStatusFilter, setMaritalStatusFilter] = useState<MaritalStatus | undefined>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Фильтрация данных
  const filteredData = citizensData.filter((citizen) => {
    const matchesSearch = search === '' ||
      `${citizen.surname} ${citizen.name} ${citizen.patronymic}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus = !statusFilter || citizen.status === statusFilter;
    const matchesGender = !genderFilter || citizen.gender === genderFilter;
    const matchesMaritalStatus = !maritalStatusFilter || citizen.maritalStatus === maritalStatusFilter;

    return matchesSearch && matchesStatus && matchesGender && matchesMaritalStatus;
  });

  // Пагинация
  const total = filteredData.length;
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  // Колонки таблицы
  const columns: ColumnsType<Citizen> = [
    {
      title: 'ФИО',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_: unknown, record: Citizen) => (
        <Space>
          <UserOutlined className="text-gray-400" />
          <span className="font-medium text-gray-900">
            {record.surname} {record.name} {record.patronymic}
          </span>
        </Space>
      ),
      sorter: (a, b) => `${a.surname} ${a.name}`.localeCompare(`${b.surname} ${b.name}`),
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthDate',
      key: 'birthDate',
      render: (date: string) => formatDate(date),
      sorter: (a, b) => new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime(),
    },
    {
      title: 'Пол',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: Citizen['gender']) => (
        <span>{gender === 'male' ? 'Мужской' : 'Женский'}</span>
      ),
      filters: [
        { text: 'Мужской', value: 'male' },
        { text: 'Женский', value: 'female' },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone?: string) => (
        <a href={`tel:${phone?.replace(/\D/g, "")}`}>
          {phone ? formatPhone(phone) : '—'}
        </a>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email?: string) => (
        email ? <a href={`mailto:${email}`}>{email}</a> : '—'
      ),
    },
    {
      title: 'Семейное положение',
      dataIndex: 'maritalStatus',
      key: 'maritalStatus',
      render: (status?: MaritalStatus) => (
        <span>{status ? maritalStatusConfig[status] : '—'}</span>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: Citizen['status']) => (
        <Tag color={statusConfig[status].color}>
          {statusConfig[status].label}
        </Tag>
      ),
      filters: [
        { text: 'Активен', value: 'active' },
        { text: 'На проверке', value: 'pending' },
        { text: 'Архив', value: 'archived' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter(undefined);
    setGenderFilter(undefined);
    setMaritalStatusFilter(undefined);
    setPage(1);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Фильтры */}
        <Card>
          <Space wrap size="middle" className="w-full">
            <Input
              placeholder="Поиск по ФИО"
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              style={{ width: 250 }}
              allowClear
            />

            <Select
              placeholder="Статус"
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
              style={{ width: 150 }}
              allowClear
            >
              <Option value="active">Активен</Option>
              <Option value="pending">На проверке</Option>
              <Option value="archived">Архив</Option>
            </Select>

            <Select
              placeholder="Пол"
              value={genderFilter}
              onChange={(value) => {
                setGenderFilter(value);
                setPage(1);
              }}
              style={{ width: 120 }}
              allowClear
            >
              <Option value="male">Мужской</Option>
              <Option value="female">Женский</Option>
            </Select>

            <Select
              placeholder="Семейное положение"
              value={maritalStatusFilter}
              onChange={(value) => {
                setMaritalStatusFilter(value);
                setPage(1);
              }}
              style={{ width: 180 }}
              allowClear
            >
              <Option value="single">Не женат/не замужем</Option>
              <Option value="married">Женат/замужем</Option>
              <Option value="divorced">Разведён(а)</Option>
              <Option value="widowed">Вдовец/вдова</Option>
            </Select>

            <Button onClick={handleResetFilters}>
              Сбросить
            </Button>

            <div className="flex-grow" />

            <Button type="primary" icon={<UserAddOutlined />}>
              Добавить гражданина
            </Button>
          </Space>
        </Card>

        {/* Таблица */}
        <Card title={`Картотека граждан (${total} записей)`}>
          <Table
            columns={columns}
            dataSource={paginatedData}
            rowKey="id"
            pagination={false}
            scroll={{ x: 1200 }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedCitizen(record);
                setIsDrawerOpen(true);
              },
              className: 'cursor-pointer hover:bg-gray-50',
            })}
          />

          {/* Пагинация */}
          <div className="flex justify-end mt-4">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              onChange={(newPage, newPageSize) => {
                setPage(newPage);
                setPageSize(newPageSize);
              }}
              showSizeChanger
              showTotal={(total, range) => `${range[0]}–${range[1]} из ${total}`}
              pageSizeOptions={['10', '20', '50', '100']}
            />
          </div>
        </Card>
      </div>

      {/* Drawer с информацией о гражданине */}
      <CitizenDrawer
        open={isDrawerOpen}
        citizen={selectedCitizen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedCitizen(null);
        }}
      />
    </>
  );
}
