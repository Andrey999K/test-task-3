'use client';

import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { DashboardOutlined, FileTextOutlined, SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/citizens',
    icon: <TeamOutlined />,
    label: 'Картотека граждан',
  },
  {
    key: '/reports',
    icon: <FileTextOutlined />,
    label: 'Отчёты',
  },
  {
    type: 'divider',
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: 'Настройки',
  },
];

const userMenuItems: MenuProps['items'] = [
  {
    key: 'profile',
    label: 'Профиль',
  },
  {
    key: 'logout',
    label: 'Выйти',
  },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
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
            <TeamOutlined className="text-white text-xl" />
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
        />
      </Sider>
      <Layout className="ml-[100px] transition-all duration-200" style={{ marginLeft: 0 }}>
        <Header className="px-6 flex items-center justify-between bg-white border-b border-gray-200">
          <h1 className="text-lg font-medium text-gray-800">
            {pathname === '/' && 'Панель управления'}
            {pathname === '/citizens' && 'Картотека граждан'}
            {pathname === '/reports' && 'Отчёты'}
            {pathname === '/settings' && 'Настройки'}
          </h1>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
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
}
