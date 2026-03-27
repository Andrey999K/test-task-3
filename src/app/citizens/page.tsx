"use client";

import { useState } from "react";
import { Button, Card, Input, Pagination, Select, Space, Table } from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import type { Citizen } from "@/types/citizen";
import { useCitizensTable } from "@/hooks/useCitizensTable";
import { CitizenDrawer } from "@/components/CitizenDrawer";

const CitizensPage = () => {
  const {
    filters,
    pagination,
    total,
    paginatedData,
    columns,
    setPagination,
    updateFilter,
    resetFilters,
  } = useCitizensTable();

  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRowClick = (record: Citizen) => {
    setSelectedCitizen(record);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedCitizen(null);
  };

  return (
    <>
      <div className="space-y-4">
        <Card>
          <Space wrap size="middle" className="w-full">
            <Input
              placeholder="Поиск по ФИО"
              prefix={<SearchOutlined />}
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              style={{ width: 250 }}
              allowClear
            />

            <Select
              placeholder="Статус"
              value={filters.status}
              onChange={(value) => updateFilter("status", value)}
              style={{ width: 150 }}
              allowClear
              options={[
                { value: "active", label: "Активен" },
                { value: "pending", label: "На проверке" },
                { value: "archived", label: "Архив" },
              ]}
            />

            <Select
              placeholder="Пол"
              value={filters.gender}
              onChange={(value) => updateFilter("gender", value)}
              style={{ width: 120 }}
              allowClear
              options={[
                { value: "male", label: "Мужской" },
                { value: "female", label: "Женский" },
              ]}
            />

            <Select
              placeholder="Семейное положение"
              value={filters.maritalStatus}
              onChange={(value) => updateFilter("maritalStatus", value)}
              style={{ width: 180 }}
              allowClear
              options={[
                { value: "single", label: "Не женат/не замужем" },
                { value: "married", label: "Женат/замужем" },
                { value: "divorced", label: "Разведён(а)" },
                { value: "widowed", label: "Вдовец/вдова" },
              ]}
            />

            <Button onClick={resetFilters}>Сбросить</Button>

            <div className="flex-grow" />

            <Button type="primary" icon={<UserAddOutlined />}>
              Добавить гражданина
            </Button>
          </Space>
        </Card>

        <Card title={`Картотека граждан (${total} записей)`}>
          <Table
            columns={columns}
            dataSource={paginatedData}
            rowKey="id"
            pagination={false}
            scroll={{ x: 1200 }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              className: "cursor-pointer hover:bg-gray-50",
            })}
          />

          <div className="flex justify-end mt-4">
            <Pagination
              current={pagination.page}
              pageSize={pagination.pageSize}
              total={total}
              onChange={(newPage, newPageSize) => {
                setPagination({ page: newPage, pageSize: newPageSize });
              }}
              showSizeChanger
              showTotal={(total, range) => `${range[0]}–${range[1]} из ${total}`}
              pageSizeOptions={["10", "20", "50", "100"]}
            />
          </div>
        </Card>
      </div>

      <CitizenDrawer
        open={isDrawerOpen}
        citizen={selectedCitizen}
        onClose={handleDrawerClose}
      />
    </>
  );
};

export default CitizensPage;