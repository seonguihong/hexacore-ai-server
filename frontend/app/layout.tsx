import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Hexa Stock Intelligence",
  description: "HexaCore AI 주식 인사이트 대시보드"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={plexSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

