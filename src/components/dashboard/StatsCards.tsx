import { Card, Col, Row, Statistic } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, InboxOutlined, TeamOutlined } from "@ant-design/icons";

import type { DashboardStatsType } from "@/types/dashboard";

type StatsCardsProps = {
  stats: DashboardStatsType;
};

export const StatsCards = ({ stats }: StatsCardsProps) => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} lg={6}>
      <Card className="border-l-4 border-l-blue-500">
        <Statistic
          title="Всего граждан"
          value={stats.total}
          prefix={<TeamOutlined style={{ color: "#1890ff" }} />}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} lg={6}>
      <Card className="border-l-4 border-l-green-500">
        <Statistic
          title="Активные"
          value={stats.active}
          prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} lg={6}>
      <Card className="border-l-4 border-l-yellow-500">
        <Statistic
          title="На проверке"
          value={stats.pending}
          prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} lg={6}>
      <Card className="border-l-4 border-l-gray-400">
        <Statistic
          title="В архиве"
          value={stats.archived}
          prefix={<InboxOutlined style={{ color: "#8c8c8c" }} />}
        />
      </Card>
    </Col>
  </Row>
);