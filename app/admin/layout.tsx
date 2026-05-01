import { Metadata } from "next";

export const metadata: Metadata = {
  title: '8.88 秒	挑战赢奖金 - 2026 年世界杯热血小游戏',
  description: '8.88 秒	挑战赢奖金 - 2026 年世界杯热血小游戏',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
