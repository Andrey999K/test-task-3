import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConfigProvider, theme } from "antd";
import ruRU from "antd/locale/ru_RU";
import "./globals.css";
import { ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ППК РЕО — Система учёта граждан",
  description: "Портал предпосылочной проверки и реабилитации обучающихся",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50" suppressHydrationWarning>
        <ConfigProvider
          locale={ruRU}
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: "#1677ff",
              borderRadius: 6,
              fontFamily: "var(--font-geist-sans), Arial, sans-serif",
            },
            components: {
              Layout: {
                headerBg: "#ffffff",
                headerHeight: 64,
                siderBg: "#001529",
              },
              Menu: {
                darkItemSelectedBg: "#1677ff",
                darkItemBg: "#001529",
              },
            },
          }}
        >
          <AppLayout>{children}</AppLayout>
        </ConfigProvider>
      </body>
    </html>
  );
}
