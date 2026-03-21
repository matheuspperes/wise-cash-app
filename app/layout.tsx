import "./globals.css";

import { QueryProvider } from "@/components/providers/query-provider";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ReactNode } from "react";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Wise Cash App",
  description: "Gestao financeira mensal simples em pt-BR",
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html className={geist.variable} lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
