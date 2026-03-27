// Smart компонент — оркестрирует данные и layout
"use client";

import { Col, Row } from "antd";

import { useDashboardStats } from "@/hooks/useDashboardStats";
import { AgeChartCard } from "@/components/AgeChartCard";
import { GenderChartCard } from "@/components/GenderChartCard";
import { RegistrationsChartCard } from "@/components/RegistrationsChartCard";
import { RecentActivityCard } from "@/components/RecentActivityCard";
import { StatusChartCard } from "@/components/StatusChartCard";
import { RecentCitizensTable } from "@/components/dashboard/RecentCitizensTable";
import { StatsCards } from "@/components/dashboard/StatsCards";

export default function DashboardPage() {
  const { statusData, genderData, stats, recentCitizens } = useDashboardStats();

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

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
          <RecentCitizensTable data={recentCitizens} />
        </Col>
      </Row>
    </div>
  );
};