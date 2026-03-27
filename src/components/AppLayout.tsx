"use client";

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { DashboardOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

type AppLayoutProps = {
  children: React.ReactNode;
};

const menuItems: MenuProps["items"] = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/citizens",
    icon: <TeamOutlined />,
    label: "Картотека",
  },
];

const userMenuItems: MenuProps["items"] = [
  {
    key: "profile",
    label: "Профиль",
  },
  {
    key: "logout",
    label: "Выйти",
  },
];

const pageTitles: Record<string, string> = {
  "/": "Панель управления",
  "/citizens": "Картотека граждан",
  "/reports": "Отчёты",
  "/settings": "Настройки",
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        className="fixed left-0 top-0 bottom-0 z-50"
      >
        <div className="h-16 flex items-center justify-center">
          {collapsed ? (
            <span className="text-white text-xl font-semibold">ППК</span>
          ) : (
            <span className="text-white text-lg font-semibold">ППК РЕО</span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ width: "100%" }}
        />
      </Sider>
      <Layout className="transition-all duration-200" style={{ marginLeft: 0 }}>
        <Header className="px-6 flex items-center justify-between bg-white border-b border-gray-200">
          <h1 className="text-lg font-medium text-gray-800">
            {pageTitles[pathname] ?? ""}
          </h1>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
            <div
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
              <Avatar icon={<UserOutlined />} className="bg-blue-500" />
              <span className="text-sm text-gray-700">Администратор</span>
            </div>
          </Dropdown>
        </Header>
        <Content className="p-6">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
